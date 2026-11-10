from datetime import datetime, timezone
from typing import Annotated, List

from bson import ObjectId, errors  # ObjectId Type d'identifiant natif de MongoDB
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from project_manager.db.mongodb import get_database
from project_manager.dto.role import RoleResponse
from project_manager.schemas.roles import RoleCreate, RoleUpdate


router = APIRouter(prefix="/roles", tags=["Roles"])

DbDep = Annotated[AsyncIOMotorDatabase, Depends(get_database)]

# Ajouter un role
@router.post("/", response_model=RoleResponse, status_code=status.HTTP_201_CREATED)
async def role_create(
    role_in: RoleCreate, 
    db : DbDep 
):
    existing_role = await db["roles"].find_one({"name" : role_in.name})
    if existing_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un role avec ce nom existe déjà"
        )
    
    role_dict = role_in.model_dump()
    role_dict["created_at"] = datetime.now(timezone.utc)

    result = await db["roles"].insert_one(role_dict)
    created_role = await db["roles"].find_one({"_id": result.inserted_id})
    created_role["_id"] = str(created_role["_id"])

    return created_role


# Obtenir tous les roles
@router.get("/", response_model=List[RoleResponse])
async def list_roles(
    db: DbDep,        # Sans val. par défaut (non-default argument) en premier
    skip: int = 0,    # Val. par défaut en dernier
    limit: int = 20   # Val. par défaut en dernier
):
    roles_cursor = db["roles"].find().skip(skip).limit(limit)
    roles = []
    async for role in roles_cursor:
        role["_id"] = str(role["_id"])
        roles.append(role)
    return roles

# Obtenir un role à partir de son id
@router.get("/{role_id}", response_model=RoleResponse)
async def get_user(
    role_id: str,
    db:DbDep
):
    try:
        obj_id = ObjectId(role_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format d'ID Mongo invalide."
        )

    role = await db["roles"].find_one({"_id": obj_id})
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role non trouvé"
        )

    role["_id"] = str(role["_id"])
    return role


@router.patch("/{role_id}", response_model=RoleResponse)
async def update_role(
    role_id: str,
    role_in: RoleUpdate,
    db: DbDep
):
    # 1. Valider le format du string role_id en ObjectId MongoDB
    try:
        obj_id = ObjectId(role_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format d'ID MongoDB invalide."
        )

    # 2. Filtrer pour ne garder que les champs réellement envoyés par le client (exclure les valeurs None)
    update_data = {k: v for k, v in role_in.model_dump().items() if v is not None}

    # 3. Vérifier si au moins un champ a été fourni pour la mise à jour
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Aucune donnée fournie pour la mise à jour."
        )

    # 4. Si le nom du rôle est modifié, vérifier qu'il n'est pas déjà pris par un AUTRE rôle
    if "name" in update_data:
        existing_role = await db["roles"].find_one({
            "name": update_data["name"],
            "_id": {"$ne": obj_id}  # $ne = Not Equal (exclure le rôle courant)
        })
        if existing_role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un rôle avec ce nom existe déjà."
            )

    # 5. Appliquer la mise à jour dans MongoDB avec $set
    result = await db["roles"].update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )

    # 6. Si aucun document n'a correspondu à l'ID
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rôle non trouvé."
        )

    # 7. Récupérer et retourner le rôle mis à jour
    updated_role = await db["roles"].find_one({"_id": obj_id})
    updated_role["_id"] = str(updated_role["_id"])

    return updated_role




# Supression d'un role
@router.delete("{role_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_role(
    role_id : str,
    db: DbDep
):
    try:
        obj_id = ObjectId(role_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format d'ID MongoDB invalide."
        )

    result = await db["roles"].delete_one({"_id": obj_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rôle non trouvé"
        )
    
    return None
from datetime import datetime, timezone
from typing import Annotated, List

from bson import ObjectId, errors # Type d'identifiant natif de MongoDB
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from project_manager.core.security import hash_password
from project_manager.db.mongodb import get_database
from project_manager.dto.user import UserResponse
from project_manager.schemas.users import UserCreate, UserUpdate



router = APIRouter(prefix="/users", tags=["Users"])

# Alias réutilisable : "une base Mongo injectée par FastAPI".
# Annotated[Type, Depends(...)] = le type + la façon dont FastAPI doit le fournir.
# Évite de répéter "= Depends(get_database)" dans chaque route.
DbDep = Annotated[AsyncIOMotorDatabase, Depends(get_database)]


# Dans ton endpoint POST /users/ :
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_in: UserCreate, # Corps de la requête, validé automatiquement par Pydantic
    db: DbDep  # Base de données injectée par FastAPI
):
    # 1. Vérifier si l'email existe déjà
    existing_user = await db["users"].find_one({"email": user_in.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà."
        )
    # 2. Vérifier que le role_id existe bien dans la collection 'roles'
    try:
        role_obj_id = ObjectId(user_in.role_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format de role_id invalide."
        )

    role = await db["roles"].find_one({"_id": role_obj_id})
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Le rôle spécifié n'existe pas."
        )
    # 3. Préparer le document BSON pour MongoDB
    user_dict = user_in.model_dump()
    # On retire le mot de passe en clair et on ne stocke que son hash
    user_dict["hashed_password"] = hash_password(user_dict.pop("password"))
    user_dict["role_id"] = str(role_obj_id)
    user_dict["is_active"] = True
    user_dict["created_at"] = datetime.now(timezone.utc) # Date en UTC

    # 4. Insérer dans MongoDB (Mongo génère automatiquement le champ "_id")
    result = await db["users"].insert_one(user_dict)
    # 5. Récupérer l'utilisateur créé.
    # Pas de conversion manuelle de "_id" : PyObjectId (dans le DTO) la fait pour nous.  
    created_user = await db["users"].find_one({"_id": result.inserted_id})
    
    # - Convertir l'ObjectId principal en str
    created_user["_id"] = str(created_user["_id"])
    
    # -  Convertir l'ObjectId du rôle en str avant de l'imbriquer
    role["_id"] = str(role["_id"])
    created_user["role"] = role

    return created_user



@router.get("/", response_model=List[UserResponse])
async def list_users(
    db: DbDep,
    skip: int = 0,
    limit: int = 20
):
    users_cursor = db["users"].find().skip(skip).limit(limit)
    users = []
    async for user in users_cursor:
        # ⚠️ Conversion obligatoire de l'ObjectId de l'utilisateur
        user["_id"] = str(user["_id"])
        
        # Récupération et conversion du rôle lié si role_id existe
        if "role_id" in user:
            try:
                role = await db["roles"].find_one({"_id": ObjectId(user["role_id"])})
                if role:
                    role["_id"] = str(role["_id"])
                    user["role"] = role
            except errors.InvalidId:
                user["role"] = None

        users.append(user)
        
    return users




@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    db: DbDep
):
    # 1. Valider le format de l'ID MongoDB
    try:
        obj_id = ObjectId(user_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format d'ID utilisateur invalide."
        )

    # 2. Chercher l'utilisateur dans MongoDB
    user = await db["users"].find_one({"_id": obj_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé."
        )

    # 3. Convertir l'ObjectId principal en str
    user["_id"] = str(user["_id"])

    # 4. Charger et attacher l'objet rôle s'il existe
    if "role_id" in user:
        try:
            role = await db["roles"].find_one({"_id": ObjectId(user["role_id"])})
            if role:
                role["_id"] = str(role["_id"])
                user["role"] = role
        except errors.InvalidId:
            user["role"] = None

    return user



@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: str,
    user_in: UserUpdate,
    db: DbDep
):
    # 1. Valider le format de l'ID MongoDB
    try:
        obj_id = ObjectId(user_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format d'ID utilisateur invalide."
        )

    # 2. Extraire uniquement les champs renseignés (non None)
    update_data = {k: v for k, v in user_in.model_dump().items() if v is not None}

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Aucune donnée fournie pour la mise à jour."
        )

    # 3. Si l'email est modifié, vérifier qu'il n'est pas déjà pris par un autre utilisateur
    if "email" in update_data:
        existing_user = await db["users"].find_one({
            "email": update_data["email"],
            "_id": {"$ne": obj_id}
        })
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cet email est déjà utilisé par un autre compte."
            )

    # 4. Si le role_id est modifié, vérifier qu'il existe bien dans la collection 'roles'
    if "role_id" in update_data:
        try:
            role_obj_id = ObjectId(update_data["role_id"])
        except errors.InvalidId:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Format de role_id invalide."
            )

        role = await db["roles"].find_one({"_id": role_obj_id})
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Le rôle spécifié n'existe pas."
            )
        update_data["role_id"] = str(role_obj_id)

    # 5. Appliquer la mise à jour dans MongoDB
    result = await db["users"].update_one({"_id": obj_id}, {"$set": update_data})

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé."
        )

    # 6. Récupérer l'utilisateur mis à jour et charger son rôle
    updated_user = await db["users"].find_one({"_id": obj_id})
    updated_user["_id"] = str(updated_user["_id"])

    if "role_id" in updated_user:
        try:
            role = await db["roles"].find_one({"_id": ObjectId(updated_user["role_id"])})
            if role:
                role["_id"] = str(role["_id"])
                updated_user["role"] = role
        except errors.InvalidId:
            updated_user["role"] = None

    return updated_user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    db: DbDep
):
    # 1. Valider le format de l'ID MongoDB
    try:
        obj_id = ObjectId(user_id)
    except errors.InvalidId:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Format d'ID utilisateur invalide."
        )

    # 2. Supprimer l'utilisateur de la collection
    result = await db["users"].delete_one({"_id": obj_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé."
        )

    return None


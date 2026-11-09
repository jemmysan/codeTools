from datetime import datetime, timezone
from typing import Annotated, List

from bson import ObjectId  # Type d'identifiant natif de MongoDB
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from project_manager.core.security import hash_password
from project_manager.db.mongodb import get_database
from project_manager.dto.user import UserResponse
from project_manager.schemas.users import UserCreate

router = APIRouter(prefix="/users", tags=["Users"])

# Alias réutilisable : "une base Mongo injectée par FastAPI".
# Annotated[Type, Depends(...)] = le type + la façon dont FastAPI doit le fournir.
# Évite de répéter "= Depends(get_database)" dans chaque route.
DbDep = Annotated[AsyncIOMotorDatabase, Depends(get_database)]


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_in: UserCreate,  # Corps de la requête, validé automatiquement par Pydantic
    db: DbDep,            # Base de données injectée par FastAPI
):
    # 1. Vérifier si l'email existe déjà
    existing_user = await db["users"].find_one({"email": user_in.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà.",
        )

    # 2. Préparer le document BSON pour MongoDB
    user_dict = user_in.model_dump()  # Modèle Pydantic -> dict Python
    # On retire le mot de passe en clair et on ne stocke que son hash
    user_dict["hashed_password"] = hash_password(user_dict.pop("password"))
    user_dict["is_active"] = True
    user_dict["created_at"] = datetime.now(timezone.utc)  # Date en UTC (bonne pratique)

    # 3. Insérer dans MongoDB (Mongo génère automatiquement le champ "_id")
    result = await db["users"].insert_one(user_dict)

    # 4. Récupérer l'utilisateur créé.
    # Pas de conversion manuelle de "_id" : PyObjectId (dans le DTO) la fait pour nous.
    created_user = await db["users"].find_one({"_id": result.inserted_id})
    return created_user


@router.get("/", response_model=List[UserResponse])
async def list_users(
    db: DbDep,         # Avec Annotated, on peut le placer avant les paramètres par défaut
    skip: int = 0,     # Pagination : nombre de documents à sauter
    limit: int = 20,   # Pagination : nombre maximum de documents retournés
):
    # find() renvoie un curseur asynchrone, pas directement une liste
    users_cursor = db["users"].find().skip(skip).limit(limit)

    # "async for" parcourt le curseur document par document sans bloquer le serveur
    return [user async for user in users_cursor]


# @router.get("/{user_id}", response_model=UserResponse)
# async def get_user(user_id: str, db: DbDep):
#     # L'ID reçu dans l'URL est une chaîne : on vérifie qu'elle est un ObjectId valide,
#     # sinon ObjectId(...) lèverait une exception (erreur 500).
#     if not ObjectId.is_valid(user_id):
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="ID invalide.",
#         )

#     # En base, "_id" est un ObjectId : il faut convertir la str avant de chercher
#     user = await db["users"].find_one({"_id": ObjectId(user_id)})
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Utilisateur introuvable.",
#         )
#     return user
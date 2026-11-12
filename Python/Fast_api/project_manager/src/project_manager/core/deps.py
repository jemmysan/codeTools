from typing import Annotated
import jwt
from bson import ObjectId, errors
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase

from project_manager.core.config import settings
from project_manager.db.mongodb import get_database

# Indique à Swagger UI quelle route génère le token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

DbDep = Annotated[AsyncIOMotorDatabase, Depends(get_database)]
TokenDep = Annotated[str, Depends(oauth2_scheme)]


async def get_current_user(token: TokenDep, db: DbDep) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Impossible de valider les identifiants (token invalide ou expiré).",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str | None = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception

    try:
        obj_id = ObjectId(user_id)
    except errors.InvalidId:
        raise credentials_exception

    user = await db["users"].find_one({"_id": obj_id})
    if user is None or not user.get("is_active", True):
        raise credentials_exception

    user["_id"] = str(user["_id"])

    # Peupler le rôle de l'utilisateur connecté
    if "role_id" in user:
        try:
            role = await db["roles"].find_one({"_id": ObjectId(user["role_id"])})
            if role:
                role["_id"] = str(role["_id"])
                user["role"] = role
        except errors.InvalidId:
            user["role"] = None

    return user


CurrentUserDep = Annotated[dict, Depends(get_current_user)]
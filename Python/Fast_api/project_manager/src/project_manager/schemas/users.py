from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from project_manager.models.role import Role


# Schéma de base réutilisable
class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)
    role: Role = Role.DEVELOPER


# Données requises à la création d'un utilisateur
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Mot de passe d'au moins 8 caractères")


# Données autorisées pour la mise à jour (PATCH)
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    role: Optional[Role] = None
    is_active: Optional[bool] = None




# Force Pydantic à construire explicitement les schémas pour FastAPI / OpenAPI
UserBase.model_rebuild()
UserCreate.model_rebuild()
UserUpdate.model_rebuild()

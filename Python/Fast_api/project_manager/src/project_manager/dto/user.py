from datetime import datetime
from typing import Optional
from pydantic import Field
from project_manager.schemas.users import UserBase
from project_manager.dto.role import RoleResponse



# Données renvoyées par l'API (Masque le mot de passe et convertit _id en id)
class UserResponse(UserBase):
    # À la lecture, accepte "_id" (Mongo) ou "id". À la sortie, le champ s'appelle "id".
    id: str = Field(..., alias="_id")
    email: str
    full_name: str
    role_id: str
    role: Optional[RoleResponse] = None # Objet rôle peuplé après jointure BDD
    is_active: bool
    created_at: datetime

    model_config = {
        # "populate_by_name": True,
        "from_attributes": True,
    }

UserResponse.model_rebuild()
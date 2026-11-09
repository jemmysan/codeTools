from datetime import datetime
from project_manager.schemas.users import UserBase
from pydantic import BaseModel, Field, AliasChoices



# Données renvoyées par l'API (Masque le mot de passe et convertit _id en id)
class UserResponse(UserBase):
    # À la lecture, accepte "_id" (Mongo) ou "id". À la sortie, le champ s'appelle "id".
    id: str = Field(..., validation_alias=AliasChoices("_id", "id"))
    is_active: bool
    created_at: datetime

    model_config = {
        "from_attributes": True,
    }

UserResponse.model_rebuild()
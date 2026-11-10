from datetime import datetime
from pydantic import AliasChoices, Field
from project_manager.schemas.roles import RoleBase


class RoleResponse(RoleBase):
    id: str = Field(..., validation_alias=AliasChoices("_id", "id"))
    created_at : datetime

    model_config = {
        "from_attributes": True,
    }

RoleResponse.model_rebuild()
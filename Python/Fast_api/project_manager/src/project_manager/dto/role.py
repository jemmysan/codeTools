from datetime import datetime
from pydantic import Field
from project_manager.schemas.roles import RoleBase


class RoleResponse(RoleBase):
    id: str = Field(..., alias="_id")
    created_at : datetime

    model_config = {
        # "populate_by_name": True,
        "from_attributes": True,
    }

RoleResponse.model_rebuild()
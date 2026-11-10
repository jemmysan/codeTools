from typing import List, Optional
from pydantic import BaseModel, Field


class RoleBase(BaseModel):
    name : str = Field(..., min_length=2, max_length=50, description="Nom unique du rôle (ex: ADMIN)")
    description : Optional[str] = Field(None, max_length=255)
    permissions: List[str] = Field(default=[], description="Liste des permissions accordées")

class RoleCreate(RoleBase):
    pass


class RoleUpdate(BaseModel):
    name : Optional[str] = Field(None, min_length=2, max_length=50)
    description: Optional[str] = Field(None, max_length=255)
    permissions: Optional[List[str]] = None


RoleBase.model_rebuild()
RoleCreate.model_rebuild()
RoleUpdate.model_rebuild()


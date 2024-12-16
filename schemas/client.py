from typing import Optional

from pydantic import BaseModel


class CreateClient(BaseModel):
    client_sur: str
    client_name: str
    client_mid_name: Optional[str]
    client_phone: str


class GetClient(BaseModel):
    client_id: int


class ClientDB(BaseModel):
    client_id: int
    client_sur: str
    client_name: str
    client_mid_name: Optional[str]
    client_phone: str
    client_hidden: bool


class UpdateClient(BaseModel):
    client_id: int
    client_sur: str
    client_name: str
    client_mid_name: Optional[str]
    client_phone: str


class DeleteClient(BaseModel):
    client_id: int

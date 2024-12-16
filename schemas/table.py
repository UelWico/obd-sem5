from pydantic import BaseModel


class CreateTable(BaseModel):
    table_place: str
    table_persons: int


class TableDB(BaseModel):
    table_id: int
    table_place: str
    table_persons: int


class GetTable(BaseModel):
    table_id: int


class UpdateTable(BaseModel):
    table_id: int
    table_place: str
    table_persons: int


class DeleteTable(BaseModel):
    table_id: int


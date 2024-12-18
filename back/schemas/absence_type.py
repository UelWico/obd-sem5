from pydantic import BaseModel


class CreateAbsenceType(BaseModel):
    absence_type_name: str


class AbsenceTypeDB(BaseModel):
    absence_type_id: int
    absence_type_name: str


class GetAbsenceType(BaseModel):
    absence_type_id: int


class UpdateAbsenceType(BaseModel):
    absence_type_id: int
    absence_type_name: str


from typing import Optional

from pydantic import BaseModel

from schemas.job import JobDB


class CreateStaff(BaseModel):
    job_id: int
    staff_sur: str
    staff_name: str
    staff_mid_name: Optional[str]
    staff_phone: str
    staff_username: str
    staff_pass: Optional[str]


class GetStaff(BaseModel):
    staff_id: int


class StaffDB(BaseModel):
    staff_id: int
    staff_sur: str
    staff_name: str
    staff_mid_name: Optional[str]
    staff_phone: str
    staff_username: str
    staff_pass: Optional[str]
    staff_hidden: bool
    job: JobDB


class UpdateStaff(BaseModel):
    staff_id: int
    job_id: int
    staff_sur: str
    staff_name: str
    staff_mid_name: Optional[str]
    staff_phone: str
    staff_username: str
    staff_pass: Optional[str]


class DeleteStaff(BaseModel):
    staff_id: int

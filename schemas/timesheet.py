from datetime import datetime

from pydantic import BaseModel

from schemas.absence_type import AbsenceTypeDB
from schemas.staff import StaffDB


class CreateTimesheet(BaseModel):
    staff_id: int
    absence_type_id: int
    timesheet_date: datetime
    timesheet_presence: bool


class TimesheetDB(BaseModel):
    timesheet_id: int
    timesheet_date: datetime
    timesheet_presence: bool
    absence_type: AbsenceTypeDB
    staff: StaffDB


class GetTimesheet(BaseModel):
    timesheet_id: int


class UpdateTimesheet(BaseModel):
    timesheet_id: int
    staff_id: int
    absence_type_id: int
    timesheet_date: datetime
    timesheet_presence: bool


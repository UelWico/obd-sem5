from datetime import datetime

from pydantic import BaseModel

from schemas.client import ClientDB
from schemas.staff import StaffDB


class CreateReservation(BaseModel):
    table_id: int
    client_id: int
    staff_id: int
    reservation_date: datetime


class ReservationDB(BaseModel):
    reservation_id: int
    table_id: int
    staff_id: int
    reservation_date: datetime
    client: ClientDB
    staff: StaffDB


class GetReservation(BaseModel):
    reservation_id: int


class UpdateReservation(BaseModel):
    reservation_id: int
    table_id: int
    client_id: int
    staff_id: int
    reservation_date: datetime


class DeleteReservation(BaseModel):
    reservation_id: int


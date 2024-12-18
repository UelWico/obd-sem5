from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from schemas.staff import StaffDB


class CreateConcert(BaseModel):
    staff_id: int
    concert_date: datetime
    concert_name: str
    concert_band: str


class GetConcert(BaseModel):
    concert_id: int


class ConcertDB(BaseModel):
    concert_id: int
    concert_date: datetime
    concert_name: str
    concert_band: str
    staff: StaffDB


class UpdateConcert(BaseModel):
    concert_id: int
    staff_id: int
    concert_date: datetime
    concert_name: str
    concert_band: str


class DeleteConcert(BaseModel):
    concert_id: int

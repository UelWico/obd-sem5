from datetime import datetime

from pydantic import BaseModel

from schemas.staff import StaffDB


class CreatePayout(BaseModel):
    staff_id: int
    payout_amount: float
    payout_date: datetime


class PayoutDB(BaseModel):
    payout_id: int
    payout_amount: float
    payout_date: datetime
    staff: StaffDB


class GetPayout(BaseModel):
    payout_id: int


class UpdatePayout(BaseModel):
    payout_id: int
    staff_id: int
    payout_amount: float
    payout_date: datetime


class DeletePayout(BaseModel):
    payout_id: int


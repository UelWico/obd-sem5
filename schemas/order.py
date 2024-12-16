from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from schemas.staff import StaffDB


class CreateItem(BaseModel):
    dish_id: int
    item_amount: int


class ItemDB(BaseModel):
    item_id: int
    dish_id: int
    item_cost: float
    item_amount: int
    order_id: int


class GetItem(BaseModel):
    item_id: int


class CreateOrder(BaseModel):
    staff_id: int
    order_note: Optional[str]
    items: list[CreateItem]


class OrderDB(BaseModel):
    order_id: int
    order_note: Optional[str]
    items: list[ItemDB]
    staff: StaffDB


class GetOrder(BaseModel):
    order_id: int


class UpdateOrder(BaseModel):
    order_id: int
    staff_id: int
    order_note: Optional[str]
    items: list[CreateItem]


class DeleteOrder(BaseModel):
    order_id: int

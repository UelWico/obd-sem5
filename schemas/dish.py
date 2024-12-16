from typing import Optional

from pydantic import BaseModel


class CreateDish(BaseModel):
    dish_name: str
    dish_cost: float
    dish_compos: Optional[str]


class DishDB(BaseModel):
    dish_id: int
    dish_cost: float
    dish_compos: Optional[str]
    dish_hidden: bool


class GetDish(BaseModel):
    dish_id: int


class UpdateDish(BaseModel):
    dish_id: int
    dish_cost: float
    dish_compos: Optional[str]


class DeleteDish(BaseModel):
    dish_id: int


from pydantic import BaseModel


class CreateDeliveryType(BaseModel):
    delivery_type_name: str


class DeliveryTypeDB(BaseModel):
    delivery_type_id: int
    delivery_type_name: str


class GetDeliveryType(BaseModel):
    delivery_type_id: int


class UpdateDeliveryType(BaseModel):
    delivery_type_id: int
    delivery_type_name: str


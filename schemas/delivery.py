from datetime import datetime

from pydantic import BaseModel

from schemas.delivery_type import DeliveryTypeDB
from schemas.staff import StaffDB
from schemas.supplier import SupplierDB


class CreateDelivery(BaseModel):
    staff_id: int
    supplier_id: int
    delivery_type_id: int
    delivery_date: datetime


class DeliveryDB(BaseModel):
    delivery_id: int
    # staff_id: int
    # supplier_id: int
    # delivery_type_id: int
    delivery_date: datetime
    staff: StaffDB
    supplier: SupplierDB
    delivery_type: DeliveryTypeDB


class GetDelivery(BaseModel):
    delivery_id: int


class UpdateDelivery(BaseModel):
    delivery_id: int
    staff_id: int
    supplier_id: int
    delivery_type_id: int
    delivery_date: datetime


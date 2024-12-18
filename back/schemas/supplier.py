from typing import Optional

from pydantic import BaseModel


class CreateSupplier(BaseModel):
    supplier_name: str
    supplier_phone: str


class GetSupplier(BaseModel):
    supplier_id: int


class SupplierDB(BaseModel):
    supplier_id: int
    supplier_name: str
    supplier_phone: str
    supplier_hidden: bool


class UpdateSupplier(BaseModel):
    supplier_id: int
    supplier_name: str
    supplier_phone: str


class DeleteSupplier(BaseModel):
    supplier_id: int

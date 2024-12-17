from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.supplier import *
from services.supplier import Supplier

router = APIRouter(tags=["Supplier"], prefix="/supplier")


@router.post("/create_supplier", response_model=SupplierDB, status_code=status.HTTP_201_CREATED)
async def create_supplier(request: Request, data: CreateSupplier):
    return await Supplier.create_supplier(request, data)


@router.put("/update_supplier", response_model=SupplierDB, status_code=status.HTTP_200_OK)
async def update_supplier(request: Request, data: UpdateSupplier):
    return await Supplier.update_supplier(request, data)


@router.post("/get_supplier", response_model=SupplierDB, status_code=status.HTTP_200_OK)
async def get_supplier(request: Request, data: GetSupplier):
    return await Supplier.get_supplier(request, data)


@router.post("/get_suppliers", response_model=list[SupplierDB], status_code=status.HTTP_200_OK)
async def get_suppliers(request: Request):
    return await Supplier.get_suppliers(request)


@router.post("/delete_supplier", response_model=SupplierDB, status_code=status.HTTP_200_OK)
async def delete_supplier(request: Request, data: DeleteSupplier):
    return await Supplier.delete_supplier(request, data)

from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.order import *
from services.order import Order

router = APIRouter(tags=["Order"], prefix="/order")


@router.post("/create_order", response_model=OrderDB, status_code=status.HTTP_201_CREATED)
async def create_order(request: Request, data: CreateOrder):
    return await Order.create_order(request, data)


@router.put("/update_order", response_model=OrderDB, status_code=status.HTTP_200_OK)
async def update_order(request: Request, data: UpdateOrder):
    return await Order.update_order(request, data)


@router.post("/get_order", response_model=OrderDB, status_code=status.HTTP_200_OK)
async def get_order(request: Request, data: GetOrder):
    return await Order.get_order(request, data)


@router.post("/get_orders", response_model=list[OrderDB], status_code=status.HTTP_200_OK)
async def get_orders(request: Request):
    return await Order.get_orders(request)


@router.post("/delete_order", status_code=status.HTTP_200_OK)
async def delete_order(request: Request, data: DeleteOrder):
    return await Order.delete_order(request, data)

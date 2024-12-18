from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.delivery import *
from services.delivery import Delivery

router = APIRouter(tags=["Delivery"], prefix="/delivery")


@router.post("/create_delivery", response_model=DeliveryDB, status_code=status.HTTP_201_CREATED)
async def create_delivery(request: Request, data: CreateDelivery):
    return await Delivery.create_delivery(request, data)


@router.put("/update_delivery", response_model=DeliveryDB, status_code=status.HTTP_200_OK)
async def update_delivery(request: Request, data: UpdateDelivery):
    return await Delivery.update_delivery(request, data)


@router.post("/get_delivery", response_model=DeliveryDB, status_code=status.HTTP_200_OK)
async def get_delivery(request: Request, data: GetDelivery):
    return await Delivery.get_delivery(request, data)


@router.post("/get_deliveries", response_model=list[DeliveryDB], status_code=status.HTTP_200_OK)
async def get_deliveries(request: Request):
    return await Delivery.get_deliveries(request)


@router.post("/delete_delivery", status_code=status.HTTP_200_OK)
async def delete_staff(request: Request, data: DeleteDelivery):
    return await Delivery.delete_delivery(request, data)

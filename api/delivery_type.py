from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.delivery_type import *
from services.delivery_type import DeliveryType


router = APIRouter(tags=["DeliveryType"], prefix="/delivery_type")

@router.post("/create_delivery_type", response_model=DeliveryTypeDB, status_code=status.HTTP_201_CREATED)
async def create_delivery_type(request: Request, data: CreateDeliveryType):
    return await DeliveryType.create_delivery_type(request, data)

@router.put("/update_delivery_type", response_model=DeliveryTypeDB, status_code=status.HTTP_200_OK)
async def update_delivery_type(request: Request, data: UpdateDeliveryType):
    return await DeliveryType.update_delivery_type(request, data)

@router.post("/get_delivery_type", response_model=DeliveryTypeDB, status_code=status.HTTP_200_OK)
async def get_delivery_type(request: Request, data: GetDeliveryType):
    return await DeliveryType.get_delivery_type(request, data)

@router.post("/get_delivery_types", response_model=list[DeliveryTypeDB], status_code=status.HTTP_200_OK)
async def get_delivery_types(request: Request):
    return await DeliveryType.get_delivery_types(request)
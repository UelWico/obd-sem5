from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.payout import *
from services.payout import Payout

router = APIRouter(tags=["Payout"], prefix="/payout")


@router.post("/create_payout", response_model=PayoutDB, status_code=status.HTTP_201_CREATED)
async def create_payout(request: Request, data: CreatePayout):
    return await Payout.create_payout(request, data)


@router.put("/update_payout", response_model=PayoutDB, status_code=status.HTTP_200_OK)
async def update_payout(request: Request, data: UpdatePayout):
    return await Payout.update_payout(request, data)


@router.post("/get_payout", response_model=PayoutDB, status_code=status.HTTP_200_OK)
async def get_payout(request: Request, data: GetPayout):
    return await Payout.get_payout(request, data)


@router.post("/get_payouts", response_model=list[PayoutDB], status_code=status.HTTP_200_OK)
async def get_payouts(request: Request):
    return await Payout.get_payouts(request)


@router.post("/delete_payout", status_code=status.HTTP_200_OK)
async def delete_staff(request: Request, data: DeletePayout):
    return await Payout.delete_payout(request, data)

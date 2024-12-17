from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.reservation import *
from services.reservation import Reservation

router = APIRouter(tags=["Reservation"], prefix="/reservation")


@router.post("/create_reservation", response_model=ReservationDB, status_code=status.HTTP_201_CREATED)
async def create_reservation(request: Request, data: CreateReservation):
    return await Reservation.create_reservation(request, data)


@router.put("/update_reservation", response_model=ReservationDB, status_code=status.HTTP_200_OK)
async def update_reservation(request: Request, data: UpdateReservation):
    return await Reservation.update_reservation(request, data)


@router.post("/get_reservation", response_model=ReservationDB, status_code=status.HTTP_200_OK)
async def get_reservation(request: Request, data: GetReservation):
    return await Reservation.get_reservation(request, data)


@router.post("/get_reservations", response_model=list[ReservationDB], status_code=status.HTTP_200_OK)
async def get_reservations(request: Request):
    return await Reservation.get_reservations(request)


@router.post("/delete_reservation", status_code=status.HTTP_200_OK)
async def delete_staff(request: Request, data: DeleteReservation):
    return await Reservation.delete_reservation(request, data)

import functions
from schemas.reservation import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, ReservationModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_reservation_by_id(reservation_id):
    async with new_session() as session:
        query = select(ReservationModel).filter_by(reservation_id=reservation_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого концерта не существует",
            )
        await session.flush()
        return field


class Reservation:
    @classmethod
    async def create_reservation(cls, request: Request, data: CreateReservation):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = ReservationModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_reservation_by_id(field.reservation_id)

    @classmethod
    async def update_reservation(cls, request: Request, data: UpdateReservation):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(ReservationModel).filter_by(reservation_id=data.reservation_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            for key, value in data.model_dump().items():
                setattr(field, key, value)
            await session.flush()
            await session.commit()

        return await get_reservation_by_id(data.reservation_id)

    @classmethod
    async def get_reservation(cls, request: Request, data: GetReservation):
        return await get_reservation_by_id(data.reservation_id)

    @classmethod
    async def get_reservations(cls, request: Request):
        async with new_session() as session:
            query = select(ReservationModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_reservation(cls, request: Request, data: DeleteReservation):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = delete(ReservationModel).filter_by(reservation_id=data.reservation_id)
            await session.execute(query)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

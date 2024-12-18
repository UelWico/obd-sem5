import functions
from schemas.delivery import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, DeliveryModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_delivery_by_id(delivery_id):
    async with new_session() as session:
        query = select(DeliveryModel).filter_by(delivery_id=delivery_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такой поставки не существует",
            )
        await session.flush()
        return field


class Delivery:
    @classmethod
    async def create_delivery(cls, request: Request, data: CreateDelivery):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = DeliveryModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_delivery_by_id(field.delivery_id)

    @classmethod
    async def update_delivery(cls, request: Request, data: UpdateDelivery):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(DeliveryModel).filter_by(delivery_id=data.delivery_id)
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

        return await get_delivery_by_id(data.delivery_id)

    @classmethod
    async def get_delivery(cls, request: Request, data: GetDelivery):
        return await get_delivery_by_id(data.delivery_id)

    @classmethod
    async def get_deliveries(cls, request: Request):
        async with new_session() as session:
            query = select(DeliveryModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_delivery(cls, request: Request, data: DeleteDelivery):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = delete(DeliveryModel).filter_by(delivery_id=data.delivery_id)
            await session.execute(query)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

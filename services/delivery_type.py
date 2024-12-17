import functions
from schemas.delivery_type import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, DeliveryTypeModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import jwt


class DeliveryType:
    @classmethod
    async def create_delivery_type(cls, request: Request, data: CreateDeliveryType):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            data_dict = data.model_dump()
            field = DeliveryTypeModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()
            return field

    @classmethod
    async def update_delivery_type(cls, request: Request, data: UpdateDeliveryType):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(DeliveryTypeModel).filter_by(delivery_type_id=data.delivery_type_id)
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
            return field

    @classmethod
    async def get_delivery_type(cls, request: Request, data:GetDeliveryType):
        async with new_session() as session:
            query = select(DeliveryTypeModel).filter_by(delivery_type_id=data.delivery_type_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            await session.flush()
            await session.commit()
            return field

    @classmethod
    async def get_delivery_types(cls, request: Request):
        async with new_session() as session:
            query = select(DeliveryTypeModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields
from schemas.payout import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, PayoutModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_payout_by_id(payout_id):
    async with new_session() as session:
        query = select(PayoutModel).filter_by(payout_id=payout_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого концерта не существует",
            )
        await session.flush()
        return field


class Payout:
    @classmethod
    async def create_payout(cls, request: Request, data: CreatePayout):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = PayoutModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_payout_by_id(field.payout_id)

    @classmethod
    async def update_payout(cls, request: Request, data: UpdatePayout):
        async with new_session() as session:
            query = select(PayoutModel).filter_by(payout_id=data.payout_id)
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

        return await get_payout_by_id(data.payout_id)

    @classmethod
    async def get_payout(cls, request: Request, data: GetPayout):
        return await get_payout_by_id(data.payout_id)

    @classmethod
    async def get_payouts(cls, request: Request):
        async with new_session() as session:
            query = select(PayoutModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_payout(cls, request: Request, data: DeletePayout):
        async with new_session() as session:
            query = delete(PayoutModel).filter_by(payout_id=data.payout_id)
            await session.execute(query)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

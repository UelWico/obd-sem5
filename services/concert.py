from schemas.concert import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, ConcertModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_concert_by_id(concert_id):
    async with new_session() as session:
        query = select(ConcertModel).filter_by(concert_id=concert_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого концерта не существует",
            )
        await session.flush()
        return field


class Concert:
    @classmethod
    async def create_concert(cls, request: Request, data: CreateConcert):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = ConcertModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_concert_by_id(field.concert_id)

    @classmethod
    async def update_concert(cls, request: Request, data: UpdateConcert):
        async with new_session() as session:
            query = select(ConcertModel).filter_by(concert_id=data.concert_id)
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

        return await get_concert_by_id(data.concert_id)

    @classmethod
    async def get_concert(cls, request: Request, data: GetConcert):
        return await get_concert_by_id(data.concert_id)

    @classmethod
    async def get_concerts(cls, request: Request):
        async with new_session() as session:
            query = select(ConcertModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_concert(cls, request: Request, data: DeleteConcert):
        async with new_session() as session:
            query = delete(ConcertModel).filter_by(concert_id=data.concert_id)
            await session.execute(query)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

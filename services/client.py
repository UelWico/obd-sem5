from schemas.client import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, ClientModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_client_by_id(client_id):
    async with new_session() as session:
        query = select(ClientModel).filter_by(client_id=client_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого клиента не существует",
            )
        await session.flush()
        return field


class Client:
    @classmethod
    async def create_client(cls, request: Request, data: CreateClient):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = ClientModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_client_by_id(field.client_id)

    @classmethod
    async def update_client(cls, request: Request, data: UpdateClient):
        async with new_session() as session:
            query = select(ClientModel).filter_by(client_id=data.client_id)
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

        return await get_client_by_id(data.client_id)

    @classmethod
    async def get_client(cls, request: Request, data: GetClient):
        return await get_client_by_id(data.client_id)

    @classmethod
    async def get_clients(cls, request: Request):
        async with new_session() as session:
            query = select(ClientModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_client(cls, request: Request, data: DeleteClient):
        async with new_session() as session:
            query = select(ClientModel).filter_by(client_id=data.client_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            field.client_hidden = not field.client_hidden

            await session.flush()
            await session.commit()
            return field

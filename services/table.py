import functions
from schemas.table import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, TableModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import jwt


class Table:
    @classmethod
    async def create_table(cls, request: Request, data: CreateTable):
        staff = await functions.get_staff(request)
        table_name = staff.table.table_name

        if table_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            data_dict = data.model_dump()
            field = TableModel(**data_dict)
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
    async def update_table(cls, request: Request, data: UpdateTable):
        staff = await functions.get_staff(request)
        table_name = staff.table.table_name

        if table_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(TableModel).filter_by(table_id=data.table_id)
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
    async def get_table(cls, request: Request, data:GetTable):
        async with new_session() as session:
            query = select(TableModel).filter_by(table_id=data.table_id)
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
    async def get_tables(cls, request: Request):
        async with new_session() as session:
            query = select(TableModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields
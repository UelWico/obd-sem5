from schemas.absence_type import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, AbsenceTypeModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import jwt


class AbsenceType:
    @classmethod
    async def create_absence_type(cls, request: Request, data: CreateAbsenceType):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = AbsenceTypeModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()
            return AbsenceTypeDB(**field.__dict__)

    @classmethod
    async def update_absence_type(cls, request: Request, data: UpdateAbsenceType):
        async with new_session() as session:
            query = select(AbsenceTypeModel).filter_by(id=data.absence_type_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            for key, value in data.items():
                setattr(field, key, value)
            await session.flush()
            await session.commit()
            return AbsenceTypeDB(**field.__dict__)

    @classmethod
    async def get_absence_type(cls, request: Request, data:GetAbsenceType):
        async with new_session() as session:
            query = select(AbsenceTypeModel).filter_by(absence_type_id=data.absence_type_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            await session.flush()
            await session.commit()
            return AbsenceTypeDB(**field.__dict__)

    @classmethod
    async def get_absence_types(cls, request: Request):
        async with new_session() as session:
            query = select(AbsenceTypeModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields
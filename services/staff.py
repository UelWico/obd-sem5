from schemas.staff import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, StaffModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt

class Staff:
    @classmethod
    async def create_staff(cls, request: Request, data: CreateStaff):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = StaffModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()
            return StaffDB(**field.__dict__)

    @classmethod
    async def update_staff(cls, request: Request, data: UpdateStaff):
        async with new_session() as session:
            query = select(StaffModel).filter_by(id=data.staff_id)
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
            return StaffDB(**field.__dict__)

    @classmethod
    async def get_staff(cls, request: Request, data: GetStaff):
        async with new_session() as session:
            query = select(StaffModel).filter_by(staff_id=data.staff_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            await session.flush()
            await session.commit()

            # print(field.job.__dict__)
            return StaffDB(**field.__dict__)

    @classmethod
    async def get_staffs(cls, request: Request):
        async with new_session() as session:
            query = select(StaffModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_staff(cls, request: Request, data: DeleteStaff):
        async with new_session() as session:
            query = select(StaffModel).filter_by(staff_id=data.staff_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            field.staff_hidden = not field.staff_hidden

            await session.flush()
            await session.commit()
            return StaffDB(**field.__dict__)
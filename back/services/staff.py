import functions
from schemas.staff import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, StaffModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_staff_by_id(staff_id):
    async with new_session() as session:
        query = select(StaffModel).filter_by(staff_id=staff_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого сотрудника не существует",
            )
        await session.flush()
        return field


class Staff:
    @classmethod
    async def create_staff(cls, request: Request, data: CreateStaff):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
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

        return await get_staff_by_id(field.staff_id)

    @classmethod
    async def update_staff(cls, request: Request, data: UpdateStaff):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(StaffModel).filter_by(staff_id=data.staff_id)
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

        return await get_staff_by_id(data.staff_id)

    @classmethod
    async def get_staff(cls, request: Request, data: GetStaff):
        return await get_staff_by_id(data.staff_id)

    @classmethod
    async def get_staffs(cls, request: Request):
        async with new_session() as session:
            query = select(StaffModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_staff(cls, request: Request, data: DeleteStaff):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
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
            return field

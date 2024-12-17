from schemas.timesheet import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, TimesheetModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_timesheet_by_id(timesheet_id):
    async with new_session() as session:
        query = select(TimesheetModel).filter_by(timesheet_id=timesheet_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого концерта не существует",
            )
        await session.flush()
        return field


class Timesheet:
    @classmethod
    async def create_timesheet(cls, request: Request, data: CreateTimesheet):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = TimesheetModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_timesheet_by_id(field.timesheet_id)

    @classmethod
    async def update_timesheet(cls, request: Request, data: UpdateTimesheet):
        async with new_session() as session:
            query = select(TimesheetModel).filter_by(timesheet_id=data.timesheet_id)
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

        return await get_timesheet_by_id(data.timesheet_id)

    @classmethod
    async def get_timesheet(cls, request: Request, data: GetTimesheet):
        return await get_timesheet_by_id(data.timesheet_id)

    @classmethod
    async def get_timesheets(cls, request: Request):
        async with new_session() as session:
            query = select(TimesheetModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_timesheet(cls, request: Request, data: DeleteTimesheet):
        async with new_session() as session:
            query = delete(TimesheetModel).filter_by(timesheet_id=data.timesheet_id)
            await session.execute(query)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

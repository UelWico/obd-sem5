from schemas.job import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, JobModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import jwt


class Job:
    @classmethod
    async def create_job(cls, request: Request, data: CreateJob):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = JobModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()
            return JobDB(**field.__dict__)

    @classmethod
    async def update_job(cls, request: Request, data: UpdateJob):
        async with new_session() as session:
            query = select(JobModel).filter_by(id=data.job_id)
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
            return JobDB(**field.__dict__)

    @classmethod
    async def get_job(cls, request: Request, data:GetJob):
        async with new_session() as session:
            query = select(JobModel).filter_by(job_id=data.job_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            await session.flush()
            await session.commit()
            return JobDB(**field.__dict__)

    @classmethod
    async def get_jobs(cls, request: Request):
        async with new_session() as session:
            query = select(JobModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields
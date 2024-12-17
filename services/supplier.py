import functions
from schemas.supplier import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, SupplierModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


async def get_supplier_by_id(supplier_id):
    async with new_session() as session:
        query = select(SupplierModel).filter_by(supplier_id=supplier_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Такого поставщика не существует",
            )
        await session.flush()
        return field


class Supplier:
    @classmethod
    async def create_supplier(cls, request: Request, data: CreateSupplier):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            data_dict = data.model_dump()
            field = SupplierModel(**data_dict)
            session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Не удалось добавить значение",
                )
            await session.commit()

        return await get_supplier_by_id(field.supplier_id)

    @classmethod
    async def update_supplier(cls, request: Request, data: UpdateSupplier):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(SupplierModel).filter_by(supplier_id=data.supplier_id)
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

        return await get_supplier_by_id(data.supplier_id)

    @classmethod
    async def get_supplier(cls, request: Request, data: GetSupplier):
        return await get_supplier_by_id(data.supplier_id)

    @classmethod
    async def get_suppliers(cls, request: Request):
        async with new_session() as session:
            query = select(SupplierModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_supplier(cls, request: Request, data: DeleteSupplier):
        staff = await functions.get_staff(request)
        job_name = staff.job.job_name

        if job_name != "Администратор":
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "У вас нет доступа к данной таблице"
            )
        async with new_session() as session:
            query = select(SupplierModel).filter_by(supplier_id=data.supplier_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            field.supplier_hidden = not field.supplier_hidden

            await session.flush()
            await session.commit()
            return field

from schemas.dish import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, DishModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import jwt


class Dish:
    @classmethod
    async def create_dish(cls, request: Request, data: CreateDish):
        async with new_session() as session:
            data_dict = data.model_dump()
            field = DishModel(**data_dict)
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
    async def update_dish(cls, request: Request, data: UpdateDish):
        async with new_session() as session:
            query = select(DishModel).filter_by(dish_id=data.dish_id)
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
    async def get_dish(cls, request: Request, data:GetDish):
        async with new_session() as session:
            query = select(DishModel).filter_by(dish_id=data.dish_id)
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
    async def get_dishes(cls, request: Request):
        async with new_session() as session:
            query = select(DishModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def delete_dish(cls, request: Request, data: DeleteDish):
        async with new_session() as session:
            query = select(DishModel).filter_by(dish_id=data.dish_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            field.dish_hidden = not field.dish_hidden

            await session.flush()
            await session.commit()
            return field
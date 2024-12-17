from schemas.order import *
from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, OrderModel, ItemModel, DishModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
import jwt


def get_dish_by_dish_id(dishes, dish_id):
    for i in range(len(dishes)):
        if dishes[i].dish_id == dish_id:
            return dishes[i]
    return None


async def get_order_by_order_id(order_id):
    async with new_session() as session:
        query = select(OrderModel).filter_by(order_id=order_id)
        result = await session.execute(query)
        field = result.scalars().first()
        if field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User with this user id does not exist",
            )
        await session.flush()
        return field


class Order:
    @classmethod
    async def create_order(cls, request: Request, data: CreateOrder):
        async with new_session() as session:
            order_field = OrderModel(
                staff_id=1,
                order_note=data.order_note
            )
            session.add(order_field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()
            # return GetOrder(**field.__dict__)

        async with new_session() as session:
            query = select(DishModel)
            result = await session.execute(query)
            dishes = result.scalars().all()

        async with new_session() as session:
            for i in range(len(data.items)):
                dish = get_dish_by_dish_id(dishes, data.items[i].dish_id)
                field = ItemModel(
                    order_id=order_field.order_id,
                    dish_id=data.items[i].dish_id,
                    item_cost=dish.dish_cost,
                    item_amount=data.items[i].item_amount
                )
                session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

        return await get_order_by_order_id(order_field.order_id)

    @classmethod
    async def get_order(cls, request: Request, data: GetOrder):
        return await get_order_by_order_id(data.order_id)

    @classmethod
    async def get_orders(cls, request: Request):
        async with new_session() as session:
            query = select(OrderModel)
            result = await session.execute(query)
            fields = result.scalars().all()
            return fields

    @classmethod
    async def update_order(cls, request: Request, data: UpdateOrder):
        async with new_session() as session:
            query = select(OrderModel).filter_by(order_id=data.order_id)
            result = await session.execute(query)
            field = result.scalars().first()
            if field is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this user id does not exist",
                )
            field.staff_id = data.staff_id
            field.order_note = data.order_note
            await session.flush()
            await session.commit()

        async with new_session() as session:
            query = delete(ItemModel).filter_by(order_id=data.order_id)
            await session.execute(query)
            await session.flush()
            await session.commit()

        async with new_session() as session:
            query = select(DishModel)
            result = await session.execute(query)
            dishes = result.scalars().all()

        async with new_session() as session:
            for i in range(len(data.items)):
                dish = get_dish_by_dish_id(dishes, data.items[i].dish_id)
                field = ItemModel(
                    order_id=data.order_id,
                    dish_id=data.items[i].dish_id,
                    item_cost=dish.dish_cost,
                    item_amount=data.items[i].item_amount
                )
                session.add(field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

        return await get_order_by_order_id(data.order_id)

    @classmethod
    async def delete_order(cls, request: Request, data: DeleteOrder):
        async with new_session() as session:
            query = delete(OrderModel).filter_by(order_id=data.order_id)
            await session.execute(query)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "Can't create: bad request",
                )
            await session.commit()

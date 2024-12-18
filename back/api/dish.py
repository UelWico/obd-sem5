from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.dish import *
from services.dish import Dish

router = APIRouter(tags=["Dish"], prefix="/dish")


@router.post("/create_dish", response_model=DishDB, status_code=status.HTTP_201_CREATED)
async def create_dish(request: Request, data: CreateDish):
    return await Dish.create_dish(request, data)


@router.put("/update_dish", response_model=DishDB, status_code=status.HTTP_200_OK)
async def update_dish(request: Request, data: UpdateDish):
    return await Dish.update_dish(request, data)


@router.post("/get_dish", response_model=DishDB, status_code=status.HTTP_200_OK)
async def get_dish(request: Request, data: GetDish):
    return await Dish.get_dish(request, data)


@router.post("/get_dishes", response_model=list[DishDB], status_code=status.HTTP_200_OK)
async def get_dishes(request: Request):
    return await Dish.get_dishes(request)


@router.post("/delete_dish", response_model=DishDB, status_code=status.HTTP_200_OK)
async def delete_dish(request: Request, data: DeleteDish):
    return await Dish.delete_dish(request, data)

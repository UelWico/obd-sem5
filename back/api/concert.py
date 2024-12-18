from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.concert import *
from services.concert import Concert

router = APIRouter(tags=["Concert"], prefix="/concert")


@router.post("/create_concert", response_model=ConcertDB, status_code=status.HTTP_201_CREATED)
async def create_concert(request: Request, data: CreateConcert):
    return await Concert.create_concert(request, data)


@router.put("/update_concert", response_model=ConcertDB, status_code=status.HTTP_200_OK)
async def update_concert(request: Request, data: UpdateConcert):
    return await Concert.update_concert(request, data)


@router.post("/get_concert", response_model=ConcertDB, status_code=status.HTTP_200_OK)
async def get_concert(request: Request, data: GetConcert):
    return await Concert.get_concert(request, data)


@router.post("/get_concerts", response_model=list[ConcertDB], status_code=status.HTTP_200_OK)
async def get_concerts(request: Request):
    return await Concert.get_concerts(request)

@router.post("/delete_concert", status_code=status.HTTP_200_OK)
async def delete_staff(request: Request, data: DeleteConcert):
    return await Concert.delete_concert(request, data)

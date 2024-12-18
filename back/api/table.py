from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.table import *
from services.table import Table


router = APIRouter(tags=["Table"], prefix="/table")

@router.post("/create_table", response_model=TableDB, status_code=status.HTTP_201_CREATED)
async def create_table(request: Request, data: CreateTable):
    return await Table.create_table(request, data)

@router.put("/update_table", response_model=TableDB, status_code=status.HTTP_200_OK)
async def update_table(request: Request, data: UpdateTable):
    return await Table.update_table(request, data)

@router.post("/get_table", response_model=TableDB, status_code=status.HTTP_200_OK)
async def get_table(request: Request, data: GetTable):
    return await Table.get_table(request, data)

@router.post("/get_tables", response_model=list[TableDB], status_code=status.HTTP_200_OK)
async def get_tables(request: Request):
    return await Table.get_tables(request)
from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.client import *
from services.client import Client

router = APIRouter(tags=["Client"], prefix="/client")


@router.post("/create_client", response_model=ClientDB, status_code=status.HTTP_201_CREATED)
async def create_client(request: Request, data: CreateClient):
    return await Client.create_client(request, data)


@router.put("/update_client", response_model=ClientDB, status_code=status.HTTP_200_OK)
async def update_client(request: Request, data: UpdateClient):
    return await Client.update_client(request, data)


@router.post("/get_client", response_model=ClientDB, status_code=status.HTTP_200_OK)
async def get_client(request: Request, data: GetClient):
    return await Client.get_client(request, data)


@router.post("/get_clients", response_model=list[ClientDB], status_code=status.HTTP_200_OK)
async def get_clients(request: Request):
    return await Client.get_clients(request)


@router.post("/delete_client", response_model=ClientDB, status_code=status.HTTP_200_OK)
async def delete_client(request: Request, data: DeleteClient):
    return await Client.delete_client(request, data)

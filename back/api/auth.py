from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.auth import *
from schemas.staff import StaffDB
from services.auth import Auth

router = APIRouter(tags=["Authentication"], prefix="/auth")


@router.put("/login", status_code=status.HTTP_200_OK)
async def login(data: Login):
    return await Auth.login(data)


@router.put("/logout", status_code=status.HTTP_200_OK)
async def logout(request: Request, response: Response):
    return await Auth.logout(request, response)


@router.get("/get_logged_user", response_model=StaffDB, status_code=status.HTTP_200_OK)
async def get_staff(request: Request):
    return await Auth.get_staff(request)

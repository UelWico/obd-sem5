from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.staff import *
from services.staff import Staff

router = APIRouter(tags=["Staff"], prefix="/staff")


@router.post("/create_staff", response_model=StaffDB, status_code=status.HTTP_201_CREATED)
async def create_staff(request: Request, data: CreateStaff):
    return await Staff.create_staff(request, data)


@router.put("/update_staff", response_model=StaffDB, status_code=status.HTTP_200_OK)
async def update_staff(request: Request, data: UpdateStaff):
    return await Staff.update_staff(request, data)


@router.post("/get_staff", response_model=StaffDB, status_code=status.HTTP_200_OK)
async def get_staff(request: Request, data: GetStaff):
    return await Staff.get_staff(request, data)


@router.post("/get_staffs", response_model=list[StaffDB], status_code=status.HTTP_200_OK)
async def get_staffs(request: Request):
    return await Staff.get_staffs(request)


@router.post("/delete_staff", response_model=StaffDB, status_code=status.HTTP_200_OK)
async def delete_staff(request: Request, data: DeleteStaff):
    return await Staff.delete_staff(request, data)

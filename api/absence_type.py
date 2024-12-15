from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.absence_type import *
from services.absence_type import AbsenceType


router = APIRouter(tags=["AbsenceType"], prefix="/absence_type")

@router.post("/create_absence_type", response_model=AbsenceTypeDB, status_code=status.HTTP_201_CREATED)
async def create_absence_type(request: Request, data: CreateAbsenceType):
    return await AbsenceType.create_absence_type(request, data)

@router.put("/update_absence_type", response_model=AbsenceTypeDB, status_code=status.HTTP_200_OK)
async def update_absence_type(request: Request, data: UpdateAbsenceType):
    return await AbsenceType.update_absence_type(request, data)

@router.post("/get_absence_type", response_model=AbsenceTypeDB, status_code=status.HTTP_200_OK)
async def get_absence_type(request: Request, data: GetAbsenceType):
    return await AbsenceType.get_absence_type(request, data)

@router.post("/get_absence_types", response_model=list[AbsenceTypeDB], status_code=status.HTTP_200_OK)
async def get_absence_types(request: Request):
    return await AbsenceType.get_absence_types(request)
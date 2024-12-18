from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.timesheet import *
from services.timesheet import Timesheet

router = APIRouter(tags=["Timesheet"], prefix="/timesheet")


@router.post("/create_timesheet", response_model=TimesheetDB, status_code=status.HTTP_201_CREATED)
async def create_timesheet(request: Request, data: CreateTimesheet):
    return await Timesheet.create_timesheet(request, data)


@router.put("/update_timesheet", response_model=TimesheetDB, status_code=status.HTTP_200_OK)
async def update_timesheet(request: Request, data: UpdateTimesheet):
    return await Timesheet.update_timesheet(request, data)


@router.post("/get_timesheet", response_model=TimesheetDB, status_code=status.HTTP_200_OK)
async def get_timesheet(request: Request, data: GetTimesheet):
    return await Timesheet.get_timesheet(request, data)


@router.post("/get_timesheets", response_model=list[TimesheetDB], status_code=status.HTTP_200_OK)
async def get_timesheets(request: Request):
    return await Timesheet.get_timesheets(request)


@router.post("/delete_timesheet", status_code=status.HTTP_200_OK)
async def delete_staff(request: Request, data: DeleteTimesheet):
    return await Timesheet.delete_timesheet(request, data)

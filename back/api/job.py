from fastapi import APIRouter, status, HTTPException, Response, Request
from schemas.job import *
from services.job import Job


router = APIRouter(tags=["Job"], prefix="/job")

@router.post("/create_job", response_model=JobDB, status_code=status.HTTP_201_CREATED)
async def create_job(request: Request, data: CreateJob):
    return await Job.create_job(request, data)

@router.put("/update_job", response_model=JobDB, status_code=status.HTTP_200_OK)
async def update_job(request: Request, data: UpdateJob):
    return await Job.update_job(request, data)

@router.post("/get_job", response_model=JobDB, status_code=status.HTTP_200_OK)
async def get_job(request: Request, data: GetJob):
    return await Job.get_job(request, data)

@router.post("/get_jobs", response_model=list[JobDB], status_code=status.HTTP_200_OK)
async def get_jobs(request: Request):
    return await Job.get_jobs(request)
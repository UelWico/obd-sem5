from fastapi import APIRouter

from api.job import router as job_router

router = APIRouter(prefix="/api")

router.include_router(job_router)
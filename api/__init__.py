from fastapi import APIRouter

from api.job import router as job_router
from api.staff import router as staff_router
from api.absence_type import router as absence_type_router
from api.delivery_type import router as delivery_type_router

router = APIRouter(prefix="/api")

router.include_router(job_router)
router.include_router(staff_router)
router.include_router(delivery_type_router)
router.include_router(absence_type_router)
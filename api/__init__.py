from fastapi import APIRouter

from api.job import router as job_router
from api.staff import router as staff_router
from api.absence_type import router as absence_type_router
from api.delivery_type import router as delivery_type_router
from api.order import router as order_router
from api.dish import router as dish_router
from api.auth import router as auth_router
from api.concert import router as concert_router
from api.client import router as client_router
from api.supplier import router as supplier_router
from api.delivery import router as delivery_router
from api.payout import router as payout_router
from api.reservation import router as reservation_router
from api.timesheet import router as timesheet_router

router = APIRouter(prefix="/api")

router.include_router(job_router)
router.include_router(staff_router)
router.include_router(delivery_type_router)
router.include_router(absence_type_router)
router.include_router(order_router)
router.include_router(dish_router)
router.include_router(auth_router)
router.include_router(concert_router)
router.include_router(client_router)
router.include_router(supplier_router)
router.include_router(delivery_router)
router.include_router(payout_router)
router.include_router(reservation_router)
router.include_router(timesheet_router)
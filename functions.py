from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse
from db import new_session, StaffModel, SessionModel
from schemas.auth import *
from schemas.staff import *
from sqlalchemy import select
import jwt

PRIVATE_KEY = "YZNliML3Gz"
ENCRYPTION_ALG = "HS256"


async def get_staff(request: Request):
    cookie_encrypted = request.cookies.get("token")
    if cookie_encrypted is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Login cookie was not found",
        )
    key = PRIVATE_KEY
    cookie: StaffCookie = jwt.decode(cookie_encrypted, key, algorithms=[ENCRYPTION_ALG])

    async with new_session() as session:
        query = select(SessionModel).filter_by(
            session_uuid=cookie['session_uuid']
        )
        result = await session.execute(query)
        session_field = result.scalars().first()
        if session_field is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="This user session does not exist",
            )

    return session_field.staff

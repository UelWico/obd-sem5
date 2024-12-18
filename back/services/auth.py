from uuid import uuid4

from fastapi import HTTPException, status, Response, Request
from fastapi.responses import JSONResponse

import functions
from db import new_session, StaffModel, SessionModel
from functions import PRIVATE_KEY, ENCRYPTION_ALG
from schemas.auth import *
from schemas.staff import StaffDB
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select
import jwt


class Auth:
    @classmethod
    async def login(cls, data: Login):
        async with new_session() as session:
            query = select(StaffModel).filter_by(
                staff_username=data.staff_username, staff_pass=data.staff_pass
            )
            result = await session.execute(query)
            staff = result.scalars().first()
            if staff is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="This user does not exist",
                )

        session_uuid = str(uuid4())

        async with new_session() as session:
            session_field = SessionModel(
                session_uuid=session_uuid,
                staff_id=staff.staff_id
            )
            session.add(session_field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    "This session already exists",
                )
            await session.commit()

        key = PRIVATE_KEY
        response = JSONResponse({}, 200)
        response.set_cookie(
            key="token",
            value=jwt.encode(
                payload=StaffCookie(session_uuid=session_uuid).model_dump(),
                key=key,
                algorithm=ENCRYPTION_ALG,
            ),
        )
        return response

    @classmethod
    async def logout(cls, request: Request, response: Response):
        token = request.cookies.get("token")
        if token is None:
            return JSONResponse({}, 200)
        response = JSONResponse({}, 200)
        response.delete_cookie("token")
        return response

    @classmethod
    async def get_staff(cls, request: Request):
        return await functions.get_staff(request)

from typing import Optional

from pydantic import BaseModel


class StaffCookie(BaseModel):
    session_uuid: str


class Login(BaseModel):
    staff_username: str
    staff_pass: Optional[str]

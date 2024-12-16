from pydantic import BaseModel


class CreateJob(BaseModel):
    job_name: str


class JobDB(BaseModel):
    job_id: int
    job_name: str


class GetJob(BaseModel):
    job_id: int


class UpdateJob(BaseModel):
    job_id: int
    job_name: str

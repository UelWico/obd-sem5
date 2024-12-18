import typer
from sqlalchemy.exc import IntegrityError
import asyncio

from db import new_session, StaffModel, JobModel

app = typer.Typer()


async def _create_admin():
    async with new_session() as session:
        job_field = JobModel(
            job_name="Администратор"
        )
        session.add(job_field)
        try:
            await session.flush()
        except IntegrityError:
            print("error")
            exit(1)
        await session.commit()

    async with new_session() as session:
        field = StaffModel(
            job_id=job_field.job_id,
            staff_sur="Иванов",
            staff_name="Иван",
            staff_mid_name="",
            staff_phone="45678",
            staff_username="ivanov_ivan_admin",
            staff_pass="ivan123",
        )
        session.add(field)
        try:
            await session.flush()
        except IntegrityError:
            print("Can't create: bad request")
            exit(0)
        await session.commit()

    print(f'Created admin')


@app.command()
def create_admin():
    asyncio.run(_create_admin())


if __name__ == "__main__":
    app()

import datetime

from sqlalchemy import ForeignKey, DateTime, func, false
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Optional
from datetime import date

engine = create_async_engine("sqlite+aiosqlite:///./rest.db")
new_session = async_sessionmaker(engine, expire_on_commit=False)


class Model(DeclarativeBase):
    pass


class StaffModel(Model):
    __tablename__ = "staff"

    staff_id: Mapped[int] = mapped_column(primary_key=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("job.job_id", ondelete="RESTRICT"))
    staff_sur: Mapped[str]
    staff_name: Mapped[str]
    staff_mid_name: Mapped[Optional[str]]
    staff_phone: Mapped[str]
    staff_username: Mapped[str] = mapped_column(unique=True)
    staff_pass: Mapped[Optional[str]]
    staff_hidden: Mapped[bool] = mapped_column(default=False)

    timesheets = relationship("TimesheetModel", back_populates="staff", uselist=True, lazy='subquery')
    reservations = relationship("ReservationModel", back_populates="staff", uselist=True, lazy='subquery')
    orders = relationship("OrderModel", back_populates="staff", uselist=True, lazy='subquery')
    deliveries = relationship("DeliveryModel", back_populates="staff", uselist=True, lazy='subquery')
    concerts = relationship("ConcertModel", back_populates="staff", uselist=True, lazy='subquery')
    payouts = relationship("PayoutModel", back_populates="staff", uselist=True, lazy='subquery')

    job = relationship("JobModel", back_populates="staffs", lazy='subquery')


class DeliveryModel(Model):
    __tablename__ = "delivery"

    delivery_id: Mapped[int] = mapped_column(primary_key=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.staff_id", ondelete="RESTRICT"))
    supplier_id: Mapped[int] = mapped_column(ForeignKey("supplier.supplier_id", ondelete="RESTRICT"))
    delivery_type_id: Mapped[int] = mapped_column(ForeignKey("delivery_type.delivery_type_id", ondelete="RESTRICT"))
    delivery_date: Mapped[datetime.datetime]

    staff = relationship("StaffModel", back_populates="deliveries", lazy='subquery')
    supplier = relationship("SupplierModel", back_populates="deliveries", lazy='subquery')
    delivery_type = relationship("DeliveryTypeModel", back_populates="deliveries", lazy='subquery')


class SupplierModel(Model):
    __tablename__ = "supplier"

    supplier_id: Mapped[int] = mapped_column(primary_key=True)
    supplier_name: Mapped[str]
    supplier_phone: Mapped[str]
    supplier_hidden: Mapped[bool] = mapped_column(default=False)

    deliveries = relationship("DeliveryModel", back_populates="supplier", uselist=True, lazy='subquery')


class OrderModel(Model):
    __tablename__ = "order"

    order_id: Mapped[int] = mapped_column(primary_key=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.staff_id", ondelete="RESTRICT"))
    order_note: Mapped[Optional[str]]

    items = relationship("ItemModel", back_populates="order", uselist=True, lazy='subquery')

    staff = relationship("StaffModel", back_populates="orders", lazy='subquery')


class ItemModel(Model):
    __tablename__ = "item"

    item_id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("order.order_id", ondelete="CASCADE"))
    dish_id: Mapped[int] = mapped_column(ForeignKey("dish.dish_id", ondelete="RESTRICT"))
    item_cost: Mapped[float]
    item_amount: Mapped[int]

    order = relationship("OrderModel", back_populates="items", lazy='subquery')
    dish = relationship("DishModel", back_populates="items", lazy='subquery')


class DishModel(Model):
    __tablename__ = "dish"

    dish_id: Mapped[int] = mapped_column(primary_key=True)
    dish_name: Mapped[str]
    dish_cost: Mapped[float]
    dish_compos: Mapped[Optional[str]]
    dish_hidden: Mapped[bool] = mapped_column(default=False)

    items = relationship("ItemModel", back_populates="dish", uselist=True, lazy='subquery')


class JobModel(Model):
    __tablename__ = "job"

    job_id: Mapped[int] = mapped_column(primary_key=True)
    job_name: Mapped[str] = mapped_column(unique=True)

    staffs = relationship("StaffModel", back_populates="job", uselist=True, lazy='subquery')


class TableModel(Model):
    __tablename__ = "table"

    table_id: Mapped[int] = mapped_column(primary_key=True)
    table_place: Mapped[str]
    table_persons: Mapped[int]

    reservations = relationship("ReservationModel", back_populates="table", uselist=True, lazy='subquery')


class ConcertModel(Model):
    __tablename__ = "concert"

    concert_id: Mapped[int] = mapped_column(primary_key=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.staff_id", ondelete="RESTRICT"))
    concert_date: Mapped[datetime.datetime]
    concert_name: Mapped[str]
    concert_band: Mapped[str]

    staff = relationship("StaffModel", back_populates="concerts", lazy='subquery')


class PayoutModel(Model):
    __tablename__ = "payout"

    payout_id: Mapped[int] = mapped_column(primary_key=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.staff_id", ondelete="RESTRICT"))
    payout_amount: Mapped[float]
    payout_date: Mapped[datetime.datetime]

    staff = relationship("StaffModel", back_populates="payouts", lazy='subquery')


class ClientModel(Model):
    __tablename__ = "client"

    client_id: Mapped[int] = mapped_column(primary_key=True)
    client_sur: Mapped[str]
    client_name: Mapped[str]
    client_mid_name: Mapped[Optional[str]]
    client_phone: Mapped[str]
    client_hidden: Mapped[bool] = mapped_column(default=False)

    reservations = relationship("ReservationModel", back_populates="client", uselist=True, lazy='subquery')


class ReservationModel(Model):
    __tablename__ = "reservation"

    reservation_id: Mapped[int] = mapped_column(primary_key=True)
    table_id: Mapped[int] = mapped_column(ForeignKey("table.table_id", ondelete="SET NULL"))
    client_id: Mapped[int] = mapped_column(ForeignKey("client.client_id", ondelete="RESTRICT"))
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.staff_id", ondelete="RESTRICT"))
    reservation_date: Mapped[datetime.datetime]

    client = relationship("ClientModel", back_populates="reservations", lazy='subquery')
    staff = relationship("StaffModel", back_populates="reservations", lazy='subquery')
    table = relationship("TableModel", back_populates="reservations", lazy='subquery')


class TimesheetModel(Model):
    __tablename__ = "timesheet"

    timesheet_id: Mapped[int] = mapped_column(primary_key=True)
    staff_id: Mapped[int] = mapped_column(ForeignKey("staff.staff_id", ondelete="RESTRICT"))
    absence_type_id: Mapped[int] = mapped_column(ForeignKey("absence_type.absence_type_id", ondelete="RESTRICT"))
    timesheet_date: Mapped[datetime.datetime]
    timesheet_presence: Mapped[bool]

    staff = relationship("StaffModel", back_populates="timesheets", lazy='subquery')
    absence_type = relationship("AbsenceTypeModel", back_populates="timesheets", lazy='subquery')


class AbsenceTypeModel(Model):
    __tablename__ = "absence_type"

    absence_type_id: Mapped[int] = mapped_column(primary_key=True)
    absence_type_name: Mapped[str] = mapped_column(unique=True)

    timesheets = relationship("TimesheetModel", back_populates="absence_type", uselist=True, lazy='subquery')


class DeliveryTypeModel(Model):
    __tablename__ = "delivery_type"

    delivery_type_id: Mapped[int] = mapped_column(primary_key=True)
    delivery_type_name: Mapped[str] = mapped_column(unique=True)

    deliveries = relationship("DeliveryModel", back_populates="delivery_type", uselist=True, lazy='subquery')


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Model.metadata.create_all)

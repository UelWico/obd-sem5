// function formatDate(date) {
//   // Ensure the input is a Date object
//   if (!(date instanceof Date)) {
//     throw new Error("Input must be a Date object");
//   }

//   // Get the components of the date
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
//   const day = String(date.getUTCDate()).padStart(2, "0");
//   const hours = String(date.getUTCHours()).padStart(2, "0");
//   const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//   const seconds = String(date.getUTCSeconds()).padStart(2, "0");
//   const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

//   // Calculate timezone offset in hours and minutes
//   const timezoneOffset = -date.getTimezoneOffset();
//   const tzHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(
//     2,
//     "0"
//   );
//   const tzMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");
//   const tzSign = timezoneOffset >= 0 ? "+" : "-";

//   // Construct the final formatted string
//   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${tzSign}${tzHours}:${tzMinutes}`;
// }

/*
  Dish
*/
export const NewDishDB = function (obj) {
  return {
    dish_id: Number(obj.dish_id),
    dish_name: String(obj.dish_name),
    dish_cost: Number(obj.dish_cost),
    dish_compos: String(obj.dish_compos),
    dish_hidden: Boolean(obj.dish_hidden),
  };
};

/*
  Job
*/
export const NewJobDB = function (obj) {
  return {
    job_id: Number(obj.job_id),
    job_name: String(obj.job_name),
  };
};

export const NewCreateJob = function (obj) {
  return {
    job_name: String(obj.job_name),
  };
};

export const NewUpdateJob = function (obj) {
  return {
    job_id: Number(obj.job_id),
    job_name: String(obj.job_name),
  };
};

export const NewGetJob = function (obj) {
  return {
    job_id: Number(obj.job_id),
  };
};

/*
 Absence type 
*/
export const NewAbsenceTypeDB = function (obj) {
  return {
    absence_type_id: Number(obj.absence_type_id),
    absence_type_name: String(obj.absence_type_name),
  };
};

export const NewCreateAbsenceType = function (obj) {
  return {
    absence_type_name: String(obj.absence_type_name),
  };
};

export const NewUpdateAbsenceType = function (obj) {
  return {
    absence_type_id: Number(obj.absence_type_id),
    absence_type_name: String(obj.absence_type_name),
  };
};

export const NewGetAbsenceType = function (obj) {
  return {
    absence_type_id: Number(obj.absence_type_id),
  };
};

/*
 Delivery type 
*/
export const NewDeliveryTypeDB = function (obj) {
  return {
    delivery_type_id: Number(obj.delivery_type_id),
    delivery_type_name: String(obj.delivery_type_name),
  };
};

export const NewCreateDeliveryType = function (obj) {
  return {
    delivery_type_name: String(obj.delivery_type_name),
  };
};

export const NewUpdateDeliveryType = function (obj) {
  return {
    delivery_type_id: Number(obj.delivery_type_id),
    delivery_type_name: String(obj.delivery_type_name),
  };
};

export const NewGetDeliveryType = function (obj) {
  return {
    delivery_type_id: Number(obj.delivery_type_id),
  };
};

/*
 Table
*/
export const NewTableDB = function (obj) {
  return {
    table_id: Number(obj.table_id),
    table_place: String(obj.table_place),
    table_persons: Number(obj.table_persons),
  };
};

export const NewCreateTable = function (obj) {
  return {
    table_place: String(obj.table_place),
    table_persons: Number(obj.table_persons),
  };
};

export const NewUpdateTable = function (obj) {
  return {
    table_id: Number(obj.table_id),
    table_place: String(obj.table_place),
    table_persons: Number(obj.table_persons),
  };
};

export const NewGetTable = function (obj) {
  return {
    table_id: Number(obj.table_id),
  };
};

/*
  Staff
*/
export const NewStaffDB = function (obj) {
  return {
    staff_id: Number(obj.staff_id),
    staff_sur: String(obj.staff_sur),
    staff_name: String(obj.staff_name),
    staff_mid_name: String(obj.staff_mid_name ? obj.staff_mid_name : ""),
    staff_phone: String(obj.staff_phone),
    staff_username: String(obj.staff_username),
    staff_pass: String(obj.staff_pass ? obj.staff_pass : ""),
    staff_hidden: Boolean(obj.staff_hidden),
    job_id: Number(
      obj.job_id ? obj.job_id : obj.job.job_id ? obj.job.job_id : NaN
    ),
    job: NewJobDB(obj.job),
  };
};

export const NewCreateStaff = function (obj) {
  return {
    staff_sur: String(obj.staff_sur),
    staff_name: String(obj.staff_name),
    staff_mid_name: String(obj.staff_mid_name ? obj.staff_mid_name : ""),
    staff_phone: String(obj.staff_phone),
    staff_username: String(obj.staff_username),
    staff_pass: String(obj.staff_pass ? obj.staff_pass : ""),
    job_id: Number(
      obj.job_id ? obj.job_id : obj.job.job_id ? obj.job.job_id : NaN
    ),
  };
};

export const NewUpdateStaff = function (obj) {
  return {
    staff_id: Number(obj.staff_id),
    staff_sur: String(obj.staff_sur),
    staff_name: String(obj.staff_name),
    staff_mid_name: String(obj.staff_mid_name ? obj.staff_mid_name : ""),
    staff_phone: String(obj.staff_phone),
    staff_username: String(obj.staff_username),
    staff_pass: String(obj.staff_pass ? obj.staff_pass : ""),
    job_id: Number(
      obj.job_id ? obj.job_id : obj.job.job_id ? obj.job.job_id : NaN
    ),
  };
};

export const NewGetStaff = function (obj) {
  return {
    staff_id: Number(obj.staff_id),
  };
};

export const NewDeleteStaff = function (obj) {
  return {
    staff_id: Number(obj.staff_id),
  };
};

/*
  Supplier
*/
export const NewSupplierDB = function (obj) {
  return {
    supplier_id: Number(obj.supplier_id),
    supplier_name: String(obj.supplier_name),
    supplier_phone: String(obj.supplier_phone),
    supplier_hidden: Boolean(obj.supplier_hidden),
  };
};

export const NewCreateSupplier = function (obj) {
  return {
    supplier_name: String(obj.supplier_name),
    supplier_phone: String(obj.supplier_phone),
  };
};

export const NewUpdateSupplier = function (obj) {
  return {
    supplier_id: Number(obj.supplier_id),
    supplier_name: String(obj.supplier_name),
    supplier_phone: String(obj.supplier_phone),
  };
};

export const NewGetSupplier = function (obj) {
  return {
    supplier_id: Number(obj.supplier_id),
  };
};

export const NewDeleteSupplier = function (obj) {
  return {
    supplier_id: Number(obj.supplier_id),
  };
};

/*
  Client
*/
export const NewClientDB = function (obj) {
  return {
    client_id: Number(obj.client_id),
    client_sur: String(obj.client_sur),
    client_name: String(obj.client_name),
    client_mid_name: String(obj.client_mid_name),
    client_phone: String(obj.client_phone),
    client_hidden: Boolean(obj.client_hidden),
  };
};

export const NewCreateClient = function (obj) {
  return {
    client_sur: String(obj.client_sur),
    client_name: String(obj.client_name),
    client_mid_name: String(obj.client_mid_name),
    client_phone: String(obj.client_phone),
  };
};

export const NewUpdateClient = function (obj) {
  return {
    client_id: Number(obj.client_id),
    client_sur: String(obj.client_sur),
    client_name: String(obj.client_name),
    client_mid_name: String(obj.client_mid_name),
    client_phone: String(obj.client_phone),
  };
};

export const NewGetClient = function (obj) {
  return {
    client_id: Number(obj.client_id),
  };
};

export const NewDeleteClient = function (obj) {
  return {
    client_id: Number(obj.client_id),
  };
};

/*
  Order
*/

export const NewItemDB = function (obj) {
  return {
    item_id: Number(obj.item_id),
    order_id: Number(obj.order_id),
    dish_id: Number(obj.dish_id),
    item_cost: Number(obj.item_cost),
    item_amount: Number(obj.item_amount),
    dish: obj.dish ? NewDishDB(obj.dish) : {},
  };
};

export const NewOrderDB = function (obj) {
  let items = [];
  for (let i = 0; i < obj.items.length; i++) {
    items.push(NewItemDB(obj.items[i]));
  }
  return {
    order_id: Number(obj.order_id),
    order_note: String(obj.order_note),
    items: items,
    staff: NewStaffDB(obj.staff),
  };
};

export const NewCreateOrder = function (obj) {
  let items = [];
  for (let i = 0; i < obj.items.length; i++) {
    items.push(NewCreateItem(obj.items[i]));
  }
  return {
    staff_id: Number(obj.staff_id),
    order_note: String(obj.order_note),
    items: items,
  };
};

export const NewUpdateOrder = function (obj) {
  let items = [];
  for (let i = 0; i < obj.items.length; i++) {
    items.push(NewCreateItem(obj.items[i]));
  }
  return {
    order_id: Number(obj.order_id),
    staff_id: Number(obj.staff_id),
    order_note: String(obj.order_note),
    items: items,
  };
};

export const NewDeleteOrder = function (obj) {
  return {
    order_id: Number(obj.order_id),
  };
};

export const NewGetOrder = function (obj) {
  return {
    order_id: Number(obj.order_id),
  };
};

export const NewCreateItem = function (obj) {
  return {
    dish_id: Number(obj.dish_id),
    item_amount: Number(obj.item_amount),
  };
};

export const NewOrderFromOrderDB = function (obj) {
  let sum = 0;
  // let order_items = "";
  let order_items = [];
  for (let i = 0; i < obj.items.length; i++) {
    sum += obj.items[i].item_cost * obj.items[i].item_amount;
    // order_items +=
    //   obj.items[i].dish.dish_name +
    //   ". . . . . . . " +
    //   obj.items[i].item_amount +
    //   " x " +
    //   obj.items[i].item_cost +
    //   "₽\n";
    order_items.push({
      item_id: obj.items[i].item_id,
      dish_name: obj.items[i].dish.dish_name,
      item_amount: obj.items[i].item_amount,
      item_cost: obj.items[i].item_cost,
    });
  }
  return {
    order_id: Number(obj.order_id),
    staff_name: String(obj.staff.staff_sur + " " + obj.staff.staff_name),
    order_cost: sum,
    order_note: String(obj.order_note),
    order_items: order_items,
  };
};

/*
  Concert
*/
export const NewConcertDB = function (obj) {
  return {
    concert_id: Number(obj.concert_id),
    concert_date: new Date(obj.concert_date),
    concert_name: String(obj.concert_name),
    concert_band: String(obj.concert_band),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    staff: NewStaffDB(obj.staff),
  };
};

export const NewCreateConcert = function (obj) {
  return {
    concert_date: Date.parse(obj.concert_date),
    concert_name: String(obj.concert_name),
    concert_band: String(obj.concert_band),
  };
};

export const NewUpdateConcert = function (obj) {
  return {
    concert_id: Number(obj.concert_id),
    concert_date: Date.parse(obj.concert_date),
    concert_name: String(obj.concert_name),
    concert_band: String(obj.concert_band),
  };
};

export const NewGetConcert = function (obj) {
  return {
    concert_id: Number(obj.concert_id),
  };
};

export const NewDeleteConcert = function (obj) {
  return {
    concert_id: Number(obj.concert_id),
  };
};

/*
  Delivery
*/
export const NewDeliveryDB = function (obj) {
  return {
    delivery_id: Number(obj.delivery_id),
    delivery_date: new Date(obj.delivery_date),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    staff: NewStaffDB(obj.staff),
    supplier_id: Number(
      obj.supplier_id
        ? obj.supplier_id
        : obj.supplier.supplier_id
        ? obj.supplier.supplier_id
        : NaN
    ),
    supplier: NewSupplierDB(obj.supplier),
    delivery_type_id: Number(
      obj.delivery_type_id
        ? obj.delivery_type_id
        : obj.delivery_type.delivery_type_id
        ? obj.delivery_type.delivery_type_id
        : NaN
    ),
    delivery_type: NewDeliveryTypeDB(obj.delivery_type),
  };
};

export const NewCreateDelivery = function (obj) {
  return {
    delivery_date: Date.parse(obj.delivery_date),
    supplier_id: Number(
      obj.supplier_id
        ? obj.supplier_id
        : obj.supplier.supplier_id
        ? obj.supplier.supplier_id
        : NaN
    ),
    delivery_type_id: Number(
      obj.delivery_type_id
        ? obj.delivery_type_id
        : obj.delivery_type.delivery_type_id
        ? obj.delivery_type.delivery_type_id
        : NaN
    ),
  };
};

export const NewUpdateDelivery = function (obj) {
  return {
    delivery_id: Number(obj.delivery_id),
    delivery_date: Date.parse(obj.delivery_date),
    supplier_id: Number(
      obj.supplier_id
        ? obj.supplier_id
        : obj.supplier.supplier_id
        ? obj.supplier.supplier_id
        : NaN
    ),
    delivery_type_id: Number(
      obj.delivery_type_id
        ? obj.delivery_type_id
        : obj.delivery_type.delivery_type_id
        ? obj.delivery_type.delivery_type_id
        : NaN
    ),
  };
};

export const NewGetDelivery = function (obj) {
  return {
    delivery_id: Number(obj.delivery_id),
  };
};

export const NewDeleteDelivery = function (obj) {
  return {
    delivery_id: Number(obj.delivery_id),
  };
};

/*
  Payout
*/
export const NewPayoutDB = function (obj) {
  return {
    payout_id: Number(obj.payout_id),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    staff: NewStaffDB(obj.staff),
    payout_amount: Number(obj.payout_amount),
    payout_date: new Date(obj.payout_date),
  };
};

export const NewCreatePayout = function (obj) {
  return {
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    payout_amount: Number(obj.payout_amount),
    payout_date: Date.parse(obj.payout_date),
  };
};

export const NewUpdatePayout = function (obj) {
  return {
    payout_id: Number(obj.payout_id),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    payout_amount: Number(obj.payout_amount),
    payout_date: Date.parse(obj.payout_date),
  };
};

export const NewGetPayout = function (obj) {
  return {
    payout_id: Number(obj.payout_id),
  };
};

export const NewDeletePayout = function (obj) {
  return {
    payout_id: Number(obj.payout_id),
  };
};

/*
  Timesheet
*/
export const NewTimesheetDB = function (obj) {
  return {
    timesheet_id: Number(obj.timesheet_id),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    staff: NewStaffDB(obj.staff),
    timesheet_presence: Boolean(obj.timesheet_presence),
    absence_type_id: Number(
      obj.absence_type_id
        ? obj.absence_type_id
        : obj.absence_type.absence_type_id
        ? obj.absence_type.absence_type_id
        : NaN
    ),
    absence_type: NewAbsenceTypeDB(obj.absence_type),
    timesheet_date: new Date(obj.timesheet_date),
  };
};

export const NewCreateTimesheet = function (obj) {
  return {
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    timesheet_presence: Boolean(obj.timesheet_presence),
    absence_type_id: Number(
      obj.absence_type_id
        ? obj.absence_type_id
        : obj.absence_type.absence_type_id
        ? obj.absence_type.absence_type_id
        : NaN
    ),
    timesheet_date: new Date(obj.timesheet_date),
  };
};

export const NewUpdateTimesheet = function (obj) {
  return {
    timesheet_id: Number(obj.timesheet_id),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    timesheet_presence: Boolean(obj.timesheet_presence),
    absence_type_id: Number(
      obj.absence_type_id
        ? obj.absence_type_id
        : obj.absence_type.absence_type_id
        ? obj.absence_type.absence_type_id
        : NaN
    ),
    timesheet_date: new Date(obj.timesheet_date),
  };
};

export const NewGetTimesheet = function (obj) {
  return {
    timesheet_id: Number(obj.timesheet_id),
  };
};

export const NewDeleteTimesheet = function (obj) {
  return {
    timesheet_id: Number(obj.timesheet_id),
  };
};

/*
  Reservation
*/
export const NewReservationDB = function (obj) {
  return {
    reservation_id: Number(obj.reservation_id),
    reservation_date: new Date(obj.reservation_date),
    staff_id: Number(
      obj.staff_id
        ? obj.staff_id
        : obj.staff.staff_id
        ? obj.staff.staff_id
        : NaN
    ),
    staff: NewStaffDB(obj.staff),
    client_id: Number(
      obj.client_id
        ? obj.client_id
        : obj.client.client_id
        ? obj.client.client_id
        : NaN
    ),
    client: NewClientDB(obj.client),
    table_id: Number(
      obj.table_id
        ? obj.table_id
        : obj.table.table_id
        ? obj.table.table_id
        : NaN
    ),
  };
};

export const NewCreateReservation = function (obj) {
  return {
    reservation_date: new Date(obj.reservation_date),
    client_id: Number(obj.client_id),
    table_id: Number(obj.table_id),
  };
};

export const NewUpdateReservation = function (obj) {
  return {
    reservation_id: Number(obj.reservation_id),
    reservation_date: new Date(obj.reservation_date),
    client_id: Number(obj.client_id),
    table_id: Number(obj.table_id),
  };
};

export const NewGetReservation = function (obj) {
  return {
    reservation_id: Number(obj.reservation_id),
  };
};

export const NewDeleteReservation = function (obj) {
  return {
    reservation_id: Number(obj.reservation_id),
  };
};

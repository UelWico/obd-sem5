import { BACKEND_URL } from "./constants";
import * as objects from "./objects";
/*
  Dish
*/
export const POST_get_dishes = async function () {
  let response = await fetch(BACKEND_URL + "/dish/get_dishes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewDishDB(json[i]));
  }

  return out;
};

/*
  Order
*/

export const POST_get_orders = async function () {
  let response = await fetch(BACKEND_URL + "/order/get_orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewOrderDB(json[i]));
  }

  return out;
};

export const POST_get_order = async function (obj) {
  let body = objects.NewGetOrder(obj);
  let response = await fetch(BACKEND_URL + "/order/get_order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewOrderDB(json);

  return out;
};

export const POST_delete_order = async function (obj) {
  let body = objects.NewDeleteOrder(obj);
  let response = await fetch(BACKEND_URL + "/order/delete_order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const POST_create_order = async function (obj) {
  let body = objects.NewCreateOrder(obj);
  let response = await fetch(BACKEND_URL + "/order/create_order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewOrderDB(json);

  return out;
};

export const PUT_update_order = async function (obj) {
  let body = objects.NewUpdateOrder(obj);
  let response = await fetch(BACKEND_URL + "/order/update_order", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewOrderDB(json);

  return out;
};

/*
  Auth
*/

export const PUT_login = async function (staff_username, staff_pass) {
  const body = {
    staff_username: staff_username,
    staff_pass: staff_pass,
  };
  let response = await fetch(BACKEND_URL + "/auth/login", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const PUT_logout = async function () {
  const body = {};
  let response = await fetch(BACKEND_URL + "/auth/logout", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const GET_get_logged_user = async function () {
  let response = await fetch(BACKEND_URL + "/auth/get_logged_user", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

/*
  Job
*/

export const POST_get_jobs = async function () {
  let response = await fetch(BACKEND_URL + "/job/get_jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewJobDB(json[i]));
  }

  return out;
};

export const POST_get_job = async function (obj) {
  let body = objects.NewGetJob(obj);
  let response = await fetch(BACKEND_URL + "/job/get_job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewJobDB(json);

  return out;
};

export const POST_create_job = async function (obj) {
  if (obj.job_name == "") {
    throw new Error("No");
  }
  let body = objects.NewCreateJob(obj);
  let response = await fetch(BACKEND_URL + "/job/create_job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewJobDB(json);

  return out;
};

export const PUT_update_job = async function (obj) {
  if (obj.job_name == "") {
    throw new Error("No");
  }
  let body = objects.NewUpdateJob(obj);
  let response = await fetch(BACKEND_URL + "/job/update_job", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewJobDB(json);

  return out;
};

/*
  Absence type
*/

export const POST_get_absence_types = async function () {
  let response = await fetch(BACKEND_URL + "/absence_type/get_absence_types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewAbsenceTypeDB(json[i]));
  }

  return out;
};

export const POST_get_absence_type = async function (obj) {
  let body = objects.NewGetAbsenceType(obj);
  let response = await fetch(BACKEND_URL + "/absence_type/get_absence_type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewAbsenceTypeDB(json);

  return out;
};

export const POST_create_absence_type = async function (obj) {
  let body = objects.NewCreateAbsenceType(obj);
  let response = await fetch(
    BACKEND_URL + "/absence_type/create_absence_type",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewAbsenceTypeDB(json);

  return out;
};

export const PUT_update_absence_type = async function (obj) {
  let body = objects.NewUpdateAbsenceType(obj);
  let response = await fetch(
    BACKEND_URL + "/absence_type/update_absence_type",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewAbsenceTypeDB(json);

  return out;
};

/*
  Delivery type
*/

export const POST_get_delivery_types = async function () {
  let response = await fetch(
    BACKEND_URL + "/delivery_type/get_delivery_types",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    }
  );
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewDeliveryTypeDB(json[i]));
  }

  return out;
};

export const POST_get_delivery_type = async function (obj) {
  let body = objects.NewGetDeliveryType(obj);
  let response = await fetch(BACKEND_URL + "/delivery_type/get_delivery_type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewDeliveryTypeDB(json);

  return out;
};

export const POST_create_delivery_type = async function (obj) {
  let body = objects.NewCreateDeliveryType(obj);
  let response = await fetch(
    BACKEND_URL + "/delivery_type/create_delivery_type",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewDeliveryTypeDB(json);

  return out;
};

export const PUT_update_delivery_type = async function (obj) {
  let body = objects.NewUpdateDeliveryType(obj);
  let response = await fetch(
    BACKEND_URL + "/delivery_type/update_delivery_type",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewDeliveryTypeDB(json);

  return out;
};

/*
  Table
*/

export const POST_get_tables = async function () {
  let response = await fetch(BACKEND_URL + "/table/get_tables", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewTableDB(json[i]));
  }

  return out;
};

export const POST_get_table = async function (obj) {
  let body = objects.NewGetTable(obj);
  let response = await fetch(BACKEND_URL + "/table/get_table", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewTableDB(json);

  return out;
};

export const POST_create_table = async function (obj) {
  let body = objects.NewCreateTable(obj);
  let response = await fetch(BACKEND_URL + "/table/create_table", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewTableDB(json);

  return out;
};

export const PUT_update_table = async function (obj) {
  let body = objects.NewUpdateTable(obj);
  let response = await fetch(BACKEND_URL + "/table/update_table", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewTableDB(json);

  return out;
};

/*
  Staff
*/

export const POST_get_staffs = async function () {
  let response = await fetch(BACKEND_URL + "/staff/get_staffs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewStaffDB(json[i]));
  }

  return out;
};

export const POST_get_staff = async function (obj) {
  let body = objects.NewGetStaff(obj);
  let response = await fetch(BACKEND_URL + "/staff/get_staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewStaffDB(json);

  return out;
};

export const POST_delete_staff = async function (obj) {
  let body = objects.NewDeleteStaff(obj);
  let response = await fetch(BACKEND_URL + "/staff/delete_staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewStaffDB(json);

  return out;
};

export const POST_create_staff = async function (obj) {
  let body = objects.NewCreateStaff(obj);
  let response = await fetch(BACKEND_URL + "/staff/create_staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewStaffDB(json);

  return out;
};

export const PUT_update_staff = async function (obj) {
  let body = objects.NewUpdateStaff(obj);
  let response = await fetch(BACKEND_URL + "/staff/update_staff", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewStaffDB(json);

  return out;
};

/*
  Supplier
*/

export const POST_get_suppliers = async function () {
  let response = await fetch(BACKEND_URL + "/supplier/get_suppliers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewSupplierDB(json[i]));
  }

  return out;
};

export const POST_get_supplier = async function (obj) {
  let body = objects.NewGetSupplier(obj);
  let response = await fetch(BACKEND_URL + "/supplier/get_supplier", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewSupplierDB(json);

  return out;
};

export const POST_delete_supplier = async function (obj) {
  let body = objects.NewDeleteSupplier(obj);
  let response = await fetch(BACKEND_URL + "/supplier/delete_supplier", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewSupplierDB(json);

  return out;
};

export const POST_create_supplier = async function (obj) {
  let body = objects.NewCreateSupplier(obj);
  let response = await fetch(BACKEND_URL + "/supplier/create_supplier", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewSupplierDB(json);

  return out;
};

export const PUT_update_supplier = async function (obj) {
  let body = objects.NewUpdateSupplier(obj);
  let response = await fetch(BACKEND_URL + "/supplier/update_supplier", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewSupplierDB(json);

  return out;
};

/*
  Client
*/

export const POST_get_clients = async function () {
  let response = await fetch(BACKEND_URL + "/client/get_clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewClientDB(json[i]));
  }

  return out;
};

export const POST_get_client = async function (obj) {
  let body = objects.NewGetClient(obj);
  let response = await fetch(BACKEND_URL + "/client/get_client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewClientDB(json);

  return out;
};

export const POST_delete_client = async function (obj) {
  let body = objects.NewDeleteClient(obj);
  let response = await fetch(BACKEND_URL + "/client/delete_client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewClientDB(json);

  return out;
};

export const POST_create_client = async function (obj) {
  let body = objects.NewCreateClient(obj);
  let response = await fetch(BACKEND_URL + "/client/create_client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewClientDB(json);

  return out;
};

export const PUT_update_client = async function (obj) {
  let body = objects.NewUpdateClient(obj);
  let response = await fetch(BACKEND_URL + "/client/update_client", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewClientDB(json);

  return out;
};

/*
  Concert
*/

export const POST_get_concerts = async function () {
  let response = await fetch(BACKEND_URL + "/concert/get_concerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewConcertDB(json[i]));
  }

  return out;
};

export const POST_get_concert = async function (obj) {
  let body = objects.NewGetConcert(obj);
  let response = await fetch(BACKEND_URL + "/concert/get_concert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewConcertDB(json);

  return out;
};

export const POST_delete_concert = async function (obj) {
  let body = objects.NewDeleteConcert(obj);
  let response = await fetch(BACKEND_URL + "/concert/delete_concert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const POST_create_concert = async function (obj) {
  let body = objects.NewCreateConcert(obj);
  let response = await fetch(BACKEND_URL + "/concert/create_concert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewConcertDB(json);

  return out;
};

export const PUT_update_concert = async function (obj) {
  let body = objects.NewUpdateConcert(obj);
  let response = await fetch(BACKEND_URL + "/concert/update_concert", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewConcertDB(json);

  return out;
};

/*
  Delivery
*/

export const POST_get_deliveries = async function () {
  let response = await fetch(BACKEND_URL + "/delivery/get_deliveries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewDeliveryDB(json[i]));
  }

  return out;
};

export const POST_get_delivery = async function (obj) {
  let body = objects.NewGetDelivery(obj);
  let response = await fetch(BACKEND_URL + "/delivery/get_delivery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewDeliveryDB(json);

  return out;
};

export const POST_delete_delivery = async function (obj) {
  let body = objects.NewDeleteDelivery(obj);
  let response = await fetch(BACKEND_URL + "/delivery/delete_delivery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const POST_create_delivery = async function (obj) {
  let body = objects.NewCreateDelivery(obj);
  let response = await fetch(BACKEND_URL + "/delivery/create_delivery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewDeliveryDB(json);

  return out;
};

export const PUT_update_delivery = async function (obj) {
  let body = objects.NewUpdateDelivery(obj);
  let response = await fetch(BACKEND_URL + "/delivery/update_delivery", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewDeliveryDB(json);

  return out;
};

/*
  Payout
*/

export const POST_get_payouts = async function () {
  let response = await fetch(BACKEND_URL + "/payout/get_payouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewPayoutDB(json[i]));
  }

  return out;
};

export const POST_get_payout = async function (obj) {
  let body = objects.NewGetPayout(obj);
  let response = await fetch(BACKEND_URL + "/payout/get_payout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewPayoutDB(json);

  return out;
};

export const POST_delete_payout = async function (obj) {
  let body = objects.NewDeletePayout(obj);
  let response = await fetch(BACKEND_URL + "/payout/delete_payout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const POST_create_payout = async function (obj) {
  let body = objects.NewCreatePayout(obj);
  let response = await fetch(BACKEND_URL + "/payout/create_payout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewPayoutDB(json);

  return out;
};

export const PUT_update_payout = async function (obj) {
  let body = objects.NewUpdatePayout(obj);
  let response = await fetch(BACKEND_URL + "/payout/update_payout", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewPayoutDB(json);

  return out;
};

/*
  Timesheet
*/

export const POST_get_timesheets = async function () {
  let response = await fetch(BACKEND_URL + "/timesheet/get_timesheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewTimesheetDB(json[i]));
  }

  return out;
};

export const POST_get_timesheet = async function (obj) {
  let body = objects.NewGetTimesheet(obj);
  let response = await fetch(BACKEND_URL + "/timesheet/get_timesheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewTimesheetDB(json);

  return out;
};

export const POST_delete_timesheet = async function (obj) {
  let body = objects.NewDeleteTimesheet(obj);
  let response = await fetch(BACKEND_URL + "/timesheet/delete_timesheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const POST_create_timesheet = async function (obj) {
  let body = objects.NewCreateTimesheet(obj);
  let response = await fetch(BACKEND_URL + "/timesheet/create_timesheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewTimesheetDB(json);

  return out;
};

export const PUT_update_timesheet = async function (obj) {
  let body = objects.NewUpdateTimesheet(obj);
  let response = await fetch(BACKEND_URL + "/timesheet/update_timesheet", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewTimesheetDB(json);

  return out;
};

/*
  Reservation
*/

export const POST_get_reservations = async function () {
  let response = await fetch(BACKEND_URL + "/reservation/get_reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  let out = [];
  for (let i = 0; i < json.length; i++) {
    out.push(objects.NewReservationDB(json[i]));
  }

  return out;
};

export const POST_get_reservation = async function (obj) {
  let body = objects.NewGetReservation(obj);
  let response = await fetch(BACKEND_URL + "/reservation/get_reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewReservationDB(json);

  return out;
};

export const POST_delete_reservation = async function (obj) {
  let body = objects.NewDeleteReservation(obj);
  let response = await fetch(BACKEND_URL + "/reservation/delete_reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");

  return json;
};

export const POST_create_reservation = async function (obj) {
  let body = objects.NewCreateReservation(obj);
  let response = await fetch(BACKEND_URL + "/reservation/create_reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewReservationDB(json);

  return out;
};

export const PUT_update_reservation = async function (obj) {
  let body = objects.NewUpdateReservation(obj);
  let response = await fetch(BACKEND_URL + "/reservation/update_reservation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  let json = await response.json();
  let status = response.status;
  if (status >= 400) throw new Error("Unsuccessful");
  const out = objects.NewReservationDB(json);

  return out;
};

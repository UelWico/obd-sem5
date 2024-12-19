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

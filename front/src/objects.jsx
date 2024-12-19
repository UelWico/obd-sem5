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
  Payout
*/

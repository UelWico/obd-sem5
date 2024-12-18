import { useEffect, useState } from "react";
import Order from "../components/order";
import {
  POST_delete_order,
  POST_get_orders,
  POST_create_order,
  PUT_update_order,
} from "../requests";
import OrderFull from "../components/orderFull";
import * as objects from "../objects";

export const Orders = function () {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    POST_get_orders().then((orderDBList) => {
      let orderList = [];
      for (let i = 0; i < orderDBList.length; i++) {
        orderList.push(objects.NewOrderFromOrderDB(orderDBList[i]));
      }
      setOrders(orderList);
    });
  }, []);
  let deleteOrder = function (id) {
    POST_delete_order({
      order_id: id,
    }).then(() => {
      let newOrders = orders.slice();
      for (let i = 0; i < newOrders.length; i++) {
        if (newOrders[i].order_id == id) {
          newOrders.splice(i, 1);
          break;
        }
      }
      setOrders(newOrders);
    });
  };

  let [currentOrderID, setCurrentOrderID] = useState(0);
  let changeCurrentOrderID = function (ID) {
    if (currentOrderID == 0 && ID == 0) {
      setCurrentOrderID(-1);
    } else {
      setCurrentOrderID(ID);
    }
  };
  let editOrder = function (orderFull) {
    PUT_update_order(orderFull).then((order_db) => {
      let newOrders = orders.slice();
      const order = objects.NewOrderFromOrderDB(order_db);
      for (let i = 0; i < newOrders.length; i++) {
        if (newOrders[i].order_id == order.order_id) {
          newOrders[i] = order;
          break;
        }
      }
      setOrders(newOrders);
      changeCurrentOrderID(0);
    });
  };
  let addOrder = function (orderFull) {
    POST_create_order(orderFull).then((order_db) => {
      let newOrders = orders.slice();
      const order = objects.NewOrderFromOrderDB(order_db);
      console.log(order);
      newOrders.push(order);
      setOrders(newOrders);
      changeCurrentOrderID(0);
    });
  };

  return (
    <>
      <h3>Order table</h3>
      <div className="order-table-controls">
        <button
          onClick={() => {
            changeCurrentOrderID(0);
          }}
        >
          Return
        </button>
        <OrderFull
          key={currentOrderID}
          id={currentOrderID}
          addOrder={addOrder}
          editOrder={editOrder}
        />
      </div>
      <div className="order-table">
        {orders
          ? orders
              .slice()
              .reverse()
              .map((order) => (
                <Order
                  key={order.order_id}
                  id={order.order_id}
                  staffName={order.staff_name}
                  orderCost={order.order_cost}
                  orderNote={order.order_note}
                  orderItems={order.order_items}
                  editOrder={() => {
                    changeCurrentOrderID(order.order_id);
                  }}
                  deleteOrder={deleteOrder}
                />
              ))
          : "Loading..."}
      </div>
    </>
  );
};

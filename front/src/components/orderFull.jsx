import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import OrderFullItem from "./orderFullItem";
import { NewItemDB, NewOrderDB } from "../objects";
import { POST_get_order, POST_get_dishes } from "../requests";

function OrderFull({ id, addOrder, editOrder }) {
  const [order, setOrder] = useState(
    NewOrderDB({
      order_id: 0,
      staff: {
        staff_id: 0,
        staff_sur: "",
        staff_name: "",
        staff_last_name: "",
        staff_phone: "",
        staff_pass: "",
        job: {
          job_id: 0,
          job_name: "",
        },
      },
      order_note: "",
      items: [],
    })
  );
  const [items, setItems] = useState([]);
  const [orderNote, setOrderNote] = useState("");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    POST_get_dishes().then((dishes_list) => {
      setDishes(dishes_list);
    });
  }, []);

  useEffect(() => {
    if (id > 0) {
      let obj = {
        order_id: id,
      };
      POST_get_order(obj).then((order_db) => {
        setOrder(order_db);
        setItems(order_db.items);
        setOrderNote(order_db.order_note);
      });
    }
  }, [id]);

  const getOrderData = function () {
    const orderFull = JSON.parse(JSON.stringify(order));
    orderFull.items = items;
    orderFull.order_note = orderNote;
    return orderFull;
  };

  function addItem() {
    let nextID = items.length > 0 ? items[items.length - 1].item_id + 1 : 0;
    setItems(
      items.concat(
        NewItemDB({
          item_id: nextID,
          dish_id: getDishes()[0].dish_id,
          item_cost: 0,
          item_amount: 1,
        })
      )
    );
  }
  function deleteItem(item_id) {
    let newItems = items.slice();
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].item_id == item_id) {
        newItems.splice(i, 1);
        break;
      }
    }
    setItems(newItems);
  }
  function updateItem(item) {
    let newItems = items.slice();
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].item_id == item.item_id) {
        newItems[i] = item;
        break;
      }
    }
    setItems(newItems);
  }

  function getDishes() {
    return dishes;
  }

  return (
    <div className="order-full-container">
      {order ? (
        <>
          <div className="order-headers">
            {id <= 0 ? (
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: 28,
                  marginBottom: "44px",
                }}
              >
                Добавление заказа
              </span>
            ) : (
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: 28,
                  marginBottom: "44px",
                }}
              >
                Изменение заказа
              </span>
            )}
          </div>
          <div className="order-column">
            {items
              ? items.map((item) => (
                  <OrderFullItem
                    key={item.item_id}
                    item_id={item.item_id}
                    dish_id={item.dish_id}
                    item_amount={item.item_amount}
                    deleteItem={deleteItem}
                    updateItem={updateItem}
                    getDishes={getDishes}
                  />
                ))
              : "Loading..."}
            <div className="order-full-items-controls">
              <button
                style={{
                  width: 376,

                  marginBottom: "60px",
                }}
                onClick={() => {
                  addItem();
                }}
              >
                Добавить продукт
              </button>
            </div>
          </div>
          <div className="order-column">
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              Комментарий:
            </span>

            <textarea
              style={{
                fontFamily: "system-ui",
                fontSize: 16,
                borderRadius: "10px",
                minHeight: "62px",
                maxHeight: "80px",
                minWidth: "364.4px",
                maxWidth: "364.4px",
                marginBottom: 16,
              }}
              name="orderNote"
              type="text"
              placeholder=""
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
            />
          </div>

          <div className="order-controls">
            {order.order_id <= 0 ? (
              <button
                style={{
                  width: 376,
                }}
                onClick={() => {
                  addOrder(getOrderData());
                }}
              >
                Оформить заказ
              </button>
            ) : (
              <button
                style={{
                  width: 376,
                }}
                onClick={() => {
                  editOrder(getOrderData());
                }}
              >
                Сохранить
              </button>
            )}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

OrderFull.propTypes = {
  id: PropTypes.number,
  addOrder: PropTypes.func,
  editOrder: PropTypes.func,
};

export default OrderFull;

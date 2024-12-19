import PropTypes from "prop-types";
import { NewItemDB } from "../objects";
import { useState } from "react";

function OrderFullItem({
  item_id,
  dish_id,
  item_amount,
  deleteItem,
  updateItem,
  getDishes,
}) {
  const [item, setItem] = useState(
    NewItemDB({
      item_id: item_id,
      dish_id: dish_id,
      item_cost: 0,
      item_amount: item_amount,
    })
  );
  const setDishID = function (new_dish_id) {
    let itemChanged = NewItemDB({
      item_id: item_id,
      dish_id: Number(new_dish_id),
      item_cost: 0,
      item_amount: item.item_amount,
    });
    setItem(itemChanged);
    updateItem(itemChanged);
  };
  const setItemAmount = function (new_item_amount) {
    let itemChanged = NewItemDB({
      item_id: item_id,
      dish_id: item.dish_id,
      item_cost: 0,
      item_amount: Number(new_item_amount),
    });
    setItem(itemChanged);
    updateItem(itemChanged);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "370px" }}>
      <div
        className="order-full-item-container"
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid black",
          borderRadius: 5,
          width: "328px",
          gap: "1px",
          marginBottom: "6px",
        }}
      >
        <select
          style={{
            fontFamily: "system-ui",
            fontSize: 16,
            border: 0,
            borderRight: "1px solid black",
            outline: "none",
            width: "278px",
            backgroundColor: "transparent",
          }}
          name="dish_id"
          placeholder="Dish"
          value={item.dish_id}
          onChange={(e) => setDishID(e.target.value)}
        >
          {getDishes().map((dish_db) => (
            <option
              key={dish_db.dish_id}
              value={dish_db.dish_id}
              label={dish_db.dish_name}
            ></option>
          ))}
        </select>
        <input
          style={{
            fontFamily: "system-ui",
            fontSize: 16,
            border: 0,
            width: "58px",
            outline: "none",
            backgroundColor: "transparent",
          }}
          name="item_amount"
          placeholder="Item Amount"
          type="number"
          value={item.item_amount}
          onChange={(e) => setItemAmount(e.target.value)}
        />
      </div>
      <button
        style={{
          width: 36,
          marginBottom: "6px",
          marginLeft: "4px",
        }}
        onClick={() => {
          deleteItem(item_id);
        }}
      >
        ✖
      </button>
    </div>
  );
}

OrderFullItem.propTypes = {
  item_id: PropTypes.number,
  dish_id: PropTypes.number,
  item_amount: PropTypes.number,
  deleteItem: PropTypes.func,
  updateItem: PropTypes.func,
  getDishes: PropTypes.func,
};

export default OrderFullItem;

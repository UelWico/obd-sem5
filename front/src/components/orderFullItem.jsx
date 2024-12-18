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
    <div className="order-full-item-container">
      <select
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
        name="item_amount"
        placeholder="Item Amount"
        type="number"
        value={item.item_amount}
        onChange={(e) => setItemAmount(e.target.value)}
      />
      <button
        onClick={() => {
          deleteItem(item_id);
        }}
      >
        Delete
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

import PropTypes from "prop-types";

function Order({
  id,
  staffName,
  orderCost,
  orderNote,
  orderItems,
  editOrder,
  deleteOrder,
}) {
  return (
    <div className="order-container">
      <div className="order-row">
        <p>{id}</p>
        <p>{`Сотрудник: ${staffName}`}</p>
      </div>
      <div className="order-column">
        <div className="order-row">
          <div
            style={{ whiteSpace: "pre-wrap" }}
          >{`Заказ:\n${orderItems}`}</div>
        </div>
        <div className="order-row">
          <p>{`Сумма: ${orderCost}р`}</p>
          <p>{`Note: ${orderNote}`}</p>
        </div>
        <div className="order-controls">
          <button
            onClick={() => {
              editOrder();
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteOrder(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

Order.propTypes = {
  id: PropTypes.number,
  staffName: PropTypes.string,
  orderCost: PropTypes.number,
  orderNote: PropTypes.string,
  orderItems: PropTypes.string,
  editOrder: PropTypes.func,
  deleteOrder: PropTypes.func,
};

export default Order;

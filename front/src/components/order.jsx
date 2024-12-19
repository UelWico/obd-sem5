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
    <div
      style={{
        width: "360px",
        height: "min-content",
        borderRadius: "10px",
        marginTop: "8px",
        marginBottom: "8px",
      }}
      className="order-container"
    >
      <div className="order-column">
        <div className="order-headers">
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 28,
              marginBottom: "44px",
            }}
          >
            {`Заказ №${id}`}
          </span>
        </div>
        <div className="order-column">
          <div className="order-row">
            <div className="order-column" style={{ width: "100%" }}>
              {orderItems.map((order_item) => (
                <div
                  key={order_item.item_id}
                  className="order-row"
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "system-ui",
                      fontSize: 16,
                      marginBottom: "16px",
                      marginTop: 0,
                    }}
                  >
                    {order_item.dish_name + " . . . . . . . ."}
                  </p>
                  <p
                    style={{
                      fontFamily: "system-ui",
                      fontSize: 16,
                      marginBottom: "16px",
                      marginTop: 0,
                    }}
                  >
                    {order_item.item_amount +
                      " x " +
                      order_item.item_cost +
                      " ₽"}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ whiteSpace: "normal", wordBreak: "break-all" }}
            className="order-column"
          >
            <p
              style={{
                textAlign: "right",
                marginBottom: 16,
              }}
            >{`Итого: ${orderCost} ₽`}</p>
            <p style={{ marginBottom: 16 }}>{`Комментарий: ${orderNote}`}</p>
            <p
              style={{ color: "gray", marginBottom: 16 }}
            >{`Добавлено сотрудником: ${staffName}`}</p>
          </div>
          <div className="order-headers" style={{ gap: "12px" }}>
            <button
              style={{ width: "182px" }}
              onClick={() => {
                editOrder();
              }}
            >
              Редактировать
            </button>
            <button
              style={{ width: "182px" }}
              onClick={() => {
                deleteOrder(id);
              }}
            >
              Удалить
            </button>
          </div>
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
  orderItems: PropTypes.object,
  editOrder: PropTypes.func,
  deleteOrder: PropTypes.func,
};

export default Order;

import React from "react";
import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <video autoPlay loop muted playsInline className="empty-orders-video">
            <source src="/nonVegItems/Sandy.mp4" type="video/mp4" />
          </video>

          <h2>No Orders Found 🍔</h2>
        </div>
      ) : (
        <ol className="orders-list">
          {orders.map((order, index) => (
            <li key={index} className="order-card">
              <p className="order-id">
                <strong>Order ID:</strong> {order.orderId}
              </p>

              <p className="order-date">
                <strong>Date:</strong> {order.date}
              </p>

              <ul className="items-list">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="item">
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>

              <p className="order-total">Total: ₹{order.totalPrice}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Orders;

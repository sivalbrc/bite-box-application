import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./NotificationCenter.css";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  // Simulate real-time notifications
  useEffect(() => {
    if (cartItems.length > 0) {
      const notification = {
        id: Date.now(),
        type: "cart",
        message: `${cartItems.length} items in your cart`,
        timestamp: new Date(),
      };

      setNotifications((prev) => [notification, ...prev.slice(0, 4)]);
    }
  }, [cartItems.length]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="notification-center">
      <button
        className="notification-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <i className="fa-solid fa-bell"></i>
        {notifications.length > 0 && (
          <span className="notification-badge">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>
            {notifications.length > 0 && (
              <button onClick={clearNotifications} className="clear-btn">
                Clear All
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">No notifications</p>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="notification-item">
                  <div className="notification-content">
                    <p>{notif.message}</p>
                    <small>
                      {new Date(notif.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;

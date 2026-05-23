import React, { useEffect, useState } from "react";
import "./RealtimeStats.css";

const RealtimeStats = () => {

  const foodMessages = [
    {
      id: 1,
      icon: "🍕",
      title: "Fresh Pizza",
      message: "Cheesy pizza now available with extra toppings",
    },
    {
      id: 2,
      icon: "🍔",
      title: "Burger Combo",
      message: "Get fries + coke free with burger combo",
    },
    {
      id: 3,
      icon: "🥤",
      title: "Cool Milkshakes",
      message: "Enjoy chilled chocolate milkshakes today",
    },
    {
      id: 4,
      icon: "🍗",
      title: "Chicken Bucket",
      message: "Hot crispy chicken delivered in 30 mins",
    },
    {
      id: 5,
      icon: "🍰",
      title: "Sweet Desserts",
      message: "Fresh cakes and desserts available now",
    },
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentMessage((prev) =>
        prev === foodMessages.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="food-message-wrapper">

      <div className="food-message-card">

        <div className="food-icon">
          {foodMessages[currentMessage].icon}
        </div>

        <div className="food-content">

          <h3>
            {foodMessages[currentMessage].title}
          </h3>

          <p>
            {foodMessages[currentMessage].message}
          </p>

        </div>

      </div>

      <div className="food-dots">

        {foodMessages.map((_, index) => (

          <span
            key={index}
            className={
              currentMessage === index
                ? "dot active"
                : "dot"
            }
          ></span>

        ))}

      </div>

    </div>

  );
};

export default RealtimeStats;
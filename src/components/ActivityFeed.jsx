import React, { useEffect, useState } from "react";
import "./ActivityFeed.css";

const ActivityFeed = () => {
  const offers = [
    {
      id: 1,
      title: "🔥 Flat 50% OFF",
      message: "Get 50% discount on all burgers today",
      color: "offer",
    },
    {
      id: 2,
      title: "🚚 Free Delivery",
      message: "Free delivery on orders above ₹299",
      color: "delivery",
    },
    {
      id: 3,
      title: "🎉 Combo Special",
      message: "Buy 1 Pizza & Get Coke Free",
      color: "combo",
    },
    {
      id: 4,
      title: "🍰 Sweet Weekend",
      message: "20% OFF on cakes & desserts",
      color: "sweet",
    },
    {
      id: 5,
      title: "⚡ Fast Delivery",
      message: "Hot food delivered in 30 mins",
      color: "fast",
    },
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) =>
        prev === offers.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="offer-feed">
      <div className="offer-header">
        <span className="live-dot"></span>
        Live Offers
      </div>

      <div className={`offer-card ${offers[currentOffer].color}`}>
        <h3>{offers[currentOffer].title}</h3>

        <p>{offers[currentOffer].message}</p>

        <button>Order Now</button>
      </div>

      <div className="offer-dots">
        {offers.map((_, index) => (
          <span
            key={index}
            className={
              currentOffer === index
                ? "dot active"
                : "dot"
            }
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
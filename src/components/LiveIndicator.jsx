import React, { useState, useEffect } from "react";
import "./LiveIndicator.css";

const LiveIndicator = ({ text = "Live", size = "small" }) => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`live-indicator ${size} ${isBlinking ? "active" : ""}`}>
      <span className="live-dot"></span>
      <span className="live-text">{text}</span>
    </div>
  );
};

export default LiveIndicator;

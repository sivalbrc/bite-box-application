import React from "react";
import "./RealTimeStatus.css";

const RealTimeStatus = ({ status = "Processing", type = "info" }) => {
  const statusMap = {
    processing: { text: "Processing...", color: "#3498db" },
    success: { text: "Success", color: "#27ae60" },
    error: { text: "Error", color: "#e74c3c" },
    loading: { text: "Loading...", color: "#f39c12" },
    updating: { text: "Updating...", color: "#9b59b6" },
  };

  const current = statusMap[status] || statusMap.processing;

  return (
    <div className={`real-time-status ${status}`}>
      <div className="status-pulse" style={{ borderColor: current.color }}></div>
      <span className="status-text">{current.text}</span>
    </div>
  );
};

export default RealTimeStatus;

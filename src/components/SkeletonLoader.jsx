import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = ({ type = "card", count = 4 }) => {
  const renderSkeleton = () => {
    if (type === "card") {
      return (
        <div className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      );
    }

    if (type === "text") {
      return (
        <>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </>
      );
    }

    if (type === "order") {
      return (
        <div className="skeleton-order">
          <div className="skeleton-circle"></div>
          <div className="skeleton-order-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`skeleton-loader skeleton-${type}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

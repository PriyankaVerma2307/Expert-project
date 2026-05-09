import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-content">
        <div className="skeleton-name pulse"></div>
        <div className="skeleton-tags">
          <div className="skeleton-tag pulse"></div>
          <div className="skeleton-tag pulse"></div>
          <div className="skeleton-tag pulse"></div>
        </div>
        <div className="skeleton-info pulse"></div>
        <div className="skeleton-desc pulse"></div>
        <div className="skeleton-desc pulse short"></div>
        <div className="skeleton-button pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

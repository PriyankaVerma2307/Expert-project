import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExpertCard.css";


// Cartoon avatar pool — 5 male + 5 female (DiceBear avataaars style)
const BASE = "https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=b6e3f4,ffdfbf,c0aede,d1d4f9&radius=50";
const AVATAR_POOL = [
  `${BASE}&seed=Felix`,       // male
  `${BASE}&seed=Lily`,        // female
  `${BASE}&seed=Oliver`,      // male
  `${BASE}&seed=Emma`,        // female
  `${BASE}&seed=Ethan`,       // male
  `${BASE}&seed=Sophia`,      // female
  `${BASE}&seed=Lucas`,       // male
  `${BASE}&seed=Mia`,         // female
  `${BASE}&seed=Noah`,        // male
  `${BASE}&seed=Aria`,        // female
];

function getAvatar(expert) {
  if (expert.image) return expert.image;
  // Pick deterministically from pool using last char of _id
  const id = expert._id || "";
  const charCode = id.charCodeAt(id.length - 1) || 0;
  return AVATAR_POOL[charCode % AVATAR_POOL.length];
}

function ExpertCard({ expert }) {
  const navigate = useNavigate();

  // Mock rating if not present
  const rating = expert.rating || (4.5 + Math.random() * 0.5).toFixed(1);

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/experts/${expert._id}`);
  };

  return (
    <div
      className="expert-card"
      onClick={() => navigate(`/experts/${expert._id}`)}
    >
      <div className="card-header">
        <div className="image-container">
          <img
            src={getAvatar(expert)}
            alt={expert.name}
            className="expert-image"
          />
          <div className="status-indicator online"></div>
        </div>
        <div className="rating-badge">
          <span className="rating-star">★</span>
          <span className="rating-value">{rating}</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="expert-name">{expert.name}</h3>
        <p className="expert-specialization">{expert.specialization || expert.category || "Consultant"}</p>

        <div className="expert-tags">
          {(expert.skills || ["Consulting", "Strategy", "Analysis"]).slice(0, 3).map((tag, idx) => (
            <span key={idx} className="skill-tag">{tag}</span>
          ))}
        </div>

        <div className="expert-meta">
          <div className="meta-item">
            <span className="meta-icon">💼</span>
            <span className="meta-text">{expert.experience || 3}+ Years</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">💰</span>
            <span className="meta-text">${expert.price || 50}/hr</span>
          </div>
        </div>

        <p className="expert-description">
          {expert.description || "Top-rated expert with extensive experience in delivering high-quality solutions."}
        </p>
      </div>

      <div className="card-footer">
        <button className="book-now-btn" onClick={handleBookNow}>
          Book Now
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

export default ExpertCard;
import { useNavigate } from "react-router-dom";
import "./ExpertCard.css";

function ExpertCard({ expert }) {
  const navigate = useNavigate();

  return (
    <div
      className="expert-card"
      onClick={() => navigate(`/experts/${expert._id}`)}
    >
      <h3>{expert.name}</h3>

      <p className="category">{expert.category}</p>

      {expert?.experience && (
        <p className="experience">
          {expert.experience} Years Experience
        </p>
      )}

      {expert?.rating && (
        <p className="rating">
          ⭐ {expert.rating}
        </p>
      )}

      <button
        className="view-btn"
        onClick={(e) => {
          e.stopPropagation(); 
          navigate(`/experts/${expert._id}`);
        }}
      >
        View Details
      </button>
    </div>
  );
}

export default ExpertCard;
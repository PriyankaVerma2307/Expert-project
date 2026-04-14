import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h2 className="logo" onClick={() => navigate("/")}>
        Expert Booking
      </h2>

      <button
        className="nav-btn"
        onClick={() => navigate("/my-bookings")}
      >
        My Bookings
      </button>
    </div>
  );
}

export default Header;
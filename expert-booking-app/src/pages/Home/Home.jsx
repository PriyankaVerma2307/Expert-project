import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaBolt, FaShieldAlt } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      
      {/* Hero Section */}
      <section className="hero">
        <h1>Book Trusted Experts Easily</h1>
        <p>
          Find verified professionals and schedule sessions instantly with our smart booking platform.
        </p>
        <button className="primary-btn" onClick={() => navigate("/experts")}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
  <div className="feature-card">
    <div className="feature-icon">
      <FaUserCheck />
    </div>
    <h3>Verified Experts</h3>
    <p>All professionals are carefully selected and verified.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">
      <FaBolt />
    </div>
    <h3>Instant Booking</h3>
    <p>Choose a slot and confirm your session in seconds.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">
      <FaShieldAlt />
    </div>
    <h3>Secure Platform</h3>
    <p>Your bookings and data are fully protected and secure.</p>
  </div>
</section>

    </div>
  );
};

export default Home;
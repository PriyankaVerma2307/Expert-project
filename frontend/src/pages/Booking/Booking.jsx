import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaStickyNote,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { expertId, date, slot, expertName } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return "Invalid email format";
    if (!formData.phone.trim()) return "Phone is required";
    if (!expertId || !date || !slot)
      return "Please select a time slot";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const API = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API}/api/bookings`,
        {
          expertId,
          date,
          slot,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/my-bookings", {
          state: { email: formData.email },
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!expertId || !date || !slot) {
    return (
      <div className="booking-page">
        <div className="booking-error-card">
          <FaExclamationCircle className="booking-status-icon error" />
          <h2>Booking Error</h2>
          <p>Please select a time slot first.</p>

          <button
            className="booking-btn-outline"
            onClick={() => navigate("/")}
          >
            Browse Experts
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="booking-page">
        <div className="booking-success-card">
          <FaCheckCircle className="booking-status-icon success" />

          <h2>Booking Successful!</h2>

          <p>
            Your session with <strong>{expertName}</strong> has been confirmed.
          </p>

          <div className="booking-summary-mini">
            <span>
              <FaCalendarAlt /> {date}
            </span>

            <span>
              <FaClock /> {slot}
            </span>
          </div>

          <p className="redirect-text">
            Redirecting to your bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">

        {/* Left/Top Panel: Summary */}
        <div className="booking-summary-panel">
          <div className="summary-header">
            <h3>Session Details</h3>
            <p>Review your booking information</p>
          </div>

          <div className="summary-details">
            <div className="summary-item">
              <div className="summary-icon">
                <FaUserTie />
              </div>

              <div className="summary-text">
                <span className="summary-label">Expert</span>
                <span className="summary-value">{expertName}</span>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon">
                <FaCalendarAlt />
              </div>

              <div className="summary-text">
                <span className="summary-label">Date</span>
                <span className="summary-value">{date}</span>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon">
                <FaClock />
              </div>

              <div className="summary-text">
                <span className="summary-label">Time</span>
                <span className="summary-value">{slot}</span>
              </div>
            </div>
          </div>

          <div className="summary-footer">
            <div className="price-row">
              <span>Total Amount</span>
              <strong>$150</strong>
            </div>
          </div>
        </div>

        {/* Right/Bottom Panel: Form */}
        <div className="booking-form-panel">
          <h2 className="booking-title">Finalize Booking</h2>

          {error && (
            <div className="booking-error-msg">
              <FaExclamationCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form">

            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrapper">
                <FaUserTie className="input-icon" />

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-wrapper">
                <FaPhone className="input-icon" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Session Notes (Optional)</label>

              <div className="input-wrapper textarea-wrapper">
                <FaStickyNote className="input-icon textarea-icon" />

                <textarea
                  name="notes"
                  placeholder="What would you like to discuss?"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="booking-submit-btn"
            >
              {loading ? (
                <span className="loader-ring"></span>
              ) : (
                "Confirm Booking"
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Booking;
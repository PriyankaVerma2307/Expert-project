import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email format";
    if (!formData.phone.trim()) return "Phone is required";
    if (!expertId || !date || !slot) return "Please select a time slot";
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

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        expertId,
        date,
        slot,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/my-bookings", { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!expertId || !date || !slot) {
    return (
      <div className="booking-error">
        <h2>Error</h2>
        <p>Please select a time slot first.</p>
        <button onClick={() => navigate("/")}>Go to Experts</button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="booking-success">
        <h2>Booking Successful!</h2>
        <p>Your session with {expertName} has been booked.</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {slot}</p>
        <p>Redirecting to My Bookings...</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2 className="booking-title">Book Your Session</h2>

        <div className="booking-info">
          <p><strong>Expert:</strong> {expertName}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {slot}</p>
        </div>

        {error && <div className="booking-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              placeholder="Any specific idea"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" disabled={loading} className="booking-btn">
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
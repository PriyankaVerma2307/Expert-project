import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiCheckCircle, FiClock as FiPending, FiAlertCircle, FiSearch } from "react-icons/fi";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    const API = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/api/bookings/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        const formattedData = Array.isArray(data)
          ? data.map((b) => ({
              ...b,
              status: b.status || "Confirmed",
            }))
          : [];

        setBookings(formattedData);
      } else {
        setError(data.message || "Failed to fetch bookings");
        setBookings([]);
      }
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
      console.error(err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return {
          text: "Confirmed",
          icon: <FiCheckCircle />,
          className: "status-badge status-confirmed",
        };
      case "Completed":
        return {
          text: "Completed",
          icon: <FiCheckCircle />,
          className: "status-badge status-completed",
        };
      case "Pending":
      default:
        return {
          text: "Pending",
          icon: <FiPending />,
          className: "status-badge status-pending",
        };
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "E";
  };

  return (
    <div className="my-bookings-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">My Bookings</h2>
          <p className="page-subtitle">Manage and track your upcoming expert sessions</p>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <FiAlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="empty-state">
          <FiCalendar className="empty-icon" />
          <h3 className="empty-title">No Bookings Yet</h3>
          <p className="empty-desc">
            You haven't booked any expert sessions yet. Browse our experts and find the right mentor for you.
          </p>
          <button className="browse-btn" onClick={() => navigate("/experts")}>
            <FiSearch /> Browse Experts
          </button>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="bookings-grid">
          {bookings.map((booking) => {
            const badge = getStatusBadge(booking.status);
            const expertName = booking.expertId?.name || "Unknown Expert";

            return (
              <div className="booking-card" key={booking._id}>
                <div className="booking-header">
                  <div className="expert-info">
                    <div className="expert-avatar">
                      {getInitial(expertName)}
                    </div>
                    <div className="expert-details">
                      <h3 className="expert-name">{expertName}</h3>
                      <span className="expert-role">Expert Session</span>
                    </div>
                  </div>
                  <span className={badge.className}>
                    {badge.icon} {badge.text}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <FiCalendar className="detail-icon" />
                    <span className="detail-text">{booking.date}</span>
                  </div>
                  <div className="detail-row">
                    <FiClock className="detail-icon" />
                    <span className="detail-text">{booking.slot}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
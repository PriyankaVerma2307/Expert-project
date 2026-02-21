import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MyBookings.css"; // premium CSS

function MyBookings() {
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchBookings = async (e) => {
    e?.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings?userEmail=${encodeURIComponent(email)}`
      );

      const data = await res.json();

      if (res.ok) {
        const formattedData = Array.isArray(data)
          ? data.map((b) => ({ ...b, status: b.status || "Confirmed" }))
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
    if (email && !searched) {
      fetchBookings();
    }
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return { text: "Booking Confirmed ✅", className: "status-badge status-confirmed" };
      case "Completed":
        return { text: "Session Completed ✔️", className: "status-badge status-completed" };
      case "Pending":
      default:
        return { text: "Pending Confirmation ⏳", className: "status-badge status-pending" };
    }
  };

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>

      {/* Search Form */}
      <form onSubmit={fetchBookings} className="bookings-search-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bookings-input"
        />
        <button type="submit" disabled={loading} className="bookings-btn">
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="bookings-error">{error}</p>}

      {searched && !loading && (
        bookings.length === 0 ? (
          <p>No bookings found for this email</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Expert ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const badge = getStatusBadge(booking.status);
                return (
                  <tr key={booking._id}>
                    <td>{booking.expertId}</td>
                    <td>{booking.date}</td>
                    <td>{booking.slot}</td>
                    <td>
                      <span className={badge.className}>{badge.text}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default MyBookings;
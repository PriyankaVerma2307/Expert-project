import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiUser, FiLogOut, FiCalendar, FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <h2 className="logo" onClick={() => navigate("/")}>
          Expert<span className="logo-accent">Booking</span>
        </h2>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-nav">
          <Link to="/experts" className={`nav-link ${location.pathname === '/experts' ? 'active' : ''}`}>
            Experts
          </Link>
          {token ? (
            <div className="nav-actions">
              <button
                className="action-btn"
                onClick={() => navigate("/my-bookings")}
                title="My Bookings"
              >
                <FiCalendar className="btn-icon" />
                <span>Bookings</span>
              </button>
              <button
                className="action-btn profile-btn"
                onClick={() => navigate("/profile")}
                title="Profile"
              >
                <FiUser className="btn-icon" />
                <span>Profile</span>
              </button>
              <button className="action-btn logout-btn" onClick={handleLogout} title="Logout">
                <FiLogOut className="btn-icon" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <Link to="/experts" className={`mobile-nav-link ${location.pathname === '/experts' ? 'active' : ''}`}>
            Experts
          </Link>
          {token ? (
            <>
              <button className="mobile-nav-btn" onClick={() => navigate("/my-bookings")}>
                <FiCalendar className="btn-icon" /> My Bookings
              </button>
              <button className="mobile-nav-btn" onClick={() => navigate("/profile")}>
                <FiUser className="btn-icon" /> Profile
              </button>
              <button className="mobile-nav-btn logout" onClick={handleLogout}>
                <FiLogOut className="btn-icon" /> Logout
              </button>
            </>
          ) : (
            <button className="mobile-nav-btn login-mobile" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
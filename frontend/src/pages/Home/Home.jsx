import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaBolt, FaShieldAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="home-wrapper">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <motion.div 
            className="nav-logo" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            Expert<span>Booking</span>
          </motion.div>
          
          <motion.div 
            className="nav-links"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <button className="nav-btn-text" onClick={() => navigate("/login")}>Login</button>
            <button className="nav-btn-primary" onClick={() => navigate("/signup")}>Sign Up</button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-video-container">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="https://cdn.pixabay.com/video/2020/05/25/40118-426464520_large.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        {/* 3D Floating Elements CSS based */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>

        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Book Trusted Experts <span>Easily</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Find verified professionals and schedule sessions instantly with our premium smart booking platform.
          </motion.p>
          <motion.button 
            className="hero-cta" 
            onClick={handleGetStarted}
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose Us</h2>
          <p>Experience the most seamless way to connect with experts.</p>
        </motion.div>

        <div className="features-grid">
          {[
            { icon: <FaUserCheck />, title: "Verified Experts", desc: "All professionals are carefully selected and verified to ensure top quality." },
            { icon: <FaBolt />, title: "Instant Booking", desc: "Choose a slot and confirm your session in seconds without any hassle." },
            { icon: <FaShieldAlt />, title: "Secure Platform", desc: "Your bookings and data are fully protected with enterprise-grade security." }
          ].map((feature, index) => (
            <motion.div 
              className="feature-card" 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>How It Works</h2>
          <p>Three simple steps to get the help you need.</p>
        </motion.div>

        <div className="steps-container">
          {[
            { step: "01", title: "Find an Expert", desc: "Browse our curated list of professionals across various domains." },
            { step: "02", title: "Book a Session", desc: "Select an available time slot that perfectly fits your schedule." },
            { step: "03", title: "Connect & Grow", desc: "Join the session and start learning from the best in the industry." }
          ].map((item, index) => (
            <motion.div 
              className="step-card" 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="step-number">{item.step}</div>
              <div className="step-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="features">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Platform Highlights</h2>
          <p>Everything you need to connect, book, and grow.</p>
        </motion.div>

        <div className="features-grid">
          {[
            { icon: <FaUserCheck />, title: "500+ Verified Experts", desc: "Hand-picked professionals across tech, business, design, and more." },
            { icon: <FaBolt />,      title: "Real-Time Availability", desc: "Live slot updates so you always book at the right time." },
            { icon: <FaShieldAlt />, title: "End-to-End Security", desc: "Your data and payments are protected with industry-grade encryption." },
          ].map((item, index) => (
            <motion.div
              className="feature-card"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Expert<span>Booking</span></h3>
            <p>Empowering your journey with top-tier professionals.</p>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="#">Browse Experts</a>
              <a href="#">Pricing</a>
              <a href="#">FAQ</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Careers</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ExpertBooking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
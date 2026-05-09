import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlotSelector from "../../components/SlotSelector/SlotSelector";
import "./ExpertDetail.css";

// Same avatar pool as ExpertCard
const BASE = "https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=b6e3f4,ffdfbf,c0aede,d1d4f9&radius=50";
const AVATAR_POOL = [
  `${BASE}&seed=Felix`, `${BASE}&seed=Lily`,  `${BASE}&seed=Oliver`,
  `${BASE}&seed=Emma`,  `${BASE}&seed=Ethan`, `${BASE}&seed=Sophia`,
  `${BASE}&seed=Lucas`, `${BASE}&seed=Mia`,   `${BASE}&seed=Noah`,
  `${BASE}&seed=Aria`,
];
function getAvatar(expert) {
  if (expert?.image) return expert.image;
  const id = expert?._id || "";
  const code = id.charCodeAt(id.length - 1) || 0;
  return AVATAR_POOL[code % AVATAR_POOL.length];
}

const TABS = ["About", "Specialization", "Book Session"];

function ExpertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState("About");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [liked, setLiked]             = useState(false);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const res  = await fetch(`${API}/api/experts/${id}`);
        const data = await res.json();
        setExpert(data.expert || data.data || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExpert();
  }, [id]);

  const handleSlotSelect = (date, slot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot first.");
      return;
    }
    navigate("/booking", {
      state: { expertId: id, expertName: expert?.name, date: selectedDate, slot: selectedSlot },
    });
  };

  /* ---------- loading / error states ---------- */
  if (loading) return (
    <div className="ed-loading">
      <div className="ed-spinner" />
      <p>Loading expert profile…</p>
    </div>
  );
  if (!expert) return (
    <div className="ed-loading">
      <p>Expert not found.</p>
    </div>
  );

  const rating      = expert.rating || 4.8;
  const sessions    = expert.sessions || 120;
  const price       = expert.price || 50;
  const experience  = expert.experience || 5;

  return (
    <div className="ed-page">

      {/* ── HERO BANNER ── */}
      <motion.div
        className="ed-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="ed-hero-bg" />

        <div className="ed-hero-inner">
          {/* Avatar */}
          <motion.div
            className="ed-avatar-wrap"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={getAvatar(expert)} alt={expert.name} className="ed-avatar" />
            <span className="ed-online-dot" title="Available" />
          </motion.div>

          {/* Info */}
          <div className="ed-hero-info">
            <div className="ed-name-row">
              <h1 className="ed-name">{expert.name}</h1>
              <button
                className={`ed-like-btn ${liked ? "liked" : ""}`}
                onClick={() => setLiked(p => !p)}
                title={liked ? "Saved" : "Save expert"}
              >
                {liked ? "♥" : "♡"}
              </button>
            </div>
            <p className="ed-role">{expert.specialization || expert.category || "Expert Consultant"}</p>

            <div className="ed-badges">
              <span className="ed-badge cat">{expert.category}</span>
              <span className="ed-badge exp">💼 {experience}+ yrs</span>
              <span className="ed-badge price">💰 ${price}/hr</span>
            </div>

            {/* Stats */}
            <div className="ed-stats">
              {[
                { label: "Rating",   value: `${rating}★` },
                { label: "Sessions", value: `${sessions}+` },
                { label: "Response", value: "< 1hr" },
                { label: "Success",  value: "98%" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="ed-stat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="ed-stat-val">{s.value}</span>
                  <span className="ed-stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN BODY ── */}
      <div className="ed-body">

        {/* LEFT — tabs + content */}
        <div className="ed-left">

          {/* Tab bar */}
          <div className="ed-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`ed-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div className="ed-tab-line" layoutId="tab-underline" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="ed-tab-content"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "About" && (
                <div className="ed-section">
                  <h3>About {expert.name}</h3>
                  <p>{expert.description || "A highly experienced professional dedicated to helping clients achieve their goals through personalised sessions and expert guidance."}</p>

                  {/* Skills */}
                  <h4 className="ed-sub-heading">Skills &amp; Expertise</h4>
                  <div className="ed-skills">
                    {(expert.skills || ["Consulting", "Strategy", "Analysis", "Leadership", "Mentorship"]).map((s, i) => (
                      <motion.span
                        key={i}
                        className="ed-skill-chip"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="ed-highlights">
                    {[
                      { icon: "🎓", text: "Certified Industry Professional" },
                      { icon: "🌍", text: "Works with global clients" },
                      { icon: "⏱️", text: "Flexible scheduling available" },
                      { icon: "🔒", text: "Confidential & secure sessions" },
                    ].map((h, i) => (
                      <div key={i} className="ed-highlight-item">
                        <span className="ed-h-icon">{h.icon}</span>
                        <span>{h.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Specialization" && (
                <div className="ed-section">
                  <h3>Area of Specialization</h3>
                  <p className="ed-spec-main">{expert.specialization || expert.category || "General Consulting"}</p>
                  <p>{expert.description || "This expert brings deep knowledge and hands-on experience to every session."}</p>

                  <div className="ed-spec-cards">
                    {[
                      { icon: "🎯", title: "Core Focus",      body: expert.specialization || "Strategic Planning" },
                      { icon: "📊", title: "Domain",          body: expert.category || "Business & Finance" },
                      { icon: "🛠️", title: "Methodology",    body: "Data-driven, client-centric approach" },
                      { icon: "📈", title: "Outcome",         body: "Measurable results and long-term growth" },
                    ].map((c, i) => (
                      <motion.div
                        key={i}
                        className="ed-spec-card"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <span className="ed-sc-icon">{c.icon}</span>
                        <strong>{c.title}</strong>
                        <p>{c.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Book Session" && (
                <div className="ed-section">
                  <h3>Select a Time Slot</h3>
                  <p className="ed-book-hint">Choose a date and available time to book your session with {expert.name}.</p>
                  <div className="ed-slot-wrapper">
                    <SlotSelector onSelect={handleSlotSelect} />
                  </div>
                  {selectedDate && selectedSlot && (
                    <motion.div
                      className="ed-selection-confirm"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ✅ Selected: <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>
                    </motion.div>
                  )}
                  <button
                    className="ed-book-btn"
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedSlot}
                  >
                    Confirm Booking →
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — sticky booking card */}
        <motion.aside
          className="ed-sidebar"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="ed-sidebar-card">
            <div className="ed-price-display">
              <span className="ed-price-amount">${price}</span>
              <span className="ed-price-unit">/ hour</span>
            </div>

            <div className="ed-sidebar-perks">
              {["1-on-1 live session", "Session recording included", "Follow-up Q&A support", "Cancel up to 2hrs before"].map((p, i) => (
                <div key={i} className="ed-perk">
                  <span className="ed-perk-check">✓</span> {p}
                </div>
              ))}
            </div>

            <button
              className="ed-sidebar-book-btn"
              onClick={() => setActiveTab("Book Session")}
            >
              Book Now
            </button>

            <button className="ed-sidebar-msg-btn">
              💬 Message Expert
            </button>

            <p className="ed-sidebar-note">Free cancellation up to 2 hours before the session</p>
          </div>

          {/* Mini info card */}
          <div className="ed-sidebar-mini">
            <div className="ed-mini-row">
              <span>Category</span><strong>{expert.category || "—"}</strong>
            </div>
            <div className="ed-mini-row">
              <span>Experience</span><strong>{experience}+ Years</strong>
            </div>
            <div className="ed-mini-row">
              <span>Rating</span><strong>{rating} / 5 ★</strong>
            </div>
            <div className="ed-mini-row">
              <span>Sessions</span><strong>{sessions}+</strong>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

export default ExpertDetail;
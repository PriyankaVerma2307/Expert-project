import React, { useState, useEffect } from "react";
import ExpertCard from "../../components/ExpertCard/ExpertCard";
import SkeletonCard from "../../components/ExpertCard/SkeletonCard";
import "./ExpertList.css";

function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const categories = ["All", "Tech", "Career", "Health", "Finance", "Education"];
  const expOptions = [
    { label: "Any Experience", value: "" },
    { label: "3+ Years", value: "3" },
    { label: "5+ Years", value: "5" },
    { label: "10+ Years", value: "10" },
  ];
  const ratingOptions = [
    { label: "Any Rating", value: "" },
    { label: "4.0+", value: "4" },
    { label: "4.5+", value: "4.5" },
  ];

  const fetchExperts = async (
    currentPage = page,
    currentSearch = search,
    currentCategory = category,
    currentExp = experience,
    currentRating = rating
  ) => {
    setLoading(true);
    setError("");

    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit,
      });

      if (currentSearch) queryParams.append("search", currentSearch);
      if (currentCategory !== "All") queryParams.append("category", currentCategory);
      if (currentExp) queryParams.append("experience", currentExp);
      if (currentRating) queryParams.append("rating", currentRating);

      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/experts?${queryParams}`);
      const data = await res.json();

      if (data.experts) {
        setExperts(data.experts);
        setTotalPages(data.totalPages || Math.ceil(data.total / limit));
      } else {
        setExperts([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError("Failed to load experts. Please try again.");
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 800); // Slight delay for smooth skeleton transition
    }
  };

  useEffect(() => {
    fetchExperts(page, search, category, experience, rating);
  }, [page, category, experience, rating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchExperts(1, search, category, experience, rating);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="expert-list-page">
      <div className="hero-section">
        <h1 className="page-title">Discover Top <span className="gradient-text">Experts</span></h1>
        <p className="page-subtitle">Connect with industry leaders and accelerate your growth with personalized mentorship.</p>
      </div>

      <div className="filter-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or skill..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Category</label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Experience</label>
            <select value={experience} onChange={(e) => { setExperience(e.target.value); setPage(1); }}>
              {expOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Rating</label>
            <select value={rating} onChange={(e) => { setRating(e.target.value); setPage(1); }}>
              {ratingOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="main-content">
        {loading ? (
          <div className="card-grid">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => fetchExperts()} className="retry-btn">Try Again</button>
          </div>
        ) : experts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">🔍</div>
            <h3>No Experts Found</h3>
            <p>We couldn't find any experts matching your current filters. Try adjusting your search criteria.</p>
            <button onClick={() => {
              setSearch("");
              setCategory("All");
              setExperience("");
              setRating("");
            }} className="reset-btn">Clear All Filters</button>
          </div>
        ) : (
          <>
            <div className="card-grid">
              {experts.map((expert) => (
                <ExpertCard key={expert._id} expert={expert} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <button
                  className="nav-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Prev
                </button>
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={`page-num ${page === i + 1 ? "active" : ""}`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="nav-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ExpertList;
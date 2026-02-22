import React, { useState, useEffect } from "react";
import ExpertCard from "../../components/ExpertCard/ExpertCard";
import "./ExpertList.css";

function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const categories = ["All", "Tech", "Career", "Health", "Finance", "Education"];

  // ✅ Fetch experts
  const fetchExperts = async (
    currentPage = page,
    currentSearch = search,
    currentCategory = category
  ) => {
    setLoading(true);
    setError("");

    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit,
      });

      if (currentSearch) queryParams.append("search", currentSearch);
      if (currentCategory !== "All")
        queryParams.append("category", currentCategory);

      const res = await fetch(
        `http://localhost:5000/api/experts?${queryParams}`
      );
      const data = await res.json();

      if (data.experts) {
        setExperts(data.experts);
        setTotalPages(
          data.totalPages || Math.ceil(data.total / limit)
        );
      } else {
        setExperts(data);
      }
    } catch (err) {
      setError("Failed to load experts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch on page/category change
  useEffect(() => {
    fetchExperts(page, search, category);
  }, [page, category]);

  // 🔹 Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchExperts(1, search, category);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="expert-list-page">
      <h2 className="page-title">Find Your Expert</h2>

      
      <div className="filter-wrapper">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search expert by name..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                category === cat ? "active" : ""
              }`}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ===== LOADING ===== */}
      {loading && (
        <div className="loading-container">
          <p>Loading experts...</p>
        </div>
      )}

      {/* ===== ERROR ===== */}
      {error && (
        <div className="error-container">
          <p style={{ color: "red" }}>{error}</p>
          <button
            onClick={() => fetchExperts()}
            className="page-btn"
          >
            Retry
          </button>
        </div>
      )}

      {/* ===== DATA ===== */}
      {!loading && !error && (
        <>
          <div className="card-grid">
            {experts.length === 0 ? (
              <p className="no-data">No experts found</p>
            ) : (
              experts.map((expert) => (
                <ExpertCard key={expert._id} expert={expert} />
              ))
            )}
          </div>

          {experts.length > 0 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={handlePrev}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className="page-info">
                Page {page} of {totalPages}
              </span>

              <button
                className="page-btn"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ExpertList;
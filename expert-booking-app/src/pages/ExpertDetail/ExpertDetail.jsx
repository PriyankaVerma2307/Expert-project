import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SlotSelector from "../../components/SlotSelector/SlotSelector";
import "./ExpertDetail.css";

function ExpertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(true);
  

  // 🔹 Fetch Expert Details
  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/experts/${id}`);
        const data = await res.json();
        setExpert(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExpert();
  }, [id]);

  // 🔹 Receive slot from SlotSelector
  const handleSlotSelect = (date, slot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and slot");
      return;
    }

    

    navigate("/booking", {
      state: {
        expertId: id,
        expertName: expert?.name,
        date: selectedDate,
        slot: selectedSlot,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!expert) return <p>Expert not found</p>;

  return (
    <div className="expert-detail-page">
  <div className="expert-detail-container">

    

    
    <div className="expert-detail-right">
      <h2 className="expert-detail-title">{expert.name}</h2>
      <div className="expert-meta">
        <span className="expert-badge">{expert.category}</span>
        <span>{expert.experience} Years Experience</span>
      </div>

      <div className="expert-section">
        <h4>Specialization</h4>
        <p>{expert.specialization}</p>
      </div>

      <div className="expert-section">
        <h4>About</h4>
        <p>{expert.description}</p>
      </div>

      <SlotSelector onSelect={handleSlotSelect} />

      <button className="primary-btn" onClick={handleBooking}>
        Book Now
      </button>
    </div>

  </div>
</div>
  );
}

export default ExpertDetail;
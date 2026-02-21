import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SlotSelector = ({ onSelect }) => {
  const { id } = useParams();
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const slotsData = {};
      const today = new Date();

      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];

        try {
          const res = await axios.get(
            `http://localhost:5000/api/bookings?expertId=${id}&date=${dateStr}`
          );
          slotsData[dateStr] = res.data.map((b) => b.slot);
        } catch {
          slotsData[dateStr] = [];
        }
      }

      setBookedSlots(slotsData);
      setLoading(false);
    };

    if (id) fetchBookedSlots();
  }, [id]);

  if (loading) return <p>Loading slots...</p>;

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <div>
      {Object.keys(bookedSlots).map((date) => (
        <div key={date}>
          <h4>{date}</h4>

          {timeSlots.map((time) => {
            const isBooked = bookedSlots[date]?.includes(time);

            return (
              <button
                key={time}
                disabled={isBooked}
                onClick={() => {
                  setSelectedSlot({ date, time });
                  onSelect(date, time); // 🔥 parent ko bhej rahe
                }}
                style={{
                  margin: "6px",
                  padding: "8px 12px",
                  background:
                    selectedSlot?.date === date &&
                    selectedSlot?.time === time
                      ? "#2563eb"
                      : isBooked
                      ? "#ef4444"
                      : "#e5e7eb",
                  color: isBooked ? "white" : "black",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isBooked ? "not-allowed" : "pointer",
                }}
              >
                {time}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SlotSelector;
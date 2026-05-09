import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    required: true,
  },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
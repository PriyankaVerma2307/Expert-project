import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  category: { type: String },
  experience: { type: Number },
  rating: { type: Number, default: 4.5 },
  description: { type: String },
  price: { type: Number },
  image: { type: String }, // For profile pics
});

export default mongoose.model("Expert", expertSchema);
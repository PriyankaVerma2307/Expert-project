import Expert from "../models/Expert.js";
import Booking from "../models/Booking.js";

// Get all experts with pagination, search, category
export const getExperts = async (req, res) => {
  try {
    const { page = 1, limit = 5, category, search } = req.query;

    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const experts = await Expert.find(query)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Expert.countDocuments(query);

    res.json({ experts, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single expert by ID
export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.json(expert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { expertId, date, slot } = req.body;

    // Check if slot is already booked
    const existingBooking = await Booking.findOne({ expertId, date, slot });
    if (existingBooking) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const booking = new Booking({ expertId, date, slot });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
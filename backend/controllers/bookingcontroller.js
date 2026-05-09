import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const { expertId, date, slot, notes } = req.body;

  try {
    const existingBooking = await Booking.findOne({ expertId, date, slot });
    if (existingBooking) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      expertId,
      date,
      slot,
      notes,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate("expertId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBookedSlots = async (req, res) => {
  const { expertId, date } = req.query;
  try {
    const bookings = await Booking.find({ expertId, date });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
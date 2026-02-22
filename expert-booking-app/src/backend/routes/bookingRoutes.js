
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");


router.post("/", async (req, res) => {
  try {
    const { expertId, date, slot, name, email, phone } = req.body;

    if (!expertId || !date || !slot || !name || !email) {
      return res.status(400).json({ message: "Expert, date, slot, name, and email are required." });
    }

    // Check if slot already booked
    const existingBooking = await Booking.findOne({ expertId, date, slot });
    if (existingBooking) {
      return res.status(400).json({ message: "This slot is already booked." });
    }

    const booking = new Booking({ expertId, date, slot, name, email, phone });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create booking.", error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { expertId, date } = req.query;

    const query = {};
    if (expertId) query.expertId = expertId;
    if (date) query.date = date;

    const bookings = await Booking.find(query).sort({ date: 1, slot: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings.", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch booking.", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json({ message: "Booking deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete booking.", error: err.message });
  }
});

module.exports = router;
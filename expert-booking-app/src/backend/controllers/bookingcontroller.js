const Booking = require("../models/Booking");

/*
====================================
1️⃣ Create Booking (with double booking protection)
====================================
*/
exports.createBooking = async (req, res) => {
  try {
    const { expertId, date, slot } = req.body;

    // Basic validation
    if (!expertId || !date || !slot) {
      return res.status(400).json({
        message: "expertId, date and slot are required",
      });
    }

    // Check if slot already booked
    const existingBooking = await Booking.findOne({
      expertId,
      date,
      slot,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    // Create booking
    const booking = new Booking({
      expertId,
      date,
      slot,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/*
====================================
2️⃣ Get Booked Slots by Expert & Date
====================================
Query Example:
GET /api/bookings?expertId=123&date=2026-02-20
====================================
*/
exports.getBookedSlots = async (req, res) => {
  try {
    const { expertId, date } = req.query;

    if (!expertId || !date) {
      return res.status(400).json({
        message: "expertId and date are required",
      });
    }

    const bookings = await Booking.find({
      expertId,
      date,
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
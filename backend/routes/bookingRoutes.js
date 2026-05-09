import express from "express";
import { createBooking, getMyBookings, getBookedSlots } from "../controllers/bookingcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/slots", getBookedSlots);

export default router;
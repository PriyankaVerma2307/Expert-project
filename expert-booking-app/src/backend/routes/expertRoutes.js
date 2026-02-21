// expertRoutes.js (ESM version)
import express from "express";
import Expert from "../models/Expert.js"; // note the .js extension
import { getExperts, getExpertById } from "../controllers/expertcontroller.js";

const router = express.Router();

// Add Expert
router.post("/", async (req, res) => {
  try {
    const expert = new Expert(req.body);
    await expert.save();
    res.status(201).json(expert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Expert by ID
router.get("/:id", getExpertById);

// Get All Experts
router.get("/", getExperts);

export default router;
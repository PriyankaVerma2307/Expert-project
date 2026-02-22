
import express from "express";
import Expert from "../models/Expert.js"; 
import { getExperts, getExpertById } from "../controllers/expertcontroller.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const expert = new Expert(req.body);
    await expert.save();
    res.status(201).json(expert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/:id", getExpertById);


router.get("/", getExperts);

export default router;
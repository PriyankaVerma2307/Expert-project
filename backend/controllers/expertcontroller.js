import Expert from "../models/Expert.js";

export const getExperts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, experience, rating } = req.query;
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (experience) {
      query.experience = { $gte: Number(experience) };
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
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

export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ message: "Expert not found" });
    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
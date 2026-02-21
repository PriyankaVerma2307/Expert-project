const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: String,

  category: {
    type: String,
  },

  experience: {
    type: Number,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  description: {
     type: String,
  },

  price: Number,
});

module.exports = mongoose.model("Expert", expertSchema);
// src/backend/populateExperts.js
const mongoose = require("mongoose");
const Expert = require("./models/Expert");
require("dotenv").config();

const experts = [
  { name: "John Doe", specialization: "Web Development", category: "Tech", experience: 5, description: "React & Node expert" },
  { name: "Jane Smith", specialization: "Career Coaching", category: "Career", experience: 8, description: "Helps with job transitions" },
  { name: "Alice Johnson", specialization: "Financial Advisor", category: "Finance", experience: 10, description: "Investment strategies" },
  { name: "Bob Williams", specialization: "Health Consultant", category: "Health", experience: 6, description: "Fitness and nutrition" },
  { name: "Sara Lee", specialization: "Teacher", category: "Education", experience: 12, description: "Math and Science tutoring" },
  { name: "Mike Brown", specialization: "Tech Support", category: "Tech", experience: 4, description: "IT troubleshooting" }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await Expert.deleteMany({}); // Optional: clear old data
    await Expert.insertMany(experts);
    console.log("Experts added!");
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));
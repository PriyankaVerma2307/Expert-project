import mongoose from "mongoose";
import Expert from "./models/Expert.js";
import dotenv from "dotenv";

dotenv.config();

const experts = [
  { name: "Dr. Aris Thorne", specialization: "Web Development", category: "Tech", experience: 12, price: 150, rating: 4.9, description: "Senior Architect with deep expertise in React, Node.js, and cloud systems.", image: "https://i.pravatar.cc/150?u=aris" },
  { name: "Elena Vance", specialization: "Career Coaching", category: "Career", experience: 10, price: 120, rating: 4.8, description: "Helping professionals transition into high-impact roles and tech leadership.", image: "https://i.pravatar.cc/150?u=elena" },
  { name: "Julian Mars", specialization: "Financial Advisor", category: "Finance", experience: 15, price: 200, rating: 5.0, description: "Investment strategies and wealth management for long-term growth.", image: "https://i.pravatar.cc/150?u=julian" },
  { name: "Sophia Luna", specialization: "Health Consultant", category: "Health", experience: 7, price: 90, rating: 4.7, description: "Holistic approach to fitness, nutrition, and mental well-being.", image: "https://i.pravatar.cc/150?u=sophia" },
  { name: "Marcus Flint", specialization: "UI/UX Design", category: "Design", experience: 9, price: 130, rating: 4.8, description: "Creating stunning, user-centric interfaces and digital experiences.", image: "https://i.pravatar.cc/150?u=marcus" },
  { name: "Isla Ray", specialization: "Teacher", category: "Education", experience: 5, price: 80, rating: 4.6, description: "Passionate educator focusing on math and science foundations.", image: "https://i.pravatar.cc/150?u=isla" }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await Expert.deleteMany({});
    await Expert.insertMany(experts);
    console.log("Premium experts added!");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
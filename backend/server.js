import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import donationRoutes from "./routes/donationRoutes.js";
import { connectDB } from "./config/db.js";
import loginRoutes from "./routes/loginRoutes.js";

dotenv.config(); // Ensure environment variables are loaded at the top

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

connectDB();

// **REMOVED the duplicate mongoose import and donationSchema here**

// Routes
app.use("/api/donations", donationRoutes); // Donation routes are now handled properly
app.use("/api", loginRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Logging Middleware
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

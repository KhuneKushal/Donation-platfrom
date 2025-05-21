import express from "express";
import mongoose from "mongoose";
import Donation from "../models/Donation.js"; // ✅ Fix: Import the model
import { saveDonation, getUserDonations, getAllDonations } from "../controllers/DonationController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Save a donation (Authenticated users)
router.post("/save", authMiddleware, saveDonation);

// Get donations for the logged-in user
router.get("/user-donations", authMiddleware, getUserDonations);

// Get all donations (Public)
router.get("/", getAllDonations); // ✅ Fix: Let the controller handle this

export default router;

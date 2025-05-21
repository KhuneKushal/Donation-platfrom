import mongoose from "mongoose";
import Donation from "../models/Donation.js";

// Save a donation
export const saveDonation = async (req, res) => {
  try {
    // Create new donation object from request body
    const donation = new Donation(req.body);
    
    // Save donation to database
    await donation.save();
    
    res.status(201).json({
      message: "Donation saved successfully.",
      donation
    });
  } catch (error) {
    if (error.code === 11000) {
      // This error shouldn't happen anymore after removing unique constraints,
      // but keeping the handling just in case
      console.error("Duplicate Entry Error:", error.message);
      return res.status(400).json({
        message: "There was an issue processing your donation. Please try again."
      });
    }
    
    if (error instanceof mongoose.Error.ValidationError) {
      console.error("Validation Error:", error.message);
      return res.status(400).json({
        message: `Validation Error: ${error.message}`
      });
    }
    
    console.error("Unhandled Error:", error.message);
    return res.status(500).json({
      message: "Server error while saving donation."
    });
  }
};

// Get donations for the authenticated user
export const getUserDonations = async (req, res) => {
  try {
    const userEmail = req.user.email; // Authenticated user's email from token
    
    // Find donations by email
    const donations = await Donation.find({ email: userEmail })
                                  .sort({ createdAt: -1 }); // Sort by newest first
    
    if (!donations.length) {
      return res.status(404).json({
        message: "No donations found for this user."
      });
    }
    
    res.status(200).json({
      message: "Donations retrieved successfully.",
      donations
    });
  } catch (error) {
    console.error("Error fetching donations:", error.message);
    return res.status(500).json({
      message: "Server error while fetching donations."
    });
  }
};

// Get all donations for admin
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }); // Newest first
    
    if (!donations.length) {
      return res.status(404).json({ message: "No donations found." });
    }
    
    res.status(200).json({
      message: "All donations retrieved successfully.",
      donations
    });
  } catch (error) {
    console.error("Error fetching donations:", error.message);
    res.status(500).json({
      message: "Server error while fetching donations."
    });
  }
};

// Get donations by type (could be useful for reports)
export const getDonationsByType = async (req, res) => {
  const { type } = req.params;
  
  try {
    // Validate donation type
    if (!["food", "clothing", "electronics", "books", "groceries"].includes(type)) {
      return res.status(400).json({ message: "Invalid donation type" });
    }
    
    // Find donations by type
    const donations = await Donation.find({ donationType: type }).sort({ createdAt: -1 });
    
    if (!donations.length) {
      return res.status(404).json({ message: `No ${type} donations found.` });
    }
    
    res.status(200).json({
      message: `${type} donations retrieved successfully.`,
      donations
    });
  } catch (error) {
    console.error(`Error fetching ${type} donations:`, error.message);
    return res.status(500).json({
      message: `Server error while fetching ${type} donations.`
    });
  }
};

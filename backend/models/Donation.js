import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  // Basic donor information
  email: { type: String, required: true },
  donorName: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  ngo: { type: String, required: true },
  
  // Donation type
  donationType: {
    type: String,
    required: true,
    enum: ["food", "clothing", "electronics", "books", "groceries"]
  },

  // Delivery options
  needVolunteers: { type: Boolean, default: false },
  selfDelivery: { type: Boolean, default: false },
  
  // Common fields that might be shared across donation types
  quantity: { type: String },
  
  // Type-specific fields
  // Food donation fields
  expiry: { type: String },
  prepared: { type: String },
  packed: { type: String },
  
  // Books donation fields
  bookCondition: { type: String },
  
  // Electronics donation fields
  electronicsCondition: { type: String },
  electronicsDescription: { type: String },
  
  // Clothing donation fields
  clothingDescription: { type: String },
  clothingFor: { type: String },
  
  // Groceries donation fields
  groceryItems: { type: String },
  
  // Generic details field for any other data
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Timestamp
  createdAt: { type: Date, default: Date.now },
});

// Non-unique index for performance
donationSchema.index({ email: 1 }, { unique: false });



const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
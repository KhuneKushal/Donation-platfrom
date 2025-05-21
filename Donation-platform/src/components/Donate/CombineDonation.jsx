import React, { useState } from "react";
import "./CombineDonation.css";

const CombinedDonationForm = () => {
  const [donationType, setDonationType] = useState(""); // Selected donation type
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    donorName: "",
    contactNo: "",
    address: "",
    email: "", // Email of the donor
    ngo: "",
    needVolunteers: false,
    selfDelivery: false,
    // Initialize all possible form fields with empty values to prevent uncontrolled to controlled issues
    expiry: "",
    prepared: "",
    packed: "packed", // Default value
    quantity: "",
    bookCondition: "",
    electronicsCondition: "",
    electronicsDescription: "",
    clothingDescription: "",
    clothingFor: "",
    details: {}, // Dynamic details field
  });

  // NGO list based on donation types
  const ngos = {
    food: ["GODS FAMILY ORPHANAGE", "SEEDLING PUBLIC SCHOOL", "SAKAL RELIEF FUND", "SANKALP OLDAGE HOME"],
    clothing: ["REUSE FASHION", "AHABAN", "CHILD WELFARE SOCIETY", "URBAN ADULCANCE HELP"],
    electronics: ["REUSE FASHION", "SANKALP OLDAGE HOME", "URBAN ADULCANCE HELP"],
    books: ["PRAGTI EDUCATION WELFARE SOCIETY", "MANVAV SHIKSHA SEWA SANSTHAN", "SEEDLING PUBLIC SCHOOL", "LIVE FOR OTHERS", "HUMAN RIGHTS(MINORITY'S GROUP)"],
    groceries: ["GODS FAMILY ORPHANAGE", "SAKAL RELIEF FUND", "CHILD WELFARE SOCIETY"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [name]: value },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDonationTypeChange = (e) => {
    const newType = e.target.value;
    setDonationType(newType);
    setFormData((prev) => ({
      ...prev,
      ngo: "",
      // Reset fields but keep them defined to prevent uncontrolled input errors
      expiry: "",
      prepared: "",
      packed: "packed",
      quantity: "",
      bookCondition: "",
      electronicsCondition: "",
      electronicsDescription: "",
      clothingDescription: "",
      clothingFor: "",
      details: {}, // Reset the details field
    }));
  };

  const validateForm = () => {
    // Check for mandatory fields
    if (!formData.donorName || !formData.email || !formData.contactNo || !formData.address || !donationType || !formData.ngo) {
      alert("Please fill out all required fields.");
      return false;
    }

    // Validate type-specific required fields
    if (donationType === "food" && (!formData.expiry || !formData.prepared || !formData.quantity)) {
      alert("Please fill out all food donation details.");
      return false;
    } else if (donationType === "books" && (!formData.bookCondition || !formData.quantity)) {
      alert("Please fill out all book donation details.");
      return false;
    } else if (donationType === "electronics" && (!formData.electronicsCondition || !formData.electronicsDescription)) {
      alert("Please fill out all electronics donation details.");
      return false;
    } else if (donationType === "clothing" && (!formData.clothingDescription || !formData.clothingFor || !formData.quantity)) {
      alert("Please fill out all clothing donation details.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      setIsLoading(false); // Make sure to set loading to false if submission is blocked
      return; // Prevent submission without token
    }

    try {
      const response = await fetch("http://localhost:4000/api/donations/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, donationType }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Donation submitted successfully!");
        // Reset form
        setFormData({
          donorName: "",
          contactNo: "",
          address: "",
          email: "",
          ngo: "",
          needVolunteers: false,
          selfDelivery: false,
          expiry: "",
          prepared: "",
          packed: "packed",
          quantity: "",
          bookCondition: "",
          electronicsCondition: "",
          electronicsDescription: "",
          clothingDescription: "",
          clothingFor: "",
          details: {},
        });
        setDonationType("");
      } else {
        alert(`Failed to submit donation: ${result.message || "Please try again."}`);
      }
    } catch (error) {
      alert("An error occurred while submitting. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div className="combined-form-container">
      <h2 className="combined-form-title">COMBINED DONATION FORM</h2>
      <form className="combined-form" onSubmit={handleSubmit}>
        {/* Donor Details */}
        <div className="combined-form-group">
          <label htmlFor="donorName">Name of Donor:</label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            required
            placeholder="Donor Name"
            value={formData.donorName}
            onChange={handleChange}
          />
        </div>
        <div className="combined-form-group">
          <label htmlFor="contactNo">Contact No.:</label>
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            required
            value={formData.contactNo}
            onChange={handleChange}
          />
        </div>
        <div className="combined-form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="combined-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange} 
            required
          />
        </div>

        {/* Delivery Options */}
        <div className="combined-form-group">
          <label>Choose Delivery Option:</label>
          <div>
            <input
              type="checkbox"
              id="needVolunteers"
              name="needVolunteers"
              checked={formData.needVolunteers}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="needVolunteers">Need Volunteers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="selfDelivery"
              name="selfDelivery"
              checked={formData.selfDelivery}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="selfDelivery">Self-Delivery to NGO</label>
          </div>
        </div>

        {/* Donation Type */}
        <div className="combined-form-group">
          <label htmlFor="donationType">Select Donation Type:</label>
          <select
            id="donationType"
            name="donationType"
            value={donationType}
            onChange={handleDonationTypeChange}
            required
          >
            <option value="">Select a Type</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>

         {donationType && (
          <div className="combined-form-group">
            <label htmlFor="ngo">Select NGO:</label>
            <select
              id="ngo"
              name="ngo"
              value={formData.ngo}
              onChange={handleChange}
              required
            >
              <option value="">Select an NGO</option>
              {ngos[donationType]?.map((ngo, index) => (
                <option key={index} value={ngo}>
                  {ngo}
                </option>
              ))}
            </select>
          </div>
        )}
  {/* Conditional Fields */}
        {donationType === "food" && (
          <>
            <div className="combined-form-group">
              <label htmlFor="expiry">Expiry Date:</label>
              <input 
                type="date" 
                id="expiry" 
                name="expiry" 
                value={formData.expiry} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="combined-form-group">
              <label htmlFor="prepared">Prepared Date:</label>
              <input 
                type="date" 
                id="prepared" 
                name="prepared" 
                value={formData.prepared} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="combined-form-group">
              <label>Packed:</label>
              <select 
                id="packed" 
                name="packed" 
                value={formData.packed} 
                onChange={handleChange}
              >
                <option value="packed">Packed</option>
                <option value="unpacked">Unpacked</option>
              </select>
            </div>
            <div className="combined-form-group">
              <label htmlFor="quantity">Quantity (Per Person):</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                placeholder="Enter quantity per person" 
                value={formData.quantity} 
                onChange={handleChange} 
                required 
              />
            </div>
          </>
        )}

        {donationType === "books" && (
          <>
            <div className="combined-form-group">
              <label htmlFor="bookCondition">Book Condition:</label>
              <input 
                type="text" 
                id="bookCondition" 
                name="bookCondition" 
                placeholder="Condition (New/Used)" 
                value={formData.bookCondition} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="combined-form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                placeholder="Enter book quantity" 
                value={formData.quantity} 
                onChange={handleChange} 
                required 
              />
            </div>
          </>
        )}

        {donationType === "electronics" && (
          <>
            <div className="combined-form-group">
              <label htmlFor="electronicsCondition">Electronics Condition:</label>
              <input
                type="text"
                id="electronicsCondition"
                name="electronicsCondition"
                placeholder="Condition (New/Used)"
                value={formData.electronicsCondition}
                onChange={handleChange}
                required
              />
            </div>
            <div className="combined-form-group">
              <label htmlFor="electronicsDescription">Description:</label>
              <textarea
                id="electronicsDescription"
                name="electronicsDescription"
                placeholder="Provide details about the electronics"
                value={formData.electronicsDescription}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        
        {donationType === "clothing" && (
          <>
            <div className="combined-form-group">
              <label htmlFor="clothingDescription">Clothing Description:</label>
              <textarea
                id="clothingDescription"
                name="clothingDescription"
                placeholder="Provide details about the clothing"
                value={formData.clothingDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="combined-form-group">
              <label htmlFor="clothingFor">Clothing For:</label>
              <select
                id="clothingFor"
                name="clothingFor"
                value={formData.clothingFor}
                onChange={handleChange}
                required
              >
                <option value="">Select Target</option>
                <option value="children">Children</option>
                <option value="adults">Adults</option>
              </select>
            </div>
            <div className="combined-form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter clothing quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        
        {donationType === "groceries" && (
          <>
            <div className="combined-form-group">
              <label htmlFor="groceryItems">Grocery Items:</label>
              <textarea
                id="groceryItems"
                name="groceryItems"
                placeholder="List the grocery items"
                value={formData.groceryItems || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="combined-form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter grocery quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        
        <div className="combined-form-group">
          <button type="submit" className="combined-submit-button">
            {isLoading ? "Submitting..." : "Submit Donation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CombinedDonationForm;
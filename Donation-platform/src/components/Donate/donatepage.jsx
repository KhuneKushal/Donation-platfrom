import React, { useState } from "react";
import "./donatepage.css";
import CombineDonationForm from "./CombineDonation"; // Import the combined form

const DonatePage = ({ isLoggedIn, setShowLogin }) => {
  const [selectedType, setSelectedType] = useState(null); // Track selected donation type
  const [successMessage, setSuccessMessage] = useState(""); // Display success message

  const handleDonateClick = (type) => {
    if (!isLoggedIn) {
      // If user isn't logged in, open the login popup
      setShowLogin(true);
      return;
    }
    setSuccessMessage(""); // Clear previous success message
    setSelectedType(type); // Set selected donation type
  };

  const handleFormSubmit = () => {
    setSuccessMessage("Form submitted successfully!");
    setSelectedType(null); // Hide the form after submission
  };

  return (
    <div className="donate-page">
      {!isLoggedIn ? (
        <div className="login-message">
          Please log in to access the donation page.
        </div>
      ) : (
        <>
          {/* Motivational Paragraph */}
          <div className="donation-header">
            <p>
              <i>
                <b>
                  "Your small contribution can spark a big change—stand with us to make a
                  difference!"
                </b>
              </i>
              <br />
              Together, we can feed the hungry, clothe the needy, and build a brighter future for
              countless lives.
            </p>
          </div>

          {/* Donation Container */}
          <div className="container">
            {/* Food Sector */}
            <div className="sector">
              <img src="/foodform.png" alt="Food" />
              <div className="text-area">
                Support us in feeding the hungry. Your donation can make a difference!
              </div>
              <button className="donate-button" onClick={() => handleDonateClick("Food")}>
                Donate Now
              </button>
            </div>

            {/* Clothing Sector */}
            <div className="sector">
              <img src="clothdonate.jfif" alt="Cloths" />
              <div className="text-area">
                Help provide clothing to those in need. Every small gesture counts!
              </div>
              <button className="donate-button" onClick={() => handleDonateClick("Clothing")}>
                Donate Now
              </button>
            </div>

            {/* Education Sector */}
            <div className="sector">
              <img src="books.jfif" alt="Education" />
              <div className="text-area">
                Sponsor education and create a brighter future for underprivileged children.
              </div>
              <button className="donate-button" onClick={() => handleDonateClick("Books")}>
                Donate Now
              </button>
            </div>

            {/* Electronics Sector */}
            <div className="sector">
              <img src="electronic.jfif" alt="Electronics" />
              <div className="text-area">
                Support by donating electronics for digital access and learning.
              </div>
              <button className="donate-button" onClick={() => handleDonateClick("Electronics")}>
                Donate Now
              </button>
            </div>

            {/* Groceries Sector */}
            <div className="sector">
              <img src="groceries.jfif" alt="Groceries" />
              <div className="text-area">
                Your generosity can help families with essential groceries. Donate today!
              </div>
              <button className="donate-button" onClick={() => handleDonateClick("Groceries")}>
                Donate Now
              </button>
            </div>
          </div>

          {/* Display Success Message */}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Render the CombineDonationForm as part of page flow */}
          {selectedType && (
            <div className="combined-form-container">
              <h3>Currently Selected: {selectedType} Donation</h3>
              <CombineDonationForm
                selectedType={selectedType} // Pass the selected type to the form
                onFormSubmit={handleFormSubmit}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DonatePage;

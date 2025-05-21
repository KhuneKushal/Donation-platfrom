import React, { useEffect, useState } from "react";
import "./YourDonation.css";

const YourDonation = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to be logged in to view your donations.");
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch("http://localhost:4000/api/donations/user-donations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        
        if (response.ok) {
          setDonations(data.donations);
        } else {
          setError(data.message || "Failed to fetch donations.");
          console.error("Error fetching donations:", data.message);
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error("Error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDonations();
  }, []);

  // Function to render type-specific details
  const renderDonationDetails = (donation) => {
    switch (donation.donationType) {
      case "food":
        return (
          <>
            <p><strong>Expiry Date:</strong> {donation.expiry}</p>
            <p><strong>Prepared Date:</strong> {donation.prepared}</p>
            <p><strong>Packed:</strong> {donation.packed}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
          </>
        );
      
      case "clothing":
        return (
          <>
            <p><strong>Description:</strong> {donation.clothingDescription}</p>
            <p><strong>For:</strong> {donation.clothingFor}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
          </>
        );
      
      case "electronics":
        return (
          <>
            <p><strong>Condition:</strong> {donation.electronicsCondition}</p>
            <p><strong>Description:</strong> {donation.electronicsDescription}</p>
          </>
        );
      
      case "books":
        return (
          <>
            <p><strong>Condition:</strong> {donation.bookCondition}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
          </>
        );
      
      case "groceries":
        return (
          <>
            <p><strong>Items:</strong> {donation.groceryItems}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
          </>
        );
      
      default:
        // Fallback to showing raw details
        return <p>{JSON.stringify(donation.details)}</p>;
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="your-donations">
      <h1>Your Donations</h1>
      
      {isLoading ? (
        <div className="loading-spinner">Loading donations...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : donations.length === 0 ? (
        <div className="no-donations">
          <p>You haven't made any donations yet.</p>
          <p>Make a difference by donating today!</p>
        </div>
      ) : (
        <div className="donations-container">
          {donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <div className="donation-header">
                <h3>{donation.ngo}</h3>
                <span className={`donation-type ${donation.donationType}`}>
                  {donation.donationType.charAt(0).toUpperCase() + donation.donationType.slice(1)}
                </span>
              </div>
              
              <div className="donation-info">
                <div className="donor-info">
                  <p><strong>Donor:</strong> {donation.donorName}</p>
                  <p><strong>Contact:</strong> {donation.contactNo}</p>
                </div>
                
                <div className="delivery-info">
                  <p>
                    <strong>Delivery:</strong> {donation.selfDelivery ? 'Self Delivery' : 'NGO Pickup'}
                    {donation.needVolunteers && ' (Volunteers Needed)'}
                  </p>
                </div>
              </div>
              
              <div className="details-section">
                <h4>Donation Details</h4>
                <div className="details-content">
                  {renderDonationDetails(donation)}
                </div>
              </div>
              
              <div className="donation-footer">
                <p className="donation-date">Donated on: {formatDate(donation.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourDonation;
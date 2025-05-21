import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonationList.css";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true); // Show loader while fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/donations");
        setDonations(response.data.donations); // Make sure you're accessing donations correctly
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to fetch donations. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="donation-list-container">
      <h2>All Donations</h2>

      {loading && <p>Loading donations...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="donation-table">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Email</th>
              <th>Donation Type</th>
              <th>Quantity</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index}>
                <td>{donation.donorName}</td>
                <td>{donation.email}</td>
                <td>{donation.donationType}</td>
                <td>{donation.quantity}</td>
                <td>{donation.contactNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonationList;

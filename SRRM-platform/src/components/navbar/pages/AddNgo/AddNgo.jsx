import React, { useState } from "react";
import "./AddNgo.css";

const AddNgo = () => {
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    incorporationDate: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    objectives: "",
    documents: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.registrationNumber ||
      !formData.incorporationDate ||
      !formData.contactPerson ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.objectives ||
      !formData.documents
    ) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear previous errors
    console.log("NGO Data Submitted:", formData);
    alert("NGO added successfully!");
  };

  return (
    <div className="ngo-container">
      <h1>Add NGO</h1>

      <div className="ngo-form">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>NGO Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Registration Number:</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />

          <label>Incorporation Date:</label>
          <input type="date" name="incorporationDate" value={formData.incorporationDate} onChange={handleChange} required />

          <label>Contact Person:</label>
          <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

          <label>Objectives:</label>
          <textarea name="objectives" value={formData.objectives} onChange={handleChange} required></textarea>

          <label>Upload Registration Document:</label>
          <input type="file" onChange={handleFileChange} required />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNgo;

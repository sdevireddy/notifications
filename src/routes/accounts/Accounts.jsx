import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import "./Accounts.css";  // You can create a custom CSS file for styling

const Accounts = () => {
  const [formData, setFormData] = useState({
    accountOwner: "",
    accountName: "",
    accountSite: "",
    accountNumber: "",
    industry: "",
    annualRevenue: "",
    rating: "HOT", // default value
    phone: "",
    website: "",
    tickerSymbol: "",
    ownership: "PUBLIC", // default value
    sicCode: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit form data, e.g., sending the data to the backend
    console.log("Account Created:", formData);
    // Navigate to the accounts list page (you can change the path as needed)
    navigate("/accounts");
  };

  return (
    <div className="create-account-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/accounts")}>
          <FiArrowLeft /> Back to Accounts
        </button>
        <h2>Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="create-account-form">
        <div className="form-group">
          <label htmlFor="accountOwner">Account Owner</label>
          <input
            type="text"
            id="accountOwner"
            name="accountOwner"
            value={formData.accountOwner}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountName">Account Name</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountSite">Account Site</label>
          <input
            type="text"
            id="accountSite"
            name="accountSite"
            value={formData.accountSite}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="annualRevenue">Annual Revenue</label>
          <input
            type="number"
            id="annualRevenue"
            name="annualRevenue"
            value={formData.annualRevenue}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          >
            <option value="HOT">HOT</option>
            <option value="WARM">WARM</option>
            <option value="COLD">COLD</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tickerSymbol">Ticker Symbol</label>
          <input
            type="text"
            id="tickerSymbol"
            name="tickerSymbol"
            value={formData.tickerSymbol}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownership">Ownership</label>
          <select
            id="ownership"
            name="ownership"
            value={formData.ownership}
            onChange={handleInputChange}
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="SUBSIDIARY">SUBSIDIARY</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sicCode">SIC Code</label>
          <input
            type="text"
            id="sicCode"
            name="sicCode"
            value={formData.sicCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">
            <FiSave /> Save Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accounts;

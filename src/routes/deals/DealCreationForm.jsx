import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const DealCreationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dealName: "",
    dealOwner: "",
    amount: "",
    closingDate: "",
    stage: "PROSPECTING",
    contact: "",
    account: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would send the data to your backend API (e.g., via axios or fetch)
    // For now, we will log the data to the console.
    console.log("Form Data Submitted: ", formData);

    // After form submission, navigate to the Deals page or show a success message
    navigate("/deals");
  };

  return (
    <div className="create-deal-form-container">
      <h2>Create New Deal</h2>
      <form onSubmit={handleSubmit} className="create-deal-form">
        <div className="form-group">
          <label htmlFor="dealName">Deal Name</label>
          <input
            type="text"
            id="dealName"
            name="dealName"
            value={formData.dealName}
            onChange={handleInputChange}
            required
            placeholder="Enter Deal Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dealOwner">Deal Owner</label>
          <input
            type="text"
            id="dealOwner"
            name="dealOwner"
            value={formData.dealOwner}
            onChange={handleInputChange}
            required
            placeholder="Enter Deal Owner"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            placeholder="Enter Deal Amount"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="closingDate">Closing Date</label>
          <input
            type="date"
            id="closingDate"
            name="closingDate"
            value={formData.closingDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">Stage</label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={handleInputChange}
            required
          >
            <option value="PROSPECTING">Prospecting</option>
            <option value="QUALIFICATION">Qualification</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="CLOSED_WON">Closed Won</option>
            <option value="CLOSED_LOST">Closed Lost</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
            placeholder="Enter Contact Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="account">Account</label>
          <input
            type="text"
            id="account"
            name="account"
            value={formData.account}
            onChange={handleInputChange}
            required
            placeholder="Enter Account Name"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">Create Deal</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/deals")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DealCreationForm;

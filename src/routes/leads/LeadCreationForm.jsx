import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCamera,
  FiUser,
  FiMail,
  FiBriefcase,
  FiMapPin,
  FiArrowLeft,
} from "react-icons/fi";
import "./LeadCreationForm.css";

const initialFormState = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  secondaryEmail: "",
  leadSource: "",
  leadStatus: "",
  company: "",
  title: "",
  website: "",
  industry: "",
  noOfEmployees: "",
  annualRevenue: "",
  rating: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  description: "",
};

const LeadCreationForm = () => {
  const navigate = useNavigate();
  const [leadImage, setLeadImage] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLeadImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveLead = async () => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: leadImage }),
      });
      const data = await response.json();
      console.log("Lead Saved:", data);
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  const convertLead = async () => {
    try {
      const response = await fetch("/api/leads/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      console.log("Lead Converted:", data);
    } catch (error) {
      console.error("Error converting lead:", error);
    }
  };

  const cancelLead = async () => {
    try {
      await fetch("/api/leads/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancelled", lead: formData }),
      });
    } catch (error) {
      console.error("Cancel API error:", error);
    } finally {
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveLead();
    console.log("Submitted", formData);
  };

  const handleSaveAndNew = async () => {
    await saveLead();
    setFormData(initialFormState);
    setLeadImage(null);
    console.log("Saved and cleared for new lead.");
  };

  return (
    <div className="w-[calc(100%-10px)] ml-[10px]">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="p-2 rounded hover:bg-gray-200"
            >
              <FiArrowLeft size={20} />
            </button>

            {/* Lead Image Upload */}
            <div
              title="Click to upload image"
              className="relative w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("lead-image-input").click()}
            >
              {leadImage ? (
                <img
                  src={leadImage}
                  alt="Lead"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FiCamera className="text-2xl text-gray-500" />
              )}
            </div>

            <h2 className="text-xl font-bold">Create Lead</h2>
          </div>
          <div className="space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={cancelLead}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={convertLead}
            >
              Convert
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleSaveAndNew}
            >
              Save And New
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>

        <input
          type="file"
          id="lead-image-input"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Basic Info Section */}
        <Section title="Basic Information" icon={<FiUser />}>
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Secondary Email" name="secondaryEmail" value={formData.secondaryEmail} onChange={handleChange} />
          <Select
            label="Lead Source"
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            options={["Website", "Referral", "Cold Call", "Social Media"]}
          />
          <Select
            label="Lead Status"
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            options={["New", "Contacted", "Qualified", "Lost"]}
          />
        </Section>

        {/* Company Info Section */}
        <Section title="Company Information" icon={<FiBriefcase />}>
          <Input label="Company" name="company" value={formData.company} onChange={handleChange} />
          <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
          <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
          <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
          <Input label="No. of Employees" name="noOfEmployees" value={formData.noOfEmployees} onChange={handleChange} />
          <Input label="Annual Revenue" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} />
          <Select
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            options={["Hot", "Warm", "Cold"]}
          />
        </Section>

        {/* Address Info Section */}
        <Section title="Contact Information" icon={<FiMapPin />}>
          <Input label="Address Line 1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
          <Input label="Address Line 2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
          <Input label="City" name="city" value={formData.city} onChange={handleChange} />
          <Input label="State" name="state" value={formData.state} onChange={handleChange} />
          <Input label="ZIP" name="zip" value={formData.zip} onChange={handleChange} />
          <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
        </Section>

        {/* Description Section */}
        <Section title="Description" icon={<FiMail />}>
          <div className="col-span-full">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </Section>
      </form>
    </div>
  );
};

// Reusable components
const Section = ({ title, icon, children }) => (
  <div className="border p-4 rounded mb-4">
    <h3 className="text-lg font-semibold border-b pb-1 mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
  </div>
);

const Input = ({ label, name, type = "text", value, onChange, required = false, className = "" }) => (
  <div className={className}>
    <label htmlFor={name} className="block text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options = [], required = false }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default LeadCreationForm;

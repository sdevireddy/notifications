import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiUser, FiMail, FiBriefcase, FiMapPin, FiArrowLeft } from "react-icons/fi";


const ContactCreationForm = () => {
  const navigate = useNavigate();
  const [contactImage, setContactImage] = useState(null);
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    secondaryEmail: "",
    contactSource: "",
    contactStatus: "",
    // Company Information
    company: "",
    jobTitle: "",
    // Contact Information (Address)
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    // Description
    description: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setContactImage(reader.result);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", formData);
    // Handle form submission here
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
        {/* Header with Left Arrow Button, Contact Image, "Create Contact" text and action buttons */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="p-2 rounded hover:bg-gray-200"
            >
              <FiArrowLeft size={20} />
            </button>
            <div
              className="relative w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("contact-image-input").click()}
            >
              {contactImage ? (
                <img
                  src={contactImage}
                  alt="Contact"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FiCamera className="text-2xl text-gray-500" />
              )}
            </div>
            <h2 className="text-xl font-bold">Create Contact</h2>
          </div>
          <div className="space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Convert
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
          id="contact-image-input"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Rest of your form sections go here */}
        <div className="p-4 space-y-2">
          {/* Basic Information Section */}
          <div className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4 flex items-center gap-2">
              <FiUser className="text-blue-500" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Secondary Email */}
              <div>
                <label className="block text-gray-700">Secondary Email</label>
                <input
                  type="email"
                  name="secondaryEmail"
                  value={formData.secondaryEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Contact Source Dropdown */}
              <div>
                <label className="block text-gray-700">
                  Contact Source <span className="text-red-500">*</span>
                </label>
                <select
                  name="contactSource"
                  value={formData.contactSource}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Source</option>
                  <option value="Referral">Referral</option>
                  <option value="Website">Website</option>
                  <option value="Advertisement">Advertisement</option>
                </select>
              </div>
              {/* Contact Status Dropdown */}
              <div>
                <label className="block text-gray-700">Contact Status</label>
                <select
                  name="contactStatus"
                  value={formData.contactStatus}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4 flex items-center gap-2">
              <FiBriefcase className="text-purple-500" /> Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Company */}
              <div className="md:col-span-3">
                <label className="block text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Job Title */}
              <div>
                <label className="block text-gray-700">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Contact Information (Address) Section */}
          <div className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4 flex items-center gap-2">
              <FiMapPin className="text-green-500" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Address Line 1 */}
              <div className="md:col-span-3">
                <label className="block text-gray-700">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Address Line 2 */}
              <div className="md:col-span-3">
                <label className="block text-gray-700">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* City */}
              <div>
                <label className="block text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* State */}
              <div>
                <label className="block text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Zip Code */}
              <div>
                <label className="block text-gray-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Country */}
              <div>
                <label className="block text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold border-b pb-1 mb-4 flex items-center gap-2">
              <FiMail className="text-gray-500" /> Description
            </h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter any additional details about the contact..."
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactCreationForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiUser, FiMail, FiBriefcase, FiMapPin, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../utils/axios";
import { apiSummary } from "../../common/apiSummary";
const initalValues={
    // Basic Information
    contactOwner:"",
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
  }

const ContactCreationForm = () => {
  const navigate = useNavigate();
  const [contactImage, setContactImage] = useState(null);
  const [formData, setFormData] = useState(initalValues);

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

  const handleSubmit = async(e,ref) => {
    e.preventDefault();
    try {
        const resp=await axiosPrivate({
            ...apiSummary.crm.createContacts,
            data:formData
        })
        toast.success("Contact Created Successfully")
        if(ref==="save")
        {
            navigate("/contacts")
        }
        resetForm()
    } catch (error) {
        toast.error("Contact Creation Failed")
        console.log(error)
    }
  };
   const resetForm = () => {
        setFormData(initalValues);
        setContactImage(null);
    };

  return (
    <div className="container mx-auto">
      <form className="bg-white rounded-lg shadow-md">
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
         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 grid-cols-1 text-sm">
                        <button
                            type="button"
                            className="rounded  px-4 py-2  hover:bg-gray-100 border border-primary transition-all ease-in-out duration-200 shadow-md"
                    
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="rounded  px-4 py-2 hover:bg-gray-100 border border-primary transition-all ease-in-out duration-200 shadow-md"
                            onClick={(e) =>handleSubmit(e,"saveAndNew")}
                        >
                            Save And New
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90 shadow-sm"
                             onClick={(e) =>handleSubmit(e,"save")}
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
        {/* Basic Info Section */}
                      <Section
                          title="Basic Information"
                          icon={<FiUser />}
                      >
                        <Select
                              label="Contact Owner"
                              name="contactOwner"
                              value={formData.contactOwner}
                              onChange={handleChange}
                              options={["praveen", "vikram", "kalyan", ]}
                              required
                          />
                          <Input
                              label="First Name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                          />
                          <Input
                              label="Last Name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                          />
                          <Input
                              label="Mobile"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                              required
                          />
                          <Input
                              label="Email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                          />
                          <Input
                              label="Secondary Email"
                              name="secondaryEmail"
                              value={formData.secondaryEmail}
                              onChange={handleChange}
                          />
                          <Select
                              label="Lead Source"
                              name="leadSource"
                              value={formData.leadSource}
                              onChange={handleChange}
                              options={["OTHER", "SOCIAL_MEDIA", "WEBSITE", "REFERRAL", "ADVERTISEMENT"]}
                              required
                          />
                          <Select
                              label="Lead Status"
                              name="leadStatus"
                              value={formData.leadStatus}
                              onChange={handleChange}
                              options={["New", "Contacted", "Qualified", "Lost"]}
                              required
                          />
                      </Section>
      
                      {/* Company Info Section */}
                      <Section
                          title="Company Information"
                          icon={<FiBriefcase />}
                      >
                          <Input
                              label="Company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                          />
                          <Input
                              label="Title"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                          />
                          <Input
                              label="Website"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                          />
                          <Input
                              label="Industry"
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                          />
                          <Input
                              label="No. of Employees"
                              name="noOfEmployees"
                              value={formData.noOfEmployees}
                              onChange={handleChange}
                          />
                          <Input
                              label="Annual Revenue"
                              name="annualRevenue"
                              value={formData.annualRevenue}
                              onChange={handleChange}
                          />
                          <Select
                              label="Rating"
                              name="rating"
                              value={formData.rating}
                              onChange={handleChange}
                              options={["Hot", "Warm", "Cold"]}
                          />
                      </Section>
      
                      {/* Address Info Section */}
                      <Section
                          title="Address Information"
                          icon={<FiMapPin />}
                      >
                          <Input
                              label="Address Line 1"
                              name="addressLine1"
                              value={formData.addressLine1}
                              onChange={handleChange}
                          />
                          <Input
                              label="Address Line 2"
                              name="addressLine2"
                              value={formData.addressLine2}
                              onChange={handleChange}
                          />
                          <Input
                              label="City"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                          />
                          <Input
                              label="State"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                          />
                          <Input
                              label="ZIP"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                          />
                          <Input
                              label="Country"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                          />
                      </Section>
      
                      {/* Description Section */}
                      <Section
                          title="Description"
                          icon={<FiMail />}
                      >
                          <div className="col-span-full">
                              <label
                                  htmlFor="description"
                                  className="block text-gray-700"
                              >
                                  Description
                              </label>
                              <textarea
                                  id="description"
                                  name="description"
                                  rows="4"
                                  value={formData.description}
                                  onChange={handleChange}
                                  className="w-full rounded border border-gray-300 p-2"
                              ></textarea>
                          </div>
                      </Section>
                  </form>
              </div>
          );
      };
      
      // Reusable components
      const Section = ({ title, icon, children }) => (
          <div className="mb-4 rounded border p-4">
              <h3 className="mb-4 flex items-center gap-2 border-b pb-1 text-lg font-semibold">
                  {icon} {title}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
          </div>
      );
      
      const Input = ({ label, name, type = "text", value, onChange, required = false, className = "" }) => (
          <div className={className}>
              <label
                  htmlFor={name}
                  className="block text-gray-700"
              >
                  {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                  id={name}
                  name={name}
                  type={type}
                  value={value}
                  onChange={onChange}
                  required={required}
                  className="w-full rounded border-blue-400 p-2 border-[1px]"
              />
          </div>
      );
      
      const Select = ({ label, name, value, onChange, options = [], required = false }) => (
          <div>
              <label
                  htmlFor={name}
                  className="block text-gray-700"
              >
                  {label} {required && <span className="text-red-500">*</span>}
              </label>
              <select
                  id={name}
                  name={name}
                  value={value}
                  onChange={onChange}
                  required={required}
                  className="w-full rounded border-[1px] border-blue-400 p-2"
              >
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                      <option
                          key={opt}
                          value={opt}
                      >
                          {opt}
                      </option>
                  ))}
              </select>
          </div>
      );
      

export default ContactCreationForm;

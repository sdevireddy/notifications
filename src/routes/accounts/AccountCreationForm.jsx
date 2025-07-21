import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiUser, FiMail, FiBriefcase, FiMapPin, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../utils/axios";
import { apiSummary } from "../../common/apiSummary";
const initialFormData={
    // Basic Information
    accoutImage:"",
    accountOwner:"",
    accountName: "",
    parentAccount: "",
    accountNumber: "",
    // accountType: "",
    industry: "",
    annualRevenue:"",
    // rating:"",
    phone:"",
    fax:"",
    industry:"",
    website:"",
    employees:"",
    sicCode:"",
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

const AccountCreationForm = () => {
  const navigate = useNavigate();
  const [accountImage,setAccountImage] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

   const submitActionRef = useRef("save");
  
      const handleImageChange = (event) => {
          const file = event.target.files[0];
          if (file) {
              setFormData((prev) => {
                  return {
                      ...prev,
                      accountImage: file,
                  };
              });
              const reader = new FileReader();
              reader.onloadend = () => setAccountImage(reader.result);
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
  
      const resetForm = () => {
          setFormData(initialFormData);
          setAccountImage(null);
          //toast.info("Form reset to default values");
      };
  
      const cancelLead = async () => {
          try {
              await fetch("http://localhost:8080/api/leads/cancel", {
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
  
      const handleSubmit = async (e,ref) => {
          e.preventDefault();
          try {
            const resp=await axiosPrivate({
                ...apiSummary.crm.createAccount,
                data:formData
            })
            toast.success("Account Created Successfully")
            if(ref==="save")
            {
                navigate("/accounts")
            }
            resetForm()
          } catch (error) {
            console.log(error)
            toast.error("Account Creation Failed")
          }
      };
  
      return (
          <div className=" w-[calc(100%-10px)] text-sm">
              <form
                  onSubmit={handleSubmit}
                  className="rounded-lg bg-white shadow-md"
              >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b p-3    sticky top-0 bg-white">
                      <div className="flex items-center gap-3">
                          <button
                              onClick={() => navigate(-1)}
                              type="button"
                              className="rounded p-2 hover:bg-gray-200"
                          >
                              <FiArrowLeft size={20} />
                          </button>
  
                          {/* Lead Image Upload */}
                          <div
                              title="Click to upload image"
                              className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-200"
                              onClick={() => document.getElementById("lead-image-input").click()}
                          >
                              {accountImage ? (
                                  <img
                                      src={accountImage}
                                      alt="Account"
                                      className="h-full w-full rounded-full object-cover"
                                  />
                              ) : (
                                  <FiCamera className="text-2xl text-gray-500" />
                              )}
                          </div>
  
                          <h2 className="text-xl font-bold">Create Account</h2>
                      </div>
                      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 grid-cols-1 text-sm">
                          <button
                              type="button"
                              className="rounded  px-4 py-2  hover:bg-gray-100 border border-primary transition-all ease-in-out duration-200 shadow-md"
                              onClick={resetForm}
                          >
                              Reset
                          </button>
                          <button
                              type="submit"
                              className="rounded  px-4 py-2 hover:bg-gray-100 border border-primary transition-all ease-in-out duration-200 shadow-md"
                              onClick={(e) => handleSubmit(e,"saveAndNew")}
                          >
                              Save And New
                          </button>
  
                          <button
                              type="submit"
                              className="rounded bg-primary px-4 py-2 text-white  shadow-sm"
                             onClick={(e) => handleSubmit(e,"save")}
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
                  <Section
                      title="Basic Information"
                      icon={<FiUser />}
                  >
                      <Select
                                label="Account Owner"
                                name="accountOwner"
                                value={formData.accountOwner}
                                onChange={handleChange}
                                options={["praveen", "vikram", "kalyan", ]}
                                required
                            />
                      <Input
                          label="Account Name"
                          name="accountName"
                          value={formData.accountName}
                          onChange={handleChange}
                          required
                      />
                      <Input
                          label="Parent Account"
                          name="parentAccount"
                          value={formData.parentAccount}
                          onChange={handleChange}
                          required
                      />
                      <Input
                          label="Account Number"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          required
                      />
                      <Input
                          label="Annual Revenue"
                          name="annualRevenue"
                          value={formData.annualRevenue}
                          onChange={handleChange}
                          required
                      />
                      <Input
                          label="Industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          required
                      />
                      {/* <Input
                          label="Rating"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                      /> */}
                      <Input
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                      />
                      <Input
                          label="Fax"
                          name="fax"
                          value={formData.fax}
                          onChange={handleChange}
                      />
                       <Input
                          label="Website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                      />
                      <Input
                          label="Employees"
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                      />
                       <Input
                          label="SIC Code"
                          name="sicCode"
                          value={formData.sicCode}
                          onChange={handleChange}
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
export default AccountCreationForm;

import { useState } from "react";
import { FiCamera } from "react-icons/fi";
import "./NewLead.css";

const NewLead = () => {
  const [formData, setFormData] = useState({
    leadPicture: "",
    leadOwner: "",
    company: "",
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    fax: "",
    mobile: "",
    website: "",
    leadSource: "",
    leadStatus: "",
    industry: "",
    noOfEmployees: "",
    annualRevenue: "",
    rating: "",
    emailOptOut: false,
    skypeId: "",
    secondaryEmail: "",
    twitter: "",
    description: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  return (
    <div className="lead-container">
      <div className="lead-header flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Create Lead</h2>
        <div className="btn-container">
          <button className="btn-gray">Cancel</button>
          <button className="btn-blue">Convert</button>
          <button className="btn-blue">Save & Next</button>
          <button className="btn-green">Save</button>
        </div>
      </div>

      <form className="form-container">
        {/* Lead Picture and Contact Information on the same row */}
        <div className="flex flex-wrap justify-right items-center gap-2">
          <div className="flex flex-col items-center w-1/2">
            {renderSection("Lead Picture", (
              <div className="lead-picture-container relative flex justify-center items-center">
                <div className="relative w-24 h-24">
                  {formData.leadPicture ? (
                    <img
                      src={URL.createObjectURL(formData.leadPicture)}
                      alt="Lead"
                      className="lead-picture border-4 border-gray-800 rounded-full w-24 h-24 object-cover shadow-md"
                    />
                  ) : (
                    <div className="lead-picture border-4 border-gray-800 rounded-full w-24 h-24 flex items-center justify-center text-gray-500 shadow-md">No Image</div>
                  )}

                  <label htmlFor="leadPicture" className="camera-button absolute bottom-1 right-1 bg-gray-200 p-1 rounded-full cursor-pointer">
                    <FiCamera size={16} />
                  </label>

                  <input
                    type="file"
                    id="leadPicture"
                    name="leadPicture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-1/2">
            {renderSection("Contact Information", (
              <div className="grid grid-cols-2 gap-4">
                {renderField("First Name", "firstName", "text")}
                {renderField("Last Name", "lastName", "text")}
                {renderField("Email", "email", "email")}
                {renderField("Mobile", "mobile", "tel")}
                {renderField("Fax", "fax", "text")}
                {renderField("Website", "website", "text")}
              </div>
            ))}
          </div>
        </div>

        {/* Other Details Section */}
        {renderSection("Other Details", (
          <div className="grid grid-cols-2 gap-4">
            {renderField("Company", "company", "text")}
            {renderField("Industry", "industry", "text")}
            {renderField("Annual Revenue", "annualRevenue", "number")}
            {renderField("No. of Employees", "noOfEmployees", "number")}
            {renderField("Lead Owner", "leadOwner", "text")}
            {renderField("Lead Source", "leadSource", "text")}
            {renderField("Lead Status", "leadStatus", "text")}
            {renderField("Country", "country", "text")}
          </div>
        ))}

        {/* Additional Information Section */}
        {renderSection("Additional Information", (
          <div className="grid grid-cols-2 gap-4">
            {renderField("Skype ID", "skypeId", "text")}
            {renderField("Secondary Email", "secondaryEmail", "email")}
            {renderField("Twitter", "twitter", "text")}
            {renderField("Description", "description", "textarea")}
          </div>
        ))}
      </form>
    </div>
  );
};

// Helper function for rendering form sections
const renderSection = (title, content) => (
  <fieldset className="form-section border-4 border-gray-600 rounded-lg p-4 shadow-lg mb-4">
    <legend className="text-lg font-semibold text-gray-700 px-2">{title}</legend>
    {content}
  </fieldset>
);

// Helper function for rendering form fields
const renderField = (label, name, type = "text") => (
  <div className="flex flex-col">
    <label className="block text-base font-medium text-gray-700">{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        className="input-field border-2 border-gray-600 p-2 w-3/4 text-lg text-gray-500 rounded-md"
      />
    ) : (
      <input
        type={type}
        name={name}
        className="input-field border-2 border-gray-600 p-2 w-3/4 text-lg text-gray-500 rounded-md"
      />
    )}
  </div>
);

export default NewLead;

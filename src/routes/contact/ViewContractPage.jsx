import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaEllipsisV } from "react-icons/fa"; // Icons

const mockLeads = [
  {
    id: 1,
    leadOwner: "Sarah Smith",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    mobile: "(555) 987-6543",
    status: "Open",
    leadInfo: {
      name: "John Doe",
      company: "Tech Innovators",
      title: "CEO",
      industry: "Software",
      source: "Website",
      campaign: "Spring Promotion",
      description: "Interested in cloud solutions for their company.",
    },
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
    },
  },
];

const sections = [
  "Notes", "Cadences", "Attachments", "Products", "Open Activities", "Closed Activities", "Emails", "Campaigns"
];

const ViewLeadPage = () => {
  const { id } = useParams();
  const lead = mockLeads.find((lead) => lead.id === parseInt(id));

  const [editableFields, setEditableFields] = useState({});
  const [hoveredField, setHoveredField] = useState(null);
  const [sectionVisibility, setSectionVisibility] = useState({
    contact: true,
    leadInfo: true,
    address: true,
  });
  const [visibleSections, setVisibleSections] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section]: true }), {})
  );

  if (!lead) {
    return <div className="text-center py-8">Lead not found.</div>;
  }

  const handleEditClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleBlur = (field) => {
    setEditableFields({ ...editableFields, [field]: false });
  };

  const handleFieldChange = (field, value) => {
    lead[field] = value; // Update mock data (replace with API call in real-world case)
  };

  const toggleSection = (section) => {
    setSectionVisibility({ ...sectionVisibility, [section]: !sectionVisibility[section] });
  };

  const renderEditableField = (field, value) => (
    <div
      className="flex items-center w-full"
      onMouseEnter={() => setHoveredField(field)}
      onMouseLeave={() => setHoveredField(null)}
    >
      {editableFields[field] ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          autoFocus
          className="w-full p-1 border-b-2 border-blue-500 focus:outline-none text-gray-700"
        />
      ) : (
        <span className="text-gray-700">{value}</span> // No bold text
      )}
      {hoveredField === field && !editableFields[field] && (
        <FaPencilAlt
          className="ml-2 text-gray-500 cursor-pointer"
          onClick={() => handleEditClick(field)}
        />
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      {/* Top Section: Lead Image & Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Lead"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center space-x-2">
            {renderEditableField("leadName", lead.leadInfo.name)}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Send Email</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Convert</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Edit</button>
          <FaEllipsisV className="cursor-pointer" />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <button className="text-blue-500 text-sm" onClick={() => toggleSection("contact")}>
            {sectionVisibility.contact ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.contact && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm text-gray-600">Lead Owner</label>
              {renderEditableField("leadOwner", lead.leadOwner)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              {renderEditableField("email", lead.email)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              {renderEditableField("phone", lead.phone)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Mobile</label>
              {renderEditableField("mobile", lead.mobile)}
            </div>
          </div>
        )}
      </div>

      {/* Lead Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Lead Information</h3>
          <button className="text-blue-500 text-sm" onClick={() => toggleSection("leadInfo")}>
            {sectionVisibility.leadInfo ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.leadInfo && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            {Object.keys(lead.leadInfo).map((key) => (
              <div key={key}>
                <label className="text-sm text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {renderEditableField(key, lead.leadInfo[key])}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Address Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Address</h3>
          <button className="text-blue-500 text-sm" onClick={() => toggleSection("address")}>
            {sectionVisibility.address ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.address && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            {Object.keys(lead.address).map((key) => (
              <div key={key}>
                <label className="text-sm text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {renderEditableField(key, lead.address[key])}
              </div>
            ))}
          </div>
        )}
        
      </div>
      <div className="p-6 bg-gray-50">
     
      
      {sections.map(section => (
        <div key={section} className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">{section}</h3>
            <button className="text-blue-500" onClick={() => toggleSection(section)}>{visibleSections[section] ? "Hide" : "Unhide"}</button>
          </div>
          {visibleSections[section] && (
            <div className="mt-4 p-2 border rounded">{lead[section.toLowerCase()] || `No data available for ${section}`}</div>
          )}
        </div>
      ))}
    </div>
    </div>
    
  );
};

export default ViewLeadPage;

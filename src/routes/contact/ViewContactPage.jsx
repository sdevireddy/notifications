import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaEllipsisV } from "react-icons/fa"; // Icons

const mockContacts = [
  {
    id: 1,
    contactOwner: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "(555) 234-5678",
    mobile: "(555) 876-5432",
    status: "Active",
    contactInfo: {
      name: "Emily Johnson",
      company: "Design Studios",
      title: "Creative Director",
      industry: "Design",
      source: "Referral",
      campaign: "Fall Design Showcase",
      description: "Looking for a new design team to help with their website.",
    },
    address: {
      street: "456 Oak St",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
    },
  },
];

const sections = [
  "Notes", "Cadences", "Attachments", "Products", "Open Activities", "Closed Activities", "Emails", "Campaigns"
];

const ViewContactPage = () => {
  const { id } = useParams();
  const contact = mockContacts.find((contact) => contact.id === parseInt(id));

  const [editableFields, setEditableFields] = useState({});
  const [hoveredField, setHoveredField] = useState(null);
  const [sectionVisibility, setSectionVisibility] = useState({
    contact: true,
    contactInfo: true,
    address: true,
  });
  const [visibleSections, setVisibleSections] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section]: true }), {})
  );

  if (!contact) {
    return <div className="text-center py-8">Contact not found.</div>;
  }

  const handleEditClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleBlur = (field) => {
    setEditableFields({ ...editableFields, [field]: false });
  };

  const handleFieldChange = (field, value) => {
    contact[field] = value; // Update mock data (replace with API call in real-world case)
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
      {/* Top Section: Contact Image & Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Contact"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center space-x-2">
            {renderEditableField("contactName", contact.contactInfo.name)}
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
              <label className="text-sm text-gray-600">Contact Owner</label>
              {renderEditableField("contactOwner", contact.contactOwner)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              {renderEditableField("email", contact.email)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              {renderEditableField("phone", contact.phone)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Mobile</label>
              {renderEditableField("mobile", contact.mobile)}
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <button className="text-blue-500 text-sm" onClick={() => toggleSection("contactInfo")}>
            {sectionVisibility.contactInfo ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.contactInfo && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            {Object.keys(contact.contactInfo).map((key) => (
              <div key={key}>
                <label className="text-sm text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {renderEditableField(key, contact.contactInfo[key])}
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
            {Object.keys(contact.address).map((key) => (
              <div key={key}>
                <label className="text-sm text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {renderEditableField(key, contact.address[key])}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="p-6 bg-gray-50">
        {sections.map((section) => (
          <div key={section} className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">{section}</h3>
              <button className="text-blue-500" onClick={() => toggleSection(section)}>
                {visibleSections[section] ? "Hide" : "Unhide"}
              </button>
            </div>
            {visibleSections[section] && (
              <div className="mt-4 p-2 border rounded">
                {contact[section.toLowerCase()] || `No data available for ${section}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewContactPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaEllipsisV } from "react-icons/fa"; // Icons

const mockDeals = [
  {
    dealId: 1,
    dealOwner: "Sarah Smith",
    dealName: "Cloud Migration Deal",
    type: "NEW_BUSINESS",
    nextStep: "Finalize proposal",
    leadSource: "Website",
    amount: 100000,
    closingDate: "2025-05-15",
    stage: "PROPOSAL",
    qualification: "High",
    probability: 80,
    expectedRevenue: 80000,
    campaignSource: "Spring Campaign",
    contact: { name: "John Doe", email: "john.doe@example.com" },
    account: { name: "Tech Innovators", industry: "Software" },
    createdAt: "2025-04-01",
    updatedAt: "2025-04-02",
  },
];

const sections = [
  "Notes",
  "Cadences",
  "Attachments",
  "Products",
  "Open Activities",
  "Closed Activities",
  "Emails",
  "Campaigns",
];

const ViewDealsPage = () => {
  const { id } = useParams();
  const deal = mockDeals.find((deal) => deal.dealId === parseInt(id));

  const [editableFields, setEditableFields] = useState({});
  const [hoveredField, setHoveredField] = useState(null);
  const [sectionVisibility, setSectionVisibility] = useState({
    dealInfo: true,
    contactInfo: true,
    accountInfo: true,
  });
  const [visibleSections, setVisibleSections] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section]: true }), {})
  );

  if (!deal) {
    return <div className="text-center py-8">Deal not found.</div>;
  }

  const handleEditClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleBlur = (field) => {
    setEditableFields({ ...editableFields, [field]: false });
  };

  const handleFieldChange = (field, value) => {
    deal[field] = value; // Update mock data (replace with API call in real-world case)
  };

  const toggleSection = (section) => {
    setSectionVisibility({
      ...sectionVisibility,
      [section]: !sectionVisibility[section],
    });
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
      {/* Top Section: Deal Information & Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Deal"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center space-x-2">
            {renderEditableField("dealName", deal.dealName)}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Send Email</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Convert</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Edit</button>
          <FaEllipsisV className="cursor-pointer" />
        </div>
      </div>

      {/* Deal Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Deal Information</h3>
          <button
            className="text-blue-500 text-sm"
            onClick={() => toggleSection("dealInfo")}
          >
            {sectionVisibility.dealInfo ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.dealInfo && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            {Object.keys(deal).map((key) => {
              if (key !== "contact" && key !== "account") {
                return (
                  <div key={key}>
                    <label className="text-sm text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {renderEditableField(key, deal[key])}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <button
            className="text-blue-500 text-sm"
            onClick={() => toggleSection("contactInfo")}
          >
            {sectionVisibility.contactInfo ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.contactInfo && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm text-gray-600">Contact Name</label>
              {renderEditableField("contactName", deal.contact.name)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              {renderEditableField("contactEmail", deal.contact.email)}
            </div>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Account Information</h3>
          <button
            className="text-blue-500 text-sm"
            onClick={() => toggleSection("accountInfo")}
          >
            {sectionVisibility.accountInfo ? "Hide" : "Unhide"}
          </button>
        </div>
        {sectionVisibility.accountInfo && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-sm text-gray-600">Account Name</label>
              {renderEditableField("accountName", deal.account.name)}
            </div>
            <div>
              <label className="text-sm text-gray-600">Industry</label>
              {renderEditableField("accountIndustry", deal.account.industry)}
            </div>
          </div>
        )}
      </div>

      {/* Deal Sections */}
      <div className="p-6 bg-gray-50">
        {sections.map((section) => (
          <div key={section} className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">{section}</h3>
              <button
                className="text-blue-500"
                onClick={() => toggleSection(section)}
              >
                {visibleSections[section] ? "Hide" : "Unhide"}
              </button>
            </div>
            {visibleSections[section] && (
              <div className="mt-4 p-2 border rounded">
                {deal[section.toLowerCase()] || `No data available for ${section}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDealsPage;

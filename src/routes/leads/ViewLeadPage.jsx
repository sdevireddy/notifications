// ViewLeadPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaEllipsisV } from "react-icons/fa";
import { MdLocationOn, MdContactPhone, MdInfo, MdNotes } from "react-icons/md";

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
  "Notes", "Cadences", "Attachments", "Products",
  "Open Activities", "Closed Activities", "Emails", "Campaigns"
];

const formatLabel = (label) => label.charAt(0).toUpperCase() + label.slice(1);

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

  if (!lead) return <div className="text-center py-8">Lead not found.</div>;

  const handleEditClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleBlur = (field) => {
    setEditableFields({ ...editableFields, [field]: false });
  };

  const handleFieldChange = (field, value) => {
    lead[field] = value;
  };

  const toggleSection = (section) => {
    setSectionVisibility({ ...sectionVisibility, [section]: !sectionVisibility[section] });
  };

  const toggleGenericSection = (section) => {
    setVisibleSections({ ...visibleSections, [section]: !visibleSections[section] });
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
        <span className="text-gray-700">{value || <em className="text-gray-400">Not provided</em>}</span>
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Lead Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Lead"
            className="w-12 h-12 rounded-full"
          />
          <div>{renderEditableField("leadName", lead.leadInfo.name)}</div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Send Email</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Convert</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Edit</button>
          {/* <FaEllipsisV className="cursor-pointer text-gray-600" /> */}
        </div>
      </div>

      {/* Contact Information */}
      <SectionCard
        title="Contact Information"
        icon={<MdContactPhone />}
        visible={sectionVisibility.contact}
        onToggle={() => toggleSection("contact")}
      >
        <FieldGrid data={{
          leadOwner: lead.leadOwner,
          email: lead.email,
          phone: lead.phone,
          mobile: lead.mobile,
        }} render={renderEditableField} />
      </SectionCard>

      {/* Lead Information */}
      <SectionCard
        title="Lead Information"
        icon={<MdInfo />}
        visible={sectionVisibility.leadInfo}
        onToggle={() => toggleSection("leadInfo")}
      >
        <FieldGrid data={lead.leadInfo} render={renderEditableField} />
      </SectionCard>

      {/* Address Information */}
      <SectionCard
        title="Address"
        icon={<MdLocationOn />}
        visible={sectionVisibility.address}
        onToggle={() => toggleSection("address")}
      >
        <FieldGrid data={lead.address} render={renderEditableField} />
      </SectionCard>

      {/* Extra Sections */}
      {sections.map((section) => (
        <SectionCard
          key={section}
          title={section}
          icon={<MdNotes />}
          visible={visibleSections[section]}
          onToggle={() => toggleGenericSection(section)}
        >
          <div className="mt-2 p-3 border rounded bg-gray-50 text-sm text-gray-700 italic">
            {lead[section.toLowerCase()] || `No data available for ${section}`}
          </div>
        </SectionCard>
      ))}
    </div>
  );
};

const SectionCard = ({ title, icon, visible, onToggle, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-6 transition-all duration-300">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center space-x-2 text-xl text-gray-800 font-semibold">
        {icon}
        <span>{title}</span>
      </div>
      <button onClick={onToggle} className="text-blue-500 text-sm">
        {visible ? "Hide" : "Unhide"}
      </button>
    </div>
    {visible && <div className="grid grid-cols-2 gap-4">{children}</div>}
  </div>
);

const FieldGrid = ({ data, render }) => (
  <>
    {Object.keys(data).map((key) => (
      <div key={key}>
        <label className="text-sm text-gray-600 font-semibold">{formatLabel(key)}</label>
        {render(key, data[key])}
      </div>
    ))}
  </>
);

export default ViewLeadPage;

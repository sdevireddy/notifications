import React, { useEffect, useState } from "react";
import Select from "react-select";

const FiltersPopUp = ({ onClose }) => {
  const initialTextFields = {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    fax: "",
    mobile: "",
    website: "",
    industry: "",
    noOfEmployees: "",
    annualRevenue: "",
    rating: "",
    skypeId: "",
    secondaryEmail: "",
    twitter: "",
    description: "",
  };
 useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [textFields, setTextFields] = useState(initialTextFields);
  const [multiSelects, setMultiSelects] = useState({
    leadOwner: [],
    company: [],
    leadStatus: [],
    country: [],
    city: [],
    leadSource: [],
  });
  const [emailOptOut, setEmailOptOut] = useState(false);

  const handleInputChange = (e) => {
    setTextFields({ ...textFields, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setMultiSelects({ ...multiSelects, [field]: value });
  };

  const handleClearAll = () => {
    setTextFields(initialTextFields);
    setMultiSelects({
      leadOwner: [],
      company: [],
      leadStatus: [],
      country: [],
      city: [],
      leadSource: [],
    });
    setEmailOptOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white p-4">
          <h2 className="text-xl font-semibold">Filter Leads</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-14">
          {Object.entries(textFields).map(([key, value]) => (
            <div key={key} className="flex flex-col ">
              <label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                className="border rounded-md p-2"
              />
            </div>
          ))}

          {Object.entries(multiSelects).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <Select
                isMulti
                options={[]}
                value={value}
                onChange={(val) => handleSelectChange(key, val)}
              />
            </div>
          ))}

          <div className="flex items-center gap-2 col-span-full mt-2">
            <input
              type="checkbox"
              checked={emailOptOut}
              onChange={(e) => setEmailOptOut(e.target.checked)}
            />
            <label>Email Opt-Out</label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-3 sticky bottom-0 bg-white border border-t-gray-300">
          <button
            onClick={handleClearAll}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          >
            Clear All
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPopUp;

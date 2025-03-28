import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPhone, FiMessageSquare, FiEye, FiEdit, FiTrash, FiFilter, FiArrowUp, FiArrowDown, FiPlus,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FiltersPopUp from "./FiltersPopup";
import "./Leads.css";

const Leads = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const navigate = useNavigate();
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // Sample Leads Data
  const initialLeads = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Lead ${index + 1}`,
    phone: `(123) 456-78${index % 10}${index % 10}`,
    email: `lead${index + 1}@example.com`,
    location: ["NY", "CA", "TX", "FL", "WA"][index % 5],
    leadScore: Math.floor(Math.random() * 100),
    created: `2024-03-${(index % 30) + 1}`,
  }));

  const [leads, setLeads] = useState(initialLeads);

  // Sorting function
  const sortLeads = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  // Fix: Search functionality for numeric columns
  const filteredLeads = sortedLeads.filter((lead) =>
    Object.values(lead).some((value) => {
      // Convert to string for comparison
      const stringValue = value.toString().toLowerCase();
      return stringValue.includes(searchQuery.toLowerCase());
    })
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / recordsPerPage) || 1;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const displayedLeads = filteredLeads.slice(startIndex, startIndex + recordsPerPage);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedLeads((prevSelectedLeads) =>
      prevSelectedLeads.includes(id)
        ? prevSelectedLeads.filter((leadId) => leadId !== id)
        : [...prevSelectedLeads, id]
    );
  };

  const handleDelete = () => {
    const remainingLeads = leads.filter((lead) => !selectedLeads.includes(lead.id));
    setLeads(remainingLeads);
    setSelectedLeads([]); // Clear selection after deletion
  };

  // Fix: Reset to first page when search reduces records
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  return (
    <div className="relative bg-white p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">Records per page:</label>
          <select
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search Leads..."
            className="border p-2 rounded w-1/3"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleFilter}>Filters</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/new-customer")}>
            Add Lead
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={selectedLeads.length === 0}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLeads(leads.map((lead) => lead.id));
                    } else {
                      setSelectedLeads([]);
                    }
                  }}
                  checked={selectedLeads.length === leads.length}
                />
              </th>
              {["name", "phone", "email", "location", "leadScore", "created"].map((column) => (
                <th key={column} className="p-2 cursor-pointer" onClick={() => sortLeads(column)}>
                  <div className="flex items-center justify-center">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    {sortConfig.key === column ? (
                      sortConfig.direction === "asc" ? 
                      <FiArrowUp className="text-blue-500 ml-1" /> : 
                      <FiArrowDown className="text-blue-500 ml-1" />
                    ) : (
                      <FiArrowUp className="text-gray-400 ml-1" />
                    )}
                  </div>
                </th>
              ))}
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.map((lead, index) => (
              <tr key={lead.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => handleCheckboxChange(lead.id)}
                  />
                </td>
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.phone}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.location}</td>
                <td className="p-2">{lead.leadScore}</td>
                <td className="p-2">{lead.created}</td>
                <td className="p-2 flex justify-center space-x-4">
                  <FiPhone className="text-blue-500 cursor-pointer" />
                  <FiMessageSquare className="text-green-500 cursor-pointer" />
                  <FiEye className="text-gray-600 cursor-pointer" />
                  <FiEdit className="text-yellow-500 cursor-pointer" />
                  <FiTrash className="text-red-500 cursor-pointer" />
                  <FaWhatsapp className="text-green-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button className="border px-3 py-1 rounded cursor-pointer" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`border px-3 py-1 rounded cursor-pointer ${currentPage === page + 1 ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button className="border px-3 py-1 rounded cursor-pointer" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Filters Popup */}
      {isFilterOpen && <FiltersPopUp onClose={toggleFilter} />}
    </div>
  );
};

export default Leads;

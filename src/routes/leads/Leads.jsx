import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPhone, FiMessageSquare, FiEye, FiEdit, FiTrash, FiFilter, FiPlus,
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
  const navigate = useNavigate();
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // Sample Leads Data
  const leads = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Lead ${index + 1}`,
    phone: `(123) 456-78${index % 10}${index % 10}`,
    email: `lead${index + 1}@example.com`,
    location: ["NY", "CA", "TX", "FL", "WA"][index % 5],
    leadScore: Math.floor(Math.random() * 100),
    created: `2024-03-${(index % 30) + 1}`,
  }));

  // Filter leads based on search query
  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const displayedLeads = filteredLeads.slice(startIndex, startIndex + recordsPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
              setCurrentPage(1); // Reset to first page when changing records per page
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleFilter}>Filters</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/new-customer")}>
            Add Lead
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" disabled={selectedLeads.length === 0}>Delete</button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Select</th>
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Location</th>
              <th className="p-2">Lead Score</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-100">
                <td className="p-2"><input type="checkbox" /></td>
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
      <div className="flex justify-center items-center space-x-2 mt-4 absolute bottom-4 left-4 right-4">
        <div className="flex space-x-2">
          <button
            className="border px-3 py-1 rounded cursor-pointer"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className={`border px-3 py-1 rounded cursor-pointer ${currentPage === page + 1 ? "bg-blue-500 text-white" : ""}`}
              onClick={() => goToPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="border px-3 py-1 rounded cursor-pointer"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* Filters Popup */}
      {isFilterOpen && <FiltersPopUp onClose={toggleFilter} />}
    </div>
  );
};

export default Leads;

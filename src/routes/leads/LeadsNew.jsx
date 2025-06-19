import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiPhone,
  FiMessageSquare,
  FiEye,
  FiEdit,
  FiTrash,
  FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FiltersPopUp from "./FiltersPopup";
import "./Leads.css";
import axios from "axios";

const LeadsNew = () => {
  const navigate = useNavigate();

  const allColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "createdDate", label: "Created" },
    { key: "updatedDate", label: "Updated" },
    { key: "leadStatus", label: "Status" },
    { key: "address", label: "Address" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(allColumns.map((col) => col.key));
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [leadsList, setLeadsList] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://ec2-13-49-44-42.eu-north-1.compute.amazonaws.com:8081/api/leads");
      const data = response.data.map((lead) => ({
        id: lead.id,
        name: `${lead.firstName ?? ""} ${lead.lastName ?? ""}`,
        email: lead.email ?? "",
        phone: lead.mobile ?? "",
        address: lead.address ?? "",
        leadStatus: lead.leadStatus ?? "N/A",
        createdDate: lead.createdDate ?? "N/A",
        updatedDate: lead.updatedDate ?? "N/A",
      }));
      setLeadsList(data);
      setLeads(data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      setError("Failed to fetch leads");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSelectedLeads = async () => {
    try {
      await fetch("http://localhost:8081/api/leads/delete-multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedLeads),
      });
      fetchLeads();
      setSelectedLeads([]);
    } catch (err) {
      console.error("Error deleting leads");
    }
  };

  const deleteSingleLead = async (leadId) => {
    try {
      const res = await fetch(`http://localhost:8081/api/leads/${leadId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
      await fetchLeads();
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const sortLeads = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase();
    const valB = b[sortConfig.key]?.toString().toLowerCase();
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredLeads = sortedLeads.filter((lead) =>
    Object.values(lead).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredLeads.length / recordsPerPage) || 1;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const displayedLeads = filteredLeads.slice(startIndex, startIndex + recordsPerPage);

  const handleCheckboxChange = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  return (
    <div className="lead-container">
      <div className="flex justify-between items-center mb-4">
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

        <div className="flex space-x-2 relative">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleFilter}>
            Filters
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/LeadCreationForm")}
          >
            Add Lead
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={selectedLeads.length === 0}
            onClick={deleteSelectedLeads}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setShowColumnSelector(!showColumnSelector)}
          >
            Columns
          </button>
          {showColumnSelector && (
            <div className="absolute top-full right-0 bg-white border rounded shadow p-4 z-10">
              {allColumns.map((col) => (
                <div key={col.key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => {
                      setVisibleColumns((prev) =>
                        prev.includes(col.key)
                          ? prev.filter((key) => key !== col.key)
                          : [...prev, col.key]
                      );
                    }}
                  />
                  <label>{col.label}</label>
                </div>
              ))}
            </div>
          )}
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
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[40px_60px_repeat(auto-fill,_minmax(100px,_1fr))] items-center text-sm font-semibold text-gray-700 px-4 text-center">
          <div className="flex justify-center">
            <input type="checkbox" disabled />
          </div>
          <div></div>
          {allColumns
            .filter((col) => visibleColumns.includes(col.key))
            .map((col) => (
              <div
                key={col.key}
                onClick={() => sortLeads(col.key)}
                className="cursor-pointer hover:underline"
              >
                {col.label}
              </div>
            ))}
          <div className="text-center pr-2">Actions</div>
        </div>

        {displayedLeads.map((lead) => (
          <div
            key={lead.id}
            className="grid grid-cols-[40px_60px_repeat(auto-fill,_minmax(100px,_1fr))] items-center bg-white px-4 py-3 rounded-xl shadow-sm border hover:shadow-md transition-all text-sm text-gray-800 text-center"
          >
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={selectedLeads.includes(lead.id)}
                onChange={() => handleCheckboxChange(lead.id)}
              />
            </div>
            <div className="flex justify-center">
              <img
                src={`txt`}
                alt={lead.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            {visibleColumns.map((key) =>
              key === "leadStatus" ? (
                <div key={key} className="flex justify-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      lead.leadStatus === "New"
                        ? "bg-blue-100 text-blue-700"
                        : lead.leadStatus === "Contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : lead.leadStatus === "Qualified"
                        ? "bg-green-100 text-green-700"
                        : lead.leadStatus === "Lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lead.leadStatus}
                  </span>
                </div>
              ) : (
                <div key={key} className="break-words whitespace-pre-wrap">
                  {lead[key]}
                </div>
              )
            )}
            <div className="flex items-center justify-end gap-3 pr-2">
              <FaWhatsapp className="text-green-600 text-lg" />
              <FiMessageSquare className="text-green-500 text-lg" />
              <Link to={`/ViewLead/${lead.id}`} state={{ lead }} className="text-blue-500">
                <FiEye className="text-gray-600 cursor-pointer" />
              </Link>
              <FiMail className="text-blue-500 text-sm mt-1" />
              <FiEdit className="text-yellow-500 cursor-pointer hover:scale-110 text-lg" />
              <FiTrash
                className="text-red-500 cursor-pointer hover:scale-110 text-lg"
                onClick={() => deleteSingleLead(lead.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center space-x-2 mt-4">
        <button
          className="border px-3 py-1 rounded cursor-pointer"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`border px-3 py-1 rounded cursor-pointer ${
              currentPage === page + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className="border px-3 py-1 rounded cursor-pointer"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isFilterOpen && <FiltersPopUp onClose={toggleFilter} />}
    </div>
  );
};

export default LeadsNew;

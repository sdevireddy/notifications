import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiPhone,
  FiMessageSquare,
  FiEye,
  FiEdit,
  FiTrash,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FiltersPopUp from "./FiltersPopup";
import "./Leads.css";
import axios from "axios";

const Leads = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const navigate = useNavigate();

  const [leadsList, setLeadsList] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching leads from backend
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8081/api/leads");
      const data = response.data.map((lead) => ({
        id: lead.id,
        name: `${lead.firstName ?? ""} ${lead.lastName ?? ""}`,
        email: lead.email ?? "",
        phone: lead.mobile ?? "",
        leadSource: (lead.leadSource ?? "").toLowerCase(),
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
      toast.success("Selected leads deleted");
      fetchLeads(); // reload after deletion
      setSelectedLeads([]);
    } catch (err) {
      toast.error("Error deleting leads");
    }
  };

const deleteSingleLead = async (leadId) => {
  try {
    const res = await fetch(`http://localhost:8081/api/leads/${leadId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Delete failed");

    toast.success("Lead deleted");
    setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    await fetchLeads(); // wait for leads to be updated before refresh
  } catch (err) {
    console.error("Error deleting lead:", err);
    toast.error("Error deleting lead");
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
    return sortConfig.direction === "asc"
      ? a[sortConfig.key] > b[sortConfig.key]
        ? 1
        : -1
      : a[sortConfig.key] < b[sortConfig.key]
      ? 1
      : -1;
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

  const handleDelete = () => {
    const remainingLeads = leads.filter((lead) => !selectedLeads.includes(lead.id));
    setLeads(remainingLeads);
    setSelectedLeads([]);
  };

  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  return (
    <div className="lead-container">
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
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="w-full border text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedLeads(e.target.checked ? leads.map((l) => l.id) : [])
                  }
                  checked={selectedLeads.length === leads.length}
                />
              </th>
              {[
                { key: "name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "email", label: "Email" },
                { key: "leadSource", label: "Lead Source" },
                { key: "leadStatus", label: "Lead Status" },
                { key: "createdDate", label: "Created Date" },
                { key: "updatedDate", label: "Updated Date" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="p-2 cursor-pointer"
                  onClick={() => sortLeads(col.key)}
                >
                  <div className="flex items-center justify-start">
                    {col.label}
                    {sortConfig.key === col.key ? (
                      sortConfig.direction === "asc" ? (
                        <FiArrowUp className="text-blue-500 ml-1" />
                      ) : (
                        <FiArrowDown className="text-blue-500 ml-1" />
                      )
                    ) : (
                      <FiArrowUp className="text-gray-400 ml-1" />
                    )}
                  </div>
                </th>
              ))}
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.map((lead) => (
              <React.Fragment key={lead.id}>
                <tr className="leads-table-row">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleCheckboxChange(lead.id)}
                    />
                  </td>
                  <td className="p-2">{lead.name}</td>
                  <td className="p-2">{lead.phone}</td>
                  <td className="p-2">{lead.email}</td>
                  <td className="p-2">{lead.leadSource}</td>
                  <td className="p-2">{lead.leadStatus}</td>
                  <td className="p-2">{lead.createdDate}</td>
                  <td className="p-2">{lead.updatedDate}</td>
                  <td className="p-2 flex justify-start space-x-3">
                    <FaWhatsapp className="text-green-600 cursor-pointer" />
                    <FiPhone className="text-blue-500 cursor-pointer" />
                    <FiMessageSquare className="text-green-500 cursor-pointer" />
                    <Link to={`/ViewLead/${lead.id}`} state={{ lead }} className="text-blue-500">
                      <FiEye className="text-gray-600 cursor-pointer" />
                    </Link>
                    <FiEdit className="text-yellow-500 cursor-pointer" />
                    <FiTrash
  className="text-red-500 cursor-pointer"
  onClick={() => deleteSingleLead(lead.id)}
/>
                  </td>
                </tr>
                <tr className="divider-row">
                  <td colSpan="9" className="bg-gray-200 h-[1px] p-0"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-4">
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

export default Leads;

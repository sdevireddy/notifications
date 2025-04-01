import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiPhone, FiMessageSquare, FiEye, FiEdit, FiTrash, FiFilter, FiArrowUp, FiArrowDown, FiPlus,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FiltersPopUp from "./FiltersPopup";
import "./Deals.css";

const Deals = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "dealName", direction: "asc" });
  const navigate = useNavigate();
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // Sample Deals Data
  const initialDeals = Array.from({ length: 30 }, (_, index) => ({
    dealId: index + 1,
    dealName: `Deal ${index + 1}`,
    dealOwner: `Owner ${index + 1}`,
    amount: (Math.random() * 10000).toFixed(2),
    closingDate: `2024-03-${(index % 30) + 1}`,
    stage: ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"][index % 6],
    contact: `Contact ${index + 1}`,
    account: `Account ${index + 1}`,
  }));

  const [deals, setDeals] = useState(initialDeals);

  // Sorting function
  const sortDeals = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedDeals = [...deals].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  // Fix: Search functionality for numeric columns
  const filteredDeals = sortedDeals.filter((deal) =>
    Object.values(deal).some((value) => {
      // Convert to string for comparison
      const stringValue = value.toString().toLowerCase();
      return stringValue.includes(searchQuery.toLowerCase());
    })
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDeals.length / recordsPerPage) || 1;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const displayedDeals = filteredDeals.slice(startIndex, startIndex + recordsPerPage);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedDeals((prevSelectedDeals) =>
      prevSelectedDeals.includes(id)
        ? prevSelectedDeals.filter((dealId) => dealId !== id)
        : [...prevSelectedDeals, id]
    );
  };

  const handleDelete = () => {
    const remainingDeals = deals.filter((deal) => !selectedDeals.includes(deal.dealId));
    setDeals(remainingDeals);
    setSelectedDeals([]); // Clear selection after deletion
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
            placeholder="Search Deals..."
            className="border p-2 rounded w-1/3"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleFilter}>Filters</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/DealCreationForm")}>
            Add Deal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={selectedDeals.length === 0}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Deals Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDeals(deals.map((deal) => deal.dealId));
                    } else {
                      setSelectedDeals([]);
                    }
                  }}
                  checked={selectedDeals.length === deals.length}
                />
              </th>
              {["dealName", "dealOwner", "amount", "closingDate", "stage"].map((column) => (
                <th key={column} className="p-2 cursor-pointer" onClick={() => sortDeals(column)}>
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
            {displayedDeals.map((deal, index) => (
              <tr key={deal.dealId} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedDeals.includes(deal.dealId)}
                    onChange={() => handleCheckboxChange(deal.dealId)}
                  />
                </td>
                <td className="p-2">{deal.dealName}</td>
                <td className="p-2">{deal.dealOwner}</td>
                <td className="p-2">${deal.amount}</td>
                <td className="p-2">{deal.closingDate}</td>
                <td className="p-2">{deal.stage}</td>
                <td className="p-2 flex justify-center space-x-4">
                  <Link to={`/WhatsAppChat/${deal.dealId}`} state={{ deal }} className="text-blue-500">
                    <FaWhatsapp className="text-green-600 cursor-pointer" />
                  </Link>
                 
                  <Link to={`/callhistory/${deal.dealId}`} state={{ deal }} className="text-blue-500">
                    <FiPhone className="text-blue-500 cursor-pointer" />
                  </Link>

                  <Link to={`/emails/${deal.dealId}`} state={{ deal }} className="text-blue-500">
                    <FiMessageSquare className="text-green-500 cursor-pointer" />
                  </Link>
                  
                  <Link to={`/ViewDeal/${deal.dealId}`} state={{ deal }} className="text-blue-500">
                    <FiEye className="text-gray-600 cursor-pointer" />
                  </Link>

                  <FiEdit className="text-yellow-500 cursor-pointer" />
                  <FiTrash className="text-red-500 cursor-pointer" />
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

export default Deals;

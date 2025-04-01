import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiPhone, FiMessageSquare, FiEye, FiEdit, FiTrash, FiArrowUp, FiArrowDown, FiPlus,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./Contacts.css";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const navigate = useNavigate();

  // Sample Contacts Data
  const initialContacts = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Contact ${index + 1}`,
    phone: `(987) 654-32${index % 10}${index % 10}`,
    email: `contact${index + 1}@example.com`,
    company: ["Google", "Apple", "Microsoft", "Amazon", "Meta"][index % 5],
    created: `2024-03-${(index % 30) + 1}`,
  }));

  const [contacts, setContacts] = useState(initialContacts);

  // Sorting function
  const sortContacts = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  // Search and filter contacts
  const filteredContacts = sortedContacts.filter((contact) =>
    [contact.name, contact.email, contact.phone, contact.company].some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / recordsPerPage) || 1;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const displayedContacts = filteredContacts.slice(startIndex, startIndex + recordsPerPage);

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
            placeholder="Search Contacts..."
            className="border p-2 rounded w-1/3"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate("/ContactCreationForm")}>Add Contact</button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              {["name", "phone", "email", "company", "created"].map((column) => (
                <th key={column} className="p-2 cursor-pointer" onClick={() => sortContacts(column)}>
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
            {displayedContacts.map((contact, index) => (
              <tr key={contact.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="p-2">{contact.name}</td>
                <td className="p-2">{contact.phone}</td>
                <td className="p-2">{contact.email}</td>
                <td className="p-2">{contact.company}</td>
                <td className="p-2">{contact.created}</td>
                <td className="p-2 flex justify-center space-x-4">
                  <FaWhatsapp className="text-green-600 cursor-pointer" />
                  <FiPhone className="text-blue-500 cursor-pointer" />
                  <FiMessageSquare className="text-green-500 cursor-pointer" />
                  <Link to={`/ViewContact/${contact.id}`} state={{ contact }} className="text-blue-500">
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
        <button className="border px-3 py-1 rounded cursor-pointer" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
        {[...Array(totalPages).keys()].map((page) => (
          <button key={page + 1} className={`border px-3 py-1 rounded cursor-pointer ${currentPage === page + 1 ? "bg-blue-500 text-white" : ""}`} onClick={() => setCurrentPage(page + 1)}>{page + 1}</button>
        ))}
        <button className="border px-3 py-1 rounded cursor-pointer" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Contacts;
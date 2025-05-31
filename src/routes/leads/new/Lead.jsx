import React, { useState } from "react";
import { Table } from "../../../components/Table";
import { ChevronDown } from "lucide-react";
const headers = [
    { label: "Lead Name", key: "name" },
    { label: "Company", key: "company" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
      { label: "Lead Source", key: "source" },
      { label: "Lead Owner", key: "owner" },
    { label: "Status", key: "status" },
    { label: "Created", key: "createdAt" },
];
const data = [
    {
        name: "Alice",
        email: "alice@example.com",
        phone: "1234567890",
        company: "Acme Inc",
        status: "Open",
        createdAt: "2024-05-10",
    },
    {
        name: "Bob",
        email: "bob@example.com",
        phone: "9876543210",
        company: "Globex",
        status: "Won",
        createdAt: "2024-05-12",
    },
];

const Lead = () => {
     const [open, setOpen] = useState(false);
     const [recordsPerPage,setRecordsPerPage]=useState(10)
     const [currentPage,setCurrentPage]=useState(1)
     const [totalPages,setTotalPages]=useState(10)
    return (
        <section className="p-3">
            <div className="flex justify-between py-3">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search..."
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center gap-3">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Add Lead
      </button>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md border hover:bg-gray-200 transition"
        >
          Actions
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
        {open && (
          <div className="absolute z-10 mt-2 w-40 bg-white border shadow-md rounded-md">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Mass Transfer</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Mass Delete</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Mass Update</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Export</button>
          </div>
        )}
      </div>
    </div>
            </div>

            <Table
                headers={headers}
                data={data}
                setCurrentPage={setCurrentPage}
                setRecordsPerPage={setRecordsPerPage}
                setTotalPages={setTotalPages}
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                totalPages={totalPages}
            />
        </section>
    );
};

export default Lead;

import React, { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Table = ({
  headers,
  data,
  recordsPerPage,
  setRecordsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

//   useEffect(() => {
//     const total = Math.ceil(data.length / recordsPerPage);
//     setTotalPages(total);
//   }, [data.length, recordsPerPage, setTotalPages]);

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
    const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const renderSortIcon = (key) => {
    if (sortConfig?.key !== key) return <ArrowDown size={14} className="opacity-30" />;
    return sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const toggleRow = (index) => {
    const actualIndex = (currentPage - 1) * recordsPerPage + index;
    setSelectedRows((prev) =>
      prev.includes(actualIndex) ? prev.filter((i) => i !== actualIndex) : [...prev, actualIndex]
    );
  };

  const toggleAll = () => {
    const pageIndexes = paginatedData.map((_, i) => (currentPage - 1) * recordsPerPage + i);
    const allSelected = pageIndexes.every((i) => selectedRows.includes(i));
    setSelectedRows(
      allSelected ? selectedRows.filter((i) => !pageIndexes.includes(i)) : [...selectedRows, ...pageIndexes]
    );
  };

  const handlePageChange = (dir) => {
    setCurrentPage((prev) => {
      if (dir === "prev") return Math.max(prev - 1, 1);
      if (dir === "next") return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  className="w-4"
                  checked={paginatedData.every((_, i) =>
                    selectedRows.includes((currentPage - 1) * recordsPerPage + i)
                  )}
                  onChange={toggleAll}
                />
              </th>
              {headers.map(({ label, key }) => (
                <th
                  key={key}
                  className="px-4 py-2 cursor-pointer select-none"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {renderSortIcon(key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes((currentPage - 1) * recordsPerPage + i)}
                    onChange={() => toggleRow(i)}
                  />
                </td>
                {headers.map(({ key }) => (
                  <td key={key} className="px-4 py-2 whitespace-nowrap">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer: Rows per page + Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-t bg-gray-50">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Rows per page:</label>
          <select
            value={recordsPerPage}
            onChange={(e) => {
              setCurrentPage(1);
              setRecordsPerPage(Number(e.target.value));
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 15, 20].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        {/* RizzUI-style Pagination */}
        <div className="flex justify-between items-center gap-x-1" aria-label="Pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
            className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Previous"
          >
            <svg className="shrink-0 size-3.5" viewBox="0 0 20 20" fill="none">
              <path d="M12 15L8 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:block">Previous</span>
          </button>

          <div className="flex items-center gap-x-1">
            <span className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg">
              {currentPage}
            </span>
            <span className="text-sm text-gray-500 px-1.5">of</span>
            <span className="text-sm text-gray-500 px-1.5">{totalPages}</span>
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
            className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Next"
          >
            <span className="hidden sm:block">Next</span>
            <svg className="shrink-0 size-3.5" viewBox="0 0 20 20" fill="none">
              <path d="M8 5L12 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

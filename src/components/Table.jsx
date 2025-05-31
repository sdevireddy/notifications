import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState(null);

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

  const renderSortIcon = (key) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="overflow-x-auto rounded-md border shadow-sm">
      <table className="w-full table-auto text-sm text-left">
        <thead className="bg-gray-100 font-semibold">
          <tr>
            {headers.map(({ label, key }) => (
              <th
                key={key}
                className="px-4 py-2 cursor-pointer"
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
          {sortedData.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
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
  );
};

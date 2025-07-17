import React, { useState } from "react";
import FilterModel from "../FilterModel";
import { IoClose } from "react-icons/io5";

const FilterSidebar = ({ isOpen, onClose }) => {
  const [dateFilter, setDateFilter] = useState("");
  const [customFiltersVisible, setCustomFiltersVisible] = useState(false);
  const [addedColumns, setAddedColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columnValues, setColumnValues] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    const isCustom = value === "custom";
    setCustomFiltersVisible(isCustom);

    if (!isCustom) {
      // Reset all custom filter states
      setFromDate("");
      setToDate("");
      setAddedColumns([]);
      setSelectedColumn("");
      setColumnValues({});
    }
  };

  const handleAddColumn = () => {
    if (selectedColumn && !addedColumns.includes(selectedColumn)) {
      setAddedColumns([...addedColumns, selectedColumn]);
      setSelectedColumn("");
    }
  };

  const handleColumnValueChange = (fieldName, value) => {
    setColumnValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleApplyFilters = () => {
    const appliedFilters = {
      dateRange: dateFilter,
      from: fromDate,
      to: toDate,
      ...columnValues,
    };
    console.log("Applied Filters:", appliedFilters);
    alert("Filters Applied!");
    onClose();
  };

  return (
    <>
      {/* Background Blur Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[40%] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button onClick={onClose}>
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 pb-24 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
          {/* Date Range Filter */}
          <div>
            <label className="block font-medium mb-1">Filter By</label>
            <select
              value={dateFilter}
              onChange={handleDateChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select Range</option>
              <option value="last_week">Last 1 Week</option>
              <option value="last_month">Last 1 Month</option>
              <option value="last_year">Last 1 Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Show calendar only for custom */}
          {customFiltersVisible && (
            <>
              {/* From - To Date Calendar Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
              </div>

              {/* Add Column Section */}
              <div className="space-y-2">
                <label className="block font-medium">Add Column</label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                  >
                    <option value="">Select Column</option>
                    {FilterModel.filter(
                      (f) => !addedColumns.includes(f.name)
                    ).map((field) => (
                      <option key={field.name} value={field.name}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddColumn}
                    disabled={!selectedColumn}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Render Added Fields */}
              {addedColumns.map((fieldName) => {
                const field = FilterModel.find((f) => f.name === fieldName);
                if (!field) return null;

                return (
                  <div key={field.name} className="relative group">
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                    </label>
                    <button
                      className="absolute top-0 right-0 text-red-500 hidden group-hover:block"
                      onClick={() => {
                        setAddedColumns((prev) =>
                          prev.filter((col) => col !== field.name)
                        );
                        setColumnValues((prev) => {
                          const newVals = { ...prev };
                          delete newVals[field.name];
                          return newVals;
                        });
                      }}
                      title="Remove"
                    >
                      ❌
                    </button>
                    {field.type === "select" ? (
                      <select
                        value={columnValues[field.name] || ""}
                        onChange={(e) =>
                          handleColumnValueChange(
                            field.name,
                            e.target.value
                          )
                        }
                        className="w-full border px-3 py-2 rounded-md"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={columnValues[field.name] || ""}
                        onChange={(e) =>
                          handleColumnValueChange(
                            field.name,
                            e.target.value
                          )
                        }
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 w-full bg-white p-4 border-t">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

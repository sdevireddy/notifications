"use client";

import { useState, useEffect } from "react";
import { X, Filter, Calendar, Plus } from "lucide-react";

const FilterModel = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  {
    name: "leadOwner",
    label: "Lead Owner",
    type: "select",
    options: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["New", "Contacted", "Qualified", "Lost", "Won"],
  },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: ["Low", "Medium", "High", "Critical"],
  },
  { name: "revenue", label: "Revenue", type: "number" },
  {
    name: "industry",
    label: "Industry",
    type: "select",
    options: ["Technology", "Healthcare", "Finance", "Education", "Manufacturing"],
  },
];

const conditionOptions = [
  { value: "contains", label: "Contains" },
  { value: "startsWith", label: "Starts with" },
  { value: "endsWith", label: "Ends with" },
  { value: "equals", label: "Equals" },
  { value: "greaterThan", label: "Greater than" },
  { value: "lessThan", label: "Less than" },
];

export default function FilterSidebar({ isOpen, onClose }) {
  const [filters, setFilters] = useState({ dateRange: "last7days", customFilters: [] });
  const [queryText, setQueryText] = useState("");
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    if (!isOpen) {
      setFilters({ dateRange: "last7days", customFilters: [] });
    }
  }, [isOpen]);

  const handleDateRangeChange = (value) => {
    setFilters({ dateRange: value, customFilters: [] });
  };

  const handleAddCondition = () => {
    setFilters((prev) => ({
      ...prev,
      customFilters: [
        ...prev.customFilters,
        { field: "", condition: "", value: "" },
      ],
    }));
  };

  const handleConditionChange = (index, key, val) => {
    const updatedFilters = [...filters.customFilters];
    updatedFilters[index][key] = val;
    setFilters((prev) => ({
      ...prev,
      customFilters: updatedFilters,
    }));
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", filters);
    onClose();
  };

  const handleResetFilters = () => {
    setFilters({ dateRange: "last7days", customFilters: [] });
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />}
      <div className={`fixed right-0 top-0 z-50 h-full w-lg transform border-l bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-[40%] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Filter className="h-5 w-5" />
              Filters
            </div>
            <button onClick={onClose} className="p-2">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-2 flex gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Date Range
            </div>
            <div className="mb-4 pl-5">
              {["last7days", "last30days", "lastyear", "range", "custom", "query"].map((value) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="dateRange"
                    value={value}
                    checked={filters.dateRange === value}
                    onChange={() => handleDateRangeChange(value)}
                    className="w-5"
                  />
                  <span className="capitalize">{value.replace(/last/, "Last ").replace(/(\d+)/, "$1 ")}</span>
                </label>
              ))}
            </div>

            {filters.dateRange === "query" && (
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1">Enter your query</label>
                <textarea
                  className="w-full h-24 rounded border px-2 py-1 text-sm"
                  placeholder="Type your query here..."
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                />
              </div>
            )}

            {filters.dateRange === "range" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  className="h-8 rounded border px-2 text-sm"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                />
                <label className="text-sm font-medium">End Date</label>
                <input
                  type="date"
                  className="h-8 rounded border px-2 text-sm"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                />
              </div>
            )}

            {filters.dateRange === "custom" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Conditions</h3>
                {filters.customFilters.map((cond, idx) => {
                  const selectedField = FilterModel.find((f) => f.name === cond.field);
                  const allowedConditions = selectedField?.type === "number"
                    ? ["equals", "greaterThan", "lessThan"]
                    : selectedField?.type === "select"
                      ? ["equals"]
                      : ["contains", "startsWith", "endsWith", "equals"];

                  return (
                    <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                      {/* Field Selector */}
                      <select
                        value={cond.field}
                        onChange={(e) => handleConditionChange(idx, "field", e.target.value)}
                        className="h-8 rounded border px-2 text-sm"
                      >
                        <option value="">Select Field</option>
                        {FilterModel.map((field) => (
                          <option key={field.name} value={field.name}>
                            {field.label}
                          </option>
                        ))}
                      </select>

                      {/* Condition Selector */}
                      <select
                        value={cond.condition}
                        onChange={(e) => handleConditionChange(idx, "condition", e.target.value)}
                        className="h-8 rounded border px-2 text-sm"
                      >
                        <option value="">Condition</option>
                        {allowedConditions.map((c) => (
                          <option key={c} value={c}>
                            {conditionOptions.find((co) => co.value === c)?.label}
                          </option>
                        ))}
                      </select>

                      {/* Input Field */}
                      {selectedField?.type === "select" ? (
                        <select
                          className="h-8 rounded border px-2 text-sm"
                          value={cond.value}
                          onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
                        >
                          <option value="">Select</option>
                          {selectedField?.options?.map((op) => (
                            <option key={op} value={op}>
                              {op}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={selectedField?.type || "text"}
                          className="h-8 rounded border px-2 text-sm"
                          placeholder="Value"
                          value={cond.value}
                          onChange={(e) => handleConditionChange(idx, "value", e.target.value)}
                        />
                      )}
                    </div>
                  );
                })}
                <button
                  onClick={handleAddCondition}
                  className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <Plus className="w-4 h-4" /> Add Condition
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2 border-t bg-gray-50 p-4">
            <button
              onClick={handleApplyFilters}
              className="flex-1 rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 rounded border bg-white py-2 text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

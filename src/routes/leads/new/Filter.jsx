"use client";

import { useState, useEffect } from "react";
import { X, Filter, Calendar } from "lucide-react";

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
    { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Qualified", "Lost", "Won"] },
    { name: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High", "Critical"] },
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
    const [filters, setFilters] = useState({
        dateRange: "last7days",
        customFilters: {},
    });
    const [queryText, setQueryText] = useState("");
    const [showCustomFields, setShowCustomFields] = useState(false);
    const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" });
    useEffect(() => {
        if (!isOpen) {
            setFilters({ dateRange: "last7days", customFilters: {} });
            setShowCustomFields(false);
        }
    }, [isOpen]);

    const handleDateRangeChange = (value) => {
        setFilters((prev) => ({ ...prev, dateRange: value }));
        setShowCustomFields(value === "custom");
    };

    const handleCustomFilterChange = (fieldName, type, newValue) => {
        setFilters((prev) => ({
            ...prev,
            customFilters: {
                ...prev.customFilters,
                [fieldName]: {
                    ...prev.customFilters[fieldName],
                    [type]: newValue,
                },
            },
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            dateRange: "last7days",
            customFilters: {},
        });
        setShowCustomFields(false);
    };

    const handleApplyFilters = () => {
        console.log("Applied filters:", filters);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Panel */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full transform border-l bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-96 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <Filter className="h-5 w-5" />
                            Filters
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Date Range */}
                        <div className="flex flex-col justify-start">
                            <div className="mb-2 flex gap-2 text-sm font-medium">
                                <Calendar className="h-4 w-4" />
                                Date Range
                            </div>
                            <div className="mb-4 pl-5">
                                {["last7days", "last30days", "lastyear", "range", "custom","query"].map((value) => (
                                    <label
                                        key={value}
                                        className="flex items-center gap-2 text-sm"
                                    >
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
                                <label
                                    className="text-sm font-medium"
                                    htmlFor="start-date"
                                >
                                    Start Date
                                </label>
                                <input
                                    id="start-date"
                                    type="date"
                                    className="h-8 rounded border px-2 text-sm"
                                    value={customDateRange.start}
                                    onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                                />

                                <label
                                    className="text-sm font-medium"
                                    htmlFor="end-date"
                                >
                                    End Date
                                </label>
                                <input
                                    id="end-date"
                                    type="date"
                                    className="h-8 rounded border px-2 text-sm"
                                    value={customDateRange.end}
                                    onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                                />
                            </div>
                        )}
                        {/* Advanced Filters */}
                        {showCustomFields && (
                            <div className="space-y-4 transition-all duration-300 ease-in-out">
                                <h3 className="text-sm font-semibold">Advanced Filters</h3>
                                {FilterModel.map((field, index) => (
                                    <div
                                        key={field.name}
                                        className="space-y-1"
                                    >
                                        <label className="text-sm font-medium">{field.label}</label>

                                        {/* Condition Dropdown */}
                                        <select
                                            className="h-8 w-full rounded border px-2 text-sm"
                                            value={filters.customFilters[field.name]?.condition || "contains"}
                                            onChange={(e) => handleCustomFilterChange(field.name, "condition", e.target.value)}
                                        >
                                            {conditionOptions
                                                .filter((option) => {
                                                    if (field.type === "number") {
                                                        return ["equals", "greaterThan", "lessThan"].includes(option.value);
                                                    }
                                                    return ["contains", "startsWith", "endsWith", "equals"].includes(option.value);
                                                })
                                                .map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Value Field */}
                                        {field.type === "select" ? (
                                            <select
                                                className="h-8 w-full rounded border px-2 text-sm"
                                                value={filters.customFilters[field.name]?.value || ""}
                                                onChange={(e) => handleCustomFilterChange(field.name, "value", e.target.value)}
                                            >
                                                <option value="">Select {field.label}</option>
                                                {field.options?.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                className="h-8 w-full rounded border px-2 text-sm"
                                                placeholder={`Enter ${field.label}`}
                                                value={filters.customFilters[field.name]?.value || ""}
                                                onChange={(e) => handleCustomFilterChange(field.name, "value", e.target.value)}
                                            />
                                        )}

                                        {index < FilterModel.length - 1 && <hr className="my-3" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
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

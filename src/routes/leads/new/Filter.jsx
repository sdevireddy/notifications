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
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-[40%] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h2 className="text-lg font-semibold">Filter</h2>
                    <button onClick={onClose}>
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="h-[calc(100%-60px)] space-y-5 overflow-y-auto p-4 pb-24">
                    {/* Date Range Filter */}
                    <div>
                        <label className="mb-1 block font-medium">Filter By</label>
                        <select
                            value={dateFilter}
                            onChange={handleDateChange}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            <option value="">Select Range</option>
                            <option value="last_week">Last 1 Week</option>
                            <option value="last_month">Last 1 Month</option>
                            <option value="last_year">Last 1 Year</option>
                            <option value="date">Date</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    {dateFilter === "date" && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">From Date</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">To Date</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full rounded-md border px-3 py-2"
                                />
                            </div>
                        </div>
                    )}
                    {/* Show calendar only for custom */}
                    {customFiltersVisible && (
                        <>
                            {/* From - To Date Calendar Inputs */}

                            {/* Add Column Section */}
                            <div className="space-y-2">
                                <label className="block font-medium">Add Column</label>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={selectedColumn}
                                        onChange={(e) => setSelectedColumn(e.target.value)}
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        <option value="">Select Column</option>
                                        {FilterModel.filter((f) => !addedColumns.includes(f.name)).map((field) => (
                                            <option
                                                key={field.name}
                                                value={field.name}
                                            >
                                                {field.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={handleAddColumn}
                                        disabled={!selectedColumn}
                                        className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white disabled:opacity-50"
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
                                    <div
                                        key={field.name}
                                        className="group relative"
                                    >
                                        <label className="mb-1 block text-sm font-medium">{field.label}</label>
                                        <button
                                            className="absolute right-0 top-0 hidden text-red-500 group-hover:block"
                                            onClick={() => {
                                                setAddedColumns((prev) => prev.filter((col) => col !== field.name));
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
                                                onChange={(e) => handleColumnValueChange(field.name, e.target.value)}
                                                className="w-full rounded-md border px-3 py-2"
                                            >
                                                <option value="">Select {field.label}</option>
                                                {field.options?.map((opt) => (
                                                    <option
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                value={columnValues[field.name] || ""}
                                                onChange={(e) => handleColumnValueChange(field.name, e.target.value)}
                                                className="w-full rounded-md border px-3 py-2"
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
                <div className="absolute bottom-0 left-0 w-full border-t bg-white p-4">
                    <button
                        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white"
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

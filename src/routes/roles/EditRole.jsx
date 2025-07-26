"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { X } from "lucide-react";
import { Select } from "../../components/ui/customSelect";

const modules = ["Leads", "Contacts", "Deals"];
const actions = {
  Leads: ["View", "Create", "Edit", "Delete", "praveen"],

  Contacts: ["View", "Create", "Edit", "Delete"],
  Deals: ["View", "Create", "Edit", "Delete"],
};

const RoleEditPage = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    reportTo: "",
  });

  const [permissions, setPermissions] = useState({
    Leads: ["View", "Create", "Edit", "Delete"],
    Contacts: [],
    Deals: [],
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, reportTo: value }));
  };

  const handleActionChange = (module, value) => {
    setPermissions((prev) => {
      const existing = prev[module] || [];
      if (!existing.includes(value)) {
        return { ...prev, [module]: [...existing, value] };
      }
      return prev;
    });

  };

  const handlePermissionDelete = (module, value) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: prev[module].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      permissions,
    };
    console.log("Role Submitted:", payload);
    // axios.post("/api/roles", payload)
  };

  return (
    <div className="rounded-xl bg-white px-3 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Edit Role</h1>
          <BreadCrumb />
        </div>
      </div>

      {/* Form Start */}
      <form onSubmit={handleSubmit} className="space-y-6 px-3 py-4">
        {/* Role Name */}
        <div>
          <label className="mb-1 block font-medium">Role Name</label>
          <input
            type="text"
            name="roleName"
            value={formData.roleName}
            onChange={handleInputChange}
            placeholder="e.g. Sales Executive"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Short summary of the role"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Report To */}
        <div>
          <label className="mb-1 block font-medium">Report To</label>
          <Select
            onChange={(e) => handleSelectChange(e.target.value)}
            placeholder="Reported to"
            options={["praveen"]}
          />
        </div>

        {/* Permissions Table */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Module Permissions</h3>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module} className="space-y-3 rounded-md px-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black">{module}</p>
                    <p className="text-gray-400">Create rules for {module}</p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <div
                      className="relative min-w-[28rem] max-w-md rounded-md border p-2 flex flex-wrap gap-2 cursor-pointer dropdown-container"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === module ? null : module
                        )
                      }
                    >
                      {permissions[module]?.length === 0 ? (
                        <span className="italic text-gray-400">
                          No actions selected
                        </span>
                      ) : (
                        permissions[module].map((per) => (
                          <span
                            key={per}
                            className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                          >
                            {per}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePermissionDelete(module, per);
                              }}
                            >
                              <X className="h-4 w-4 text-blue-600 hover:text-red-500" />
                            </button>
                          </span>
                        ))
                      )}

                      {/* Dropdown Options */}
                      {openDropdown === module && (
                        <div className="absolute top-full left-0 mt-2 w-40 rounded-md border bg-white shadow-lg z-10">
                          {actions[module].map((action) => (
                            <div
                              key={module + action}
                              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-100 ${
                                permissions[module]?.includes(action)
                                  ? "text-blue-600 font-medium"
                                  : "text-gray-700"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionChange(module, action);
                              }}
                            >
                              {action}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleEditPage;

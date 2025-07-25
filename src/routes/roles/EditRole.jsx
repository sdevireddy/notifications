"use client";
import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { X } from "lucide-react";
import { Select } from "../../components/ui/customSelect";

const modules = ["Leads", "Contacts", "Deals"];
const actions = {
  Leads: ["View", "Create", "Edit", "Delete"],
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
    Leads: [],
    Deals: [],
    Contacts: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      reportTo: value,
    }));
  };

  const handleActionChange = (module, value) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: value && !prev[module].includes(value)
        ? [...prev[module], value]
        : prev[module],
    }));
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
         onChange={(e)=>handleSelectChange(e.target.value)}
         placeholder="reported to"
         options={["praveen"]}
         />
        </div>

        {/* Permissions Table */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Module Permissions</h3>
          <div className="space-y-4">
            {modules.map((module) => (
              <div
                key={module}
                className="rounded-md border p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-black">{module}</p>
                  <Select
                  className={"w-20"}
                  name={module}
                  onChange={(e)=>handleActionChange(module,e.target.value)}
                  options={actions[module]}
                  />
                </div>

                {/* Permission List with delete */}
                <div className="flex flex-wrap gap-2">
                  {permissions[module].length === 0 ? (
                    <span className="italic text-gray-400">No actions selected</span>
                  ) : (
                    permissions[module].map((per) => (
                      <span
                        key={per}
                        className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                      >
                        {per}
                        <button
                          type="button"
                          onClick={() => handlePermissionDelete(module, per)}
                        >
                          <X className="h-4 w-4 text-blue-600 hover:text-red-500" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="rounded bg-primary px-4 py-2 text-white transition duration-200 hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleEditPage;

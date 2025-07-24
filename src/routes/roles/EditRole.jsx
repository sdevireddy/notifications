"use client";
import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { Select } from "../../components/ui/select";

const modules = ["Leads", "Contacts", "Deals"];
const actions = ["View", "Create", "Edit", "Delete"];

const RoleEditPage = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    reportTo: "",
  });

  const [permissions, setPermissions] = useState(
    modules.reduce((acc, module) => {
      acc[module] = actions.reduce((actionAcc, action) => {
        actionAcc[action] = false;
        return actionAcc;
      }, {});
      return acc;
    }, {})
  );

  // Handles input changes for roleName, description, reportTo
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

  const handleToggle = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      permissions,
    };
    console.log("Role Submitted:", payload);
    // You can send this to backend:
    // axios.post("/api/roles", payload)
  };

  return (
    <div className="rounded-xl bg-white shadow-lg px-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Role</h1>
          <BreadCrumb />
        </div>
      </div>

      {/* Form Start */}
      <form onSubmit={handleSubmit} className="space-y-6 py-4 px-3">
        {/* Role Name */}
        <div>
          <label className="block font-medium mb-1">Role Name</label>
          <input
            type="text"
            name="roleName"
            value={formData.roleName}
            onChange={handleInputChange}
            placeholder="e.g. Sales Executive"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Short summary of the role"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Report To */}
        <div>
          <Select
            label="Report To"
            name="reportTo"
            value={formData.reportTo}
            onChange={handleSelectChange}
            options={["Admin", "Manager", "Supervisor"]}
            required
          />
        </div>

        {/* Permissions Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Module Permissions</h3>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">Module</th>
                  {actions.map((action) => (
                    <th key={action} className="p-3 border text-center">
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">{module}</td>
                    {actions.map((action) => (
                      <td key={action} className="p-3 border text-center">
                        <input
                          type="checkbox"
                          checked={permissions[module][action]}
                          onChange={() => handleToggle(module, action)}
                          className="w-5 h-5 text-blue-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className=" bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleEditPage;

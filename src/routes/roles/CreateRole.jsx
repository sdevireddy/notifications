"use client";

import React, { useState } from "react";
import { Button } from "../../components/layout/ui/button";
import BreadCrumb from "../../components/BreadCrump";
import { Input } from "../../components/layout/ui/input";

const MODULES_DATA = {
  leads: {
    name: "Leads",
    permissions: [
      { id: "view_leads", label: "View Leads" },
      { id: "create_lead", label: "Create Lead" },
      { id: "edit_lead", label: "Edit Lead" },
      { id: "delete_lead", label: "Delete Lead" },
    ],
  },
  deals: {
    name: "Deals",
    permissions: [
      { id: "view_deals", label: "View Deals" },
      { id: "create_deal", label: "Create Deal" },
      { id: "edit_deal", label: "Edit Deal" },
      { id: "delete_deal", label: "Delete Deal" },
    ],
  },
  contacts: {
    name: "Contacts",
    permissions: [
      { id: "view_contacts", label: "View Contacts" },
      { id: "create_contact", label: "Create Contact" },
      { id: "edit_contact", label: "Edit Contact" },
      { id: "delete_contact", label: "Delete Contact" },
    ],
  },
  users: {
    name: "Users",
    permissions: [
      { id: "view_users", label: "View Users" },
      { id: "create_user", label: "Create User" },
      { id: "edit_user", label: "Edit User" },
      { id: "delete_user", label: "Delete User" },
    ],
  },
  reports: {
    name: "Reports",
    permissions: [
      { id: "view_reports", label: "View Reports" },
      { id: "create_report", label: "Create Report" },
      { id: "edit_report", label: "Edit Report" },
      { id: "delete_report", label: "Delete Report" },
    ],
  },
};

export default function CreateRoleForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedModules: [],
    permissions: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleModuleChange = (moduleId, checked) => {
    setFormData((prev) => {
      const newSelectedModules = checked
        ? [...prev.selectedModules, moduleId]
        : prev.selectedModules.filter((id) => id !== moduleId);

      let newPermissions = prev.permissions;
      if (!checked) {
        const modulePermissions = MODULES_DATA[moduleId].permissions.map((p) => p.id);
        newPermissions = prev.permissions.filter((p) => !modulePermissions.includes(p));
      }

      return {
        ...prev,
        selectedModules: newSelectedModules,
        permissions: newPermissions,
      };
    });
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter((id) => id !== permissionId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      name: formData.name,
      description: formData.description,
      permissions: formData.permissions,
    };
    console.log("Form Data:", submitData);
  };

  return (
    <div className="px-4  min-h-screen bg-white">
      <div className="">
         <div className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Roles Create</h1>
                    <BreadCrumb />
                </div>
                </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="roleName" className="block font-medium text-gray-700">Role Name</label>
              <Input
                id="roleName"
                name="name"
                type="text"
                placeholder="Enter role name"
                value={formData.name}
                onChange={handleChange}
                required
                
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
              <Input
                id="description"
                name="description"
                placeholder="Describe the role"
                value={formData.description}
                onChange={handleChange}
                className="p-2 mt-1 block w-full rounded-md resize-none min-h-10 border-gray-400"
              />
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <h3 className="text-lg font-semibold">Modules</h3>
            <p className="text-sm text-gray-600 mb-3">Select the modules this role should have access to:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(MODULES_DATA).map(([moduleId, module]) => (
                <label key={moduleId} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={formData.selectedModules.includes(moduleId)}
                    onChange={(e) => handleModuleChange(moduleId, e.target.checked)}
                  />
                  <span className="text-sm">{module.name}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.selectedModules.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Permissions</h3>
              {formData.selectedModules.map((moduleId) => {
                const module = MODULES_DATA[moduleId];
                return (
                  <div key={moduleId} className="border rounded-md p-4 bg-white shadow">
                    <strong className="text-gray-800 block mb-2">{module.name} Permissions</strong>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {module.permissions.map((permission) => (
                        <label key={permission.id} className="flex gap-3">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission.id)}
                            onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                          />
                          <span className="text-sm">{permission.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Create Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

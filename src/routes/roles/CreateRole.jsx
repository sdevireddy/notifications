import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

const initialFormState = {
  roleName: "",
  reportTo: "",
  description: "",
};

const RoleCreationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    toast.info("Form reset");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role Data Submitted:", formData);
    toast.success("Role saved!");
  };

  return (
    <div className="w-full text-sm">
      <form className="rounded-lg bg-white shadow-md" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="rounded p-2 hover:bg-gray-200"
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">Create Role</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <button
              type="button"
              className="rounded border border-primary px-4 py-2 hover:bg-gray-100 transition"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded bg-buttonprimary px-4 py-2 text-white hover:bg-buttonprimary-hover shadow"
            >
              Save
            </button>
          </div>
        </div>

        {/* Role Info Section */}
        <Section title="Role Information" icon={<FiUser />}>
          <Input
            label="Role Name"
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            required
          />
          <Select
            label="Report To"
            name="reportTo"
            value={formData.reportTo}
            onChange={handleChange}
            options={["Admin", "Manager", "Supervisor"]}
            required
          />
          <div className="col-span-full">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </Section>
      </form>
    </div>
  );
};

// Reusable Section
const Section = ({ title, icon, children }) => (
  <div className="mb-4 rounded border p-4">
    <h3 className="mb-4 flex items-center gap-2 border-b pb-1 text-lg font-semibold">
      {icon} {title}
    </h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
  </div>
);

// Reusable Input
const Input = ({ label, name, type = "text", value, onChange, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded border-blue-400 p-2 border"
    />
  </div>
);

// Reusable Select
const Select = ({ label, name, value, onChange, options = [], required = false }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded border-blue-400 p-2 border"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default RoleCreationForm;

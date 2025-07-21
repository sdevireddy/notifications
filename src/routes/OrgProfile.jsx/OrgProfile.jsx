"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, Building } from "lucide-react";
import { setOrgState } from "../../store/orgSlice";

export default function OrganizationProfile() {
  const dispatch = useDispatch();
  const org = useSelector((state) => state.organization);

  const [formData, setFormData] = useState({
    logo: org.logo || null,
    name: org.name || "",
    email: org.email || "",
    phone: org.phone || "",
    website: org.website || "",
    address: org.address || "",
    city: org.city || "",
    state: org.state || "",
    country: org.country || "",
    postalCode: org.postalCode || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const file = files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, logo: url }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    dispatch(setOrgState(formData));
    alert("Organization profile updated!");
  };

  return (
    <div className=" bg-white shadow rounded-md px-4">
      <div className="flex items-center justify-between border-b px-2 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Organization Profile</h1>
                </div>
            </div>

      {/* Logo Upload */}
      <div className="py-4">
        <label className="block text-sm font-semi-bold mb-1">Organization Logo</label>
        <div className="flex items-center gap-4">
          {formData.logo ? (
            <img src={formData.logo} alt="logo" className="h-16 w-16 rounded border object-contain" />
          ) : (
            <div className="h-16 w-16 rounded border flex items-center justify-center text-gray-400">No Logo</div>
          )}
          <label className="cursor-pointer flex items-center gap-1 text-blue-600 hover:underline">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Organization Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="Ex: Gymforce"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="info@company.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="+91-XXXXXXXXXX"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      {/* Address Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="Street address"
          />
        </div>
        <div>
          <label className="text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="City"
          />
        </div>
        <div>
          <label className="text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="State"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="Postal Code"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 mb-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-sm"
      >
        Update Profile
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, User } from "lucide-react";
import { setUserState } from "../../store/userSlice"; // Create this slice

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assumes user state is set

  const [formData, setFormData] = useState({
    photo: user.photo || null,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "",
    department: user.department || "",
    location: user.location || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, photo: url }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    dispatch(setUserState(formData));
    alert("User profile updated!");
  };

  return (
    <div className="bg-white shadow rounded-md px-4">
      <div className="flex items-center justify-between border-b px-2 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="py-4">
        <label className="block text-sm font-semi-bold mb-1">Profile Photo</label>
        <div className="flex items-center gap-4">
          {formData.photo ? (
            <img src={formData.photo} alt="profile" className="h-16 w-16 rounded-full border object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full border flex items-center justify-center text-gray-400">
              <User className="w-6 h-6" />
            </div>
          )}
          <label className="cursor-pointer flex items-center gap-1 text-blue-600 hover:underline">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="First name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="Last name"
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
            placeholder="Email address"
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
            placeholder="Phone number"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="e.g., Manager"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="e.g., Sales"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 text-sm"
            placeholder="e.g., New York Office"
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

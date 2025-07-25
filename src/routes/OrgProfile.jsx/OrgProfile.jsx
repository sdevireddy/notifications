"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, Building, DeleteIcon, Delete, Trash2 } from "lucide-react";
import { setOrgState } from "../../store/orgSlice";
import { FiDelete } from "react-icons/fi";
import { LuDelete } from "react-icons/lu";
import { Link } from "react-router-dom";
import AddBranch from "./branch/AddBranch";

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
        branches: org.branches || [""],
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
    const handleBranchChange = (index, value) => {
        const updatedBranches = [...formData.branches];
        updatedBranches[index] = value;
        setFormData((prev) => ({ ...prev, branches: updatedBranches }));
    };

    const handleAddBranch = () => {
        setFormData((prev) => ({
            ...prev,
            branches: [...prev.branches, ""],
        }));
    };
const handleDeleteBranch=(index)=>{
  const newBranches=formData.branches.filter((branch,ind)=>index!==ind)
  setFormData((prev)=>({
    ...prev,
    branches:[...newBranches]
  }))
}
    return (
        <div className="rounded-md bg-white px-4 shadow">
            <div className="flex items-center justify-between border-b px-2 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Organization Profile</h1>
                </div>
            </div>

            {/* Logo Upload */}
            <div className="py-4">
                <label className="font-semi-bold mb-1 block text-sm">Organization Logo</label>
                <div className="flex items-center gap-4">
                    {formData.logo ? (
                        <img
                            src={formData.logo}
                            alt="logo"
                            className="h-16 w-16 rounded border object-contain"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded border text-gray-400">No Logo</div>
                    )}
                    <label className="flex cursor-pointer items-center gap-1 text-primary hover:underline">
                        <Upload className="h-4 w-4" />
                        <span >Upload</span>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium">Organization Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
                        placeholder="https://yourcompany.com"
                    />
                </div>
            </div>

            {/* Address Info */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
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
                        className="mt-1 w-full rounded border px-3 py-2 text-sm"
                        placeholder="Postal Code"
                    />
                </div>
                <div >
                    <label className="text-sm font-medium">Branches</label>
                    <div className="mt-2 space-y-2">
                        {formData.branches.map((branch, index) => (
                          <div className="flex gap-2 items-center">

                            <input
                                key={index}
                                type="text"
                                value={branch}
                                onChange={(e) => handleBranchChange(index, e.target.value)}
                                className="w-full rounded border px-3 py-2 text-sm"
                                placeholder={`Branch ${index + 1}`}
                            />
                            <div className="cursor-pointer hover:text-red-700" onClick={()=>handleDeleteBranch(index)}>
                              <Trash2 size={17} />
                              </div>
                            </div>
                        ))}
                    </div>
                    <div className="py-3">

                    <AddBranch/>
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="mb-4 mt-6 rounded bg-primary px-6 py-2 text-sm text-white hover:opacity-90"
            >
                Update Profile
            </button>
        </div>
    );
}

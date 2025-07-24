"use client";

import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";

export default function AddBranch() {
  const [branchData, setBranchData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setBranchData({ ...branchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Branch Data:", branchData);
    // Add API call here
  };

  return (
    <Dialog>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-white rounded ">
          Add Branch
        </button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            Fill the details below to add a new branch.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <input
            type="text"
            name="name"
            placeholder="Branch Name"
            value={branchData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={branchData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={branchData.city}
              onChange={handleChange}
              className="w-1/2 border rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={branchData.state}
              onChange={handleChange}
              className="w-1/2 border rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={branchData.pincode}
              onChange={handleChange}
              className="w-1/2 border rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={branchData.phone}
              onChange={handleChange}
              className="w-1/2 border rounded px-3 py-2 text-sm"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={branchData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </form>

        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
          >
            Save Branch
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

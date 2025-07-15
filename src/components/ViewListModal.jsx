"use client";

import { Dialog } from "@/components/ui/dialog";
import Table from "@/components/Table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewListModal({ list, onClose }) {
  const [search, setSearch] = useState("");

  const filteredUsers = list.users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
  ];

  return (
    <Dialog open={!!list} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white w-full max-w-4xl rounded-lg p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">View Users in: {list.name}</h2>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>

          {/* Search Users */}
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* User Table */}
          <Table columns={columns} data={filteredUsers} />

          {/* Mass Actions */}
          <div className="mt-4 flex gap-2">
            <Button variant="outline">Mass Edit</Button>
            <Button variant="destructive">Mass Delete</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

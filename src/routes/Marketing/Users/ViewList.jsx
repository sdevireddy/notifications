"use client";
import { useState, useMemo, useEffect } from "react";
  import {Input} from "@/components/ui/input";
  import {Button} from "@/components/ui/button";
  import Tooltip from "../../../components/ToolTip"
import { Search, Edit, Trash2, User } from "lucide-react";
import Table from "@/components/Table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function ViewListModal({ open, onClose, list }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Load dummy users for selected list
  useEffect(() => {
    if (!list) return;
    const dummyUsers = [
      {
        id: 1,
        name: "Anjali Rao",
        email: "anjali@example.com",
        phone: "9876543210",
        createdAt: "2025-07-01",
        owner: "sales_user1",
      },
      {
        id: 2,
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "9123456789",
        createdAt: "2025-07-10",
        owner: "sales_user2",
      },
      {
        id: 3,
        name: "Meera Patel",
        email: "meera@example.com",
        phone: "9812345678",
        createdAt: "2025-07-15",
        owner: "sales_user3",
      },
    ];
    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers);
  }, [list]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.owner.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, users]);

  const handleSelectUser = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length ? [] : filteredUsers
    );
  };

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllRowsSelected(!!value);
              handleSelectAll();
            }}
          />
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <Checkbox
              checked={selectedUsers.some((u) => u.id === user.id)}
              onCheckedChange={() => handleSelectUser(user)}
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div>{user.name}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
      {
        accessorKey: "owner",
        header: "Owner",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          );
        },
      },
    ],
    [selectedUsers]
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {list?.name || "View List"}
          </h2>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-md border p-3 bg-gray-50 text-sm">
            <div>
              {selectedUsers.length} selected — you can perform bulk actions.
            </div>
            <div className="flex gap-2">
              <Tooltip text="Mass Update">
                <Button size="sm" variant="outline">
                  Update
                </Button>
              </Tooltip>
              <Tooltip text="Mass Delete">
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </Tooltip>
            </div>
          </div>
        )}

        <Table columns={columns} data={filteredUsers} />
      </DialogContent>
    </Dialog>
  );
}

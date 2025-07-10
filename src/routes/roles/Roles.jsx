"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import Table from "@/components/Table";
import BreadCrumb from "@/components/BreadCrump";
import { axiosPrivate } from "@/utils/axios";
import { apiSummary } from "../../common/apiSummary";
import { Link } from "react-router-dom";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRoles = async () => {
    try {
      const res = await axiosPrivate(apiSummary.getRoles);
      setRoles(res.data || []);
    } catch (err) {
      console.error("Failed to load roles", err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (roleId) => {
    try {
      await axiosPrivate({
        ...apiSummary.deleteRole,
        data: { id: roleId },
      });
      fetchRoles();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Role Name",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
          <BreadCrumb />
        </div>
        <Link to={"/roles/create"}>
        <Button className="bg-buttonprimary text-white hover:bg-buttonprimary-hover">
          <Plus className="mr-2 h-4 w-4" /> Create Role
        </Button>
        </Link>
      </div>

      <div className="flex justify-end border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search roles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table columns={columns} data={filteredRoles} />
    </div>
  );
};

export default Roles;

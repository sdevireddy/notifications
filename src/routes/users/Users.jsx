"use client";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Edit, Trash2, UserPlus, Search, Mail } from "lucide-react";
import Table from "@/components/Table";
import BreadCrumb from "../../components/BreadCrumb";
import Tooltip from "@/components/ToolTip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useFetchData from "../../hooks/useFetchData";
import { apiSummary } from "../../common/apiSummary";
import { axiosPrivate } from "@/utils/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("25");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  const [usersData, refresh, setRefresh] = useFetchData(apiSummary.getUsers);

  useEffect(() => {
    setUsers(usersData.data || []);
    setCurrentPage(1);
  }, [usersData]);

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  const handleDelete = async () => {
    if (selectedUsers.length <= 0) return;
    try {
      const ids = selectedUsers.map((user) => user.id);
      await axiosPrivate({
        ...apiSummary.deleteUsers,
        data: { deleteIds: ids },
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const recordsPerPageValue = parseInt(recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPageValue;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
  const currentUsers = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPageValue);

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.some((item) => item.id === user.id) ? prev.filter((item) => item.id !== user.id) : [...prev, user]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users);
  };

  const columns = useMemo(() => [
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
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            handleUserSelect(row.original);
          }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ], [selectedUsers]);

  return (
    <div className="flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <BreadCrumb />
        </div>
        <Button
          onClick={() => navigate("/users/create")}
          className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Create User
        </Button>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="records-per-page" className="text-sm">Show</Label>
          <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((num) => (
                <SelectItem key={num} value={String(num)}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table columns={columns} data={currentUsers} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredUsers.length)} of {filteredUsers.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="rounded border bg-white px-3 py-1 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
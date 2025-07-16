"use client";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LuFilter } from "react-icons/lu";
import {Button} from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import ViewListModal from "./ViewList";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import Table from "@/components/Table";
import Tooltip from "@/components/ToolTip";
import BreadCrumb from "@/components/BreadCrumb";
import { Dialog } from "../../../components/ui/Dialog";
import { Checkbox } from "../../../components/ui/Checkbox";
// import { ViewListModal } from "@/components/marketing/users/ViewListModal";

export default function UsersPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  // Dummy data — replace with backend fetch
  useEffect(() => {
    const dummyLists = [
      {
        id: 1,
        name: "Product Demo Leads",
        totalContacts: 120,
        topic: "Demo Campaign",
        createdAt: "2025-07-01",
      },
      {
        id: 2,
        name: "Newsletter Subscribers",
        totalContacts: 80,
        topic: "Monthly Updates",
        createdAt: "2025-07-10",
      },
    ];
    setLists(dummyLists);
    setFilteredLists(dummyLists);
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredLists(
      lists.filter(
        (list) =>
          list.name.toLowerCase().includes(term) ||
          list.topic.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1);
  }, [searchTerm, lists]);

  const recordsPerPageValue = parseInt(recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPageValue;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
  const currentLists = filteredLists.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredLists.length / recordsPerPageValue);

  const handleSelectAll = () => {
    setSelectedLists(
      selectedLists.length === currentLists.length ? [] : currentLists
    );
  };

  const handleRowSelect = (list) => {
    setSelectedLists((prev) =>
      prev.some((l) => l.id === list.id)
        ? prev.filter((l) => l.id !== list.id)
        : [...prev, list]
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
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              handleRowSelect(row.original);
            }}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "List Name",
      },
      {
        accessorKey: "totalContacts",
        header: "Total Contacts",
      },
      {
        accessorKey: "topic",
        header: "Topic",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const list = row.original;
          return (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                  setSelectedList(list);
                  setViewModalOpen(true);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
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
    [selectedLists]
  );

  return (
    <div className="flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Lists</h1>
          <BreadCrumb />
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center"
            onClick={() => {
              // You can trigger filter modal here
            }}
          >
            <Tooltip text={"Filter"}>
              <LuFilter />
            </Tooltip>
          </div>
          <Button
            onClick={() => navigate("/marketing/users/create")}
            className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
          >
            <Plus className="mr-2 h-4 w-4" /> Create List
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Lists..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Show</span>
          <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((num) => (
                <SelectItem key={num} value={String(num)}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table columns={columns} data={currentLists} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, filteredLists.length)} of{" "}
          {filteredLists.length} results
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
  <ViewListModal
    open={viewModalOpen}
    onClose={() => setViewModalOpen(false)}
    list={selectedList}
  />
</Dialog>
    </div>
  );
}

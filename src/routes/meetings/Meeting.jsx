"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Mail,
  Trash2,
  User,
  MoreVertical,
  Send,
  Users,
  Edit,
  Tag,
  Import,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Table from "@/components/table";
import { toast } from "react-hot-toast";
import useFetchData from "../../hooks/useFetchData";
import { axiosPrivate } from "../../utils/axios";
import { apiSummary } from "../../common/apiSummary";
import BreadCrumb from "../../components/BreadCrumb";
import { LuFilter } from "react-icons/lu";
import Tooltip from "../../components/ToolTip";

const availableColumns = {
  title: true,
  from: true,
  to: true,
  relatedTo: true,
  contactName: true,
  host: true,
};

const columnsConfig = {
  title: {
    label: "Title",
    render: ({ row }) => row.original.title || "-",
  },
  from: {
    label: "From",
    render: ({ row }) => new Date(row.original.from).toLocaleString(),
  },
  to: {
    label: "To",
    render: ({ row }) => new Date(row.original.to).toLocaleString(),
  },
  relatedTo: {
    label: "Related To",
    render: ({ row }) => row.original.relatedTo || "-",
  },
  contactName: {
    label: "Contact Name",
    render: ({ row }) => row.original.contactName || "-",
  },
  host: {
    label: "Host",
    render: ({ row }) => row.original.host || "-",
  },
};

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [search, setSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeetings, setSelectedMeetings] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(availableColumns);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const navigate = useNavigate();

  const [meetingsData, refetchData, loading] = useFetchData(
    apiSummary.crm.getMeetings,
    currentPage,
    recordsPerPage
  );

  useEffect(() => {
    setMeetings(meetingsData?.data?.data || []);
    setFilteredMeetings(meetingsData?.data?.data || []);
  }, [meetingsData]);

  useEffect(() => {
    const term = search.toLowerCase();
    setFilteredMeetings(
      meetings.filter(
        (m) =>
          m.title.toLowerCase().includes(term) ||
          m.contactName?.toLowerCase().includes(term) ||
          m.relatedTo?.toLowerCase().includes(term) ||
          m.host?.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1);
  }, [search]);

  const indexOfLastRecord = currentPage * parseInt(recordsPerPage);
  const indexOfFirstRecord = indexOfLastRecord - parseInt(recordsPerPage);
  const totalRecords = filteredMeetings.length;
  const totalPages = Math.ceil(totalRecords / parseInt(recordsPerPage));
  const currentMeetings = filteredMeetings.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleSelectMeeting = (meeting) => {
    setSelectedMeetings((prev) =>
      prev.some((m) => m.id === meeting.id)
        ? prev.filter((m) => m.id !== meeting.id)
        : [...prev, meeting]
    );
  };

  const handleSelectAll = () => {
    if (selectedMeetings.length === currentMeetings.length) {
      setSelectedMeetings([]);
    } else {
      setSelectedMeetings(currentMeetings);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosPrivate({ ...apiSummary.crm.deleteMeeting(id) });
      toast.success("Meeting deleted successfully");
      refetchData();
    } catch (err) {
      toast.error("Failed to delete meeting");
    }
  };

  const columns = useMemo(() => {
    const dynamicCols = [];

    dynamicCols.push({
      id: "select",
      header: () => (
        <Checkbox
          checked={selectedMeetings.length === currentMeetings.length}
          onCheckedChange={handleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedMeetings.some((m) => m.id === row.original.id)}
          onCheckedChange={() => handleSelectMeeting(row.original)}
        />
      ),
    });

    Object.keys(columnsConfig).forEach((key) => {
      if (visibleColumns[key]) {
        dynamicCols.push({
          accessorKey: key,
          header: columnsConfig[key].label,
          cell: columnsConfig[key].render,
        });
      }
    });

    dynamicCols.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" /> Send Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    });

    return dynamicCols;
  }, [visibleColumns, selectedMeetings, currentMeetings]);

  return (
    <div className="flex-1 bg-white">
     <div className="flex items-center justify-between px-6 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Meetings</h1>
                    <BreadCrumb />
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center"
                        onClick={() => setFilterModelOpen(true)}
                    >
                        <Tooltip text={"Filter"}>
                            <LuFilter />
                        </Tooltip>
                    </div>
                    <DropdownMenu
                        open={showColumnSelector}
                        onOpenChange={setShowColumnSelector}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant="primary" className={` ${showColumnSelector ? "bg-primary text-white" : ""}`}>
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="h-80 w-56 overflow-auto"
                        >
                            {Object.keys(visibleColumns).map((key) => (
                                <DropdownMenuItem
                                    key={key}
                                    onSelect={(e) => e.preventDefault()}
                                    className="flex items-center gap-5"
                                >
                                    <Checkbox
                                        checked={visibleColumns[key]}
                                        onCheckedChange={() =>
                                            setVisibleColumns((prev) => ({
                                                ...prev,
                                                [key]: !prev[key],
                                            }))
                                        }
                                    />
                                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu
                        open={actionOpen}
                        onOpenChange={setActionOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="primary"
                                className={` ${actionOpen ? "bg-primary text-white" : ""}`}
                            >
                                Actions <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIsMassEmail(true)}>
                                {" "}
                                <Send className="mr-2 h-4 w-4" />
                                Mass Send Email{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Users className="mr-2 h-4 w-4" />
                                Mass Transfer Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Edit className="mr-2 h-4 w-4" />
                                Update Multiple Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                                onClick={handleDelete}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Tag className="mr-2 h-4 w-4" />
                                Tag Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900" onClick={()=>navigate('/import/leads')}>
                                <Import className="mr-2 h-4 w-4" />
                                Import Leads
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/meeting/create")}
                        className="bg-primary text-white "
                    >
                        <Plus className="mr-2 h-4 w-4" /> Schedule Meeting
                    </Button>
                </div>
            </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-2">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search meetings..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="records-per-page">Show</Label>
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

      <Table columns={columns} data={currentMeetings} loading={loading} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-3">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} results
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
          <span className="px-3 py-1 text-sm bg-white border rounded">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

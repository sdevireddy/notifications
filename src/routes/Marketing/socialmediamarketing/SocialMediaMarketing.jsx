"use client";

import {
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Edit,
  FileText,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Table from "@/components/Table";
import { useNavigate } from "react-router-dom";

export default function SocialMediaMarketing() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState("25");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const dummyCampaigns = [
    {
      id: 1,
      name: "Product Launch",
      status: "Posted",
      date: "2025-07-10",
      caption: "Introducing our new feature!",
      platforms: ["Instagram", "LinkedIn"],
    },
    {
      id: 2,
      name: "Promo Teaser",
      status: "Scheduled",
      date: "2025-07-25",
      caption: "Get ready for surprises 🎁",
      platforms: ["Twitter"],
    },
  ];

  useEffect(() => {
    setCampaigns(dummyCampaigns);
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return campaigns.filter((c) => c.name.toLowerCase().includes(term));
  }, [campaigns, searchTerm]);

  const recordsPerPageValue = parseInt(recordsPerPage);
  const indexOfLast = currentPage * recordsPerPageValue;
  const indexOfFirst = indexOfLast - recordsPerPageValue;
  const totalPages = Math.ceil(filtered.length / recordsPerPageValue);
  const currentCampaigns = filtered.slice(indexOfFirst, indexOfLast);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Campaign Name",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue();
          const colorMap = {
            Posted: "text-green-600",
            Scheduled: "text-blue-600",
          };
          return (
            <span className={`text-xs font-medium ${colorMap[status] || "text-gray-600"}`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "caption",
        header: "Caption",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600 line-clamp-1">{getValue()}</span>
        ),
      },
      {
        accessorKey: "platforms",
        header: "Platforms",
        cell: ({ getValue }) => getValue().join(", "),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => console.log("View", row.original.id)}
            >
              <FileText className="h-4 w-4 text-gray-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Edit", row.original.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Delete", row.original.id)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Social Media Campaigns</h1>
        <Button
          onClick={() => navigate("/marketing/social-campaigns/create")}
          className="bg-primary text-white hover:bg-opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Campaigns..."
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

      {/* Table */}
      {currentCampaigns.length > 0 ? (
        <Table columns={columns} data={currentCampaigns} />
      ) : (
        <div className="flex items-center justify-center py-10 text-gray-500">
          No campaigns found.
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} results
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

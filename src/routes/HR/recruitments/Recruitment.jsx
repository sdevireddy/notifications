"use client"
import { LuFilter } from "react-icons/lu"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  MoreVertical,
  Plus,
  Search,
  Download,
  Edit,
  Briefcase,
  Calendar,
  MapPin,
  Users,
  FileText,
} from "lucide-react"
import Tooltip from './../../../components/ToolTip';
import Table from './../../../components/Table';
import BreadCrumb from './../../../components/BreadCrumb';

export default function RecruitmentPage() {
  const [recruitment, setRecruitment] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectMultipleRecruitment, setSelectMultipleRecruitment] = useState([])
  const [filteredRecruitment, setFilteredRecruitment] = useState([])
  const [totalRecord, setTotalRecords] = useState(0)
  const [filterModelOpen, setFilterModelOpen] = useState(false)

  const recruitmentData = {
    totalRecords: 6,
    data: [
      {
        id: 1,
        jobTitle: "Senior Software Engineer",
        department: "Engineering",
        location: "Bangalore",
        jobType: "Full-time",
        experience: "3-5 years",
        applications: 45,
        status: "Active",
        postedDate: "2024-01-15",
        closingDate: "2024-02-15",
        recruiter: "Jane Smith",
      },
      {
        id: 2,
        jobTitle: "Marketing Manager",
        department: "Marketing",
        location: "Mumbai",
        jobType: "Full-time",
        experience: "2-4 years",
        applications: 32,
        status: "Active",
        postedDate: "2024-01-20",
        closingDate: "2024-02-20",
        recruiter: "Mike Wilson",
      },
      {
        id: 3,
        jobTitle: "Sales Executive",
        department: "Sales",
        location: "Delhi",
        jobType: "Full-time",
        experience: "1-3 years",
        applications: 28,
        status: "Closed",
        postedDate: "2024-01-10",
        closingDate: "2024-02-10",
        recruiter: "Lisa Brown",
      },
      {
        id: 4,
        jobTitle: "HR Specialist",
        department: "HR",
        location: "Chennai",
        jobType: "Full-time",
        experience: "2-3 years",
        applications: 18,
        status: "Active",
        postedDate: "2024-01-25",
        closingDate: "2024-02-25",
        recruiter: "Robert Kim",
      },
      {
        id: 5,
        jobTitle: "Financial Analyst",
        department: "Finance",
        location: "Pune",
        jobType: "Full-time",
        experience: "1-2 years",
        applications: 22,
        status: "Draft",
        postedDate: "2024-02-01",
        closingDate: "2024-03-01",
        recruiter: "Anna Lee",
      },
      {
        id: 6,
        jobTitle: "UI/UX Designer",
        department: "Design",
        location: "Hyderabad",
        jobType: "Contract",
        experience: "2-4 years",
        applications: 35,
        status: "Active",
        postedDate: "2024-01-18",
        closingDate: "2024-02-18",
        recruiter: "David Chen",
      },
    ],
  }

  useEffect(() => {
    setRecruitment(recruitmentData.data)
    setFilteredRecruitment(recruitmentData.data)
    setTotalRecords(recruitmentData.totalRecords)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredRecruitment(
      recruitment.filter(
        (record) =>
          record.jobTitle.toLowerCase().includes(term) ||
          record.department.toLowerCase().includes(term) ||
          record.location.toLowerCase().includes(term) ||
          record.status.toLowerCase().includes(term) ||
          record.recruiter.toLowerCase().includes(term),
      ),
    )
    setCurrentPage(1)
  }, [searchTerm, recruitment])

  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handleRecruitmentSelect = (record) => {
    setSelectMultipleRecruitment((prev) =>
      prev.some((item) => item.id === record.id) ? prev.filter((item) => item.id !== record.id) : [...prev, record],
    )
  }

  const handleSelectAll = () => {
    setSelectMultipleRecruitment(
      selectMultipleRecruitment.length === recruitmentData.data.length ? [] : recruitmentData.data,
    )
  }

  const currentRecruitment = filteredRecruitment

  const getStatusBadge = (status) => {
    const statusConfig = {
      Active: { variant: "default", className: "bg-green-100 text-green-800" },
      Closed: { variant: "secondary", className: "bg-gray-100 text-gray-800" },
      Draft: { variant: "outline", className: "bg-yellow-100 text-yellow-800" },
    }

    const config = statusConfig[status] || statusConfig.Draft
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllRowsSelected(!!value)
              handleSelectAll()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              const record = row.original
              handleRecruitmentSelect(record)
            }}
          />
        ),
      },
      {
        accessorKey: "jobTitle",
        header: "Job Title",
        cell: ({ row }) => {
          const record = row.original
          return (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                <Briefcase className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <div className="font-medium">{record.jobTitle}</div>
                <div className="text-xs text-gray-500">{record.department}</div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            {row.original.location}
          </div>
        ),
      },
      {
        accessorKey: "jobType",
        header: "Job Type",
      },
      {
        accessorKey: "experience",
        header: "Experience",
      },
      {
        accessorKey: "applications",
        header: "Applications",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{row.original.applications}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "postedDate",
        header: "Posted Date",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            {row.original.postedDate}
          </div>
        ),
      },
      {
        accessorKey: "recruiter",
        header: "Recruiter",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <FileText className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Users className="h-4 w-4 text-gray-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  View Job Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  View Applications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Job
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export Applications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="min-h-screen flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Recruitment</h1>
          <BreadCrumb />
        </div>
        <div className="flex items-center gap-3">
          <div onClick={() => setFilterModelOpen(true)}>
            <Tooltip text={"Filter"}>
              <LuFilter />
            </Tooltip>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary">
                Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Bulk Actions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Job Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Job Templates
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Briefcase className="mr-2 h-4 w-4" />
                Recruitment Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-primary text-white hover:bg-opacity-90">
            <Plus className="mr-2 h-4 w-4" /> Post Job
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="records-per-page" className="text-sm">
            Show
          </Label>
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

      <Table columns={columns} data={currentRecruitment} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecruitment.length)} of{" "}
          {filteredRecruitment.length} results
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
  )
}

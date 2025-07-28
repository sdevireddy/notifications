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
  User,
  Download,
  Edit,
  Star,
  TrendingUp,
  Target,
  Award,
} from "lucide-react"
import Tooltip from './../../../components/ToolTip';
import Table from './../../../components/Table';
import BreadCrumb from './../../../components/BreadCrumb';

export default function PerformancePage() {
  const [performance, setPerformance] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectMultiplePerformance, setSelectMultiplePerformance] = useState([])
  const [filteredPerformance, setFilteredPerformance] = useState([])
  const [totalRecord, setTotalRecords] = useState(0)
  const [filterModelOpen, setFilterModelOpen] = useState(false)

  const performanceData = {
    totalRecords: 5,
    data: [
      {
        id: 1,
        employeeId: "EMP001",
        employeeName: "John Doe",
        reviewPeriod: "Q4 2023",
        overallRating: 4.5,
        goals: "Completed",
        kpis: "85%",
        feedback: "Excellent performance",
        status: "Completed",
        reviewer: "Jane Smith",
        reviewDate: "2024-01-15",
      },
      {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Sarah Johnson",
        reviewPeriod: "Q4 2023",
        overallRating: 4.0,
        goals: "In Progress",
        kpis: "78%",
        feedback: "Good performance with room for improvement",
        status: "In Progress",
        reviewer: "Mike Wilson",
        reviewDate: "2024-01-20",
      },
      {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Mike Davis",
        reviewPeriod: "Q4 2023",
        overallRating: 3.5,
        goals: "Partially Completed",
        kpis: "72%",
        feedback: "Meets expectations",
        status: "Completed",
        reviewer: "Lisa Brown",
        reviewDate: "2024-01-10",
      },
      {
        id: 4,
        employeeId: "EMP004",
        employeeName: "Emily Chen",
        reviewPeriod: "Q4 2023",
        overallRating: 4.8,
        goals: "Exceeded",
        kpis: "92%",
        feedback: "Outstanding performance",
        status: "Completed",
        reviewer: "Robert Kim",
        reviewDate: "2024-01-12",
      },
      {
        id: 5,
        employeeId: "EMP005",
        employeeName: "David Wilson",
        reviewPeriod: "Q4 2023",
        overallRating: 0,
        goals: "Not Started",
        kpis: "0%",
        feedback: "Pending review",
        status: "Pending",
        reviewer: "Anna Lee",
        reviewDate: "-",
      },
    ],
  }

  useEffect(() => {
    setPerformance(performanceData.data)
    setFilteredPerformance(performanceData.data)
    setTotalRecords(performanceData.totalRecords)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredPerformance(
      performance.filter(
        (record) =>
          record.employeeName.toLowerCase().includes(term) ||
          record.employeeId.toLowerCase().includes(term) ||
          record.status.toLowerCase().includes(term) ||
          record.reviewer.toLowerCase().includes(term),
      ),
    )
    setCurrentPage(1)
  }, [searchTerm, performance])

  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handlePerformanceSelect = (record) => {
    setSelectMultiplePerformance((prev) =>
      prev.some((item) => item.id === record.id) ? prev.filter((item) => item.id !== record.id) : [...prev, record],
    )
  }

  const handleSelectAll = () => {
    setSelectMultiplePerformance(
      selectMultiplePerformance.length === performanceData.data.length ? [] : performanceData.data,
    )
  }

  const currentPerformance = filteredPerformance

  const getStatusBadge = (status) => {
    const statusConfig = {
      Completed: { variant: "default", className: "bg-green-100 text-green-800" },
      "In Progress": { variant: "secondary", className: "bg-blue-100 text-blue-800" },
      Pending: { variant: "outline", className: "bg-yellow-100 text-yellow-800" },
    }

    const config = statusConfig[status] || statusConfig.Pending
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const getRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-200 text-yellow-400" />)
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />)
      }
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-1 text-sm font-medium">{rating > 0 ? rating.toFixed(1) : "N/A"}</span>
      </div>
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
              handlePerformanceSelect(record)
            }}
          />
        ),
      },
      {
        accessorKey: "employeeId",
        header: "Employee ID",
      },
      {
        accessorKey: "employeeName",
        header: "Employee Name",
        cell: ({ row }) => {
          const record = row.original
          return (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div>{record.employeeName}</div>
            </div>
          )
        },
      },
      {
        accessorKey: "reviewPeriod",
        header: "Review Period",
      },
      {
        accessorKey: "overallRating",
        header: "Overall Rating",
        cell: ({ row }) => getRatingStars(row.original.overallRating),
      },
      {
        accessorKey: "goals",
        header: "Goals",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-500" />
            {row.original.goals}
          </div>
        ),
      },
      {
        accessorKey: "kpis",
        header: "KPIs",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            {row.original.kpis}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "reviewer",
        header: "Reviewer",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Award className="h-4 w-4 text-gray-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Award className="mr-2 h-4 w-4" />
                  View Review
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Review
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Target className="mr-2 h-4 w-4" />
                  Set Goals
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
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
          <h1 className="text-xl font-semibold text-gray-900">Performance</h1>
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
                <Award className="mr-2 h-4 w-4" />
                Bulk Review
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Target className="mr-2 h-4 w-4" />
                Set Goals
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Performance Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Review
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search performance..."
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

      <Table columns={columns} data={currentPerformance} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredPerformance.length)} of{" "}
          {filteredPerformance.length} results
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

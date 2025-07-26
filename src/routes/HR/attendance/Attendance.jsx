"use client"
import { LuFilter } from "react-icons/lu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MoreVertical, Plus, Search, User, Download, Edit, Clock, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Tooltip from "./../../../components/ToolTip"
import Table from "./../../../components/Table"
import BreadCrumb from "./../../../components/BreadCrumb"

export default function AttendancePage() {
  const navigate = useNavigate()
  const [attendance, setAttendance] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectMultipleAttendance, setSelectMultipleAttendance] = useState([])
  const [filteredAttendance, setFilteredAttendance] = useState([])
  const [totalRecord, setTotalRecords] = useState(0)
  const [filterModelOpen, setFilterModelOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // TODO: Replace with actual API call
  const fetchAttendanceData = async () => {
    try {
      setLoading(true)
      // const response = await fetch('/api/attendance')
      // const data = await response.json()

      // Mock data - remove when API is ready
      const attendanceData = {
        totalRecords: 5,
        data: [
          {
            id: 1,
            employeeId: "EMP001",
            employeeName: "John Doe",
            date: "2024-01-20",
            checkIn: "09:00 AM",
            checkOut: "06:00 PM",
            workingHours: "9h 0m",
            status: "Present",
            overtime: "0h 0m",
          },
          {
            id: 2,
            employeeId: "EMP002",
            employeeName: "Sarah Johnson",
            date: "2024-01-20",
            checkIn: "09:15 AM",
            checkOut: "06:30 PM",
            workingHours: "9h 15m",
            status: "Present",
            overtime: "0h 15m",
          },
          {
            id: 3,
            employeeId: "EMP003",
            employeeName: "Mike Davis",
            date: "2024-01-20",
            checkIn: "10:00 AM",
            checkOut: "07:00 PM",
            workingHours: "9h 0m",
            status: "Late",
            overtime: "1h 0m",
          },
          {
            id: 4,
            employeeId: "EMP004",
            employeeName: "Emily Chen",
            date: "2024-01-20",
            checkIn: "-",
            checkOut: "-",
            workingHours: "0h 0m",
            status: "Absent",
            overtime: "0h 0m",
          },
          {
            id: 5,
            employeeId: "EMP005",
            employeeName: "David Wilson",
            date: "2024-01-20",
            checkIn: "09:30 AM",
            checkOut: "05:30 PM",
            workingHours: "8h 0m",
            status: "Half Day",
            overtime: "0h 0m",
          },
        ],
      }

      setAttendance(attendanceData.data)
      setFilteredAttendance(attendanceData.data)
      setTotalRecords(attendanceData.totalRecords)
      setCurrentPage(1)
    } catch (error) {
      console.error("Error fetching attendance data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendanceData()
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredAttendance(
      attendance.filter(
        (record) =>
          record.employeeName.toLowerCase().includes(term) ||
          record.employeeId.toLowerCase().includes(term) ||
          record.status.toLowerCase().includes(term),
      ),
    )
    setCurrentPage(1)
  }, [searchTerm, attendance])

  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handleAttendanceSelect = (record) => {
    setSelectMultipleAttendance((prev) =>
      prev.some((item) => item.id === record.id) ? prev.filter((item) => item.id !== record.id) : [...prev, record],
    )
  }

  const handleSelectAll = () => {
    setSelectMultipleAttendance(selectMultipleAttendance.length === attendance.length ? [] : attendance)
  }

  const currentAttendance = filteredAttendance

  const getStatusBadge = (status) => {
    const statusConfig = {
      Present: { variant: "default", className: "bg-green-100 text-green-800" },
      Late: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      Absent: { variant: "destructive", className: "bg-red-100 text-red-800" },
      "Half Day": { variant: "outline", className: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status] || statusConfig.Present
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
              handleAttendanceSelect(record)
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
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            {row.original.date}
          </div>
        ),
      },
      {
        accessorKey: "checkIn",
        header: "Check In",
      },
      {
        accessorKey: "checkOut",
        header: "Check Out",
      },
      {
        accessorKey: "workingHours",
        header: "Working Hours",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            {row.original.workingHours}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "overtime",
        header: "Overtime",
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
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Attendance
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  )

  if (loading) {
    return (
      <div className="min-h-screen flex-1 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Attendance</h1>
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
              <Button variant="outline">
                Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Attendance Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Bulk Update Attendance
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                Generate Timesheet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/hr/mark-attendance")}
          >
            <Plus className="mr-2 h-4 w-4" /> Mark Attendance
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-2">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search attendance..."
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

      <Table columns={columns} data={currentAttendance} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-2">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAttendance.length)} of{" "}
          {filteredAttendance.length} results
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

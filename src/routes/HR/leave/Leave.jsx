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
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Tooltip from './../../../components/ToolTip';
import Table from './../../../components/Table';
import BreadCrumb from './../../../components/BreadCrumb';
import { ApplyLeaveModal } from './../../../components/apply-leave-modal';

export default function LeaveManagementPage() {
  const [leaves, setLeaves] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectMultipleLeave, setSelectMultipleLeave] = useState([])
  const [filteredLeaves, setFilteredLeaves] = useState([])
  const [totalRecord, setTotalRecords] = useState(0)
  const [filterModelOpen, setFilterModelOpen] = useState(false)
  const [isApplyLeaveModalOpen, setIsApplyLeaveModalOpen] = useState(false)

  const leavesData = {
    totalRecords: 6,
    data: [
      {
        id: 1,
        employeeId: "EMP001",
        employeeName: "John Doe",
        leaveType: "Annual Leave",
        startDate: "2024-02-15",
        endDate: "2024-02-17",
        days: 3,
        reason: "Family vacation",
        status: "Approved",
        appliedDate: "2024-02-01",
        approvedBy: "Jane Smith",
      },
      {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Sarah Johnson",
        leaveType: "Sick Leave",
        startDate: "2024-02-20",
        endDate: "2024-02-21",
        days: 2,
        reason: "Medical appointment",
        status: "Pending",
        appliedDate: "2024-02-18",
        approvedBy: "-",
      },
      {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Mike Davis",
        leaveType: "Personal Leave",
        startDate: "2024-02-25",
        endDate: "2024-02-25",
        days: 1,
        reason: "Personal work",
        status: "Rejected",
        appliedDate: "2024-02-20",
        approvedBy: "Lisa Brown",
      },
      {
        id: 4,
        employeeId: "EMP004",
        employeeName: "Emily Chen",
        leaveType: "Maternity Leave",
        startDate: "2024-03-01",
        endDate: "2024-05-30",
        days: 90,
        reason: "Maternity leave",
        status: "Approved",
        appliedDate: "2024-01-15",
        approvedBy: "Robert Kim",
      },
      {
        id: 5,
        employeeId: "EMP005",
        employeeName: "David Wilson",
        leaveType: "Annual Leave",
        startDate: "2024-03-10",
        endDate: "2024-03-15",
        days: 6,
        reason: "Vacation with family",
        status: "Pending",
        appliedDate: "2024-02-25",
        approvedBy: "-",
      },
      {
        id: 6,
        employeeId: "EMP001",
        employeeName: "John Doe",
        leaveType: "Sick Leave",
        startDate: "2024-03-20",
        endDate: "2024-03-20",
        days: 1,
        reason: "Fever",
        status: "Approved",
        appliedDate: "2024-03-19",
        approvedBy: "Jane Smith",
      },
    ],
  }

  useEffect(() => {
    setLeaves(leavesData.data)
    setFilteredLeaves(leavesData.data)
    setTotalRecords(leavesData.totalRecords)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredLeaves(
      leaves.filter(
        (leave) =>
          leave.employeeName.toLowerCase().includes(term) ||
          leave.employeeId.toLowerCase().includes(term) ||
          leave.leaveType.toLowerCase().includes(term) ||
          leave.status.toLowerCase().includes(term),
      ),
    )
    setCurrentPage(1)
  }, [searchTerm, leaves])

  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handleLeaveSelect = (leave) => {
    setSelectMultipleLeave((prev) =>
      prev.some((item) => item.id === leave.id) ? prev.filter((item) => item.id !== leave.id) : [...prev, leave],
    )
  }

  const handleSelectAll = () => {
    setSelectMultipleLeave(selectMultipleLeave.length === leavesData.data.length ? [] : leavesData.data)
  }

  const currentLeaves = filteredLeaves

  const getStatusBadge = (status) => {
    const statusConfig = {
      Approved: { variant: "default", className: "bg-green-100 text-green-800" },
      Pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      Rejected: { variant: "destructive", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status] || statusConfig.Pending
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const handleApproveLeave = (leaveId) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: "Approved", approvedBy: "Current User" } : leave,
      ),
    )
    setFilteredLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: "Approved", approvedBy: "Current User" } : leave,
      ),
    )
  }

  const handleRejectLeave = (leaveId) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: "Rejected", approvedBy: "Current User" } : leave,
      ),
    )
    setFilteredLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: "Rejected", approvedBy: "Current User" } : leave,
      ),
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
              const leave = row.original
              handleLeaveSelect(leave)
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
          const leave = row.original
          return (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div>{leave.employeeName}</div>
            </div>
          )
        },
      },
      {
        accessorKey: "leaveType",
        header: "Leave Type",
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            {row.original.startDate}
          </div>
        ),
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            {row.original.endDate}
          </div>
        ),
      },
      {
        accessorKey: "days",
        header: "Days",
        cell: ({ row }) => <div className="text-center font-medium">{row.original.days}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => (
          <div className="max-w-32 truncate" title={row.original.reason}>
            {row.original.reason}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            {row.original.status === "Pending" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleApproveLeave(row.original.id)}
                  title="Approve Leave"
                >
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleRejectLeave(row.original.id)}
                  title="Reject Leave"
                >
                  <XCircle className="h-4 w-4 text-red-600" />
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Leave
                </DropdownMenuItem>
                {row.original.status === "Pending" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleApproveLeave(row.original.id)}>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRejectLeave(row.original.id)}>
                      <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      Reject
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  )

  const handleSaveLeave = (leaveData) => {
    const newLeave = {
      ...leaveData,
      id: leaves.length + 1,
      employeeName: "Selected Employee", // This would come from employee lookup
      leaveType:
        leaveData.leaveType === "annual"
          ? "Annual Leave"
          : leaveData.leaveType === "sick"
            ? "Sick Leave"
            : leaveData.leaveType === "personal"
              ? "Personal Leave"
              : "Maternity Leave",
    }
    setLeaves((prev) => [...prev, newLeave])
    setFilteredLeaves((prev) => [...prev, newLeave])
    setIsApplyLeaveModalOpen(false)
  }

  return (
    <div className="min-h-screen flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Leave Management</h1>
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
                <CheckCircle className="mr-2 h-4 w-4" />
                Bulk Approve
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XCircle className="mr-2 h-4 w-4" />
                Bulk Reject
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Leave Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Leave Calendar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
            onClick={() => setIsApplyLeaveModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Apply Leave
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search leaves..."
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

      <Table columns={columns} data={currentLeaves} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredLeaves.length)} of{" "}
          {filteredLeaves.length} results
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

      {/* Apply Leave Modal */}
      <ApplyLeaveModal
        isOpen={isApplyLeaveModalOpen}
        onClose={() => setIsApplyLeaveModalOpen(false)}
        onSave={handleSaveLeave}
      />
    </div>
  )
}

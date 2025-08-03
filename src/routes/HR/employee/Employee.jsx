"use client"
import { LuFilter } from "react-icons/lu"
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
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
  Mail,
  Phone,
  User,
  Download,
  Trash2,
  Edit,
  Send,
  Users,
  Loader2,
} from "lucide-react"
import Tooltip from "./../../../components/ToolTip"
import Table from "./../../../components/Table"
import BreadCrumb from "./../../../components/BreadCrumb"
import { EmployeeProfileModal } from "./../../../components/employee-profile-modal"

export default function EmployeePage() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectMultipleEmployee, setSelectMultipleEmployee] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [totalRecord, setTotalRecords] = useState(0)
  const [filterModelOpen, setFilterModelOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API call
  const fetchEmployees = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/employees')
      // const data = await response.json()

      // Mock data for now
      const employeesData = {
        totalRecords: 5,
        data: [
          {
            id: 1,
            employeeId: "EMP001",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@company.com",
            mobile: "+91-9876543210",
            department: "Engineering",
            designation: "Software Engineer",
            joiningDate: "2023-01-15",
            status: "Active",
            manager: "Jane Smith",
          },
          {
            id: 2,
            employeeId: "EMP002",
            firstName: "Sarah",
            lastName: "Johnson",
            email: "sarah.johnson@company.com",
            mobile: "+91-9876543211",
            department: "Marketing",
            designation: "Marketing Manager",
            joiningDate: "2022-08-20",
            status: "Active",
            manager: "Mike Wilson",
          },
          {
            id: 3,
            employeeId: "EMP003",
            firstName: "Mike",
            lastName: "Davis",
            email: "mike.davis@company.com",
            mobile: "+91-9876543212",
            department: "Sales",
            designation: "Sales Executive",
            joiningDate: "2023-03-10",
            status: "Active",
            manager: "Lisa Brown",
          },
          {
            id: 4,
            employeeId: "EMP004",
            firstName: "Emily",
            lastName: "Chen",
            email: "emily.chen@company.com",
            mobile: "+91-9876543213",
            department: "HR",
            designation: "HR Specialist",
            joiningDate: "2022-11-05",
            status: "Active",
            manager: "Robert Kim",
          },
          {
            id: 5,
            employeeId: "EMP005",
            firstName: "David",
            lastName: "Wilson",
            email: "david.wilson@company.com",
            mobile: "+91-9876543214",
            department: "Finance",
            designation: "Financial Analyst",
            joiningDate: "2023-02-28",
            status: "Inactive",
            manager: "Anna Lee",
          },
        ],
      }

      setEmployees(employeesData.data)
      setFilteredEmployees(employeesData.data)
      setTotalRecords(employeesData.totalRecords)
      setCurrentPage(1)
    } catch (error) {
      console.error("Error fetching employees:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(term) ||
          employee.lastName.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.department.toLowerCase().includes(term) ||
          employee.designation.toLowerCase().includes(term),
      ),
    )
    setCurrentPage(1)
  }, [searchTerm, employees])

  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handleEmployeeSelect = (employee) => {
    setSelectMultipleEmployee((prev) =>
      prev.some((item) => item.id === employee.id)
        ? prev.filter((item) => item.id !== employee.id)
        : [...prev, employee],
    )
  }

  const handleSelectAll = () => {
    setSelectMultipleEmployee(selectMultipleEmployee.length === employees.length ? [] : employees)
  }

  const currentEmployees = filteredEmployees

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
              const employee = row.original
              handleEmployeeSelect(employee)
            }}
          />
        ),
      },
      {
        accessorKey: "employeeId",
        header: "Employee ID",
      },
      {
        accessorKey: "firstName",
        header: "Name",
        cell: ({ row }) => {
          const employee = row.original
          return (
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div>{employee.firstName + " " + employee.lastName}</div>
            </div>
          )
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "mobile",
        header: "Phone",
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
          <div>
            <div>{row.original.department}</div>
            <div className="text-xs text-gray-500">{row.original.designation}</div>
          </div>
        ),
      },
      {
        accessorKey: "joiningDate",
        header: "Joining Date",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "Active" ? "default" : "secondary"}
            className={row.original.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Mail className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Phone className="h-4 w-4 text-gray-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedEmployee(row.original)
                    setIsProfileModalOpen(true)
                    setIsEditMode(false)
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedEmployee(row.original)
                    setIsProfileModalOpen(true)
                    setIsEditMode(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Employee
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteEmployee(row.original)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [employees],
  )

  const handleDeleteEmployee = async (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/employees/${employee.id}`, { method: 'DELETE' })

        setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id))
        setFilteredEmployees((prev) => prev.filter((emp) => emp.id !== employee.id))
        console.log("Employee deleted:", employee)
      } catch (error) {
        console.error("Error deleting employee:", error)
      }
    }
  }

  const handleEditEmployee = (employee) => {
    // Handle edit functionality
    setIsProfileModalOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex-1 bg-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading employees...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex-1 bg-white">
      <div className="flex items-center justify-between border-b px-6 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Employees</h1>
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
                <Send className="mr-2 h-4 w-4" />
                Mass Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Mass Transfer Employees
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Update Multiple Employees
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Employee Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/hr/add-employee")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-2">
        <div className="relative w-full max-w-[20rem]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search employees..."
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

      <Table columns={columns} data={currentEmployees} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredEmployees.length)} of{" "}
          {filteredEmployees.length} results
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

      {/* Employee Profile Modal */}
      <EmployeeProfileModal
        employee={selectedEmployee}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false)
          setSelectedEmployee(null)
          setIsEditMode(false)
        }}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />
    </div>
  )
}

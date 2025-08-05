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
  User,
  Download,
  Edit,
  DollarSign,
  FileText,
  Calculator,
} from "lucide-react"
import Tooltip from "./../../../components/ToolTip"
import Table from "./../../../components/Table"
import BreadCrumb from "./../../../components/BreadCrumb"

export default function PayrollPage() {
  const navigate = useNavigate()
  const [payroll, setPayroll] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectMultiplePayroll, setSelectMultiplePayroll] = useState([])
  const [filteredPayroll, setFilteredPayroll] = useState([])
  const [totalRecord, setTotalRecords] = useState(0)
  const [filterModelOpen, setFilterModelOpen] = useState(false)

  const payrollData = {
    totalRecords: 5,
    data: [
      {
        id: 1,
        employeeId: "EMP001",
        employeeName: "John Doe",
        month: "January 2024",
        basicSalary: 50000,
        allowances: 10000,
        deductions: 5000,
        grossSalary: 60000,
        netSalary: 55000,
        status: "Paid",
        payDate: "2024-01-31",
      },
      {
        id: 2,
        employeeId: "EMP002",
        employeeName: "Sarah Johnson",
        month: "January 2024",
        basicSalary: 45000,
        allowances: 8000,
        deductions: 4500,
        grossSalary: 53000,
        netSalary: 48500,
        status: "Pending",
        payDate: "-",
      },
      {
        id: 3,
        employeeId: "EMP003",
        employeeName: "Mike Davis",
        month: "January 2024",
        basicSalary: 40000,
        allowances: 7000,
        deductions: 4000,
        grossSalary: 47000,
        netSalary: 43000,
        status: "Paid",
        payDate: "2024-01-31",
      },
      {
        id: 4,
        employeeId: "EMP004",
        employeeName: "Emily Chen",
        month: "January 2024",
        basicSalary: 55000,
        allowances: 12000,
        deductions: 6000,
        grossSalary: 67000,
        netSalary: 61000,
        status: "Processing",
        payDate: "-",
      },
      {
        id: 5,
        employeeId: "EMP005",
        employeeName: "David Wilson",
        month: "January 2024",
        basicSalary: 48000,
        allowances: 9000,
        deductions: 4800,
        grossSalary: 57000,
        netSalary: 52200,
        status: "Paid",
        payDate: "2024-01-31",
      },
    ],
  }

  useEffect(() => {
    setPayroll(payrollData.data)
    setFilteredPayroll(payrollData.data)
    setTotalRecords(payrollData.totalRecords)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredPayroll(
      payroll.filter(
        (record) =>
          record.employeeName.toLowerCase().includes(term) ||
          record.employeeId.toLowerCase().includes(term) ||
          record.status.toLowerCase().includes(term),
      ),
    )
    setCurrentPage(1)
  }, [searchTerm, payroll])

  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handlePayrollSelect = (record) => {
    setSelectMultiplePayroll((prev) =>
      prev.some((item) => item.id === record.id) ? prev.filter((item) => item.id !== record.id) : [...prev, record],
    )
  }

  const handleSelectAll = () => {
    setSelectMultiplePayroll(selectMultiplePayroll.length === payrollData.data.length ? [] : payrollData.data)
  }


  const currentPayroll = filteredPayroll

  const getStatusBadge = (status) => {
    const statusConfig = {
      Paid: { variant: "default", className: "bg-green-100 text-green-800" },
      Pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      Processing: { variant: "outline", className: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status] || statusConfig.Pending
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
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
              handlePayrollSelect(record)
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
        accessorKey: "month",
        header: "Month",
      },
      {
        accessorKey: "basicSalary",
        header: "Basic Salary",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            {formatCurrency(row.original.basicSalary)}
          </div>
        ),
      },
      {
        accessorKey: "grossSalary",
        header: "Gross Salary",
        cell: ({ row }) => <div className="font-medium">{formatCurrency(row.original.grossSalary)}</div>,
      },
      {
        accessorKey: "deductions",
        header: "Deductions",
        cell: ({ row }) => <div className="text-red-600">-{formatCurrency(row.original.deductions)}</div>,
      },
      {
        accessorKey: "netSalary",
        header: "Net Salary",
        cell: ({ row }) => <div className="font-bold text-green-600">{formatCurrency(row.original.netSalary)}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status),
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
              <Download className="h-4 w-4 text-gray-600" />
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
                  View Payslip
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Payslip
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Payroll
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Calculator className="mr-2 h-4 w-4" />
                  Recalculate
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
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Payroll</h1>
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
                <Calculator className="mr-2 h-4 w-4" />
                Process Payroll
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Payroll Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Generate Payslips
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" />
                Salary Structure
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-primary text-white"
            onClick={() => navigate("/hr/add-payroll")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Payroll
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
        <div className="relative w-full max-w-[20rem]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search payroll..."
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

      <Table columns={columns} data={currentPayroll} />

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredPayroll.length)} of{" "}
          {filteredPayroll.length} results
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

"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, User, Calculator, FileText, AlertCircle, CheckCircle } from "lucide-react"

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    position: "Senior Developer",
    department: "Engineering",
    basicSalary: 50000,
    employeeId: "EMP001",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    basicSalary: 45000,
    employeeId: "EMP002",
  },
  {
    id: "EMP003",
    name: "Mike Davis",
    position: "Marketing Director",
    department: "Marketing",
    basicSalary: 40000,
    employeeId: "EMP003",
  },
  {
    id: "EMP004",
    name: "Emily Chen",
    position: "Product Designer",
    department: "Design",
    basicSalary: 55000,
    employeeId: "EMP004",
  },
  {
    id: "EMP005",
    name: "David Wilson",
    position: "Finance Analyst",
    department: "Finance",
    basicSalary: 48000,
    employeeId: "EMP005",
  },
]

export default function AddPayrollPage() {
  const navigate = useNavigate()
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [formData, setFormData] = useState({
    employeeId: "",
    payPeriod: "",
    month: "",
    year: new Date().getFullYear().toString(),
    workingDays: 30,
    presentDays: 30,
    basicSalary: 0,
    // Allowances
    hraAllowance: 0,
    transportAllowance: 0,
    medicalAllowance: 0,
    foodAllowance: 0,
    otherAllowances: 0,
    // Overtime & Bonuses
    overtimeHours: 0,
    overtimeRate: 0,
    performanceBonus: 0,
    festivalBonus: 0,
    // Deductions
    taxDeduction: 0,
    pfDeduction: 0,
    insuranceDeduction: 0,
    loanDeduction: 0,
    otherDeductions: 0,
    // Additional
    notes: "",
  })

  const [calculations, setCalculations] = useState({
    totalAllowances: 0,
    totalOvertimeAmount: 0,
    totalBonuses: 0,
    grossSalary: 0,
    totalDeductions: 0,
    netSalary: 0,
    attendanceAdjustedSalary: 0,
  })

  const payPeriods = [
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" },
    { value: "bi-weekly", label: "Bi-Weekly" },
  ]

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  useEffect(() => {
    if (formData.employeeId) {
      const emp = employees.find((e) => e.id === formData.employeeId)
      setSelectedEmployee(emp)
      if (emp) {
        setFormData((prev) => ({ ...prev, basicSalary: emp.basicSalary }))
      }
    } else {
      setSelectedEmployee(null)
    }
  }, [formData.employeeId])

  useEffect(() => {
    calculatePayroll()
  }, [formData])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: Number.parseFloat(value) || value }))
  }

  const calculatePayroll = () => {
    const totalAllowances =
      formData.hraAllowance +
      formData.transportAllowance +
      formData.medicalAllowance +
      formData.foodAllowance +
      formData.otherAllowances

    const totalOvertimeAmount = formData.overtimeHours * formData.overtimeRate

    const totalBonuses = formData.performanceBonus + formData.festivalBonus

    const attendanceAdjustedSalary = (formData.basicSalary * formData.presentDays) / formData.workingDays

    const grossSalary = attendanceAdjustedSalary + totalAllowances + totalOvertimeAmount + totalBonuses

    const totalDeductions =
      formData.taxDeduction +
      formData.pfDeduction +
      formData.insuranceDeduction +
      formData.loanDeduction +
      formData.otherDeductions

    const netSalary = grossSalary - totalDeductions

    setCalculations({
      totalAllowances,
      totalOvertimeAmount,
      totalBonuses,
      grossSalary,
      totalDeductions,
      netSalary,
      attendanceAdjustedSalary,
    })
  }

  const handleSubmit = () => {
    const payrollData = {
      ...formData,
      ...calculations,
      employeeName: selectedEmployee?.name || "Unknown",
      createdDate: new Date().toISOString().split("T")[0],
      status: "Processed",
    }

    // Replace with actual API call
    console.log("Payroll data submitted:", payrollData)

    // Navigate back to payroll list
    navigate("/hr/payroll")
  }

  const isFormValid = () => {
    return (
      formData.employeeId &&
      formData.payPeriod &&
      formData.month &&
      formData.year &&
      formData.workingDays > 0 &&
      formData.presentDays >= 0 &&
      formData.basicSalary > 0
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/hr/payroll")} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Add Payroll</h1>
                <p className="text-sm text-gray-500">Create new payroll record</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/hr/payroll")}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isFormValid()}
            >
              Save Payroll
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Information */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Employee Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Employee <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.employeeId} onValueChange={(value) => handleInputChange("employeeId", value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} - {emp.employeeId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Pay Period <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.payPeriod} onValueChange={(value) => handleInputChange("payPeriod", value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select Pay Period" />
                    </SelectTrigger>
                    <SelectContent>
                      {payPeriods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Month <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.month} onValueChange={(value) => handleInputChange("month", value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className="h-10"
                    min="2020"
                    max="2030"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Working Days <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={formData.workingDays}
                    onChange={(e) => handleInputChange("workingDays", e.target.value)}
                    className="h-10"
                    min="1"
                    max="31"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Present Days <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={formData.presentDays}
                    onChange={(e) => handleInputChange("presentDays", e.target.value)}
                    className="h-10"
                    min="0"
                    max={formData.workingDays}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Salary Details */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Salary Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Basic Salary <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={formData.basicSalary}
                    onChange={(e) => handleInputChange("basicSalary", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Attendance Adjusted Salary</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(calculations.attendanceAdjustedSalary)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Allowances */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Allowances</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">HRA Allowance</Label>
                  <Input
                    type="number"
                    value={formData.hraAllowance}
                    onChange={(e) => handleInputChange("hraAllowance", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Transport Allowance</Label>
                  <Input
                    type="number"
                    value={formData.transportAllowance}
                    onChange={(e) => handleInputChange("transportAllowance", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Medical Allowance</Label>
                  <Input
                    type="number"
                    value={formData.medicalAllowance}
                    onChange={(e) => handleInputChange("medicalAllowance", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Food Allowance</Label>
                  <Input
                    type="number"
                    value={formData.foodAllowance}
                    onChange={(e) => handleInputChange("foodAllowance", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Other Allowances</Label>
                  <Input
                    type="number"
                    value={formData.otherAllowances}
                    onChange={(e) => handleInputChange("otherAllowances", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Overtime & Bonuses */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Overtime & Bonuses</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Overtime Hours</Label>
                  <Input
                    type="number"
                    value={formData.overtimeHours}
                    onChange={(e) => handleInputChange("overtimeHours", e.target.value)}
                    className="h-10"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Overtime Rate (per hour)</Label>
                  <Input
                    type="number"
                    value={formData.overtimeRate}
                    onChange={(e) => handleInputChange("overtimeRate", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Performance Bonus</Label>
                  <Input
                    type="number"
                    value={formData.performanceBonus}
                    onChange={(e) => handleInputChange("performanceBonus", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Festival Bonus</Label>
                  <Input
                    type="number"
                    value={formData.festivalBonus}
                    onChange={(e) => handleInputChange("festivalBonus", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Deductions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Tax Deduction</Label>
                  <Input
                    type="number"
                    value={formData.taxDeduction}
                    onChange={(e) => handleInputChange("taxDeduction", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">PF Deduction</Label>
                  <Input
                    type="number"
                    value={formData.pfDeduction}
                    onChange={(e) => handleInputChange("pfDeduction", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Insurance Deduction</Label>
                  <Input
                    type="number"
                    value={formData.insuranceDeduction}
                    onChange={(e) => handleInputChange("insuranceDeduction", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Loan Deduction</Label>
                  <Input
                    type="number"
                    value={formData.loanDeduction}
                    onChange={(e) => handleInputChange("loanDeduction", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Other Deductions</Label>
                  <Input
                    type="number"
                    value={formData.otherDeductions}
                    onChange={(e) => handleInputChange("otherDeductions", e.target.value)}
                    className="h-10"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter any additional notes about this payroll..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payroll Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Payroll Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Basic Salary:</span>
                <Badge variant="outline" className="font-bold">
                  {formatCurrency(calculations.attendanceAdjustedSalary)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Allowances:</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {formatCurrency(calculations.totalAllowances)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overtime Amount:</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {formatCurrency(calculations.totalOvertimeAmount)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Bonuses:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {formatCurrency(calculations.totalBonuses)}
                </Badge>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Gross Salary:</span>
                  <Badge variant="default" className="bg-green-600 text-white font-bold">
                    {formatCurrency(calculations.grossSalary)}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Deductions:</span>
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  -{formatCurrency(calculations.totalDeductions)}
                </Badge>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Net Salary:</span>
                  <Badge variant="default" className="bg-blue-600 text-white font-bold text-lg">
                    {formatCurrency(calculations.netSalary)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Details */}
          {selectedEmployee && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Employee Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">ID:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.employeeId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Position:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.position}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Department:</span>
                  <span className="text-sm text-gray-900">{selectedEmployee.department}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validation Status */}
          <Card>
            <CardHeader>
              <CardTitle>Form Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isFormValid() ? (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Form is ready to submit!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">Please fill all required fields</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

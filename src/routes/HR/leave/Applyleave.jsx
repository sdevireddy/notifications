"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ArrowLeft, User, Building, FileText, AlertCircle, CheckCircle } from "lucide-react"

// Employee data with leave balances
const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    position: "Senior Developer",
    department: "Engineering",
    manager: "Sarah Wilson",
    leaveBalance: {
      annual: 15,
      sick: 8,
      casual: 5,
      earned: 12,
      maternity: 90,
    },
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    manager: "Michael Brown",
    leaveBalance: {
      annual: 18,
      sick: 10,
      casual: 7,
      earned: 10,
      maternity: 90,
    },
  },
  {
    id: "EMP003",
    name: "Mike Davis",
    position: "Marketing Director",
    department: "Marketing",
    manager: "Lisa Anderson",
    leaveBalance: {
      annual: 12,
      sick: 5,
      casual: 3,
      earned: 8,
      maternity: 90,
    },
  },
  {
    id: "EMP004",
    name: "Emily Chen",
    position: "Product Designer",
    department: "Design",
    manager: "David Kim",
    leaveBalance: {
      annual: 20,
      sick: 7,
      casual: 6,
      earned: 15,
      maternity: 90,
    },
  },
  {
    id: "EMP005",
    name: "David Wilson",
    position: "Finance Analyst",
    department: "Finance",
    manager: "Jennifer Lee",
    leaveBalance: {
      annual: 10,
      sick: 3,
      casual: 2,
      earned: 5,
      maternity: 90,
    },
  },
]

export default function ApplyLeavePage() {
  const navigate = () => {} // Mock navigate function
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    halfDay: false,
    halfDayPeriod: "",
    emergencyContact: "",
    workHandover: "",
  })

  const [calculatedDays, setCalculatedDays] = useState(0)
  const [employeeLeaveBalance, setEmployeeLeaveBalance] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const leaveTypes = [
    { value: "annual", label: "Annual Leave" },
    { value: "sick", label: "Sick Leave" },
    { value: "casual", label: "Casual Leave" },
    { value: "earned", label: "Earned Leave" },
    { value: "maternity", label: "Maternity Leave" },
  ]

  const leaveStatuses = [
    { value: "pending", label: "Pending Approval" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ]

  // Update leave balance when employee changes
  useEffect(() => {
    if (formData.employeeId) {
      const emp = employees.find((e) => e.id === formData.employeeId)
      setSelectedEmployee(emp)
      setEmployeeLeaveBalance(emp.leaveBalance)
    } else {
      setSelectedEmployee(null)
      setEmployeeLeaveBalance(null)
    }
  }, [formData.employeeId])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateLeaveDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)

      const timezoneOffset = start.getTimezoneOffset() * 60000
      const adjustedStart = new Date(start.getTime() + timezoneOffset)
      const adjustedEnd = new Date(end.getTime() + timezoneOffset)

      const timeDiff = adjustedEnd.getTime() - adjustedStart.getTime()
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1

      if (formData.halfDay) {
        setCalculatedDays(0.5)
      } else {
        setCalculatedDays(dayDiff > 0 ? dayDiff : 0)
      }
    } else {
      setCalculatedDays(0)
    }
  }

  useEffect(() => {
    calculateLeaveDays()
  }, [formData.startDate, formData.endDate, formData.halfDay])

  const handleSubmit = () => {
    const leaveData = {
      ...formData,
      days: calculatedDays,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      employeeName: selectedEmployee?.name || "Unknown",
    }
    console.log("Leave application submitted:", leaveData)
    navigate(-1)
  }

  const getSelectedLeaveBalance = () => {
    if (!formData.leaveType || !employeeLeaveBalance) return 0
    return employeeLeaveBalance[formData.leaveType]
  }

  const isFormValid = () => {
    return (
      formData.employeeId &&
      formData.leaveType &&
      formData.startDate &&
      formData.endDate &&
      formData.reason &&
      (!formData.halfDay || formData.halfDayPeriod) &&
      calculatedDays <= getSelectedLeaveBalance()
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Apply for Leave</h1>
              <p className="text-sm text-gray-500">Submit your leave application</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 w-full">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Basic Information Section */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
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
                        {emp.name} - {emp.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Leave Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.leaveType} onValueChange={(value) => handleInputChange("leaveType", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Total Days</Label>
                <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {calculatedDays} {calculatedDays === 1 ? "day" : "days"}
                  </span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="h-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  min={formData.startDate || new Date().toISOString().split("T")[0]}
                  className="h-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Available Balance</Label>
                <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                  <span className="text-sm font-medium text-gray-900">{getSelectedLeaveBalance()} days</span>
                </div>
              </div>
            </div>

            {/* Half Day Option */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="halfDay"
                  checked={formData.halfDay}
                  onChange={(e) => {
                    handleInputChange("halfDay", e.target.checked)
                    if (e.target.checked) {
                      handleInputChange("endDate", formData.startDate)
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="halfDay" className="text-sm font-medium text-gray-700">
                  Half Day Leave
                </Label>
              </div>

              {formData.halfDay && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                  <button
                    type="button"
                    className={`p-3 rounded-md border text-left ${
                      formData.halfDayPeriod === "morning"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => handleInputChange("halfDayPeriod", "morning")}
                  >
                    <div className="font-medium text-sm">Morning</div>
                    <div className="text-xs text-gray-500">First Half</div>
                  </button>
                  <button
                    type="button"
                    className={`p-3 rounded-md border text-left ${
                      formData.halfDayPeriod === "afternoon"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => handleInputChange("halfDayPeriod", "afternoon")}
                  >
                    <div className="font-medium text-sm">Afternoon</div>
                    <div className="text-xs text-gray-500">Second Half</div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Employee Information Section */}
          {selectedEmployee && (
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <Building className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Employee Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Department</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm text-gray-900">{selectedEmployee.department}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Position</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm text-gray-900">{selectedEmployee.position}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Manager</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm text-gray-900">{selectedEmployee.manager}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Annual Leave</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm text-gray-900">{selectedEmployee.leaveBalance.annual} days</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Sick Leave</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm text-gray-900">{selectedEmployee.leaveBalance.sick} days</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Casual Leave</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm text-gray-900">{selectedEmployee.leaveBalance.casual} days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Information Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Emergency Contact</Label>
                <Input
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Emergency contact number"
                  className="h-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Work Handover To</Label>
                <Input
                  value={formData.workHandover}
                  onChange={(e) => handleInputChange("workHandover", e.target.value)}
                  placeholder="Colleague name for work handover"
                  className="h-10"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Reason for Leave <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Please provide reason for leave..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Validation Message */}
            {formData.leaveType && calculatedDays > 0 && (
              <div className="mb-6">
                {calculatedDays > getSelectedLeaveBalance() ? (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">
                      Insufficient leave balance! You need {calculatedDays - getSelectedLeaveBalance()} more days.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Leave application is valid!</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                disabled={!isFormValid()}
              >
                Submit Leave Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
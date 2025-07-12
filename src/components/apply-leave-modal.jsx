"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Calendar, Clock, AlertCircle } from "lucide-react"

export function ApplyLeaveModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    halfDay: false,
    halfDayPeriod: "",
  })

  const [leaveBalance, setLeaveBalance] = useState({
    annual: 20,
    sick: 10,
    personal: 5,
    maternity: 90,
  })

  const [calculatedDays, setCalculatedDays] = useState(0)

  const leaveTypes = [
    { value: "annual", label: "Annual Leave", balance: leaveBalance.annual },
    { value: "sick", label: "Sick Leave", balance: leaveBalance.sick },
    { value: "personal", label: "Personal Leave", balance: leaveBalance.personal },
    { value: "maternity", label: "Maternity Leave", balance: leaveBalance.maternity },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateLeaveDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const timeDiff = end.getTime() - start.getTime()
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

  const handleSave = () => {
    const leaveData = {
      ...formData,
      days: calculatedDays,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    }
    onSave(leaveData)
    setFormData({
      employeeId: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      halfDay: false,
      halfDayPeriod: "",
    })
  }

  const getSelectedLeaveBalance = () => {
    const selectedType = leaveTypes.find((type) => type.value === formData.leaveType)
    return selectedType ? selectedType.balance : 0
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Apply for Leave
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Application Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employee Information */}
            <div className="form-section">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">
                Employee Information
              </h3>
              <div>
                <Label htmlFor="employeeId" className="enhanced-label">
                  Employee *
                </Label>
                <Select value={formData.employeeId} onValueChange={(value) => handleInputChange("employeeId", value)}>
                  <SelectTrigger className="enhanced-input">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EMP001">EMP001 - John Doe</SelectItem>
                    <SelectItem value="EMP002">EMP002 - Sarah Johnson</SelectItem>
                    <SelectItem value="EMP003">EMP003 - Mike Davis</SelectItem>
                    <SelectItem value="EMP004">EMP004 - Emily Chen</SelectItem>
                    <SelectItem value="EMP005">EMP005 - David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Leave Details */}
            <div className="form-section">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">Leave Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leaveType" className="enhanced-label">
                    Leave Type *
                  </Label>
                  <Select value={formData.leaveType} onValueChange={(value) => handleInputChange("leaveType", value)}>
                    <SelectTrigger className="enhanced-input">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{type.label}</span>
                            <Badge variant="outline" className="ml-2">
                              {type.balance} days left
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="enhanced-label">
                      Start Date *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      className="enhanced-input"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="enhanced-label">
                      End Date *
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      className="enhanced-input"
                      min={formData.startDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
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
                    className="enhanced-checkbox"
                  />
                  <Label htmlFor="halfDay" className="enhanced-label">
                    Half Day Leave
                  </Label>
                </div>

                {formData.halfDay && (
                  <div>
                    <Label htmlFor="halfDayPeriod" className="enhanced-label">
                      Half Day Period
                    </Label>
                    <Select
                      value={formData.halfDayPeriod}
                      onValueChange={(value) => handleInputChange("halfDayPeriod", value)}
                    >
                      <SelectTrigger className="enhanced-input">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (First Half)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (Second Half)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="reason" className="enhanced-label">
                    Reason for Leave *
                  </Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="Please provide reason for leave..."
                    className="enhanced-textarea"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Leave Summary & Calendar */}
          <div className="space-y-6">
            {/* Leave Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Leave Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Days:</span>
                  <Badge variant="outline" className="font-bold">
                    {calculatedDays} {calculatedDays === 1 ? "day" : "days"}
                  </Badge>
                </div>

                {formData.leaveType && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Available Balance:</span>
                    <Badge
                      variant={getSelectedLeaveBalance() >= calculatedDays ? "default" : "destructive"}
                      className={getSelectedLeaveBalance() >= calculatedDays ? "bg-green-100 text-green-800" : ""}
                    >
                      {getSelectedLeaveBalance()} days
                    </Badge>
                  </div>
                )}

                {formData.leaveType && calculatedDays > getSelectedLeaveBalance() && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Insufficient leave balance!</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Leave Balance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaveTypes.map((type) => (
                  <div key={type.value} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm font-medium">{type.label}</span>
                    <Badge variant="outline">{type.balance} days</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mini Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-gray-600">
                  <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>Calendar view will show</p>
                  <p>selected leave dates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-200">
          <Button variant="outline" onClick={onClose} className="font-semibold bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 font-semibold"
            disabled={
              !formData.leaveType ||
              !formData.startDate ||
              !formData.endDate ||
              !formData.reason ||
              (formData.leaveType && calculatedDays > getSelectedLeaveBalance())
            }
          >
            Apply Leave
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

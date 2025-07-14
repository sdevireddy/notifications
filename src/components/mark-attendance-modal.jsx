"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Clock } from "lucide-react"

export function MarkAttendanceModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    checkIn: "",
    checkOut: "",
    status: "",
    notes: "",
    workLocation: "Office",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(formData)
    setFormData({
      employeeId: "",
      date: new Date().toISOString().split("T")[0],
      checkIn: "",
      checkOut: "",
      status: "",
      notes: "",
      workLocation: "Office",
    })
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Mark Attendance
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Selection */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">
              Employee Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <Label htmlFor="date" className="enhanced-label">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="enhanced-input"
                />
              </div>
            </div>
          </div>

          {/* Attendance Details */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">Attendance Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="checkIn" className="enhanced-label">
                  Check In Time
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="checkIn"
                    type="time"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange("checkIn", e.target.value)}
                    className="enhanced-input flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleInputChange("checkIn", getCurrentTime())}
                    className="px-3"
                  >
                    Now
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="checkOut" className="enhanced-label">
                  Check Out Time
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="checkOut"
                    type="time"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange("checkOut", e.target.value)}
                    className="enhanced-input flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleInputChange("checkOut", getCurrentTime())}
                    className="px-3"
                  >
                    Now
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="status" className="enhanced-label">
                  Status *
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="enhanced-input">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                    <SelectItem value="Half Day">Half Day</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workLocation" className="enhanced-label">
                  Work Location
                </Label>
                <Select
                  value={formData.workLocation}
                  onValueChange={(value) => handleInputChange("workLocation", value)}
                >
                  <SelectTrigger className="enhanced-input">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Work From Home">Work From Home</SelectItem>
                    <SelectItem value="Client Site">Client Site</SelectItem>
                    <SelectItem value="Field Work">Field Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">Additional Notes</h3>
            <div>
              <Label htmlFor="notes" className="enhanced-label">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Enter any additional notes..."
                className="enhanced-textarea"
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-200">
            <Button variant="outline" onClick={onClose} className="font-semibold bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 font-semibold">
              Mark Attendance
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

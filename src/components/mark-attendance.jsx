"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, FileText, Camera } from "lucide-react"

const initialFormState = {
  employeeId: "",
  date: new Date().toISOString().split("T")[0],
  checkIn: "",
  checkOut: "",
  status: "",
  workLocation: "Office",
  notes: "",
}

const employees = [
  { id: "EMP001", name: "John Doe", department: "Engineering", position: "Software Engineer" },
  { id: "EMP002", name: "Sarah Johnson", department: "Marketing", position: "Marketing Manager" },
  { id: "EMP003", name: "Mike Davis", department: "Sales", position: "Sales Executive" },
  { id: "EMP004", name: "Emily Chen", department: "HR", position: "HR Specialist" },
  { id: "EMP005", name: "David Wilson", department: "Finance", position: "Financial Analyst" },
]

export default function MarkAttendancePage() {
  const navigate = useNavigate()
  const [attendanceImage, setAttendanceImage] = useState(null)
  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
      const reader = new FileReader()
      reader.onloadend = () => setAttendanceImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setAttendanceImage(null)
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/attendance/mark', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // const result = await response.json()

      console.log("Attendance marked:", formData)

      if (action === "save") {
        navigate("/hr/attendance")
      } else if (action === "saveAndNew") {
        resetForm()
      }
    } catch (error) {
      console.error("Error marking attendance:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-sm text-gray-700">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/hr/attendance")} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div
              title="Click to upload image"
              className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-200"
              onClick={() => document.getElementById("attendance-image-input").click()}
            >
              {attendanceImage ? (
                <img
                  src={attendanceImage || "/placeholder.svg"}
                  alt="Attendance"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <Camera className="h-6 w-6 text-gray-500" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Mark Attendance</h1>
              <p className="text-sm text-gray-500">Record employee attendance</p>
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <Button variant="outline" onClick={resetForm} className="px-4 py-2 border-gray-300 bg-transparent">
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={(e) => handleSubmit(e, "saveAndNew")}
              disabled={loading}
              className="px-4 py-2 border-gray-300"
            >
              {loading ? "Saving..." : "Save And New"}
            </Button>
            <Button
              onClick={(e) => handleSubmit(e, "save")}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <input type="file" id="attendance-image-input" accept="image/*" className="hidden" onChange={handleImageChange} />

      {/* Form Content */}
      <div className="bg-white">
        {/* Basic Information Section */}
        <Section
          title="Basic Information"
          icon={<User className="h-5 w-5" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        >
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Employee <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.employeeId} onValueChange={(value) => handleChange("employeeId", value)}>
              <SelectTrigger className="h-10 border-gray-300">
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
              Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="h-10 border-gray-300"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger className="h-10 border-gray-300">
                <SelectValue placeholder="Select Status" />
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
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Check In Time</Label>
            <div className="flex gap-2">
              <Input
                type="time"
                value={formData.checkIn}
                onChange={(e) => handleChange("checkIn", e.target.value)}
                className="h-10 border-gray-300 flex-1"
              />
              <Button
                variant="outline"
                onClick={() => handleChange("checkIn", getCurrentTime())}
                className="px-3 border-gray-300"
              >
                Now
              </Button>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Check Out Time</Label>
            <div className="flex gap-2">
              <Input
                type="time"
                value={formData.checkOut}
                onChange={(e) => handleChange("checkOut", e.target.value)}
                className="h-10 border-gray-300 flex-1"
              />
              <Button
                variant="outline"
                onClick={() => handleChange("checkOut", getCurrentTime())}
                className="px-3 border-gray-300"
              >
                Now
              </Button>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Work Location</Label>
            <Select value={formData.workLocation} onValueChange={(value) => handleChange("workLocation", value)}>
              <SelectTrigger className="h-10 border-gray-300">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Work From Home">Work From Home</SelectItem>
                <SelectItem value="Client Site">Client Site</SelectItem>
                <SelectItem value="Field Work">Field Work</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* Additional Information Section */}
        <Section
          title="Additional Information"
          icon={<FileText className="h-5 w-5" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        >
          <div className="md:col-span-3">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Enter any additional notes about attendance..."
              rows={4}
              className="resize-none border-blue-400 focus:border-blue-500"
            />
          </div>
        </Section>
      </div>
    </div>
  )
}

// Reusable Section Component
const Section = ({ title, icon, iconBg, iconColor, children }) => (
  <div className="px-6 py-6 border-b last:border-b-0">
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
  </div>
)

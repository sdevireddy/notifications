"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Upload, User } from "lucide-react"

export function AddEmployeeModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    joiningDate: "",
    manager: "",
    dateOfBirth: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    profileImage: null,
  })

  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData((prev) => ({ ...prev, profileImage: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave(formData)
    setFormData({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      department: "",
      designation: "",
      joiningDate: "",
      manager: "",
      dateOfBirth: "",
      address: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      profileImage: null,
    })
    setImagePreview(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Add Employee</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Profile Image Section */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">Profile Image</h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-500" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-image"
                />
                <Label htmlFor="profile-image">
                  <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>
                </Label>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="employeeId" className="enhanced-label">
                  Employee ID *
                </Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                  placeholder="Enter employee ID"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="firstName" className="enhanced-label">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="enhanced-label">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="email" className="enhanced-label">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="enhanced-label">
                  Mobile *
                </Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="Enter mobile number"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="enhanced-label">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="enhanced-input"
                />
              </div>
            </div>
          </div>

          {/* Employment Information Section */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">
              Employment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="department" className="enhanced-label">
                  Department *
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger className="enhanced-input">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="designation" className="enhanced-label">
                  Designation *
                </Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  placeholder="Enter designation"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="joiningDate" className="enhanced-label">
                  Joining Date *
                </Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="manager" className="enhanced-label">
                  Manager
                </Label>
                <Select value={formData.manager} onValueChange={(value) => handleInputChange("manager", value)}>
                  <SelectTrigger className="enhanced-input">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                    <SelectItem value="Lisa Brown">Lisa Brown</SelectItem>
                    <SelectItem value="Robert Kim">Robert Kim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">
              Address Information
            </h3>
            <div>
              <Label htmlFor="address" className="enhanced-label">
                Address
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete address"
                className="enhanced-textarea"
                rows={3}
              />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="form-section">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="emergencyContactName" className="enhanced-label">
                  Contact Name
                </Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Enter contact name"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactPhone" className="enhanced-label">
                  Contact Phone
                </Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  placeholder="Enter contact phone"
                  className="enhanced-input"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactRelation" className="enhanced-label">
                  Relationship
                </Label>
                <Select
                  value={formData.emergencyContactRelation}
                  onValueChange={(value) => handleInputChange("emergencyContactRelation", value)}
                >
                  <SelectTrigger className="enhanced-input">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-200">
            <Button variant="outline" onClick={onClose} className="font-semibold bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 font-semibold">
              Save Employee
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

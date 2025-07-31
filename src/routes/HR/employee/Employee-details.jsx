"use client"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Edit,
  Save,
  X,
  Trash2,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Camera,
  Loader2,
} from "lucide-react"
import BreadCrumb from "./../../../components/BreadCrumb"

export default function EmployeeDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Form data for editing
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    address: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    department: "",
    designation: "",
    joiningDate: "",
    status: "",
    manager: "",
    workLocation: "",
    employmentType: "",
    salary: "",
    bankAccount: "",
    panNumber: "",
    aadharNumber: "",
  })

  // Mock data - replace with API call
  const fetchEmployee = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/employees/${id}`)
      // const data = await response.json()

      // Mock data for now
      const employeeData = {
        id: Number.parseInt(id),
        employeeId: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        mobile: "+91-9876543210",
        dateOfBirth: "1990-05-15",
        address: "123 Main Street, City, State 12345",
        emergencyContactName: "Jane Doe",
        emergencyContactRelation: "Spouse",
        emergencyContactPhone: "+91-9876543211",
        department: "Engineering",
        designation: "Software Engineer",
        joiningDate: "2023-01-15",
        status: "Active",
        manager: "Jane Smith",
        workLocation: "Bangalore Office",
        employmentType: "Full-time",
        salary: "₹8,00,000",
        bankAccount: "1234567890",
        panNumber: "ABCDE1234F",
        aadharNumber: "1234 5678 9012",
        profileImage: null,
      }

      setEmployee(employeeData)
      setFormData(employeeData)
    } catch (error) {
      console.error("Error fetching employee:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchEmployee()
    }
  }, [id])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/employees/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      console.log("Employee updated:", formData)
      setEmployee(formData)
      setIsEditMode(false)
    } catch (error) {
      console.error("Error updating employee:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/employees/${id}`, { method: 'DELETE' })

        console.log("Employee deleted:", employee)
        navigate("/hr/employees")
      } catch (error) {
        console.error("Error deleting employee:", error)
      }
    }
  }

  const calculateTenure = () => {
    if (!employee?.joiningDate) return "N/A"
    const joining = new Date(employee.joiningDate)
    const now = new Date()
    const years = now.getFullYear() - joining.getFullYear()
    const months = now.getMonth() - joining.getMonth()
    return `${years} years, ${months} months`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex-1 bg-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading employee details...</span>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex-1 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Employee Not Found</h2>
          <Button onClick={() => navigate("/hr/employees")}>Back to Employees</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/hr/employees")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <BreadCrumb />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(false)} disabled={saving}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Employee
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditMode ? (
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditMode ? (
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.lastName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditMode ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="mobile">Mobile</Label>
                    {isEditMode ? (
                      <Input
                        id="mobile"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange("mobile", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.mobile}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    {isEditMode ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.dateOfBirth}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditMode ? (
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Contact Name</Label>
                    {isEditMode ? (
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.emergencyContactName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactRelation">Relationship</Label>
                    {isEditMode ? (
                      <Input
                        id="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.emergencyContactRelation}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                    {isEditMode ? (
                      <Input
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.emergencyContactPhone}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employment Information Tab */}
            <TabsContent value="employment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department</Label>
                    {isEditMode ? (
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleInputChange("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.department}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    {isEditMode ? (
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.designation}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="joiningDate">Joining Date</Label>
                    {isEditMode ? (
                      <Input
                        id="joiningDate"
                        type="date"
                        value={formData.joiningDate}
                        onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.joiningDate}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    {isEditMode ? (
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="On Leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant={employee.status === "Active" ? "default" : "secondary"}
                        className={
                          employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {employee.status}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="manager">Manager</Label>
                    {isEditMode ? (
                      <Input
                        id="manager"
                        value={formData.manager}
                        onChange={(e) => handleInputChange("manager", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.manager}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="workLocation">Work Location</Label>
                    {isEditMode ? (
                      <Input
                        id="workLocation"
                        value={formData.workLocation}
                        onChange={(e) => handleInputChange("workLocation", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.workLocation}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="employmentType">Employment Type</Label>
                    {isEditMode ? (
                      <Select
                        value={formData.employmentType}
                        onValueChange={(value) => handleInputChange("employmentType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Intern">Intern</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.employmentType}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">Resume</p>
                        <p className="text-sm text-gray-600">Uploaded on {employee.joiningDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {isEditMode && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Replace
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-medium">ID Proof</p>
                        <p className="text-sm text-gray-600">Aadhar Card</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {isEditMode && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Replace
                        </Button>
                      )}
                    </div>
                  </div>
                  {isEditMode && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload additional documents</p>
                      <Button variant="outline">Choose Files</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Jan {20 + day}, 2024</p>
                          <p className="text-sm text-gray-600">9:00 AM - 6:00 PM (9 hours)</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Present</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payroll Tab */}
            <TabsContent value="payroll" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Payroll Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary">Annual Salary</Label>
                    {isEditMode ? (
                      <Input
                        id="salary"
                        value={formData.salary}
                        onChange={(e) => handleInputChange("salary", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.salary}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bankAccount">Bank Account</Label>
                    {isEditMode ? (
                      <Input
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.bankAccount}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="panNumber">PAN Number</Label>
                    {isEditMode ? (
                      <Input
                        id="panNumber"
                        value={formData.panNumber}
                        onChange={(e) => handleInputChange("panNumber", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.panNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    {isEditMode ? (
                      <Input
                        id="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{employee.aadharNumber}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Employee Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Employee Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {employee.profileImage ? (
                    <img
                      src={employee.profileImage || "/placeholder.svg"}
                      alt={employee.firstName + " " + employee.lastName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-500" />
                  )}
                </div>
              </div>
              {isEditMode && (
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Employee ID:</span>
                  <span className="text-sm font-medium">{employee.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Department:</span>
                  <span className="text-sm font-medium">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Designation:</span>
                  <span className="text-sm font-medium">{employee.designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tenure:</span>
                  <span className="text-sm font-medium">{calculateTenure()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge
                    variant={employee.status === "Active" ? "default" : "secondary"}
                    className={
                      employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Call Employee
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium">Marked attendance</p>
                  <p className="text-xs text-gray-600">Today at 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-blue-500 mt-1" />
                <div>
                  <p className="text-sm font-medium">Submitted timesheet</p>
                  <p className="text-xs text-gray-600">Yesterday at 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-1" />
                <div>
                  <p className="text-sm font-medium">Applied for leave</p>
                  <p className="text-xs text-gray-600">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

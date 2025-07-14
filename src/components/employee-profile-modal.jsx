"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Building, Calendar, MapPin, Edit, Trash2, Download } from "lucide-react"

export function EmployeeProfileModal({ employee, isOpen, onClose, onEdit, onDelete }) {
  if (!employee) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {employee.profileImage ? (
                <img
                  src={employee.profileImage || "/placeholder.svg"}
                  alt={employee.firstName + " " + employee.lastName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-gray-500" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-gray-600">
                {employee.designation} - {employee.department}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="personal" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{employee.mobile}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>DOB: {employee.dateOfBirth || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{employee.address || "Address not provided"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{employee.emergencyContactName || "Not provided"}</p>
                    <p className="text-sm text-gray-600">{employee.emergencyContactRelation || ""}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{employee.emergencyContactPhone || "Not provided"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Employee ID</p>
                    <p className="font-medium">{employee.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Department</p>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Designation</p>
                    <p className="font-medium">{employee.designation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Joining Date</p>
                    <p className="font-medium">{employee.joiningDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <Badge
                      variant={employee.status === "Active" ? "default" : "secondary"}
                      className={
                        employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reporting Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reports To</p>
                    <p className="font-medium">{employee.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Work Location</p>
                    <p className="font-medium">{employee.workLocation || "Office"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Employment Type</p>
                    <p className="font-medium">{employee.employmentType || "Full-time"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Resume</p>
                      <p className="text-sm text-gray-600">Uploaded on {employee.joiningDate}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">ID Proof</p>
                      <p className="text-sm text-gray-600">Aadhar Card</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Jan {20 + day}, 2024</p>
                        <p className="text-sm text-gray-600">9:00 AM - 6:00 PM</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Present</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" onClick={() => onEdit(employee)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Employee
          </Button>
          <Button variant="destructive" onClick={() => onDelete(employee)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Employee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, ArrowLeft, User, Building, MapPin, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const initialFormState = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  secondaryEmail: "",
  department: "",
  designation: "",
  employmentType: "",
  workLocation: "",
  joiningDate: "",
  salary: "",
  manager: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelation: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  notes: "",
  image: null,
}

export default function AddEmployeePage() {
  const navigate = useNavigate()
  const [employeeImage, setEmployeeImage] = useState(null)
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
      reader.onloadend = () => setEmployeeImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setEmployeeImage(null)
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Replace with actual API call when backend is ready
      // const formDataToSend = new FormData()
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (value !== null && value !== '') {
      //     formDataToSend.append(key, value)
      //   }
      // })

      // const response = await fetch('/api/employees', {
      //   method: 'POST',
      //   body: formDataToSend
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to create employee')
      // }

      // const result = await response.json()

      // Mock API call - remove when backend is ready
      console.log("Employee data to be saved:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (action === "save") {
        navigate("/hr/employees")
      } else if (action === "saveAndNew") {
        resetForm()
      }
    } catch (error) {
      console.error("Error saving employee:", error)
      alert("Failed to save employee. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[calc(100%-10px)] text-sm">
      <form className="rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} type="button" className="rounded p-2 hover:bg-gray-200">
              <ArrowLeft size={20} />
            </button>
            {/* Employee Image Upload */}
            <div
              title="Click to upload image"
              className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-200"
              onClick={() => document.getElementById("employee-image-input").click()}
            >
              {employeeImage ? (
                <img
                  src={employeeImage || "/placeholder.svg"}
                  alt="Employee"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <Camera className="text-2xl text-gray-500" />
              )}
            </div>
            <h2 className="text-xl font-bold">Add Employee</h2>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 grid-cols-1 text-sm">
            <button
              type="button"
              className="rounded px-4 py-2 hover:bg-gray-100 border border-gray-300 transition-all ease-in-out duration-200 shadow-md"
              onClick={resetForm}
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded px-4 py-2 hover:bg-gray-100 border border-gray-300 transition-all ease-in-out duration-200 shadow-md"
              onClick={(e) => handleSubmit(e, "saveAndNew")}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save And New"}
            </button>
            <button
              type="submit"
              className="rounded bg-primary px-4 py-2 text-white "
              onClick={(e) => handleSubmit(e, "save")}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <input type="file" id="employee-image-input" accept="image/*" className="hidden" onChange={handleImageChange} />

        {/* Basic Information Section */}
        <Section title="Basic Information" icon={<User />} iconBg="bg-blue-100" iconColor="text-blue-600">
          <InputField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
          <InputField
            label="Secondary Email"
            name="secondaryEmail"
            type="email"
            value={formData.secondaryEmail}
            onChange={handleChange}
          />
        </Section>

        {/* Employment Information Section */}
        <Section title="Employment Information" icon={<Building />} iconBg="bg-green-100" iconColor="text-green-600">
          <SelectField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleSelectChange}
            options={["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]}
            required
          />
          <InputField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
          <SelectField
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleSelectChange}
            options={["Full-time", "Part-time", "Contract", "Intern"]}
            required
          />
          <InputField label="Work Location" name="workLocation" value={formData.workLocation} onChange={handleChange} />
          <InputField
            label="Joining Date"
            name="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={handleChange}
            required
          />
          <InputField label="Salary" name="salary" type="number" value={formData.salary} onChange={handleChange} />
          <SelectField
            label="Manager"
            name="manager"
            value={formData.manager}
            onChange={handleSelectChange}
            options={["Jane Smith", "Mike Wilson", "Lisa Brown", "Robert Kim", "Anna Lee"]}
          />
        </Section>

        {/* Address Information Section */}
        <Section title="Address Information" icon={<MapPin />} iconBg="bg-purple-100" iconColor="text-purple-600">
          <InputField
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
          <InputField
            label="Address Line 2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
          <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
          <InputField label="ZIP" name="zip" value={formData.zip} onChange={handleChange} />
          <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
        </Section>

        {/* Emergency Contact Section */}
        <Section title="Emergency Contact" icon={<Phone />} iconBg="bg-orange-100" iconColor="text-orange-600">
          <InputField
            label="Contact Name"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
          <InputField
            label="Contact Phone"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
          />
          <SelectField
            label="Relation"
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleSelectChange}
            options={["Spouse", "Parent", "Sibling", "Friend", "Other"]}
          />
          <div className="col-span-full">
            <Label htmlFor="notes" className="block text-gray-700">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Additional notes about the employee..."
            />
          </div>
        </Section>
      </form>
    </div>
  )
}

// Reusable Components
const Section = ({ title, icon, iconBg, iconColor, children }) => (
  <div className="mb-4 rounded border p-4">
    <h3 className="mb-4 flex items-center gap-3 border-b pb-3 text-lg font-semibold">
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      {title}
    </h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
  </div>
)

const InputField = ({ label, name, type = "text", value, onChange, required = false, className = "" }) => (
  <div className={className}>
    <Label htmlFor={name} className="block text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded border-gray-300 p-2 border-[1px] focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
    />
  </div>
)

const SelectField = ({ label, name, value, onChange, options = [], required = false }) => (
  <div>
    <Label htmlFor={name} className="block text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Select value={value} onValueChange={(val) => onChange(name, val)}>
      <SelectTrigger className="w-full rounded border-[1px] border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

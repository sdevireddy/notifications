"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, ArrowLeft, User, Building, MapPin, Phone, FileText, CreditCard, Heart, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const initialFormState = {
  // Basic Information
  employee_code: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  nationality: "",
  marital_status: "",
  blood_group: "",

  // Contact Information
  personal_email: "",
  official_email: "",
  personal_phone: "",
  official_phone: "",

  // Address Information
  current_address: "",
  permanent_address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",

  // Employment Information
  department: "",
  designation: "",
  reporting_manager: "",
  work_location: "",
  date_of_joining: "",
  date_of_confirmation: "",
  date_of_resignation: "",
  employment_status: "",
  employment_type: "",

  // Document Information
  pan_number: "",
  aadhar_number: "",
  passport_number: "",
  driving_license_number: "",
  tax_identification_number: "",
  social_security_number: "",

  // Bank Information
  bank_name: "",
  bank_account_number: "",
  ifsc_code: "",
  uan_number: "",
  esic_number: "",
  salary_structure_id: "",

  // Emergency Contact
  emergency_contact_name: "",
  emergency_contact_relationship: "",
  emergency_contact_phone: "",
  emergency_contact_address: "",

  // Additional Information
  skills: "",
  certifications: "",
  hobbies: "",
  languages_known: "",
  total_experience_years: "",
  previous_employers: "",

  // Image
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
    <div className="w-full text-sm bg-gray-50 min-h-screen">
      <form className="rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3 sticky top-0 bg-white z-10">
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
              className="rounded bg-primary px-4 py-2 text-white shadow-sm flex items-center justify-center gap-2"
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
            label="Employee Code"
            name="employee_code"
            value={formData.employee_code}
            onChange={handleChange}
            required
          />
          <InputField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
          <InputField
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
            options={["Male", "Female", "Other", "Prefer not to say"]}
          />
          <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
          <SelectField
            label="Marital Status"
            name="marital_status"
            value={formData.marital_status}
            onChange={handleSelectChange}
            options={["Single", "Married", "Divorced", "Widowed", "Separated"]}
          />
          <SelectField
            label="Blood Group"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleSelectChange}
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          />
        </Section>

        {/* Contact Information Section */}
        <Section title="Contact Information" icon={<Phone />} iconBg="bg-green-100" iconColor="text-green-600">
          <InputField
            label="Personal Email"
            name="personal_email"
            type="email"
            value={formData.personal_email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Official Email"
            name="official_email"
            type="email"
            value={formData.official_email}
            onChange={handleChange}
          />
          <InputField
            label="Personal Phone"
            name="personal_phone"
            value={formData.personal_phone}
            onChange={handleChange}
            required
          />
          <InputField
            label="Official Phone"
            name="official_phone"
            value={formData.official_phone}
            onChange={handleChange}
          />
        </Section>

        {/* Address Information Section */}
        <Section title="Address Information" icon={<MapPin />} iconBg="bg-purple-100" iconColor="text-purple-600">
          <div className="col-span-full">
            <Label htmlFor="current_address" className="block text-gray-700 mb-1">
              Current Address
            </Label>
            <Textarea
              id="current_address"
              name="current_address"
              rows={3}
              value={formData.current_address}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Enter current address..."
            />
          </div>
          <div className="col-span-full">
            <Label htmlFor="permanent_address" className="block text-gray-700 mb-1">
              Permanent Address
            </Label>
            <Textarea
              id="permanent_address"
              name="permanent_address"
              rows={3}
              value={formData.permanent_address}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Enter permanent address..."
            />
          </div>
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
          <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
          <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
          <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
        </Section>

        {/* Employment Information Section */}
        <Section title="Employment Information" icon={<Building />} iconBg="bg-orange-100" iconColor="text-orange-600">
          <SelectField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleSelectChange}
            options={["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "IT", "Legal", "Admin"]}
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
            label="Reporting Manager"
            name="reporting_manager"
            value={formData.reporting_manager}
            onChange={handleSelectChange}
            options={[
              "Jane Smith",
              "Mike Wilson",
              "Lisa Brown",
              "Robert Kim",
              "Anna Lee",
              "David Johnson",
              "Sarah Davis",
            ]}
          />
          <InputField
            label="Work Location"
            name="work_location"
            value={formData.work_location}
            onChange={handleChange}
          />
          <InputField
            label="Date of Joining"
            name="date_of_joining"
            type="date"
            value={formData.date_of_joining}
            onChange={handleChange}
            required
          />
          <InputField
            label="Date of Confirmation"
            name="date_of_confirmation"
            type="date"
            value={formData.date_of_confirmation}
            onChange={handleChange}
          />
          <InputField
            label="Date of Resignation"
            name="date_of_resignation"
            type="date"
            value={formData.date_of_resignation}
            onChange={handleChange}
          />
          <SelectField
            label="Employment Status"
            name="employment_status"
            value={formData.employment_status}
            onChange={handleSelectChange}
            options={["Active", "Inactive", "On Leave", "Terminated", "Resigned", "Probation"]}
            required
          />
          <SelectField
            label="Employment Type"
            name="employment_type"
            value={formData.employment_type}
            onChange={handleSelectChange}
            options={["Full-time", "Part-time", "Contract", "Intern", "Consultant", "Temporary"]}
            required
          />
        </Section>

        {/* Document Information Section */}
        <Section title="Document Information" icon={<FileText />} iconBg="bg-indigo-100" iconColor="text-indigo-600">
          <InputField label="PAN Number" name="pan_number" value={formData.pan_number} onChange={handleChange} />
          <InputField
            label="Aadhar Number"
            name="aadhar_number"
            value={formData.aadhar_number}
            onChange={handleChange}
          />
          <InputField
            label="Passport Number"
            name="passport_number"
            value={formData.passport_number}
            onChange={handleChange}
          />
          <InputField
            label="Driving License Number"
            name="driving_license_number"
            value={formData.driving_license_number}
            onChange={handleChange}
          />
          <InputField
            label="Tax Identification Number"
            name="tax_identification_number"
            value={formData.tax_identification_number}
            onChange={handleChange}
          />
          <InputField
            label="Social Security Number"
            name="social_security_number"
            value={formData.social_security_number}
            onChange={handleChange}
          />
        </Section>

        {/* Bank & Statutory Information Section */}
        <Section
          title="Bank & Statutory Information"
          icon={<CreditCard />}
          iconBg="bg-teal-100"
          iconColor="text-teal-600"
        >
          <InputField label="Bank Name" name="bank_name" value={formData.bank_name} onChange={handleChange} />
          <InputField
            label="Bank Account Number"
            name="bank_account_number"
            value={formData.bank_account_number}
            onChange={handleChange}
          />
          <InputField label="IFSC Code" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} />
          <InputField label="UAN Number" name="uan_number" value={formData.uan_number} onChange={handleChange} />
          <InputField label="ESIC Number" name="esic_number" value={formData.esic_number} onChange={handleChange} />
          <InputField
            label="Salary Structure ID"
            name="salary_structure_id"
            value={formData.salary_structure_id}
            onChange={handleChange}
          />
        </Section>

        {/* Emergency Contact Section */}
        <Section title="Emergency Contact" icon={<Heart />} iconBg="bg-red-100" iconColor="text-red-600">
          <InputField
            label="Emergency Contact Name"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
          />
          <SelectField
            label="Relationship"
            name="emergency_contact_relationship"
            value={formData.emergency_contact_relationship}
            onChange={handleSelectChange}
            options={["Spouse", "Parent", "Sibling", "Child", "Friend", "Relative", "Other"]}
          />
          <InputField
            label="Emergency Contact Phone"
            name="emergency_contact_phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
          />
          <div className="col-span-full">
            <Label htmlFor="emergency_contact_address" className="block text-gray-700 mb-1">
              Emergency Contact Address
            </Label>
            <Textarea
              id="emergency_contact_address"
              name="emergency_contact_address"
              rows={3}
              value={formData.emergency_contact_address}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Enter emergency contact address..."
            />
          </div>
        </Section>

        {/* Additional Information Section */}
        <Section title="Additional Information" icon={<Globe />} iconBg="bg-pink-100" iconColor="text-pink-600">
          <InputField
            label="Total Experience (Years)"
            name="total_experience_years"
            type="number"
            value={formData.total_experience_years}
            onChange={handleChange}
          />
          <div className="col-span-full">
            <Label htmlFor="skills" className="block text-gray-700 mb-1">
              Skills
            </Label>
            <Textarea
              id="skills"
              name="skills"
              rows={3}
              value={formData.skills}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="List technical and soft skills..."
            />
          </div>
          <div className="col-span-full">
            <Label htmlFor="certifications" className="block text-gray-700 mb-1">
              Certifications
            </Label>
            <Textarea
              id="certifications"
              name="certifications"
              rows={3}
              value={formData.certifications}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="List professional certifications..."
            />
          </div>
          <div className="col-span-full">
            <Label htmlFor="hobbies" className="block text-gray-700 mb-1">
              Hobbies
            </Label>
            <Textarea
              id="hobbies"
              name="hobbies"
              rows={2}
              value={formData.hobbies}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="List hobbies and interests..."
            />
          </div>
          <div className="col-span-full">
            <Label htmlFor="languages_known" className="block text-gray-700 mb-1">
              Languages Known
            </Label>
            <Textarea
              id="languages_known"
              name="languages_known"
              rows={2}
              value={formData.languages_known}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="List languages with proficiency level..."
            />
          </div>
          <div className="col-span-full">
            <Label htmlFor="previous_employers" className="block text-gray-700 mb-1">
              Previous Employers
            </Label>
            <Textarea
              id="previous_employers"
              name="previous_employers"
              rows={4}
              value={formData.previous_employers}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="List previous employers with designation and duration..."
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
    <h3 className="mb-4 flex items-center gap-3 border-b pb-2 text-lg font-semibold">
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
        <span className={iconColor}>{icon}</span>
      </div>
      {title}
    </h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
  </div>
)

const InputField = ({ label, name, type = "text", value, onChange, required = false, className = "" }) => (
  <div className={className}>
    <Label htmlFor={name} className="block text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
    />
  </div>
)

const SelectField = ({ label, name, value, onChange, options = [], required = false }) => (
  <div>
    <Label htmlFor={name} className="block text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Select value={value} onValueChange={(val) => onChange(name, val)}>
      <SelectTrigger className="w-full rounded border border-gray-300 p-2 focus:border-gray-400 focus:ring-1 focus:ring-gray-400">
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

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
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  FileText,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Building,
  Target,
  X,
} from "lucide-react"

const departments = [
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "design", label: "Design" },
  { value: "operations", label: "Operations" },
  { value: "customer-success", label: "Customer Success" },
]

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
]

const experienceLevels = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6-10 years)" },
  { value: "lead", label: "Lead Level (10+ years)" },
  { value: "executive", label: "Executive Level" },
]

const workModes = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
]

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "INR", label: "INR (₹)" },
]

const urgencyLevels = [
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
]

export default function PostJobPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    // Basic Information
    jobTitle: "",
    department: "",
    jobType: "",
    experienceLevel: "",
    workMode: "",
    location: "",

    // Salary Information
    currency: "USD",
    salaryMin: "",
    salaryMax: "",
    salaryType: "annual",
    showSalary: true,

    // Job Details
    jobDescription: "",
    responsibilities: "",
    requirements: "",
    qualifications: "",
    benefits: "",

    // Skills & Requirements
    requiredSkills: [],
    preferredSkills: [],

    // Timeline & Contact
    applicationDeadline: "",
    startDate: "",
    urgency: "medium",
    hiringManager: "",
    contactEmail: "",

    // Additional Settings
    isActive: true,
    allowRemoteApplications: true,
    requireCoverLetter: false,
    requirePortfolio: false,
  })

  const [skillInput, setSkillInput] = useState("")
  const [preferredSkillInput, setPreferredSkillInput] = useState("")
  const [estimatedApplications, setEstimatedApplications] = useState(0)

  useEffect(() => {
    calculateEstimatedApplications()
  }, [formData.jobType, formData.experienceLevel, formData.workMode, formData.urgency])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = (type) => {
    const input = type === "required" ? skillInput : preferredSkillInput
    if (input.trim() && !formData[`${type}Skills`].includes(input.trim())) {
      setFormData((prev) => ({
        ...prev,
        [`${type}Skills`]: [...prev[`${type}Skills`], input.trim()],
      }))
      if (type === "required") {
        setSkillInput("")
      } else {
        setPreferredSkillInput("")
      }
    }
  }

  const removeSkill = (type, skill) => {
    setFormData((prev) => ({
      ...prev,
      [`${type}Skills`]: prev[`${type}Skills`].filter((s) => s !== skill),
    }))
  }

  const calculateEstimatedApplications = () => {
    let base = 50

    // Job type multiplier
    const typeMultipliers = { "full-time": 1.2, "part-time": 0.8, contract: 0.9, internship: 1.5, freelance: 0.7 }
    base *= typeMultipliers[formData.jobType] || 1

    // Experience level multiplier
    const expMultipliers = { entry: 1.8, mid: 1.2, senior: 0.9, lead: 0.6, executive: 0.4 }
    base *= expMultipliers[formData.experienceLevel] || 1

    // Work mode multiplier
    const modeMultipliers = { remote: 1.5, hybrid: 1.2, onsite: 0.9 }
    base *= modeMultipliers[formData.workMode] || 1

    // Urgency multiplier
    const urgencyMultipliers = { low: 0.7, medium: 1, high: 1.3, urgent: 1.6 }
    base *= urgencyMultipliers[formData.urgency] || 1

    setEstimatedApplications(Math.round(base))
  }

  const handleSubmit = () => {
    const jobData = {
      ...formData,
      postedDate: new Date().toISOString().split("T")[0],
      status: "Active",
      applicationsReceived: 0,
    }

    console.log("Job posted:", jobData)
    // Replace with actual API call
    navigate("/hr/recruitment")
  }

  const isFormValid = () => {
    return (
      formData.jobTitle &&
      formData.department &&
      formData.jobType &&
      formData.experienceLevel &&
      formData.workMode &&
      formData.location &&
      formData.jobDescription &&
      formData.responsibilities &&
      formData.requirements &&
      formData.applicationDeadline &&
      formData.hiringManager &&
      formData.contactEmail
    )
  }

  const getDaysUntilDeadline = () => {
    if (!formData.applicationDeadline) return null
    const deadline = new Date(formData.applicationDeadline)
    const today = new Date()
    const diffTime = deadline - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUrgencyBadge = (urgency) => {
    const config = urgencyLevels.find((u) => u.value === urgency)
    return <Badge className={config?.color || "bg-gray-100 text-gray-800"}>{config?.label || urgency}</Badge>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/hr/recruitment")} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Post New Job</h1>
                <p className="text-sm text-gray-500">Create and publish a new job opening</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/hr/recruitment")}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isFormValid()}
            >
              Post Job
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Main Form - 2 columns */}
        <div className="lg:col-span-2">
          {/* Basic Information */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="h-10"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Job Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.jobType} onValueChange={(value) => handleInputChange("jobType", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Experience Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) => handleInputChange("experienceLevel", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Work Mode <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.workMode} onValueChange={(value) => handleInputChange("workMode", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Work Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {workModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g. San Francisco, CA or Remote"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Salary Information */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Salary Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Salary</Label>
                <Input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                  placeholder="50000"
                  className="h-10"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Maximum Salary</Label>
                <Input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                  placeholder="80000"
                  className="h-10"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Salary Type</Label>
                <Select value={formData.salaryType} onValueChange={(value) => handleInputChange("salaryType", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showSalary"
                  checked={formData.showSalary}
                  onCheckedChange={(checked) => handleInputChange("showSalary", checked)}
                />
                <Label htmlFor="showSalary" className="text-sm font-medium text-gray-700">
                  Show salary range in job posting
                </Label>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Job Description</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Job Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                  placeholder="Provide a comprehensive overview of the role..."
                  rows={4}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Key Responsibilities <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.responsibilities}
                  onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                  placeholder="List the main responsibilities and duties..."
                  rows={4}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Requirements <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  placeholder="List the essential requirements..."
                  rows={4}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Qualifications</Label>
                <Textarea
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange("qualifications", e.target.value)}
                  placeholder="Educational qualifications and certifications..."
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Benefits & Perks</Label>
                <Textarea
                  value={formData.benefits}
                  onChange={(e) => handleInputChange("benefits", e.target.value)}
                  placeholder="Health insurance, flexible hours, remote work..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Skills & Requirements */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Skills & Requirements</h2>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Required Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a required skill"
                    className="h-10"
                    onKeyPress={(e) => e.key === "Enter" && addSkill("required")}
                  />
                  <Button onClick={() => addSkill("required")} variant="outline" className="px-4">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("required", skill)} />
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Skills</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={preferredSkillInput}
                    onChange={(e) => setPreferredSkillInput(e.target.value)}
                    placeholder="Add a preferred skill"
                    className="h-10"
                    onKeyPress={(e) => e.key === "Enter" && addSkill("preferred")}
                  />
                  <Button onClick={() => addSkill("preferred")} variant="outline" className="px-4">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.preferredSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("preferred", skill)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Contact */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Timeline & Contact</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Application Deadline <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Expected Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Urgency Level</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Hiring Manager <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.hiringManager}
                  onChange={(e) => handleInputChange("hiringManager", e.target.value)}
                  placeholder="John Smith"
                  className="h-10"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="hiring@company.com"
                  className="h-10"
                />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowRemoteApplications"
                  checked={formData.allowRemoteApplications}
                  onCheckedChange={(checked) => handleInputChange("allowRemoteApplications", checked)}
                />
                <Label htmlFor="allowRemoteApplications" className="text-sm font-medium text-gray-700">
                  Allow remote applications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireCoverLetter"
                  checked={formData.requireCoverLetter}
                  onCheckedChange={(checked) => handleInputChange("requireCoverLetter", checked)}
                />
                <Label htmlFor="requireCoverLetter" className="text-sm font-medium text-gray-700">
                  Require cover letter
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requirePortfolio"
                  checked={formData.requirePortfolio}
                  onCheckedChange={(checked) => handleInputChange("requirePortfolio", checked)}
                />
                <Label htmlFor="requirePortfolio" className="text-sm font-medium text-gray-700">
                  Require portfolio/work samples
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="border-l bg-gray-50">
          {/* Job Preview */}
          <div className="p-6 border-b bg-white">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Job Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{formData.jobTitle || "Job Title"}</h3>
                  <p className="text-sm text-gray-600">{formData.department || "Department"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.jobType && <Badge variant="outline">{formData.jobType}</Badge>}
                  {formData.workMode && <Badge variant="outline">{formData.workMode}</Badge>}
                  {formData.experienceLevel && <Badge variant="outline">{formData.experienceLevel}</Badge>}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {formData.location || "Location"}
                </div>
                {formData.showSalary && (formData.salaryMin || formData.salaryMax) && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    {formData.salaryMin && formData.salaryMax
                      ? `${formData.currency} ${formData.salaryMin} - ${formData.salaryMax}`
                      : formData.salaryMin
                        ? `${formData.currency} ${formData.salaryMin}+`
                        : `Up to ${formData.currency} ${formData.salaryMax}`}
                    {formData.salaryType && ` (${formData.salaryType})`}
                  </div>
                )}
                {formData.urgency && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Urgency:</span>
                    {getUrgencyBadge(formData.urgency)}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Application Insights */}
          <div className="p-6 border-b bg-white">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Application Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Estimated Applications:</span>
                  <Badge variant="outline" className="font-bold">
                    {estimatedApplications}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Required Skills:</span>
                  <Badge variant="outline">{formData.requiredSkills.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Preferred Skills:</span>
                  <Badge variant="outline">{formData.preferredSkills.length}</Badge>
                </div>
                {formData.applicationDeadline && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Days Until Deadline:</span>
                    <Badge
                      variant="outline"
                      className={
                        getDaysUntilDeadline() < 7
                          ? "bg-red-100 text-red-800"
                          : getDaysUntilDeadline() < 14
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {getDaysUntilDeadline()} days
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form Validation */}
          <div className="p-6 bg-white">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Form Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Basic Information</span>
                  {formData.jobTitle &&
                  formData.department &&
                  formData.jobType &&
                  formData.experienceLevel &&
                  formData.workMode &&
                  formData.location ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Job Description</span>
                  {formData.jobDescription && formData.responsibilities && formData.requirements ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Timeline & Contact</span>
                  {formData.applicationDeadline && formData.hiringManager && formData.contactEmail ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                {isFormValid() ? (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mt-4">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Job is ready to post!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-600">Please complete all required fields</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

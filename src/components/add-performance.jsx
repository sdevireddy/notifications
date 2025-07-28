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
import { ArrowLeft, User, Target, TrendingUp, Award, Star, CheckCircle, AlertCircle, FileText } from "lucide-react"

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    position: "Senior Developer",
    department: "Engineering",
    manager: "Sarah Wilson",
    joinDate: "2022-01-15",
    lastReview: "2023-10-15",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    manager: "Michael Brown",
    joinDate: "2021-03-20",
    lastReview: "2023-09-20",
  },
  {
    id: "EMP003",
    name: "Mike Davis",
    position: "Marketing Director",
    department: "Marketing",
    manager: "Lisa Anderson",
    joinDate: "2020-06-10",
    lastReview: "2023-11-10",
  },
  {
    id: "EMP004",
    name: "Emily Chen",
    position: "Product Designer",
    department: "Design",
    manager: "David Kim",
    joinDate: "2022-08-05",
    lastReview: "2023-08-05",
  },
  {
    id: "EMP005",
    name: "David Wilson",
    position: "Finance Analyst",
    department: "Finance",
    manager: "Jennifer Lee",
    joinDate: "2023-01-12",
    lastReview: null,
  },
]

const reviewPeriods = [
  { value: "Q1-2024", label: "Q1 2024" },
  { value: "Q2-2024", label: "Q2 2024" },
  { value: "Q3-2024", label: "Q3 2024" },
  { value: "Q4-2024", label: "Q4 2024" },
  { value: "Annual-2024", label: "Annual 2024" },
]

const performanceAreas = [
  { key: "technical", label: "Technical Skills", weight: 30 },
  { key: "communication", label: "Communication", weight: 20 },
  { key: "teamwork", label: "Teamwork", weight: 20 },
  { key: "leadership", label: "Leadership", weight: 15 },
  { key: "innovation", label: "Innovation", weight: 15 },
]

export default function AddPerformancePage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    employeeId: "",
    reviewPeriod: "",
    reviewType: "quarterly",
    reviewDate: new Date().toISOString().split("T")[0],
    ratings: {},
    goals: [{ title: "", description: "", status: "not-started", target: "", achievement: "" }],
    strengths: "",
    improvements: "",
    feedback: "",
    managerComments: "",
    employeeComments: "",
    nextReviewDate: "",
    developmentPlan: "",
  })

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [overallRating, setOverallRating] = useState(0)

  useEffect(() => {
    if (formData.employeeId) {
      const emp = employees.find((e) => e.id === formData.employeeId)
      setSelectedEmployee(emp)
    } else {
      setSelectedEmployee(null)
    }
  }, [formData.employeeId])

  useEffect(() => {
    calculateOverallRating()
  }, [formData.ratings])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRatingChange = (area, rating) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [area]: rating },
    }))
  }

  const handleGoalChange = (index, field, value) => {
    const updatedGoals = [...formData.goals]
    updatedGoals[index] = { ...updatedGoals[index], [field]: value }
    setFormData((prev) => ({ ...prev, goals: updatedGoals }))
  }

  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      goals: [...prev.goals, { title: "", description: "", status: "not-started", target: "", achievement: "" }],
    }))
  }

  const removeGoal = (index) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }))
  }

  const calculateOverallRating = () => {
    const ratings = Object.values(formData.ratings).filter((r) => r > 0)
    if (ratings.length === 0) {
      setOverallRating(0)
      return
    }

    let weightedSum = 0
    let totalWeight = 0

    performanceAreas.forEach((area) => {
      if (formData.ratings[area.key]) {
        weightedSum += formData.ratings[area.key] * area.weight
        totalWeight += area.weight
      }
    })

    const average = totalWeight > 0 ? weightedSum / totalWeight : 0
    setOverallRating(Math.round(average * 10) / 10)
  }

  const handleSubmit = () => {
    const reviewData = {
      ...formData,
      overallRating,
      employeeName: selectedEmployee?.name || "Unknown",
      submittedDate: new Date().toISOString().split("T")[0],
      status: "Draft",
    }

    console.log("Performance review submitted:", reviewData)
    // Replace with actual API call
    navigate("/hr/performance")
  }

  const isFormValid = () => {
    return (
      formData.employeeId &&
      formData.reviewPeriod &&
      formData.reviewDate &&
      Object.keys(formData.ratings).length > 0 &&
      formData.feedback
    )
  }

  const getRatingStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 cursor-pointer ${i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          onClick={() => handleRatingChange(performanceAreas.find((a) => a.key === rating)?.key, i)}
        />,
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/hr/performance")} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Add Performance Review</h1>
                <p className="text-sm text-gray-500">Evaluate employee performance and set goals</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/hr/performance")}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!isFormValid()}
            >
              Save Review
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Main Form - 2 columns */}
        <div className="lg:col-span-2">
          {/* Employee Information */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Employee Information</h2>
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
                  Review Period <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.reviewPeriod}
                  onValueChange={(value) => handleInputChange("reviewPeriod", value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {reviewPeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Review Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.reviewDate}
                  onChange={(e) => handleInputChange("reviewDate", e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Performance Ratings */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Performance Ratings</h2>
            </div>
            <div className="space-y-4">
              {performanceAreas.map((area) => (
                <div key={area.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{area.label}</div>
                    <div className="text-sm text-gray-500">Weight: {area.weight}%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-6 w-6 cursor-pointer ${
                          rating <= (formData.ratings[area.key] || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                        onClick={() => handleRatingChange(area.key, rating)}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium w-8">{formData.ratings[area.key] || 0}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & Objectives */}
          <div className="border-b px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Goals & Objectives</h2>
              </div>
              <Button onClick={addGoal} variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
            <div className="space-y-4">
              {formData.goals.map((goal, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Goal Title</Label>
                      <Input
                        value={goal.title}
                        onChange={(e) => handleGoalChange(index, "title", e.target.value)}
                        placeholder="Enter goal title"
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Status</Label>
                      <Select value={goal.status} onValueChange={(value) => handleGoalChange(index, "status", value)}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-started">Not Started</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="exceeded">Exceeded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Description</Label>
                    <Textarea
                      value={goal.description}
                      onChange={(e) => handleGoalChange(index, "description", e.target.value)}
                      placeholder="Describe the goal..."
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Target</Label>
                      <Input
                        value={goal.target}
                        onChange={(e) => handleGoalChange(index, "target", e.target.value)}
                        placeholder="Target metric"
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Achievement</Label>
                      <Input
                        value={goal.achievement}
                        onChange={(e) => handleGoalChange(index, "achievement", e.target.value)}
                        placeholder="Actual achievement"
                        className="h-10"
                      />
                    </div>
                  </div>
                  {formData.goals.length > 1 && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={() => removeGoal(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove Goal
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Feedback & Comments */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Feedback & Comments</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Strengths</Label>
                  <Textarea
                    value={formData.strengths}
                    onChange={(e) => handleInputChange("strengths", e.target.value)}
                    placeholder="Key strengths and achievements..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Areas for Improvement</Label>
                  <Textarea
                    value={formData.improvements}
                    onChange={(e) => handleInputChange("improvements", e.target.value)}
                    placeholder="Areas that need improvement..."
                    rows={4}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Overall Feedback <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.feedback}
                  onChange={(e) => handleInputChange("feedback", e.target.value)}
                  placeholder="Provide comprehensive feedback on performance..."
                  rows={4}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Manager Comments</Label>
                <Textarea
                  value={formData.managerComments}
                  onChange={(e) => handleInputChange("managerComments", e.target.value)}
                  placeholder="Additional manager comments..."
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Development Plan</Label>
                <Textarea
                  value={formData.developmentPlan}
                  onChange={(e) => handleInputChange("developmentPlan", e.target.value)}
                  placeholder="Future development and training plans..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="border-l bg-gray-50">
          {/* Review Summary */}
          <div className="p-6 border-b bg-white">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Review Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Rating:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(overallRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="font-bold">
                      {overallRating}/5
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Goals Set:</span>
                  <Badge variant="outline">{formData.goals.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completed Goals:</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {formData.goals.filter((g) => g.status === "completed" || g.status === "exceeded").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee Details */}
          {selectedEmployee && (
            <div className="p-6 border-b bg-white">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Employee Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Name:</span>
                    <span className="text-sm">{selectedEmployee.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Position:</span>
                    <span className="text-sm">{selectedEmployee.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Department:</span>
                    <span className="text-sm">{selectedEmployee.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Manager:</span>
                    <span className="text-sm">{selectedEmployee.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Join Date:</span>
                    <span className="text-sm">{selectedEmployee.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Review:</span>
                    <span className="text-sm">{selectedEmployee.lastReview || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
                  <span className="text-sm">Employee Selected</span>
                  {formData.employeeId ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Review Period</span>
                  {formData.reviewPeriod ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ratings Provided</span>
                  {Object.keys(formData.ratings).length > 0 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feedback Written</span>
                  {formData.feedback ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                {isFormValid() ? (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mt-4">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Review is ready to submit!</span>
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

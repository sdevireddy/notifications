"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { Button } from "@/components/ui/button"
import BreadCrumb from "@/components/BreadCrumb"

// Mock data for development - will be replaced by API calls
const MOCK_DATA = {
  leaveAvailability: [
    { type: "Sick", count: 8, color: "text-yellow-500", total: 12 },
    { type: "Casual", count: 8, color: "text-cyan-500", total: 10 },
    { type: "Earned", count: 8, color: "text-indigo-500", total: 15 },
    { type: "Comp off", count: 8, color: "text-red-400", total: 10 },
    { type: "Annual", count: 8, color: "text-blue-400", total: 20 },
  ],
  leaveRequests: [
    {
      id: 1,
      name: "Jessica",
      type: "Sick Leave",
      start: "First Half",
      end: "First Half",
      status: "Pending",
      employeeId: "EMP001",
    },
    {
      id: 2,
      name: "Jenny",
      type: "Sick Leave",
      start: "15 July 2023",
      end: "15 July 2023",
      status: "Pending",
      employeeId: "EMP002",
    },
    {
      id: 3,
      name: "John",
      type: "Casual Leave",
      start: "15 July 2023",
      end: "18 July 2023",
      status: "Pending",
      employeeId: "EMP003",
    },
    {
      id: 4,
      name: "Jack",
      type: "Earned Leave",
      start: "20 July 2023",
      end: "23 July 2023",
      status: "Pending",
      employeeId: "EMP004",
    },
  ],
  teamLeaveStats: [
    { month: "Jan", leaves: 10 },
    { month: "Feb", leaves: 15 },
    { month: "Mar", leaves: 8 },
    { month: "Apr", leaves: 18 },
    { month: "May", leaves: 27 },
    { month: "Jun", leaves: 20 },
    { month: "Jul", leaves: 5 },
  ],
  calendarEvents: [
    { id: 1, title: "John - Sick Leave", start: "2023-07-15", color: "#fbbf24" },
    { id: 2, title: "Sarah - Annual Leave", start: "2023-07-20", end: "2023-07-25", color: "#3b82f6" },
    { id: 3, title: "Mike - Casual Leave", start: "2023-07-18", color: "#06b6d4" },
  ],
}

// API service functions
const apiService = {
  // Leave availability endpoints
  getLeaveAvailability: async () => {
    try {
      // const response = await fetch('/api/leave/availability')
      // return await response.json()

      // Mock API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return MOCK_DATA.leaveAvailability
    } catch (error) {
      console.error("Error fetching leave availability:", error)
      throw error
    }
  },

  // Leave requests endpoints
  getLeaveRequests: async () => {
    try {
      // const response = await fetch('/api/leave/requests')
      // return await response.json()

      await new Promise((resolve) => setTimeout(resolve, 800))
      return MOCK_DATA.leaveRequests
    } catch (error) {
      console.error("Error fetching leave requests:", error)
      throw error
    }
  },

  approveLeaveRequest: async (requestId) => {
    try {
      // const response = await fetch(`/api/leave/requests/${requestId}/approve`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // return await response.json()

      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, message: "Leave request approved" }
    } catch (error) {
      console.error("Error approving leave request:", error)
      throw error
    }
  },

  rejectLeaveRequest: async (requestId) => {
    try {
      // const response = await fetch(`/api/leave/requests/${requestId}/reject`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // return await response.json()

      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, message: "Leave request rejected" }
    } catch (error) {
      console.error("Error rejecting leave request:", error)
      throw error
    }
  },

  // Team statistics endpoints
  getTeamLeaveStats: async () => {
    try {
      // const response = await fetch('/api/leave/team-stats')
      // return await response.json()

      await new Promise((resolve) => setTimeout(resolve, 600))
      return MOCK_DATA.teamLeaveStats
    } catch (error) {
      console.error("Error fetching team leave stats:", error)
      throw error
    }
  },

  // Calendar events endpoints
  getCalendarEvents: async () => {
    try {
      // const response = await fetch('/api/leave/calendar-events')
      // return await response.json()

      await new Promise((resolve) => setTimeout(resolve, 700))
      return MOCK_DATA.calendarEvents
    } catch (error) {
      console.error("Error fetching calendar events:", error)
      throw error
    }
  },
}

export default function LeaveManagementPage() {
  const navigate = useNavigate()

  // State for all data
  const [leaveAvailability, setLeaveAvailability] = useState([])
  const [leaveData, setLeaveData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [calendarEvents, setCalendarEvents] = useState([])

  // API functions - Replace these with your actual API calls
  const fetchData = async () => {
    // TODO: Replace with actual API calls when backend is ready

    // Mock data - replace these with actual fetch calls
    const mockLeaveAvailability = [
      { type: "Sick", count: 8, color: "text-yellow-500" },
      { type: "Casual", count: 8, color: "text-cyan-500" },
      { type: "Earned", count: 8, color: "text-indigo-500" },
      { type: "Comp off", count: 8, color: "text-red-400" },
      { type: "Annual", count: 8, color: "text-blue-400" },
    ]

    const mockLeaveRequests = [
      { id: 1, name: "Jessica", type: "Sick Leave", start: "First Half", end: "First Half", status: "Pending" },
      { id: 2, name: "Jenny", type: "Sick Leave", start: "15 July 2023", end: "15 July 2023", status: "Pending" },
      { id: 3, name: "John", type: "Casual Leave", start: "15 July 2023", end: "18 July 2023", status: "Pending" },
      { id: 4, name: "Jack", type: "Earned Leave", start: "20 July 2023", end: "23 July 2023", status: "Pending" },
    ]

    const mockBarChartData = [
      { month: "Jan", leaves: 10 },
      { month: "Feb", leaves: 15 },
      { month: "Mar", leaves: 8 },
      { month: "Apr", leaves: 18 },
      { month: "May", leaves: 27 },
      { month: "Jun", leaves: 20 },
      { month: "Jul", leaves: 5 },
    ]

    const mockCalendarEvents = [
      { id: 1, title: "John - Sick Leave", start: "2023-07-15", color: "#fbbf24" },
      { id: 2, title: "Sarah - Annual Leave", start: "2023-07-20", end: "2023-07-25", color: "#3b82f6" },
      { id: 3, title: "Mike - Casual Leave", start: "2023-07-18", color: "#06b6d4" },
    ]

    // Set the data
    setLeaveAvailability(mockLeaveAvailability)
    setLeaveData(mockLeaveRequests)
    setBarChartData(mockBarChartData)
    setCalendarEvents(mockCalendarEvents)

    /* 
    // When backend is ready, replace above with:
    
    try {
      const [availability, requests, stats, events] = await Promise.all([
        fetch('/api/leave/availability').then(res => res.json()),
        fetch('/api/leave/requests').then(res => res.json()),
        fetch('/api/leave/team-stats').then(res => res.json()),
        fetch('/api/leave/calendar-events').then(res => res.json())
      ])
      
      setLeaveAvailability(availability)
      setLeaveData(requests)
      setBarChartData(stats)
      setCalendarEvents(events)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    */
  }

  // Load data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  const handleApplyLeave = () => {
    navigate("/hr/apply-leave")
  }

  const handleApprove = async (id, index) => {
    // TODO: Replace with actual API call
    // await fetch(`/api/leave/requests/${id}/approve`, { method: 'POST' })

    // Update local state
    setLeaveData((prev) => prev.map((entry, i) => (i === index ? { ...entry, status: "Approved" } : entry)))
  }

  const handleReject = async (id, index) => {
    // TODO: Replace with actual API call
    // await fetch(`/api/leave/requests/${id}/reject`, { method: 'POST' })

    // Update local state
    setLeaveData((prev) => prev.map((entry, i) => (i === index ? { ...entry, status: "Rejected" } : entry)))
  }

  return (
    <div className="flex-1 bg-white text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Leave Management</h1>
          <BreadCrumb currentPath={["HR", "Leave Management"]} />
        </div>
        <Button className="bg-primary text-white" onClick={handleApplyLeave}>
          Apply Leave
        </Button>
      </div>

      {/* Leave Availability Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-6 py-6">
        {leaveAvailability.map((item) => (
          <Card key={item.type} className="text-center">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Remaining</p>
              <h3 className={`text-xl font-bold ${item.color}`}>{item.count}</h3>
              <p className="text-md font-semibold text-gray-700 mt-1">{item.type}</p>
              {item.total && <p className="text-xs text-gray-400">of {item.total} total</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 mb-8">
        {/* Leave Approval Section */}
        <div className="bg-white rounded-lg border p-4 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Leave Approval</h3>
            {/* Loading indicator */}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500">
                <tr>
                  <th className="py-2">Name</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No leave requests found
                    </td>
                  </tr>
                ) : (
                  leaveData.map((entry, index) => (
                    <tr key={entry.id} className="border-t">
                      <td className="py-2">{entry.name}</td>
                      <td>{entry.type}</td>
                      <td>{entry.start}</td>
                      <td>{entry.end}</td>
                      <td>
                        <Badge
                          variant={
                            entry.status === "Approved"
                              ? "default"
                              : entry.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </td>
                      <td>
                        {entry.status === "Pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(entry.id, index)}
                              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 text-xs shadow-sm"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleReject(entry.id, index)}
                              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 text-xs shadow-sm"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Leave Track Section */}
        <div className="bg-white rounded-lg border p-4 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Team Leave Track</h3>
            {/* Loading indicator */}
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leaves" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leave Calendar Section */}
      <div className="bg-white rounded-lg border p-6 mx-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Leave Calendar</h3>
          {/* Loading indicator */}
        </div>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={500}
          events={calendarEvents}
          eventDisplay="block"
          dayMaxEvents={3}
        />
        <div className="flex flex-wrap justify-center text-sm text-gray-500 mt-4 gap-4">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
            Sick Leave
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 mr-1"></span>
            Casual Leave
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-indigo-400 mr-1"></span>
            Earned Leave
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-pink-300 mr-1"></span>
            Upcoming Holidays
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-300 mr-1"></span>
            Policy Specific
          </span>
        </div>
      </div>
    </div>
  )
}

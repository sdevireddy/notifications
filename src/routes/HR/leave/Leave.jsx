"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LeaveManagementPage() {
  const navigate = useNavigate()

  const [leaveAvailability, setLeaveAvailability] = useState([
    { type: "Sick", count: 8, color: "text-yellow-500" },
    { type: "Casual", count: 8, color: "text-cyan-500" },
    { type: "Earned", count: 8, color: "text-indigo-500" },
    { type: "Comp off", count: 8, color: "text-red-400" },
    { type: "Annual", count: 8, color: "text-blue-400" },
  ])

  const leaveData = [
    { name: "Jessica", type: "Sick Leave", start: "First Half", end: "First Half", status: "Pending" },
    { name: "Jenny", type: "Sick Leave", start: "15 July 2023", end: "15 July 2023", status: "Pending" },
    { name: "John", type: "Casual Leave", start: "15 July 2023", end: "18 July 2023", status: "Pending" },
    { name: "Jack", type: "Earned Leave", start: "20 July 2023", end: "23 July 2023", status: "Pending" },
  ]

  const barChartData = [
    { month: "Jan", leaves: 10 },
    { month: "Feb", leaves: 15 },
    { month: "Mar", leaves: 8 },
    { month: "Apr", leaves: 18 },
    { month: "May", leaves: 27 },
    { month: "Jun", leaves: 20 },
    { month: "Jul", leaves: 5 },
  ]

  const handleApplyLeave = () => {
    // Dummy leave application logic (for demonstration only)
    const leaveType = "Casual"; // In real case, this would come from form data

    setLeaveAvailability((prev) =>
      prev.map((leave) =>
        leave.type === leaveType && leave.count > 0
          ? { ...leave, count: leave.count - 1 }
          : leave
      )
    );

    navigate("/hr/apply-leave")
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leave Management System</h2>
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleApplyLeave}>
          Apply Leave
        </Button>
      </div>

      {/* Leave Availability */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {leaveAvailability.map((item) => (
          <Card key={item.type} className="text-center">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Remaining</p>
              <h3 className={`text-2xl font-bold ${item.color}`}>{item.count}</h3>
              <p className="text-md font-semibold text-gray-700 mt-1">{item.type}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave Approval and Team Leave Track side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leave Approval Table */}
        <div className="bg-white rounded-lg border p-4 w-full max-w-[600px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Leave Approval</h3>
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
              {leaveData.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{entry.name}</td>
                  <td>{entry.type}</td>
                  <td>{entry.start}</td>
                  <td>{entry.end}</td>
                  <td><Badge variant="outline">{entry.status}</Badge></td>
                  <td>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="success">✓</Button>
                      <Button size="sm" variant="destructive">✕</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Leave Track Chart */}
        <div className="bg-white rounded-lg border p-4 w-full">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Team Leave Track</h3>
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

      {/* Leave Calendar */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Leave Calendar</h3>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" height={500} events={[]} />
        <div className="flex flex-wrap justify-center text-sm text-gray-500 mt-4 gap-4">
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>Sick Leave</span>
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-cyan-400 mr-1"></span>Casual Leave</span>
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-indigo-400 mr-1"></span>Earned Leave</span>
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-pink-300 mr-1"></span>Upcoming Holidays</span>
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-300 mr-1"></span>Policy Specific</span>
        </div>
      </div>
    </div>
  )
}

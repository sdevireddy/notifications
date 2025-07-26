"use client";
import { useState } from "react";
import CountUp from "react-countup";
import {
  Users,
  CalendarCheck2,
  Plane,
  Cake,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Table from "../../components/Table";
import CountCard from "../../components/CountCard";

const statsData = [
  {
    label: "Total Employees",
    icon: <Users className="h-4 w-4 text-blue-500" />,
    value: 134,
    growth: "+4 this month",
  },
  {
    label: "Present Today",
    icon: <CalendarCheck2 className="h-4 w-4 text-green-500" />,
    value: 120,
    growth: "+3 since yesterday",
  },
  {
    label: "On Leave",
    icon: <Plane className="h-4 w-4 text-yellow-500" />,
    value: 8,
    growth: "-2 since yesterday",
  },
  {
    label: "Upcoming Birthdays",
    icon: <Cake className="h-4 w-4 text-pink-500" />,
    value: 5,
    growth: "this week",
  },
];

const attendanceChartData = [
  { month: "Jan", present: 110 },
  { month: "Feb", present: 114 },
  { month: "Mar", present: 108 },
  { month: "Apr", present: 120 },
  { month: "May", present: 122 },
  { month: "Jun", present: 119 },
];

const recentJoinees = [
  { name: "Anjali Rao", email: "anjali@company.com", department: "Marketing" },
  { name: "Rahul Singh", email: "rahul@company.com", department: "Engineering" },
  { name: "Neha Sharma", email: "neha@company.com", department: "HR" },
];

const leaveRequests = [
  { name: "Amit Verma", reason: "Medical", status: "Approved" },
  { name: "Sneha Das", reason: "Vacation", status: "Pending" },
  { name: "Vikram Patel", reason: "Personal", status: "Rejected" },
];

const HRDashboard = () => {
  const joineeColumns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      header: "Department",
      accessorKey: "department",
    },
  ];

  const leaveColumns = [
    {
      header: "Employee",
      accessorKey: "name",
    },
    {
      header: "Reason",
      accessorKey: "reason",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const color =
          status === "Approved"
            ? "text-green-600"
            : status === "Pending"
            ? "text-yellow-600"
            : "text-red-600";
        return <span className={`text-xs font-medium ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-xl font-bold">HR Dashboard</h1>
      </header>

      <main className="space-y-8 p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
              <CountCard stat={stat} key={index}/>
          ))}
        </div>

        {/* Attendance Chart */}
        <div className="rounded bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Monthly Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="present"
                stroke="#10b981"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Recent Joinees</h3>
            <Table columns={joineeColumns} data={recentJoinees} />
          </div>
          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Leave Requests</h3>
            <Table columns={leaveColumns} data={leaveRequests} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRDashboard;

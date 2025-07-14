"use client";
import { useState } from "react";
import {
  Send,
  BarChart2,
  MailOpen,
  MousePointerClick,
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

import CountCard from "../../components/CountCard";
import Table from "../../components/Table";

// === 1. Stats Data ===
const statsData = [
  {
    label: "Total Campaigns",
    icon: <BarChart2 className="h-4 w-4 text-blue-500" />,
    value: 76,
    growth: "+5 this month",
  },
  {
    label: "Emails Sent",
    icon: <Send className="h-4 w-4 text-green-500" />,
    value: 15230,
    growth: "+12% since last month",
  },
  {
    label: "Open Rate",
    icon: <MailOpen className="h-4 w-4 text-yellow-500" />,
    value: 42.5,
    growth: "Stable",
  },
  {
    label: "Click Rate",
    icon: <MousePointerClick className="h-4 w-4 text-purple-500" />,
    value: 17.8,
    growth: "+2.1%",
  },
];

// === 2. Chart Data ===
const dataMap = {
  "Emails Sent": [
    { month: "Jan", value: 3000 },
    { month: "Feb", value: 2800 },
    { month: "Mar", value: 3200 },
    { month: "Apr", value: 3100 },
    { month: "May", value: 3400 },
    { month: "Jun", value: 3730 },
  ],
  "Open Rate": [
    { month: "Jan", value: 38 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 43 },
    { month: "Apr", value: 41 },
    { month: "May", value: 44 },
    { month: "Jun", value: 42.5 },
  ],
  "Click Rate": [
    { month: "Jan", value: 14 },
    { month: "Feb", value: 15.5 },
    { month: "Mar", value: 17 },
    { month: "Apr", value: 16.3 },
    { month: "May", value: 18 },
    { month: "Jun", value: 17.8 },
  ],
};

const recentCampaigns = [
  {
    name: "Summer Sale 2025",
    date: "2025-06-01",
    sent: 5000,
    openRate: "45%",
    status: "Completed",
  },
  {
    name: "New Product Launch",
    date: "2025-06-15",
    sent: 4200,
    openRate: "39%",
    status: "Completed",
  },
  {
    name: "July Newsletter",
    date: "2025-07-01",
    sent: 4030,
    openRate: "42%",
    status: "Scheduled",
  },
];

const MarketingDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState("Emails Sent");

  const campaignColumns = [
    {
      header: "Campaign Name",
      accessorKey: "name",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Emails Sent",
      accessorKey: "sent",
    },
    {
      header: "Open Rate",
      accessorKey: "openRate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const color =
          status === "Completed"
            ? "text-green-600"
            : status === "Scheduled"
            ? "text-yellow-600"
            : "text-gray-600";
        return <span className={`text-xs font-medium ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold">Email Campaigns Dashboard</h1>
      </header>

      <main className="space-y-8 p-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <CountCard key={index} stat={stat} />
          ))}
        </div>

        {/* Chart */}
        <div className="rounded bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{selectedMetric} Overview</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="rounded border px-3 py-1 text-sm"
            >
              <option value="Emails Sent">Emails Sent</option>
              <option value="Open Rate">Open Rate</option>
              <option value="Click Rate">Click Rate</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataMap[selectedMetric]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Campaigns Table */}
        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold">Recent Campaigns</h3>
          <Table columns={campaignColumns} data={recentCampaigns} />
        </div>
      </main>
    </div>
  );
};

export default MarketingDashboard;

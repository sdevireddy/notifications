"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DollarSign, UserPlus, Users } from "lucide-react";
import Table from "../../components/Table";
import CountCard from "../../components/CountCard";

const statsData = [
  {
    label: "Total Leads",
    icon: <UserPlus className="h-4 w-4 text-blue-500" />,
    value: 1247,
    growth: "+12% from last month",
  },
  {
    label: "Total Customers",
    icon: <Users className="h-4 w-4 text-green-500" />,
    value: 892,
    growth: "+8% from last month",
  },
  {
    label: "Total Deals",
    icon: <DollarSign className="h-4 w-4 text-purple-500" />,
    value: 156,
    growth: "+23% from last month",
  },
  {
    label: "Deal Value",
    icon: <DollarSign className="h-4 w-4 text-orange-500" />,
    value: 2400000,
    isCurrency: true,
    growth: "+18% from last month",
  },
];

const dataMap = {
  Leads: [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 190 },
    { month: "Mar", value: 170 },
    { month: "Apr", value: 220 },
    { month: "May", value: 260 },
    { month: "Jun", value: 300 },
  ],
  Deals: [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 110 },
    { month: "Mar", value: 140 },
    { month: "Apr", value: 200 },
    { month: "May", value: 160 },
    { month: "Jun", value: 240 },
  ],
  Customers: [
    { month: "Jan", value: 60 },
    { month: "Feb", value: 90 },
    { month: "Mar", value: 100 },
    { month: "Apr", value: 130 },
    { month: "May", value: 180 },
    { month: "Jun", value: 210 },
  ],
};

const leadData = [
  { name: "Sarah Johnson", email: "sarah@example.com", source: "Website", status: "Qualified" },
  { name: "Mike Chen", email: "mike@techco.com", source: "LinkedIn", status: "New" },
  { name: "Emily Davis", email: "emily@startup.io", source: "Referral", status: "Contacted" },
  { name: "David Wilson", email: "david@corp.com", source: "Cold Email", status: "Unqualified" },
];

const customerData = [
  { name: "Acme Corporation", email: "john@acme.com", value: 125000, status: "Active" },
  { name: "TechStart Inc", email: "ceo@techstart.com", value: 89500, status: "Active" },
  { name: "Global Systems", email: "admin@global.com", value: 156200, status: "Pending" },
  { name: "Creative Agency", email: "hello@creative.co", value: 42800, status: "Active" },
];

const dealData = [
  { deal: "Enterprise Software", client: "Acme Corp", value: 45000, status: "Closed Won" },
  { deal: "Marketing Campaign", client: "TechStart Inc", value: 28500, status: "In Progress" },
];

export default function CRMDashboard() {
  const [selected, setSelected] = useState("Leads");
  const [timeRange, setTimeRange] = useState("last_6_months");

  const leadColumns = [
    {
      header: "Lead",
      accessorKey: "name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    { header: "Source", accessorKey: "source" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const colors = {
          Qualified: "text-green-600",
          New: "text-yellow-600",
          Contacted: "text-blue-600",
          Unqualified: "text-gray-600",
        };
        return <span className={`text-xs font-medium ${colors[status] || ""}`}>{status}</span>;
      },
    },
  ];

  const customerColumns = [
    {
      header: "Customer",
      accessorKey: "name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ getValue }) => `$${getValue()}`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const colors = {
          Active: "text-green-600",
          Pending: "text-yellow-600",
        };
        return <span className={`text-xs font-medium ${colors[status] || ""}`}>{status}</span>;
      },
    },
  ];

  const dealColumns = [
    {
      header: "Deal",
      accessorKey: "deal",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.deal}</div>
          <div className="text-xs text-gray-500">{row.original.client}</div>
        </div>
      ),
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ getValue }) => `$${getValue()}`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        const color =
          status === "Closed Won"
            ? "text-green-600"
            : status === "In Progress"
            ? "text-yellow-600"
            : "text-gray-600";
        return <span className={`text-xs font-medium ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between border-b bg-white px-6 py-2">

        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <main className="space-y-8 p-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <CountCard key={index} stat={stat} />
          ))}
        </div>

        {/* Chart Section */}
        <div className="rounded bg-white p-6 shadow">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold">{selected} Overview</h2>
            <div className="flex gap-2">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="rounded border px-3 py-1 text-sm"
              >
                <option value="Leads">Leads</option>
                <option value="Deals">Deals</option>
                <option value="Customers">Customers</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="rounded border px-3 py-1 text-sm"
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_month">Last Month</option>
                <option value="last_6_months">Last 6 Months</option>
                <option value="last_year">Last Year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Line Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataMap[selected]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataMap[selected]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Recent Deals</h3>
            <Table columns={dealColumns} data={dealData} />
          </div>
          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Recent Customers</h3>
            <Table columns={customerColumns} data={customerData} />
          </div>
          <div className="rounded bg-white p-4 shadow md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Recent Leads</h3>
            <Table columns={leadColumns} data={leadData} />
          </div>
        </div>
      </main>
    </div>
  );
}

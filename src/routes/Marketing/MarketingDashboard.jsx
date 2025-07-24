// app/dashboard/marketing/page.tsx
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
import { DollarSign, Mail, MessageSquareText, ThumbsUp } from "lucide-react";
import Table from "../../components/Table";
import CountCard from "../../components/CountCard";

const marketingChannels = ["Email", "SMS", "Social Media"];

const dataMap = {
  Email: [
    { month: "Jan", value: 300 },
    { month: "Feb", value: 420 },
    { month: "Mar", value: 380 },
    { month: "Apr", value: 450 },
    { month: "May", value: 500 },
    { month: "Jun", value: 650 },
  ],
  SMS: [
    { month: "Jan", value: 150 },
    { month: "Feb", value: 230 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 280 },
    { month: "May", value: 310 },
    { month: "Jun", value: 370 },
  ],
  "Social Media": [
    { month: "Jan", value: 500 },
    { month: "Feb", value: 550 },
    { month: "Mar", value: 600 },
    { month: "Apr", value: 750 },
    { month: "May", value: 900 },
    { month: "Jun", value: 1200 },
  ],
};

const statsByChannel = {
  Email: [
    {
      label: "Emails Sent",
      icon: <Mail className="h-4 w-4 text-blue-500" />,
      value: 2045,
      growth: "+14% from last month",
    },
    {
      label: "Open Rate",
      icon: <Mail className="h-4 w-4 text-green-500" />,
      value: "34%",
      growth: "+2% from last month",
    },
    {
      label: "Click Rate",
      icon: <Mail className="h-4 w-4 text-purple-500" />,
      value: "12%",
      growth: "+1.5% from last month",
    },
    {
      label: "Unsubscribed",
      icon: <Mail className="h-4 w-4 text-red-500" />,
      value: 34,
      growth: "-5% from last month",
    },
  ],
  SMS: [
    {
      label: "SMS Sent",
      icon: <MessageSquareText className="h-4 w-4 text-blue-500" />,
      value: 1340,
      growth: "+18% from last month",
    },
    {
      label: "Delivery Rate",
      icon: <MessageSquareText className="h-4 w-4 text-green-500" />,
      value: "98%",
      growth: "+1% from last month",
    },
    {
      label: "Click Rate",
      icon: <MessageSquareText className="h-4 w-4 text-purple-500" />,
      value: "9%",
      growth: "+0.5% from last month",
    },
    {
      label: "Replies",
      icon: <MessageSquareText className="h-4 w-4 text-orange-500" />,
      value: 89,
      growth: "+10% from last month",
    },
  ],
  "Social Media": [
    {
      label: "Posts",
      icon: <ThumbsUp className="h-4 w-4 text-blue-500" />,
      value: 98,
      growth: "+6% from last month",
    },
    {
      label: "Engagement",
      icon: <ThumbsUp className="h-4 w-4 text-green-500" />,
      value: "7.8k",
      growth: "+12% from last month",
    },
    {
      label: "Followers",
      icon: <ThumbsUp className="h-4 w-4 text-purple-500" />,
      value: 15400,
      growth: "+5% from last month",
    },
    {
      label: "Mentions",
      icon: <ThumbsUp className="h-4 w-4 text-orange-500" />,
      value: 230,
      growth: "+9% from last month",
    },
  ],
};

// Dummy data examples for tables (customize as needed)
const emailTableData = [
  { campaign: "Welcome Series", sent: 620, open: "40%", click: "16%" },
  { campaign: "Product Update", sent: 480, open: "26%", click: "10%" },
];

const smsTableData = [
  { campaign: "Flash Sale", sent: 300, delivery: "99%", clicks: "12%" },
  { campaign: "Promo Alert", sent: 250, delivery: "97%", clicks: "9%" },
];

const socialTableData = [
  { platform: "Instagram", posts: 32, eng: "2.1k", reach: "14k" },
  { platform: "Twitter", posts: 28, eng: "1.5k", reach: "11.5k" },
];

// Columns for tables
const emailColumns = [
  { header: "Campaign", accessorKey: "campaign" },
  { header: "Sent", accessorKey: "sent" },
  { header: "Open Rate", accessorKey: "open" },
  { header: "Click Rate", accessorKey: "click" },
];

const smsColumns = [
  { header: "Campaign", accessorKey: "campaign" },
  { header: "Sent", accessorKey: "sent" },
  { header: "Delivery", accessorKey: "delivery" },
  { header: "Clicks", accessorKey: "clicks" },
];

const socialColumns = [
  { header: "Platform", accessorKey: "platform" },
  { header: "Posts", accessorKey: "posts" },
  { header: "Engagement", accessorKey: "eng" },
  { header: "Reach", accessorKey: "reach" },
];

export default function MarketingDashboard() {
  const [selected, setSelected] = useState("Email");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <h1 className="text-xl font-bold">Marketing Dashboard</h1>
      </header>

      <main className="space-y-8 p-6">
        {/* Channel Selector */}
        <div className="flex space-x-4">
          {marketingChannels.map((channel) => (
            <button
              key={channel}
              className={`px-4 py-2 rounded ${
                selected === channel
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-800"
              } text-sm font-medium shadow-sm`}
              onClick={() => setSelected(channel)}
            >
              {channel}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsByChannel[selected].map((stat, index) => (
            <CountCard key={index} stat={stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="rounded bg-white p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">{selected} Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataMap[selected]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataMap[selected]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#818cf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="rounded bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">{selected} Campaigns</h3>
          {selected === "Email" && <Table columns={emailColumns} data={emailTableData} />}
          {selected === "SMS" && <Table columns={smsColumns} data={smsTableData} />}
          {selected === "Social Media" && (
            <Table columns={socialColumns} data={socialTableData} />
          )}
        </div>
      </main>
    </div>
  );
}

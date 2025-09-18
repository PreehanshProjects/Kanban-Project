"use client";

import React from "react";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  TruckIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MainLayout from "../components/layout/MainLayout";

// ShadCN chart helpers
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// Recharts components
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const currentUserRole: "SuperAdmin" | "Admin" | "Doyanier" | "Client" =
    "Admin";

  // Dummy bar chart data
  const deliveryData = [
    { day: "Mon", delivered: 12, pending: 5 },
    { day: "Tue", delivered: 19, pending: 3 },
    { day: "Wed", delivered: 9, pending: 6 },
    { day: "Thu", delivered: 17, pending: 4 },
    { day: "Fri", delivered: 14, pending: 7 },
    { day: "Sat", delivered: 20, pending: 2 },
    { day: "Sun", delivered: 15, pending: 5 },
  ];

  const stockData = [
    { category: "Electronics", value: 240 },
    { category: "Furniture", value: 120 },
    { category: "Consumables", value: 80 },
  ];

  const deliveryConfig: ChartConfig = {
    delivered: { label: "Delivered", color: "#3b82f6" },
    pending: { label: "Pending", color: "#facc15" },
  };

  const stockConfig: ChartConfig = {
    Electronics: { label: "Electronics", color: "#6366f1" },
    Furniture: { label: "Furniture", color: "#10b981" },
    Consumables: { label: "Consumables", color: "#f59e0b" },
  };

  // Dummy line chart data
  const visitorsData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const visitorsConfig: ChartConfig = {
    desktop: { label: "Desktop", color: "#3b82f6" },
    mobile: { label: "Mobile", color: "#facc15" },
  };

  return (
    <MainLayout currentUserRole={currentUserRole}>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
          <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
            New Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center gap-2">
              <HomeIcon className="w-6 h-6 text-blue-500" />
              <CardTitle>Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="text-gray-500 text-sm mt-1">Active Projects</div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-green-500" />
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <div className="text-gray-500 text-sm mt-1">Total Users</div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="flex items-center gap-2">
              <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-500" />
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <div className="text-gray-500 text-sm mt-1">Pending Orders</div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="flex items-center gap-2">
              <CubeIcon className="w-6 h-6 text-purple-500" />
              <CardTitle>Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">240</div>
              <div className="text-gray-500 text-sm mt-1">Items in Stock</div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Delivery Chart */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Weekly Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={deliveryConfig}
                className="min-h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={deliveryData}
                    margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent labelKey="day" />} />
                    <Legend />
                    <Bar
                      dataKey="delivered"
                      fill={deliveryConfig.delivered.color}
                      radius={4}
                    />
                    <Bar
                      dataKey="pending"
                      fill={deliveryConfig.pending.color}
                      radius={4}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Stock Chart */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Stock Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={stockConfig}
                className="min-h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={stockData}
                    margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="category"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {stockData.map((item) => (
                      <Bar
                        key={item.category}
                        dataKey="value"
                        name={item.category}
                        fill={stockConfig[item.category].color}
                        radius={4}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Line Chart */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Visitors Overview</CardTitle>
              <p className="text-sm text-gray-500">January - June 2024</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={visitorsConfig}
                className="min-h-[250px] w-full"
              >
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={visitorsData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke={visitorsConfig.desktop.color}
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="mobile"
                      type="monotone"
                      stroke={visitorsConfig.mobile.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Project Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Project Alpha", value: 70 },
                { name: "Project Beta", value: 45 },
                { name: "Project Gamma", value: 90 },
              ].map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{p.name}</span>
                    <span>{p.value}%</span>
                  </div>
                  <Progress value={p.value} className="h-2 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                <TruckIcon className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Delivery</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                <CubeIcon className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium">Stock</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition">
                <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-600 mb-2" />
                <span className="text-sm font-medium">Orders</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                <Cog6ToothIcon className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

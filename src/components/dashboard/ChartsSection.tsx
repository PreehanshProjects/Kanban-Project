"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

interface DeliveryData {
  day: string;
  delivered: number;
  pending: number;
}

interface StockData {
  category: "Electronics" | "Furniture" | "Consumables";
  value: number;
}

interface VisitorsData {
  month: string;
  desktop: number;
  mobile: number;
}

interface ChartConfig {
  [key: string]: { label: string; color: string };
}

export default function ChartsSection() {
  // Delivery Bar Chart
  const deliveryData: DeliveryData[] = [
    { day: "Mon", delivered: 12, pending: 5 },
    { day: "Tue", delivered: 19, pending: 3 },
    { day: "Wed", delivered: 9, pending: 6 },
    { day: "Thu", delivered: 17, pending: 4 },
    { day: "Fri", delivered: 14, pending: 7 },
    { day: "Sat", delivered: 20, pending: 2 },
    { day: "Sun", delivered: 15, pending: 5 },
  ];

  const deliveryConfig: ChartConfig = {
    delivered: { label: "Delivered", color: "#3b82f6" },
    pending: { label: "Pending", color: "#facc15" },
  };

  // Stock Bar Chart
  const stockData: StockData[] = [
    { category: "Electronics", value: 240 },
    { category: "Furniture", value: 120 },
    { category: "Consumables", value: 80 },
  ];

  const stockConfig: ChartConfig = {
    Electronics: { label: "Electronics", color: "#6366f1" },
    Furniture: { label: "Furniture", color: "#10b981" },
    Consumables: { label: "Consumables", color: "#f59e0b" },
  };

  // Visitors Line Chart
  const visitorsData: VisitorsData[] = [
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
          <ChartContainer config={stockConfig} className="min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={stockData}
                margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} />
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

      {/* Visitors Line Chart */}
      <Card className="border border-gray-200 lg:col-span-2">
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
              <LineChart data={visitorsData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v) => v.slice(0, 3)}
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
  );
}

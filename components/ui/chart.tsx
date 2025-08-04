"use client"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartHeader,
  ChartTitle,
  ChartDescription,
  ChartContent,
} from "@/components/ui/chart"

const data = [
  {
    average: 400,
    today: 240,
    name: "00:00",
  },
  {
    average: 300,
    today: 139,
    name: "03:00",
  },
  {
    average: 200,
    today: 980,
    name: "06:00",
  },
  {
    average: 278,
    today: 390,
    name: "09:00",
  },
  {
    average: 189,
    today: 480,
    name: "12:00",
  },
  {
    average: 239,
    today: 380,
    name: "15:00",
  },
  {
    average: 349,
    today: 430,
    name: "18:00",
  },
  {
    average: 200,
    today: 240,
    name: "21:00",
  },
  {
    average: 278,
    today: 139,
    name: "24:00",
  },
]

export function Chart() {
  return (
    <ChartContainer>
      <ChartConfig>
        <ChartHeader>
          <ChartTitle>Calories Burned</ChartTitle>
          <ChartDescription>You burned 300 more calories than yesterday.</ChartDescription>
        </ChartHeader>
      </ChartConfig>
      <ChartContent className="p-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" strokeDasharray="3 3" dataKey="average" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="today" stroke="#82ca9d" activeDot={{ r: 8 }} />
              <ChartLegend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContent>
    </ChartContainer>
  )
}

export {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartHeader,
  ChartTitle,
  ChartDescription,
  ChartContent,
}

"use client"

import * as React from "react"
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

import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[]
  type: "line" | "bar" | "pie"
  dataKeys: { name: string; color: string }[]
  xAxisKey?: string
  yAxisKey?: string
  width?: string | number
  height?: string | number
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, data, type, dataKeys, xAxisKey, yAxisKey, width = "100%", height = 300, ...props }, ref) => {
    const ChartComponent = type === "line" ? LineChart : type === "bar" ? BarChart : PieChart
    const DataComponent = type === "line" ? Line : Bar

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width={width} height={height}>
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {xAxisKey && <XAxis dataKey={xAxisKey} />}
            {yAxisKey && <YAxis dataKey={yAxisKey} />}
            <Tooltip />
            <Legend />
            {dataKeys.map((key) =>
              type === "pie" ? (
                <Pie key={key.name} dataKey={key.name} nameKey="name" fill={key.color} outerRadius={80} label />
              ) : (
                <DataComponent
                  key={key.name}
                  type={type === "line" ? "monotone" : undefined}
                  dataKey={key.name}
                  stroke={key.color}
                  fill={key.color}
                />
              ),
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    )
  },
)
Chart.displayName = "Chart"

export { Chart }

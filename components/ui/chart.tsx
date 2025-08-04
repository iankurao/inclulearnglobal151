"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

import { type ChartConfig, ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  config: ChartConfig
  type?: "line" | "bar" | "area"
  className?: string
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ data, config, type = "line", className, ...props }, ref) => {
    const ChartComponent = type === "line" ? LineChart : type === "bar" ? BarChart : AreaChart
    const ChartElement = type === "line" ? Line : type === "bar" ? Bar : Area

    return (
      <ChartContainer config={config} className={className} ref={ref} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={Object.keys(config)[0]}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            {Object.entries(config).map(([key, item]) => {
              if (key === Object.keys(config)[0]) return null
              return <ChartElement key={key} dataKey={key} stroke={item.color} fill={item.color} type="monotone" />
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </ChartContainer>
    )
  },
)

Chart.displayName = "Chart"

export { Chart }
export type { ChartConfig }

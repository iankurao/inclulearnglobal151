"use client"
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
} from "recharts"
import React from "react"
import {
  ChartContainer as RechartsChartContainer,
  type ChartContainerProps as RechartsChartContainerProps,
} from "@tremor/react"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Define the props for the Chart component
interface ChartProps {
  data: any[]
  chartType: "line" | "bar" | "area"
  config: ChartConfig
  title?: string
  description?: string
  className?: string
}

const ChartContainer = React.forwardRef<HTMLDivElement, RechartsChartContainerProps>(({ className, ...props }, ref) => (
  <RechartsChartContainer
    ref={ref}
    className={cn("flex aspect-video items-center justify-center", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const Chart = ({ data, chartType, config, title, description, className }: ChartProps) => {
  const ChartComponent = chartType === "line" ? LineChart : chartType === "bar" ? BarChart : AreaChart
  const DataComponent = chartType === "line" ? Line : chartType === "bar" ? Bar : Area

  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {Object.entries(config).map(([key, item]) => {
                if (item.type === chartType) {
                  return (
                    <DataComponent
                      key={key}
                      dataKey={key}
                      type="monotone"
                      stroke={item.color}
                      fill={item.color}
                      dot={false}
                    />
                  )
                }
                return null
              })}
            </ChartComponent>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { Chart, ChartContainer }

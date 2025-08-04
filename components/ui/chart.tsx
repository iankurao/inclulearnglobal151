"use client"

import * as React from "react"
import { Label } from "@tremor/react"
import { ChartContainer as RechartsChartContainer } from "@tremor/react/dist/lib/ChartFrame"

import { cn } from "@/lib/utils"

// Workaround for missing `ChartConfig` type in @tremor/react
type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
    icon?: React.ElementType
  }
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }

  return context
}

type ChartProps = React.ComponentProps<typeof RechartsChartContainer> & {
  config: ChartConfig
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ config, className, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <RechartsChartContainer ref={ref} className={cn("flex aspect-video w-full", className)} {...props}>
        {children}
      </RechartsChartContainer>
    </ChartContext.Provider>
  )
})
Chart.displayName = "Chart"

const ChartTooltip = ({
  className,
  ...props
}: React.ComponentProps<typeof RechartsChartContainer>["customTooltip"]) => {
  const chartConfig = useChart().config

  const CustomTooltip = React.useCallback(
    ({ active, payload, label }: any) => {
      if (active && payload?.length) {
        return (
          <div
            className={cn(
              "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
              className,
            )}
            {...props}
          >
            {label ? <div className="text-muted-foreground">{label}</div> : null}
            <div className="grid gap-1">
              {payload.map((item: any) => {
                const { color } = chartConfig[item.dataKey]

                return (
                  <div
                    key={item.dataKey}
                    className={cn(
                      "flex items-center justify-between gap-4",
                      color ? `text-${color}` : ""
                    )}
                  >
                    {chartConfig[item.dataKey]?.icon ? (\
                      <chartConfig[item.dataKey].icon className="h-3 w-3" />
                    ) : (
                      <span
                        className="flex h-2 w-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />
                    )}
                    <span>{chartConfig[item.dataKey]?.label}</span>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }

      return null
    },
    [className, chartConfig],
  )

  return <CustomTooltip />
}

const ChartLegend = ({ className, ...props }: React.ComponentProps<typeof RechartsChartContainer>["customLegend"]) => {
  const chartConfig = useChart().config

  const CustomLegend = React.useCallback(
    ({ payload }: any) => {
      if (payload?.length) {
        return (
          <div className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
            {payload.map((item: any) => {
              const { color } = chartConfig[item.dataKey]
              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "flex items-center gap-1.5",
                    color ? `text-${color}` : ""
                  )}
                >
                  {chartConfig[item.dataKey]?.icon ? (\
                    <chartConfig[item.dataKey].icon className="h-3 w-3" />
                  ) : (
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                  )}
                  <Label>{chartConfig[item.dataKey]?.label}</Label>
                </div>
              )
            })}
          </div>
        )
      }
      return null
    },
    [className, chartConfig],
  )

  return <CustomLegend />
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideIcon?: boolean
  }
>(({ className, hideIcon = false, ...props }, ref) => {
  const chartConfig = useChart().config

  return (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
      {Object.entries(chartConfig).map(([key, item]) => (
        <div key={key} className={cn("flex items-center gap-1.5", item.color ? `text-${item.color}` : "")}>
          {!hideIcon ? (
            item.icon ? (
              <item.icon className="h-3 w-3" />
            ) : (
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: `hsl(var(--chart-${key}))`,
                }}
              />
            )
          ) : null}
          <Label>{item.label}</Label>
        </div>
      ))}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideIcon?: boolean
    valueFormatter?: (value: number) => string
  }
>(({ className, hideIcon = false, valueFormatter, ...props }, ref) => {
  const chartConfig = useChart().config

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground">
        <Label>{props.label}</Label>
      </div>
      <div className="grid gap-1">
        {props.payload?.map((item: any) => {
          const { color } = chartConfig[item.dataKey]

          return (
            <div
              key={item.dataKey}
              className={cn(
                "flex items-center justify-between gap-4",
                color ? `text-${color}` : ""
              )}
            >
              {!hideIcon ? (
                chartConfig[item.dataKey]?.icon ? (\
                  <chartConfig[item.dataKey].icon className="h-3 w-3" />
                ) : (
                  <span
                    className="flex h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )\
              ) : null}
              <span>{chartConfig[item.dataKey]?.label}</span>
              {item.value && (
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {valueFormatter
                    ? valueFormatter(item.value)
                    : item.value.toLocaleString()}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { Chart, ChartTooltip, ChartLegend, ChartLegendContent, ChartTooltipContent }

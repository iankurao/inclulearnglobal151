"use client"

import * as React from "react"
import { Label, type LabelProps } from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  type ChartConfig,
  ChartContainer as RechartsChartContainer,
  ChartTooltip as RechartsChartTooltip,
  ChartTooltipContent as RechartsChartTooltipContent,
} from "@tremor/react"

import { cn } from "@/app/lib/utils"

const ChartContext = React.createContext<ChartConfig | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsChartContainer> & {
    config: ChartConfig
  }
>(({ config, className, children, ...props }, ref) => (
  <ChartContext.Provider value={config}>
    <RechartsChartContainer
      ref={ref}
      className={cn("flex h-[300px] w-full items-center justify-center overflow-hidden", className)}
      {...props}
    >
      {children}
    </RechartsChartContainer>
  </ChartContext.Provider>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsChartTooltip> & {
    hideIndicator?: boolean
    indicatorOnly?: boolean
    className?: string
  }
>(({ hideIndicator = false, indicatorOnly = false, ...props }, ref) => (
  <RechartsChartTooltip ref={ref} hideIndicator={hideIndicator} indicatorOnly={indicatorOnly} {...props} />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsChartTooltipContent> & {
    hideIndicator?: boolean
    indicatorOnly?: boolean
    className?: string
  }
>(({ hideIndicator = false, indicatorOnly = false, className, ...props }, ref) => (
  <RechartsChartTooltipContent
    ref={ref}
    hideIndicator={hideIndicator}
    indicatorOnly={indicatorOnly}
    className={cn("rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsChartTooltip> & {
    hideIndicator?: boolean
    indicatorOnly?: boolean
    className?: string
  }
>(({ hideIndicator = false, indicatorOnly = false, ...props }, ref) => (
  <RechartsChartTooltip ref={ref} hideIndicator={hideIndicator} indicatorOnly={indicatorOnly} {...props} />
))
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsChartTooltipContent> & {
    hideIndicator?: boolean
    indicatorOnly?: boolean
    className?: string
  }
>(({ hideIndicator = false, indicatorOnly = false, className, ...props }, ref) => (
  <RechartsChartTooltipContent
    ref={ref}
    hideIndicator={hideIndicator}
    indicatorOnly={indicatorOnly}
    className={cn("rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}
    {...props}
  />
))
ChartLegendContent.displayName = "ChartLegendContent"

const ChartLabel = React.forwardRef<
  HTMLLabelElement,
  LabelProps & {
    asChild?: boolean
  }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : Label
  return <Comp ref={ref} className={cn("text-sm font-medium text-muted-foreground", className)} {...props} />
})
ChartLabel.displayName = "ChartLabel"

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartLabel, useChart }

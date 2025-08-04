"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"
import { ResizablePanel, ResizablePanelGroup } from "@/app/components/ui/resizable"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  defaultSize?: number
  minSize?: number
  maxSize?: number
  collapsedSize?: number
  collapsible?: boolean
  onCollapse?: (collapsed: boolean) => void
  className?: string
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      defaultSize = 20,
      minSize = 15,
      maxSize = 25,
      collapsedSize = 0,
      collapsible = false,
      onCollapse,
      className,
      ...props
    },
    ref,
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    const handleCollapse = (collapsed: boolean) => {
      setIsCollapsed(collapsed)
      onCollapse?.(collapsed)
    }

    return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className="h-full max-w-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultSize}
          minSize={minSize}
          maxSize={maxSize}
          collapsedSize={collapsedSize}
          collapsible={collapsible}
          onCollapse={handleCollapse}
          className={cn(
            "flex flex-col transition-all duration-300 ease-in-out",
            className,
            isCollapsed && "min-w-[50px]",
          )}
          ref={ref}
          {...props}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  },
)

Sidebar.displayName = "Sidebar"

export { Sidebar }

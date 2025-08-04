import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex h-full flex-col border-r bg-background p-4", className)} {...props}>
    {children}
  </div>
))
Sidebar.displayName = "Sidebar"

export { Sidebar }

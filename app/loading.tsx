import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-8 w-96" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-48 w-48" />
          <Skeleton className="h-48 w-48" />
          <Skeleton className="h-48 w-48" />
        </div>
      </div>
    </div>
  )
}

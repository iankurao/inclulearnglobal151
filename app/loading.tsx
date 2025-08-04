import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="ml-4 text-lg text-gray-600">Loading...</p>
    </div>
  )
}

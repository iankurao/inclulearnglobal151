import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-100">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="px-6 py-3 text-lg">Go to Homepage</Button>
      </Link>
    </div>
  )
}

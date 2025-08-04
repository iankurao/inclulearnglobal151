import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Page Not Found</p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="mt-6">Go to Homepage</Button>
      </Link>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-2xl font-medium mt-4 mb-6">Page Not Found</p>
      <p className="text-lg text-center max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/">
        <Button className="mt-8 px-6 py-3 text-lg">Go to Homepage</Button>
      </Link>
    </div>
  )
}

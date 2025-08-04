import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist or has been moved.</p>
      <Link href="/">
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  )
}

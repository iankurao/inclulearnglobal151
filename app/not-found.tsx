import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link href="/" passHref>
        <Button className="px-6 py-3 text-lg">Go to Homepage</Button>
      </Link>
    </div>
  )
}

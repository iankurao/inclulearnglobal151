import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center dark:bg-gray-950">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="mt-4 text-2xl font-medium text-foreground">Page Not Found</p>
      <p className="mt-2 text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
      <Button asChild className="mt-6">
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  )
}

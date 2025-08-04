import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  )
}

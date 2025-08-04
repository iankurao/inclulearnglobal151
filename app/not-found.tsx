import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl">404</h1>
        <p className="text-lg text-muted-foreground md:text-xl">Oops! The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

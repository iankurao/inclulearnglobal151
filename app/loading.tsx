export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
  )
}

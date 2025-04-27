export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-neon-purple"></div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}

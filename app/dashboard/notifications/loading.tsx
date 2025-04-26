import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 bg-white/5 mb-2" />
        <Skeleton className="h-5 w-96 bg-white/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-12 w-full bg-white/5 mb-6" />
          <Skeleton className="h-[400px] w-full bg-white/5" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-[250px] w-full bg-white/5" />
          <Skeleton className="h-[200px] w-full bg-white/5" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function VerificationSettingsLoading() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-10 w-64 bg-white/5" />
          <Skeleton className="h-5 w-96 mt-2 bg-white/5" />
        </div>
        <Skeleton className="h-10 w-32 bg-white/5" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-12 w-full bg-white/5" />

        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full bg-white/5" />
          <Skeleton className="h-[300px] w-full bg-white/5" />
        </div>
      </div>
    </div>
  )
}

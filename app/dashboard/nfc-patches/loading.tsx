import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-10 w-64 mb-8" />
      <Skeleton className="h-[600px] w-full max-w-4xl mx-auto" />
    </div>
  )
}

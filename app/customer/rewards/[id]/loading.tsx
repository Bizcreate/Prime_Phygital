import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RewardDetailLoading() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4">
        <div className="h-8 w-16 bg-muted rounded animate-pulse" />
        <div>
          <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Image Skeleton */}
        <Card>
          <CardContent className="p-0">
            <div className="w-full h-64 bg-muted rounded-lg animate-pulse" />
          </CardContent>
        </Card>

        {/* Details Skeleton */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-10 w-full bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

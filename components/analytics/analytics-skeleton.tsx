import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function ChartCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="px-4 py-3 pb-1 gap-1">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-40" />
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        <Skeleton className="h-[120px] w-full rounded-md" />
      </CardContent>
    </Card>
  )
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-3">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="px-4 py-2.5 space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row 1: Revenue (wide) + Status donut */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">
        <ChartCardSkeleton className="lg:col-span-4" />
        <ChartCardSkeleton className="lg:col-span-2" />
      </div>

      {/* Charts row 2: Tasks + Workload + Client breakdown */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="px-4 py-3 pb-1">
          <Skeleton className="h-3.5 w-40" />
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-border px-4 py-2 last:border-0">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-1 flex-1 rounded-full" />
                <Skeleton className="h-3.5 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

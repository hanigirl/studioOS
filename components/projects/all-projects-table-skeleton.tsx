import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading placeholder for <AllProjectsTable>. Mirrors the card's shape —
 * header, filter row, and a set of rows — so the layout doesn't jump when the
 * real data arrives.
 */
export function AllProjectsTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-52" />
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {/* Filter row: tabs + search */}
        <div className="flex items-center justify-between gap-2 px-6">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-9 w-56 rounded-md" />
        </div>

        {/* Rows */}
        <div className="px-6">
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-border py-4 last:border-b-0"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex w-36 items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-2 w-24 rounded-full" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="size-7 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

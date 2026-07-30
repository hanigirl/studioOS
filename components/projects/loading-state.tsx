import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-xl border border-border p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md" />
            </div>
            <Skeleton className="size-6 shrink-0 rounded-md" />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <Skeleton className="size-6 rounded-full ring-2 ring-background" />
              <Skeleton className="size-6 rounded-full ring-2 ring-background" />
            </div>
            <Skeleton className="h-4 w-12 rounded-md" />
          </div>

          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-4 w-14 rounded-md" />
        </div>
      ))}
    </div>
  )
}

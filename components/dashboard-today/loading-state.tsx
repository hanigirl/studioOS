import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-56 w-full rounded-xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((col) => (
          <div key={col} className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-3 w-4 rounded-md" />
            </div>
            <Skeleton className="h-[5.25rem] w-full rounded-lg" />
            <Skeleton className="h-[5.25rem] w-full rounded-lg" />
            <Skeleton className="h-[5.25rem] w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

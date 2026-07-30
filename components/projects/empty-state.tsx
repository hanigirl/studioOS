import { FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState({
  status,
  query,
  onClear,
}: {
  status: string
  query?: string
  onClear?: () => void
}) {
  const heading = query ? `No results for "${query}"` : `No ${status} projects`
  const description = query
    ? status === "matching"
      ? "Try a different project or client name."
      : `No ${status} projects match this search.`
    : "There are no projects with this status right now."

  return (
    <div className="flex min-h-[14rem] flex-col items-center justify-center gap-3 px-6 text-center">
      <div
        className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        aria-hidden="true"
      >
        <FolderOpen className="size-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{heading}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {onClear && (
        <Button variant="outline" size="sm" className="mt-2" onClick={onClear}>
          {query ? "Clear search" : "View all projects"}
        </Button>
      )}
    </div>
  )
}

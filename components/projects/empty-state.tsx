import { FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState({
  status,
  onClear,
}: {
  status: string
  onClear?: () => void
}) {
  return (
    <div className="flex min-h-[14rem] flex-col items-center justify-center gap-3 px-6 text-center">
      <div
        className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        aria-hidden="true"
      >
        <FolderOpen className="size-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        No {status} projects
      </h3>
      <p className="max-w-md text-sm text-muted-foreground">
        There are no projects with this status right now.
      </p>
      {onClear && (
        <Button variant="outline" size="sm" className="mt-2" onClick={onClear}>
          View all projects
        </Button>
      )}
    </div>
  )
}

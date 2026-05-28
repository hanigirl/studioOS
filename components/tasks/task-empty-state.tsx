import { ClipboardList, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TaskEmptyStateProps {
  variant: "empty" | "no-results"
  onClearFilters?: () => void
  onNewTask?: () => void
}

export function TaskEmptyState({ variant, onClearFilters, onNewTask }: TaskEmptyStateProps) {
  if (variant === "no-results") {
    return (
      <div className="flex flex-col items-center gap-2 py-12">
        <SearchX className="size-7 text-muted-foreground/30" aria-hidden />
        <p className="text-sm font-medium text-muted-foreground">
          No tasks match your current filters.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-0.5 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2 py-12">
      <ClipboardList className="size-7 text-muted-foreground/30" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">No tasks yet.</p>
      <p className="text-xs text-muted-foreground/60">
        Create your first task to get started.
      </p>
      {onNewTask && (
        <Button size="sm" className="mt-1" onClick={onNewTask}>
          New Task
        </Button>
      )}
    </div>
  )
}

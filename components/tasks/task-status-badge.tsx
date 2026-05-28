import { cn } from "@/lib/utils"
import type { TaskStatus } from "./types"

export const statusStyles: Record<TaskStatus, string> = {
  "To Do":       "bg-muted text-muted-foreground",
  "In Progress": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "In Review":   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Completed":   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
}

export function TaskStatusBadge({
  status,
  className,
}: {
  status: TaskStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  )
}

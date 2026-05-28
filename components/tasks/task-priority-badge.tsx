import { cn } from "@/lib/utils"
import type { TaskPriority } from "./types"

export const priorityStyles: Record<TaskPriority, string> = {
  Low:    "bg-muted text-muted-foreground",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  High:   "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function TaskPriorityBadge({
  priority,
  className,
}: {
  priority: TaskPriority
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        priorityStyles[priority],
        className
      )}
    >
      {priority}
    </span>
  )
}

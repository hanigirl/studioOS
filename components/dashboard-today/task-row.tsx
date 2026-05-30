"use client"

import { CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { TodayPriority, TodayTask } from "./types"

// Same priority palette as components/kanban-board.tsx and
// components/projects/project-pulse-card.tsx so a task looks
// identical wherever it appears in the product.
const priorityStyles: Record<TodayPriority, string> = {
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } catch {
    return iso
  }
}

/**
 * A task row inside a Today zone (Now / Later / Blocked).
 *
 * Visual contract: identical to the kanban TaskCard
 * (components/kanban-board.tsx) — same building blocks, same type scale, same
 * spacing rhythm. The zone (the parent) plays the role the kanban column
 * plays — it is the status grouping. So the row itself only carries the
 * priority pill, not a status pill.
 *
 * Compared to the kanban card we drop the drag handle (zones aren't
 * orderable yet). Due time replaces due date because Today is intra-day.
 */
export function TaskRow({
  task,
  onSelect,
}: {
  task: TodayTask
  onSelect?: (task: TodayTask) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(task)}
      className={cn(
        "group relative w-full text-start rounded-lg border bg-card text-card-foreground p-3 shadow-sm",
        "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium leading-snug truncate">
          {task.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground truncate">
          {task.project} · {task.client}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
            priorityStyles[task.priority]
          )}
        >
          {task.priority}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] tabular-nums",
            task.isOverdue
              ? "text-destructive font-medium"
              : "text-muted-foreground"
          )}
        >
          <CalendarDays className="size-3" aria-hidden="true" />
          {task.isOverdue ? "Overdue " : ""}
          {formatTime(task.due)}
        </span>
        <div className="flex-1" />
        <Avatar size="sm" aria-label={task.assignee.name}>
          <AvatarFallback className={cn("text-white", task.assignee.color)}>
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </button>
  )
}

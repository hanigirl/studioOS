"use client"

import { useDraggable } from "@dnd-kit/core"
import { Calendar, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { priorityStyles } from "./data"
import type { Task } from "./types"

/**
 * Presentational task card. Shared by the board (via DraggableTaskCard) and
 * the DragOverlay, so the card that follows the cursor looks identical to the
 * one it left behind.
 */
export function TaskCard({
  task,
  overlay = false,
}: {
  task: Task
  overlay?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-card p-3 text-card-foreground shadow-sm",
        overlay
          ? "rotate-2 cursor-grabbing shadow-md"
          : "cursor-grab transition-shadow duration-150 hover:shadow-md"
      )}
    >
      <div className="space-y-0.5">
        <p className="text-sm font-semibold leading-snug">{task.title}</p>
        <p className="truncate text-xs text-muted-foreground">
          {task.project} · {task.client}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
            priorityStyles[task.priority]
          )}
        >
          {task.priority}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="size-3.5" aria-hidden />
          {task.due}
        </span>
        <span className="ml-auto">
          {task.assignee ? (
            <Avatar size="sm" aria-label={task.assignee.name}>
              <AvatarFallback className={cn("text-white", task.assignee.color)}>
                {task.assignee.initials}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar size="sm" aria-label="Unassigned">
              <AvatarFallback>
                <User className="size-3.5" aria-hidden />
              </AvatarFallback>
            </Avatar>
          )}
        </span>
      </div>
    </div>
  )
}

/** Draggable wrapper — the source card dims while its overlay is dragging. */
export function DraggableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "touch-none rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        isDragging && "opacity-40"
      )}
    >
      <TaskCard task={task} />
    </div>
  )
}

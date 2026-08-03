"use client"

import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DraggableTaskCard } from "./task-card"
import type { KanbanColumnDef, Task } from "./types"

export function KanbanColumn({
  column,
  tasks,
}: {
  column: KanbanColumnDef
  tasks: Task[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.status })

  return (
    <section className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-card/40">
      <div className="flex items-center gap-2 border-b border-border px-3 py-3">
        <span
          className={cn("size-2 shrink-0 rounded-full", column.dotClass)}
          aria-hidden
        />
        <h2 className="text-sm font-semibold">{column.status}</h2>
        <span className="text-xs tabular-nums text-muted-foreground">
          {tasks.length}
        </span>
        <div className="mx-1 h-px flex-1 bg-border" />
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Add task to ${column.status}`}
        >
          <Plus />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-24 flex-1 flex-col gap-3 rounded-b-xl p-3 transition-colors",
          isOver && "bg-accent/60"
        )}
      >
        {tasks.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}

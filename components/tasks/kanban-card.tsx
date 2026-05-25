import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TaskCard, TaskPriority } from "./types"

const priorityStyles: Record<TaskPriority, { bg: string; text: string }> = {
  High:   { bg: "bg-[#fee2e2]", text: "text-[#b91c1c]" },
  Medium: { bg: "bg-[#fef3c7]", text: "text-[#b45309]" },
  Low:    { bg: "bg-[#e5e7eb]", text: "text-[#374151]" },
}

export function KanbanCard({ task }: { task: TaskCard }) {
  const priority = priorityStyles[task.priority]

  return (
    <div className="bg-card border border-border rounded-lg p-3 flex flex-col gap-3 shadow-[0px_1px_1px_rgba(0,0,0,0.1),0px_1px_1.5px_rgba(0,0,0,0.1)] w-full">
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm font-medium text-card-foreground leading-5">
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground leading-4">
          {task.project} · {task.client}
        </p>
      </div>

      <div className="flex items-center gap-2 w-full">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 shrink-0",
            priority.bg,
            priority.text
          )}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          <CalendarDays className="size-3 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground leading-4">
            {task.dueDate}
          </span>
        </div>

        <div className="flex-1" />

        <div
          className="size-6 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: task.assignee.color }}
        >
          <span className="text-[11px] font-medium text-white leading-4">
            {task.assignee.initials}
          </span>
        </div>
      </div>
    </div>
  )
}

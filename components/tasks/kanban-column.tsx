import { Plus } from "lucide-react"
import { KanbanCard } from "./kanban-card"
import type { KanbanColumn as KanbanColumnType } from "./types"

export function KanbanColumn({ column }: { column: KanbanColumnType }) {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col shrink-0 w-[288px]">
      <div className="flex items-center gap-2 p-3 w-full overflow-hidden">
        <div
          className="size-2 rounded-[4px] shrink-0"
          style={{ backgroundColor: column.color }}
        />
        <span className="text-sm font-semibold text-foreground leading-5 whitespace-nowrap">
          {column.label}
        </span>
        <span className="text-xs text-muted-foreground leading-4 whitespace-nowrap">
          {column.tasks.length}
        </span>
        <div className="flex-1" />
        <button className="size-6 flex items-center justify-center rounded-md hover:bg-accent transition-colors shrink-0">
          <Plus className="size-3 text-muted-foreground" />
        </button>
      </div>

      <div className="h-px bg-border w-full shrink-0" />

      <div className="flex flex-col gap-2 p-3 w-full">
        {column.tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

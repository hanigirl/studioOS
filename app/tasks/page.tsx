import { Button } from "@/components/ui/button"
import { KanbanColumn } from "@/components/tasks/kanban-column"
import { COLUMNS } from "@/components/tasks/data"

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-[30px] font-bold leading-9 tracking-[-0.75px] text-foreground">
            Tasks
          </h1>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns to update their status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button size="sm">
            New Task
          </Button>
        </div>
      </div>

      <div className="flex gap-4 pb-4 overflow-x-auto">
        {COLUMNS.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  )
}

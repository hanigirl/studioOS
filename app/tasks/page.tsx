import { Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/tasks/kanban-board"
import { tasks } from "@/components/tasks/data"

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns to update their status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter /> Filter
          </Button>
          <Button size="sm">
            <Plus /> New Task
          </Button>
        </div>
      </div>

      <KanbanBoard initialTasks={tasks} />
    </div>
  )
}

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/tasks/kanban-board"
import { NewTaskTrigger } from "@/components/tasks/new-task-trigger"
import { tasks } from "@/components/tasks/data"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns to update their status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Suspense fallback={<Button size="sm" disabled>New Task</Button>}>
            <NewTaskTrigger />
          </Suspense>
        </div>
      </div>

      <KanbanBoard initialTasks={tasks} />
    </div>
  )
}

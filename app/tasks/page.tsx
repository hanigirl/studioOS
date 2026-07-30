import { Suspense } from "react"
import { KanbanBoard } from "@/components/kanban-board"
import { TasksPageHeader } from "@/components/tasks/tasks-page-header"

function TasksPageHeaderFallback() {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
      <p className="text-sm text-muted-foreground">
        Drag tasks between columns to update their status
      </p>
    </div>
  )
}

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<TasksPageHeaderFallback />}>
        <TasksPageHeader />
      </Suspense>

      <KanbanBoard />
    </div>
  )
}

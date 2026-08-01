"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/tasks/kanban-board"
import { NewTaskDialog } from "@/components/tasks/new-task-dialog"
import { tasks as initialTasks } from "@/components/tasks/data"
import type { Task } from "@/components/tasks/types"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

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
          <NewTaskDialog onCreate={(task) => setTasks((prev) => [...prev, task])} />
        </div>
      </div>

      <KanbanBoard tasks={tasks} onTasksChange={setTasks} />
    </div>
  )
}

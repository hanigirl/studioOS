"use client"

import { Suspense, useState } from "react"
import {
  KanbanBoard,
  initialTasks,
  type KanbanTask,
  type TaskPriority,
} from "@/components/kanban-board"
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

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  if (next.has(value)) {
    next.delete(value)
  } else {
    next.add(value)
  }
  return next
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks)
  const [filterAssignees, setFilterAssignees] = useState<Set<string>>(
    new Set()
  )
  const [filterPriorities, setFilterPriorities] = useState<Set<TaskPriority>>(
    new Set()
  )

  return (
    <div className="space-y-6">
      <Suspense fallback={<TasksPageHeaderFallback />}>
        <TasksPageHeader
          onCreateTask={(task) => setTasks((prev) => [task, ...prev])}
          filterAssignees={filterAssignees}
          onToggleAssignee={(name) =>
            setFilterAssignees((prev) => toggleInSet(prev, name))
          }
          filterPriorities={filterPriorities}
          onTogglePriority={(priority) =>
            setFilterPriorities((prev) => toggleInSet(prev, priority))
          }
          onClearFilters={() => {
            setFilterAssignees(new Set())
            setFilterPriorities(new Set())
          }}
        />
      </Suspense>

      <KanbanBoard
        tasks={tasks}
        onTasksChange={setTasks}
        filterAssignees={filterAssignees}
        filterPriorities={filterPriorities}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { columns } from "./data"
import { KanbanColumn } from "./kanban-column"
import { TaskCard } from "./task-card"
import type { Task, TaskStatus } from "./types"

export function KanbanBoard({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const activeTask = tasks.find((t) => t.id === activeId) ?? null

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event
    if (!over) return

    // Droppable ids are the column statuses.
    const newStatus = over.id as TaskStatus
    setTasks((prev) =>
      prev.map((t) =>
        t.id === active.id && t.status !== newStatus
          ? { ...t, status: newStatus }
          : t
      )
    )
  }

  return (
    <DndContext
      id="tasks-kanban"
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            column={column}
            tasks={tasks.filter((t) => t.status === column.status)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="w-72">
            <TaskCard task={activeTask} overlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

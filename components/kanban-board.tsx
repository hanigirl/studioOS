"use client"

import { useMemo, useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { CalendarDays, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type TaskStatus =
  | "Backlog"
  | "To Do"
  | "In Progress"
  | "In Review"
  | "Approved"
  | "In Dev"
  | "Done"

export type TaskPriority = "High" | "Medium" | "Low"

export interface KanbanAssignee {
  name: string
  initials: string
  /** Tailwind bg-* class. */
  color: string
}

export interface KanbanTask {
  id: string
  title: string
  project: string
  client: string
  status: TaskStatus
  priority: TaskPriority
  due: string
  assignee: KanbanAssignee
}

// Same priority palette as components/dashboard-today/task-row.tsx and
// components/projects/project-pulse-card.tsx so a task looks identical
// wherever it appears in the product.
const priorityStyles: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
}

const columns: { id: TaskStatus; dotColor: string }[] = [
  { id: "Backlog", dotColor: "bg-slate-400" },
  { id: "To Do", dotColor: "bg-zinc-500" },
  { id: "In Progress", dotColor: "bg-blue-500" },
  { id: "In Review", dotColor: "bg-orange-500" },
  { id: "Approved", dotColor: "bg-purple-500" },
  { id: "In Dev", dotColor: "bg-teal-500" },
  { id: "Done", dotColor: "bg-emerald-500" },
]

const HANI: KanbanAssignee = { name: "Hani Buskila", initials: "HB", color: "bg-blue-500" }
const MAYA: KanbanAssignee = { name: "Maya", initials: "M", color: "bg-pink-500" }
const JON: KanbanAssignee = { name: "Jon", initials: "J", color: "bg-emerald-500" }
const ADA: KanbanAssignee = { name: "Ada", initials: "A", color: "bg-violet-500" }

export const taskStatuses: TaskStatus[] = columns.map((c) => c.id)
export const taskPriorities: TaskPriority[] = ["High", "Medium", "Low"]
export const kanbanAssignees: KanbanAssignee[] = [HANI, MAYA, JON, ADA]

const initialTasks: KanbanTask[] = [
  { id: "t1", title: "Explore onboarding flow variants", project: "App Redesign", client: "Wix", status: "Backlog", priority: "Medium", due: "Apr 20", assignee: HANI },
  { id: "t2", title: "Collect references for pricing page", project: "Landing Page", client: "Zoom", status: "Backlog", priority: "Low", due: "Apr 25", assignee: MAYA },
  { id: "t3", title: "Wireframe dashboard widgets", project: "Dashboard UI", client: "Slack", status: "To Do", priority: "High", due: "Apr 8", assignee: HANI },
  { id: "t4", title: "Define empty states for feed", project: "Social Templates", client: "Meta", status: "To Do", priority: "Medium", due: "Apr 12", assignee: JON },
  { id: "t5", title: "Draft logo direction A", project: "Brand Identity", client: "Monday", status: "To Do", priority: "High", due: "Apr 6", assignee: ADA },
  { id: "t6", title: "Redesign profile settings screen", project: "App Redesign", client: "Wix", status: "In Progress", priority: "High", due: "Apr 10", assignee: HANI },
  { id: "t7", title: "Build email header templates", project: "Marketing Kit", client: "Fiverr", status: "In Progress", priority: "Medium", due: "Apr 15", assignee: MAYA },
  { id: "t8", title: "Final logo presentation", project: "Brand Identity", client: "Monday", status: "In Review", priority: "High", due: "Apr 5", assignee: ADA },
  { id: "t9", title: "Analytics chart components", project: "Dashboard UI", client: "Slack", status: "In Review", priority: "Medium", due: "Apr 7", assignee: HANI },
  { id: "t10", title: "Checkout flow hand-off pack", project: "App Redesign", client: "Wix", status: "Approved", priority: "High", due: "Apr 9", assignee: HANI },
  { id: "t11", title: "Navigation shell components", project: "Dashboard UI", client: "Slack", status: "In Dev", priority: "Medium", due: "Apr 4", assignee: JON },
  { id: "t12", title: "Icon set v2", project: "Marketing Kit", client: "Fiverr", status: "Done", priority: "Low", due: "Mar 30", assignee: MAYA },
  { id: "t13", title: "Color tokens audit", project: "Brand Identity", client: "Monday", status: "Done", priority: "Low", due: "Mar 28", assignee: ADA },
]

function TaskCardBody({ task }: { task: KanbanTask }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium leading-snug">{task.title}</p>
        <p className="text-xs text-muted-foreground">
          {task.project} · {task.client}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
            priorityStyles[task.priority]
          )}
        >
          {task.priority}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <CalendarDays className="size-3" aria-hidden="true" />
          {task.due}
        </span>
        <div className="flex-1" />
        <Avatar size="sm" aria-label={task.assignee.name}>
          <AvatarFallback className={cn("text-white", task.assignee.color)}>
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  )
}

function TaskCard({ task }: { task: KanbanTask }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "w-full touch-none select-none rounded-lg border bg-card p-3 text-card-foreground shadow-sm",
        "cursor-grab transition-[box-shadow,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      <TaskCardBody task={task} />
    </div>
  )
}

function KanbanColumn({
  status,
  dotColor,
  tasks,
}: {
  status: TaskStatus
  dotColor: string
  tasks: KanbanTask[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border bg-card">
      <div className="flex items-center gap-2 p-3">
        <span className={cn("size-2 shrink-0 rounded-full", dotColor)} aria-hidden="true" />
        <h3 className="text-sm font-semibold">{status}</h3>
        <span className="text-xs text-muted-foreground">{tasks.length}</span>
        <div className="flex-1" />
        <Button variant="ghost" size="icon-xs" aria-label={`Add task to ${status}`}>
          <Plus />
        </Button>
      </div>
      <div className="h-px bg-border" />
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-20 flex-col gap-2 p-3 transition-colors",
          isOver && "bg-accent/40"
        )}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks)
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const grouped = useMemo(() => {
    const map = new Map<TaskStatus, KanbanTask[]>()
    for (const c of columns) map.set(c.id, [])
    for (const t of tasks) map.get(t.status)?.push(t)
    return map
  }, [tasks])

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : undefined

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const newStatus = over.id as TaskStatus
    setTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, status: newStatus } : t))
    )
  }

  return (
    <DndContext
      id="kanban-board"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((c) => (
          <KanbanColumn
            key={c.id}
            status={c.id}
            dotColor={c.dotColor}
            tasks={grouped.get(c.id) ?? []}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="w-[264px] rounded-lg border bg-card p-3 text-card-foreground shadow-lg">
            <TaskCardBody task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

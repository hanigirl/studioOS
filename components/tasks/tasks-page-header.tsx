"use client"

import { useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import {
  kanbanAssignees,
  taskPriorities,
  type KanbanTask,
  type TaskPriority,
} from "@/components/kanban-board"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NewTaskTrigger } from "./new-task-trigger"

export function TasksPageHeader({
  onCreateTask,
  filterAssignees,
  onToggleAssignee,
  filterPriorities,
  onTogglePriority,
  onClearFilters,
}: {
  onCreateTask: (task: KanbanTask) => void
  filterAssignees: Set<string>
  onToggleAssignee: (name: string) => void
  filterPriorities: Set<TaskPriority>
  onTogglePriority: (priority: TaskPriority) => void
  onClearFilters: () => void
}) {
  const searchParams = useSearchParams()
  const version = searchParams.get("version") === "2" ? "panel" : "modal"
  const activeFilterCount = filterAssignees.size + filterPriorities.size

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Drag tasks between columns to update their status
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={activeFilterCount ? "secondary" : "outline"}
              size="sm"
              aria-label="Filter tasks"
            >
              <SlidersHorizontal />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Assignee</DropdownMenuLabel>
            {kanbanAssignees.map((a) => (
              <DropdownMenuCheckboxItem
                key={a.name}
                checked={filterAssignees.has(a.name)}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={() => onToggleAssignee(a.name)}
              >
                {a.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            {taskPriorities.map((p) => (
              <DropdownMenuCheckboxItem
                key={p}
                checked={filterPriorities.has(p)}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={() => onTogglePriority(p)}
              >
                {p}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={activeFilterCount === 0}
              onSelect={(e) => {
                e.preventDefault()
                onClearFilters()
              }}
            >
              Clear filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <NewTaskTrigger variant={version} onCreateTask={onCreateTask} />
      </div>
    </div>
  )
}

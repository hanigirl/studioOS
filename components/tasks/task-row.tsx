"use client"

import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableRow, TableCell } from "@/components/ui/table"
import { TaskStatusBadge } from "./task-status-badge"
import { TaskPriorityBadge } from "./task-priority-badge"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "./types"

const STATUSES: TaskStatus[] = ["To Do", "In Progress", "In Review", "Completed"]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function isOverdue(task: Task): boolean {
  if (task.status === "Completed") return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)
  return due < today
}

export interface TaskRowProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  onOpen: (task: Task) => void
}

export function TaskRow({ task, onStatusChange, onDelete, onOpen }: TaskRowProps) {
  const overdue = isOverdue(task)
  const completed = task.status === "Completed"

  return (
    <TableRow
      className="cursor-pointer border-b border-border"
      onClick={() => onOpen(task)}
    >
      {/* Completion checkbox */}
      <TableCell className="w-10 pl-4 pr-2" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={completed}
          onCheckedChange={(val) =>
            onStatusChange(task.id, val === true ? "Completed" : "To Do")
          }
          aria-label={`Mark "${task.title}" as ${completed ? "incomplete" : "complete"}`}
        />
      </TableCell>

      {/* Title + tags */}
      <TableCell className="min-w-[180px] max-w-[280px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                "block truncate text-sm font-medium",
                completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {task.title}
          </TooltipContent>
        </Tooltip>
        {task.tags && task.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded px-1.5 py-px text-[10px] font-medium bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </TableCell>

      {/* Status — inline dropdown */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="outline-none focus:outline-none">
              <TaskStatusBadge
                status={task.status}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {STATUSES.map((s) => (
              <DropdownMenuItem key={s} onSelect={() => onStatusChange(task.id, s)}>
                <TaskStatusBadge status={s} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      {/* Priority */}
      <TableCell>
        <TaskPriorityBadge priority={task.priority} />
      </TableCell>

      {/* Project — hidden on small screens */}
      <TableCell className="hidden md:table-cell">
        <span className="text-sm text-muted-foreground">{task.project}</span>
      </TableCell>

      {/* Assignee — hidden on small screens */}
      <TableCell className="hidden sm:table-cell">
        {task.assignee ? (
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback className={cn("text-white text-xs", task.assignee.color)}>
                {task.assignee.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm hidden lg:inline">{task.assignee.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/40">—</span>
        )}
      </TableCell>

      {/* Due date */}
      <TableCell>
        {task.dueDate ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <CalendarDays
              className={cn(
                "size-3.5 shrink-0",
                overdue ? "text-red-500" : "text-muted-foreground"
              )}
              aria-hidden
            />
            <span
              className={cn(
                "text-sm tabular-nums",
                overdue ? "text-red-500 font-medium" : "text-muted-foreground"
              )}
            >
              {formatDate(task.dueDate)}
            </span>
            {overdue && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Overdue
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/40">—</span>
        )}
      </TableCell>

      {/* Row actions */}
      <TableCell className="w-10 pr-3" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Task options"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 data-[state=open]:opacity-100 data-[state=open]:bg-accent"
            >
              <MoreHorizontal className="size-4" aria-hidden />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onOpen(task)}>
              <Pencil className="size-4" />Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => onDelete(task.id)}>
              <Trash2 className="size-4" />Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

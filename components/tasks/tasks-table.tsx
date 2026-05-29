"use client"

import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TaskRow } from "./task-row"
import { TaskEmptyState } from "./task-empty-state"
import type { Task, TaskStatus } from "./types"

export type SortKey = "dueDate" | "priority" | "createdAt" | "project"
export type SortDir = "asc" | "desc"

const PRIORITY_ORDER: Record<string, number> = {
  Low: 0, Medium: 1, High: 2, Urgent: 3,
}

export function sortTasks(tasks: Task[], key: SortKey, dir: SortDir): Task[] {
  return [...tasks].sort((a, b) => {
    let cmp = 0
    if (key === "dueDate")   cmp = new Date(a.dueDate).getTime()   - new Date(b.dueDate).getTime()
    if (key === "priority")  cmp = PRIORITY_ORDER[a.priority]      - PRIORITY_ORDER[b.priority]
    if (key === "createdAt") cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    if (key === "project")   cmp = a.project.localeCompare(b.project)
    return dir === "asc" ? cmp : -cmp
  })
}

function RowSkeleton({ showAssignee }: { showAssignee: boolean }) {
  return (
    <TableRow>
      <TableCell className="w-10 pl-4 pr-2">
        <Skeleton className="size-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-24" />
        </div>
      </TableCell>
      <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
      <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-28" /></TableCell>
      {showAssignee && (
        <TableCell className="hidden sm:table-cell">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-16 hidden lg:block" />
          </div>
        </TableCell>
      )}
      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      <TableCell className="w-10" />
    </TableRow>
  )
}

interface TasksTableProps {
  tasks: Task[]
  sortKey: SortKey
  sortDir: SortDir
  hasActiveFilters: boolean
  showAssignee?: boolean
  isLoading?: boolean
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  onOpen: (task: Task) => void
  onClearFilters: () => void
  onNewTask?: () => void
}

export function TasksTable({
  tasks,
  sortKey,
  sortDir,
  hasActiveFilters,
  showAssignee = true,
  isLoading = false,
  onStatusChange,
  onDelete,
  onOpen,
  onClearFilters,
  onNewTask,
}: TasksTableProps) {
  const sorted = sortTasks(tasks, sortKey, sortDir)
  const colSpan = showAssignee ? 8 : 7

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="w-10 pl-4 pr-2" />
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            {showAssignee && <TableHead className="hidden sm:table-cell">Assignee</TableHead>}
            <TableHead>Due Date</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <RowSkeleton key={i} showAssignee={showAssignee} />
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={colSpan}>
                <TaskEmptyState
                  variant={hasActiveFilters ? "no-results" : "empty"}
                  onClearFilters={onClearFilters}
                  onNewTask={onNewTask}
                />
              </td>
            </tr>
          ) : (
            sorted.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                showAssignee={showAssignee}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onOpen={onOpen}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

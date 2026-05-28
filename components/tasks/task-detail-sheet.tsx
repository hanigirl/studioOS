"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Tag } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { TaskStatusBadge } from "./task-status-badge"
import { TaskPriorityBadge } from "./task-priority-badge"
import { TASK_ASSIGNEES, TASK_PROJECTS } from "./data"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus, TaskPriority } from "./types"

const STATUSES: TaskStatus[]   = ["To Do", "In Progress", "In Review", "Completed"]
const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High", "Urgent"]

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}

interface TaskDetailSheetProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
}

export function TaskDetailSheet({
  task,
  open,
  onOpenChange,
  onSave,
}: TaskDetailSheetProps) {
  const [form, setForm] = useState<Task | null>(null)

  useEffect(() => {
    if (task) setForm({ ...task })
  }, [task])

  function set<K extends keyof Task>(key: K, val: Task[K]) {
    setForm((f) => (f ? { ...f, [key]: val } : f))
  }

  function handleSave() {
    if (!form) return
    onSave(form)
    onOpenChange(false)
  }

  const formatFullDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-[480px] overflow-y-auto gap-0">
        {form && (
          <>
            <SheetHeader className="px-4 pb-0 pt-4">
              <SheetTitle className="pr-6 text-base leading-snug">{form.title}</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-5 px-4 py-4">
              {/* Tags */}
              {form.tags && form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground"
                    >
                      <Tag className="size-3" aria-hidden />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Separator />

              {/* Status + Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <MetaLabel>Status</MetaLabel>
                  <Select
                    value={form.status}
                    onValueChange={(v) => set("status", v as TaskStatus)}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          <TaskStatusBadge status={s} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <MetaLabel>Priority</MetaLabel>
                  <Select
                    value={form.priority}
                    onValueChange={(v) => set("priority", v as TaskPriority)}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p} value={p}>
                          <TaskPriorityBadge priority={p} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project + Assignee */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <MetaLabel>Project</MetaLabel>
                  <Select
                    value={form.project}
                    onValueChange={(v) => set("project", v)}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TASK_PROJECTS.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <MetaLabel>Assignee</MetaLabel>
                  {form.assignee ? (
                    <div className="flex h-8 items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className={cn("text-white text-xs", form.assignee.color)}>
                          {form.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{form.assignee.name}</span>
                    </div>
                  ) : (
                    <Select
                      onValueChange={(v) => {
                        const found = TASK_ASSIGNEES.find((a) => a.name === v)
                        if (found) set("assignee", found)
                      }}
                    >
                      <SelectTrigger className="h-8 w-full text-xs">
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_ASSIGNEES.map((a) => (
                          <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Due date */}
              <div className="flex flex-col gap-1.5">
                <MetaLabel>Due Date</MetaLabel>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                    className="h-8 text-xs w-full"
                  />
                </div>
              </div>

              <Separator />

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <MetaLabel>Title</MetaLabel>
                <Input
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <MetaLabel>Description</MetaLabel>
                <textarea
                  value={form.description ?? ""}
                  onChange={(e) => set("description", e.target.value || undefined)}
                  rows={4}
                  placeholder="Add a description..."
                  className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs",
                    "placeholder:text-muted-foreground resize-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                />
              </div>

              <p className="text-xs text-muted-foreground/60">
                Created {formatFullDate(form.createdAt)}
              </p>
            </div>

            <SheetFooter className="pt-0">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

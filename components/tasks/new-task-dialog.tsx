"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { TASK_ASSIGNEES, TASK_PROJECTS } from "./data"
import type { Task, TaskStatus, TaskPriority } from "./types"

const STATUSES: TaskStatus[]   = ["To Do", "In Progress", "In Review", "Completed"]
const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High", "Urgent"]

interface FormState {
  title: string
  status: TaskStatus | undefined
  priority: TaskPriority | undefined
  project: string | undefined
  assigneeName: string | undefined
  dueDate: string
  description: string
}

const EMPTY: FormState = {
  title: "",
  status: undefined,
  priority: undefined,
  project: undefined,
  assigneeName: undefined,
  dueDate: "",
  description: "",
}

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-medium leading-none">
      {children}
      {required && <span className="ml-0.5 text-destructive" aria-hidden>*</span>}
    </label>
  )
}

interface NewTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (task: Task) => void
}

export function NewTaskDialog({ open, onOpenChange, onAdd }: NewTaskDialogProps) {
  const [form, setForm] = useState<FormState>(EMPTY)

  const isValid =
    form.title.trim() !== "" &&
    form.status !== undefined &&
    form.priority !== undefined &&
    form.project !== undefined &&
    form.dueDate !== ""

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function handleCreate() {
    if (!isValid) return
    const assignee = TASK_ASSIGNEES.find((a) => a.name === form.assigneeName)
    const task: Task = {
      id: `task-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      status: form.status as TaskStatus,
      priority: form.priority as TaskPriority,
      project: form.project as string,
      assignee,
      dueDate: form.dueDate,
      createdAt: new Date().toISOString().split("T")[0],
    }
    onAdd(task)
    setForm(EMPTY)
    onOpenChange(false)
  }

  function handleOpenChange(val: boolean) {
    if (!val) setForm(EMPTY)
    onOpenChange(val)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Title */}
          <div className="grid gap-1.5">
            <FieldLabel required>Title</FieldLabel>
            <Input
              placeholder="Task title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              maxLength={120}
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <FieldLabel required>Status</FieldLabel>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v as TaskStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <FieldLabel required>Priority</FieldLabel>
              <Select
                value={form.priority}
                onValueChange={(v) => set("priority", v as TaskPriority)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project + Assignee */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <FieldLabel required>Project</FieldLabel>
              <Select
                value={form.project}
                onValueChange={(v) => set("project", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PROJECTS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <FieldLabel>Assignee</FieldLabel>
              <Select
                value={form.assigneeName}
                onValueChange={(v) => set("assigneeName", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_ASSIGNEES.map((a) => (
                    <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due date */}
          <div className="grid gap-1.5">
            <FieldLabel required>Due Date</FieldLabel>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-1.5">
            <FieldLabel>Description</FieldLabel>
            <textarea
              placeholder="Optional description..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className={cn(
                "flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs",
                "placeholder:text-muted-foreground resize-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!isValid}>
            <Plus className="size-4" />
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { assignees, columns } from "./data"
import type { Task, TaskPriority, TaskStatus } from "./types"

const priorities: TaskPriority[] = ["Low", "Medium", "High"]

const UNASSIGNED = "unassigned"

/** "2026-04-20" -> "Apr 20", matching the due-date format used on task cards. */
function formatDue(isoDate: string) {
  if (!isoDate) return ""
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function NewTaskDialog({
  onCreate,
}: {
  onCreate: (task: Task) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [project, setProject] = useState("")
  const [client, setClient] = useState("")
  const [status, setStatus] = useState<TaskStatus>(columns[0].status)
  const [priority, setPriority] = useState<TaskPriority>("Medium")
  const [due, setDue] = useState("")
  const [assigneeName, setAssigneeName] = useState(UNASSIGNED)

  function reset() {
    setTitle("")
    setProject("")
    setClient("")
    setStatus(columns[0].status)
    setPriority("Medium")
    setDue("")
    setAssigneeName(UNASSIGNED)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    onCreate({
      id: `task-${Date.now()}`,
      title,
      project,
      client,
      status,
      priority,
      due: formatDue(due),
      assignee: assignees.find((a) => a.name === assigneeName),
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription>
            Add a task to track across your projects.
          </DialogDescription>
        </DialogHeader>

        <form id="new-task-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="task-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="task-title"
              placeholder="Explore onboarding flow variants"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="task-project" className="text-sm font-medium">
                Project
              </label>
              <Input
                id="task-project"
                placeholder="App Redesign"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="task-client" className="text-sm font-medium">
                Client
              </label>
              <Input
                id="task-client"
                placeholder="Wix"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="task-status" className="text-sm font-medium">
                Status
              </label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as TaskStatus)}
              >
                <SelectTrigger id="task-status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((c) => (
                    <SelectItem key={c.status} value={c.status}>
                      {c.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="task-priority" className="text-sm font-medium">
                Priority
              </label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as TaskPriority)}
              >
                <SelectTrigger id="task-priority" className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="task-due" className="text-sm font-medium">
                Due date
              </label>
              <Input
                id="task-due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="task-assignee" className="text-sm font-medium">
                Assignee
              </label>
              <Select value={assigneeName} onValueChange={setAssigneeName}>
                <SelectTrigger id="task-assignee" className="w-full">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                  {assignees.map((a) => (
                    <SelectItem key={a.name} value={a.name}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="new-task-form">
            Create task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

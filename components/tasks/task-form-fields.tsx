"use client"

import { useId, useState } from "react"
import {
  kanbanAssignees,
  taskPriorities,
  taskStatuses,
  type TaskPriority,
  type TaskStatus,
} from "@/components/kanban-board"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TaskFormFields() {
  const titleId = useId()
  const projectId = useId()
  const clientId = useId()
  const dueId = useId()

  const [status, setStatus] = useState<TaskStatus>("Backlog")
  const [priority, setPriority] = useState<TaskPriority>("Medium")
  const [assignee, setAssignee] = useState(kanbanAssignees[0].name)

  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor={titleId}>Title</Label>
        <Input id={titleId} name="title" placeholder="e.g. Draft logo direction A" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={projectId}>Project</Label>
          <Input id={projectId} name="project" placeholder="App Redesign" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={clientId}>Client</Label>
          <Input id={clientId} name="client" placeholder="Wix" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="task-status">Status</Label>
          <Select
            name="status"
            value={status}
            onValueChange={(v) => setStatus(v as TaskStatus)}
          >
            <SelectTrigger id="task-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {taskStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="task-priority">Priority</Label>
          <Select
            name="priority"
            value={priority}
            onValueChange={(v) => setPriority(v as TaskPriority)}
          >
            <SelectTrigger id="task-priority" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {taskPriorities.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={dueId}>Due date</Label>
          <Input id={dueId} name="due" placeholder="Apr 20" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="task-assignee">Assignee</Label>
          <Select name="assignee" value={assignee} onValueChange={setAssignee}>
            <SelectTrigger id="task-assignee" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {kanbanAssignees.map((a) => (
                <SelectItem key={a.name} value={a.name}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

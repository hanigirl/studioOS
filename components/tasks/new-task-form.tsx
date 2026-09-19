"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { columns, teamMembers } from "./data"
import type { TaskPriority } from "./types"

const priorities: TaskPriority[] = ["High", "Medium", "Low"]

/**
 * Shared "New Task" fields. Rendered inside a Dialog for `?version=1` and
 * inside a Sheet for `?version=2` — same form, different container — so the
 * two experiences never drift out of sync.
 */
export function NewTaskForm({
  formId,
  onSubmit,
}: {
  formId: string
  onSubmit: () => void
}) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // No backend yet — the form is a placeholder. Just close on submit.
    onSubmit()
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="task-title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="task-title"
          placeholder="Redesign profile settings screen"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="task-project" className="text-sm font-medium">
            Project
          </label>
          <Input id="task-project" placeholder="App Redesign" required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="task-client" className="text-sm font-medium">
            Client
          </label>
          <Input id="task-client" placeholder="Wix" required />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="task-status" className="text-sm font-medium">
            Status
          </label>
          <Select defaultValue="Backlog">
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
          <Select defaultValue="Medium">
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
          <Input id="task-due" type="date" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="task-assignee" className="text-sm font-medium">
            Assignee
          </label>
          <Select defaultValue="unassigned">
            <SelectTrigger id="task-assignee" className="w-full">
              <SelectValue placeholder="Unassigned" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {teamMembers.map((m) => (
                <SelectItem key={m.name} value={m.name}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  )
}

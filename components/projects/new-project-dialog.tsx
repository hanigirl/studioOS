"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProjectStatus, PulseProject } from "./types"

const STATUSES: ProjectStatus[] = ["Discovery", "Design", "Review", "Handoff", "Done"]

function formatDue(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function daysUntil(iso: string): number {
  return Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000)
}

interface Props {
  onAdd: (project: PulseProject) => void
}

export function NewProjectDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [client, setClient] = useState("")
  const [status, setStatus] = useState<ProjectStatus>("Discovery")
  const [due, setDue] = useState("")
  const [figmaUrl, setFigmaUrl] = useState("")

  function handleSubmit() {
    if (!name.trim()) return
    const days = due ? daysUntil(due) : 0
    onAdd({
      id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: name.trim(),
      subtitle: "",
      client: client.trim() || "Unknown",
      clientLogo: "",
      status,
      team: [],
      due: due ? formatDue(due) : "—",
      daysToDeadline: days,
      overdue: days < 0,
      tasksDone: 0,
      tasksTotal: 0,
      nextTasks: [],
      healthReason: "New project",
      figmaUrl: figmaUrl.trim() || undefined,
    })
    setOpen(false)
    setName("")
    setClient("")
    setStatus("Discovery")
    setDue("")
    setFigmaUrl("")
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setName(""); setClient(""); setStatus("Discovery"); setDue(""); setFigmaUrl("") } }}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
          <Plus />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project name
            </label>
            <Input
              id="project-name"
              placeholder="e.g. Brand Refresh"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="client-name" className="text-sm font-medium">
              Client
            </label>
            <Input
              id="client-name"
              placeholder="e.g. Acme Corp"
              value={client}
              onChange={e => setClient(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={v => setStatus(v as ProjectStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="due-date" className="text-sm font-medium">
              Due date
            </label>
            <Input
              id="due-date"
              type="date"
              value={due}
              onChange={e => setDue(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="figma-url" className="text-sm font-medium">
              Figma URL{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input
              id="figma-url"
              placeholder="https://figma.com/file/..."
              value={figmaUrl}
              onChange={e => setFigmaUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

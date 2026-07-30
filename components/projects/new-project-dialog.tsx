"use client"

import { useId, useState } from "react"
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProjectStatus, PulseProject } from "./types"

const clientLogos: Record<string, string> = {
  Wix: "/logos/wix.png",
  Slack: "/logos/slack.png",
  Zoom: "/logos/zoom.png",
  Monday: "/logos/monday.png",
  Fiverr: "/logos/fiverr.png",
  Meta: "/logos/meta.png",
}
const clients = Object.keys(clientLogos)
const statuses: ProjectStatus[] = [
  "Discovery",
  "Design",
  "Review",
  "Handoff",
  "Done",
]

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function NewProjectDialog({
  onCreate,
}: {
  onCreate: (project: PulseProject) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [client, setClient] = useState(clients[0])
  const [status, setStatus] = useState<ProjectStatus>("Discovery")
  const [due, setDue] = useState("")
  const nameId = useId()
  const dueId = useId()

  const reset = () => {
    setName("")
    setClient(clients[0])
    setStatus("Discovery")
    setDue("")
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
          <Plus />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Add a new project to track alongside your active work.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!name.trim()) return

            onCreate({
              id: `${slugify(name)}-${Date.now()}`,
              name: name.trim(),
              subtitle: "",
              client,
              clientLogo: clientLogos[client],
              figmaLink: "#",
              status,
              team: [],
              due: due.trim() || "No due date",
              daysToDeadline: 14,
              overdue: false,
              tasksDone: 0,
              tasksTotal: 0,
              nextTasks: [],
              healthReason: "Just created — getting started.",
            })
            setOpen(false)
            reset()
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor={nameId}>Project name</Label>
            <Input
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. App Redesign"
              required
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label>Client</Label>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as ProjectStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor={dueId}>Due date</Label>
            <Input
              id={dueId}
              value={due}
              onChange={(e) => setDue(e.target.value)}
              placeholder="e.g. Apr 30"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

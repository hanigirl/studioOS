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
import type { ProjectStatus } from "./types"

const statuses: ProjectStatus[] = [
  "Discovery",
  "Design",
  "Review",
  "Handoff",
  "Done",
]

export function NewProjectDialog() {
  const [open, setOpen] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // No backend yet — the form is a placeholder. Just close on submit.
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            Add a project to track across your clients.
          </DialogDescription>
        </DialogHeader>

        <form id="new-project-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project name
            </label>
            <Input id="project-name" placeholder="App Redesign" required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="project-client" className="text-sm font-medium">
              Client
            </label>
            <Input id="project-client" placeholder="Wix" required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="project-status" className="text-sm font-medium">
                Status
              </label>
              <Select defaultValue="Discovery">
                <SelectTrigger id="project-status" className="w-full">
                  <SelectValue placeholder="Select status" />
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

            <div className="flex flex-col gap-2">
              <label htmlFor="project-due" className="text-sm font-medium">
                Due date
              </label>
              <Input id="project-due" type="date" />
            </div>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="new-project-form">
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

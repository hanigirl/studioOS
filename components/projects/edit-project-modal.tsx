"use client"

import { useEffect, useState } from "react"
import { Loader2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectStatus, PulseProject } from "./types"

const statuses: ProjectStatus[] = [
  "Discovery",
  "Design",
  "Review",
  "Handoff",
  "Done",
]

interface EditProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: PulseProject | null
  onConfirm: (projectId: string, updates: Partial<PulseProject>) => void
}

export function EditProjectModal({
  open,
  onOpenChange,
  project,
  onConfirm,
}: EditProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<PulseProject>>({})

  useEffect(() => {
    if (open && project) {
      setFormData({
        name: project.name,
        subtitle: project.subtitle,
        client: project.client,
        status: project.status,
        due: project.due,
        healthReason: project.healthReason,
      })
    }
  }, [open, project])

  if (!project) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!project) return
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onConfirm(project.id, formData)
      onOpenChange(false)
      setFormData({})
    } finally {
      setIsLoading(false)
    }
  }

  function handleInputChange(
    field: keyof PulseProject,
    value: string | number
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Pencil className="size-5 text-blue-700 dark:text-blue-400" />
          </div>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            Update the project details below.
          </DialogDescription>
        </DialogHeader>

        <form id="edit-project-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit-name" className="text-sm font-medium">
              Project name
            </label>
            <Input
              id="edit-name"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="App Redesign"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-subtitle" className="text-sm font-medium">
              Subtitle
            </label>
            <Input
              id="edit-subtitle"
              value={formData.subtitle || ""}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder="Mobile + Web"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-client" className="text-sm font-medium">
              Client
            </label>
            <Input
              id="edit-client"
              value={formData.client || ""}
              onChange={(e) => handleInputChange("client", e.target.value)}
              placeholder="Wix"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="edit-status" className="text-sm font-medium">
                Status
              </label>
              <Select
                value={formData.status || "Discovery"}
                onValueChange={(value) =>
                  handleInputChange("status", value as ProjectStatus)
                }
              >
                <SelectTrigger id="edit-status" className="w-full">
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
              <label htmlFor="edit-due" className="text-sm font-medium">
                Due date
              </label>
              <Input
                id="edit-due"
                value={formData.due || ""}
                onChange={(e) => handleInputChange("due", e.target.value)}
                placeholder="Apr 12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-reason" className="text-sm font-medium">
              Health reason (optional)
            </label>
            <Textarea
              id="edit-reason"
              value={formData.healthReason || ""}
              onChange={(e) => handleInputChange("healthReason", e.target.value)}
              placeholder="On track · last client message 1 day ago"
              className="resize-none"
              rows={3}
            />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="edit-project-form"
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

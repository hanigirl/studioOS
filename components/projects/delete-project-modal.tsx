"use client"

import { useState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
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
import { cn } from "@/lib/utils"
import type { PulseProject } from "./types"

interface DeleteProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: PulseProject | null
  onConfirm: (projectId: string) => void
}

export function DeleteProjectModal({
  open,
  onOpenChange,
  project,
  onConfirm,
}: DeleteProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!project) return null

  async function handleDelete() {
    if (!project) return
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onConfirm(project.id)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="size-5 text-red-700 dark:text-red-400" />
          </div>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The project "{project.name}" and all
            its data will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-900/10">
          <p className="text-sm font-medium text-red-900 dark:text-red-300">
            What will be deleted:
          </p>
          <ul className="space-y-2 text-xs text-red-800 dark:text-red-400">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-700 dark:bg-red-400" />
              <span>Project details and metadata</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-700 dark:bg-red-400" />
              <span>All associated tasks ({project.tasksTotal})</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-700 dark:bg-red-400" />
              <span>Project history and comments</span>
            </li>
          </ul>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? "Deleting..." : "Delete project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Archive, Loader2 } from "lucide-react"
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
import type { PulseProject } from "./types"

interface ArchiveProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: PulseProject | null
  onConfirm: (projectId: string) => void
}

export function ArchiveProjectModal({
  open,
  onOpenChange,
  project,
  onConfirm,
}: ArchiveProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!project) return null

  async function handleArchive() {
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
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Archive className="size-5 text-amber-700 dark:text-amber-400" />
          </div>
          <DialogTitle>Archive project</DialogTitle>
          <DialogDescription>
            Move "{project.name}" to your archive. You can restore it anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-900/10">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-300">
            What happens when archived:
          </p>
          <ul className="space-y-2 text-xs text-amber-800 dark:text-amber-400">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-700 dark:bg-amber-400" />
              <span>Project is moved to the Archives section</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-700 dark:bg-amber-400" />
              <span>Hidden from your active projects list</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-700 dark:bg-amber-400" />
              <span>All data is preserved and can be restored</span>
            </li>
          </ul>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleArchive} disabled={isLoading} className="gap-2">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            {isLoading ? "Archiving..." : "Archive project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

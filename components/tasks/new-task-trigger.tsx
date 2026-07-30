"use client"

import { useState, type FormEvent } from "react"
import { Plus } from "lucide-react"
import {
  kanbanAssignees,
  type KanbanTask,
  type TaskPriority,
  type TaskStatus,
} from "@/components/kanban-board"
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TaskFormFields } from "./task-form-fields"

const description =
  "Add a task to the board. It lands in the status you pick below."

export function NewTaskTrigger({
  variant,
  onCreateTask,
}: {
  variant: "modal" | "panel"
  onCreateTask: (task: KanbanTask) => void
}) {
  const [open, setOpen] = useState(false)

  const trigger = (
    <Button size="sm">
      <Plus />
      New Task
    </Button>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const title = String(data.get("title") ?? "").trim()
    if (!title) return

    const assigneeName = String(data.get("assignee") ?? kanbanAssignees[0].name)
    const assignee =
      kanbanAssignees.find((a) => a.name === assigneeName) ?? kanbanAssignees[0]

    onCreateTask({
      id: `t-${Date.now()}`,
      title,
      project: String(data.get("project") ?? "").trim(),
      client: String(data.get("client") ?? "").trim(),
      status: (data.get("status") as TaskStatus) || "Backlog",
      priority: (data.get("priority") as TaskPriority) || "Medium",
      due: String(data.get("due") ?? "").trim() || "No due date",
      assignee,
    })
    setOpen(false)
  }

  if (variant === "panel") {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>New Task</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="px-4">
              <TaskFormFields />
            </div>
            <SheetFooter className="flex-row justify-end">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Create Task</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <TaskFormFields />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

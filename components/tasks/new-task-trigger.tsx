"use client"

import type { FormEvent } from "react"
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

export function NewTaskTrigger({ variant }: { variant: "modal" | "panel" }) {
  const trigger = (
    <Button size="sm">
      <Plus />
      New Task
    </Button>
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // No backend yet — creation is a UI-only flow for now. The Close
    // buttons around the submit action handle dismissing the surface.
    e.preventDefault()
  }

  if (variant === "panel") {
    return (
      <Sheet>
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
              <SheetClose asChild>
                <Button type="submit">Create Task</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog>
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
            <DialogClose asChild>
              <Button type="submit">Create Task</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

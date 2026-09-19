"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { NewTaskForm } from "./new-task-form"

const FORM_ID = "new-task-form"

/** `?version=2` — New Task opens as a right-hand side panel. */
export function NewTaskSheet() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">New Task</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New task</SheetTitle>
          <SheetDescription>
            Add a task to track on the board.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <NewTaskForm formId={FORM_ID} onSubmit={() => setOpen(false)} />
        </div>

        <SheetFooter>
          <Button type="submit" form={FORM_ID}>
            Create task
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

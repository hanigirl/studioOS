"use client"

import { useSearchParams } from "next/navigation"
import { NewTaskDialog } from "./new-task-dialog"
import { NewTaskSheet } from "./new-task-sheet"

/**
 * Picks the New Task experience from the `?version=` URL param:
 * `version=2` → side panel, anything else (including no param) → modal.
 * Lets the two experiences be compared by navigating between
 * `/tasks?version=1` and `/tasks?version=2`.
 */
export function NewTaskTrigger() {
  const searchParams = useSearchParams()
  const version = searchParams.get("version")

  return version === "2" ? <NewTaskSheet /> : <NewTaskDialog />
}

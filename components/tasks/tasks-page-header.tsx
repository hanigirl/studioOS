"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NewTaskTrigger } from "./new-task-trigger"

const versions = [
  { value: "modal" as const, label: "Modal" },
  { value: "panel" as const, label: "Side panel" },
]

export function TasksPageHeader() {
  const searchParams = useSearchParams()
  const version = searchParams.get("version") === "panel" ? "panel" : "modal"

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Drag tasks between columns to update their status
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* New Task version switcher — /tasks?version=modal vs /tasks?version=panel */}
        <div className="flex items-center gap-0.5 rounded-md border p-0.5" role="group" aria-label="New Task surface">
          {versions.map((v) => (
            <Link
              key={v.value}
              href={`/tasks?version=${v.value}`}
              aria-current={version === v.value ? "true" : undefined}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                version === v.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v.label}
            </Link>
          ))}
        </div>

        <Button variant="outline" size="sm">
          <SlidersHorizontal />
          Filter
        </Button>
        <NewTaskTrigger variant={version} />
      </div>
    </div>
  )
}

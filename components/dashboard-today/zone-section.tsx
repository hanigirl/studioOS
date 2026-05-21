"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskRow } from "./task-row"
import type { TodayTask } from "./types"

interface ZoneSectionProps {
  title: string
  tasks: TodayTask[]
  emptyLabel?: string
  initialVisible?: number
}

export function ZoneSection({
  title,
  tasks,
  emptyLabel = "Nothing here",
  initialVisible = 5,
}: ZoneSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const overflow = tasks.length > initialVisible
  const visible = expanded || !overflow ? tasks : tasks.slice(0, initialVisible)
  const hidden = tasks.length - initialVisible

  return (
    <section className="flex flex-col gap-3" aria-labelledby={`zone-${title}`}>
      <div className="flex items-baseline justify-between gap-2">
        <h2
          id={`zone-${title}`}
          className="text-sm font-semibold text-foreground"
        >
          {title}
        </h2>
        <span
          className="text-xs text-muted-foreground tabular-nums"
          aria-label={`${tasks.length} tasks`}
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-lg border border-dashed py-6 text-center text-xs text-muted-foreground">
          {emptyLabel}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
          {overflow && !expanded && (
            <Button
              variant="ghost"
              size="sm"
              className="self-start"
              onClick={() => setExpanded(true)}
            >
              Show {hidden} more
            </Button>
          )}
          {overflow && expanded && (
            <Button
              variant="ghost"
              size="sm"
              className="self-start"
              onClick={() => setExpanded(false)}
            >
              Show less
            </Button>
          )}
        </div>
      )}
    </section>
  )
}

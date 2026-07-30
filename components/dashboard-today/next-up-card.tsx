import { Figma } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { NextUpItem, TodayPriority } from "./types"

// Same priority palette as components/kanban-board.tsx,
// components/projects/project-pulse-card.tsx, and
// components/dashboard-today/task-row.tsx so a task looks identical
// wherever it appears in the product.
const priorityStyles: Record<TodayPriority, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
}

export function NextUpCard({ item }: { item: NextUpItem }) {
  return (
    <Card className="min-h-[14rem] gap-4 py-6">
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                {item.clientInitials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {item.client}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {item.project}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
                priorityStyles[item.priority]
              )}
            >
              {item.priority}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Next Up
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground">{item.contextLine}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button>
            <Figma aria-hidden="true" />
            Resume in Figma
          </Button>
          <Button variant="outline">Mark as Done</Button>
          <Button variant="ghost">Snooze 30m</Button>
          <div className="ms-auto text-xs text-muted-foreground tabular-nums">
            {item.due}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

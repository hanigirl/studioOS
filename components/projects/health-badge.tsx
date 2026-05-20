"use client"

import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { ProjectHealth } from "./types"

const styles: Record<ProjectHealth, string> = {
  Healthy:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "At Risk":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const icons: Record<ProjectHealth, typeof CheckCircle2> = {
  Healthy: CheckCircle2,
  "At Risk": AlertTriangle,
  Critical: AlertOctagon,
}

export function HealthBadge({
  health,
  reason,
  className,
}: {
  health: ProjectHealth
  reason: string
  className?: string
}) {
  const Icon = icons[health]
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
            styles[health],
            className
          )}
          aria-label={`Project health: ${health}. ${reason}`}
        >
          <Icon className="size-3.5" aria-hidden />
          <span>{health}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent side="top">{reason}</TooltipContent>
    </Tooltip>
  )
}

export function HealthDot({
  health,
  className,
}: {
  health: ProjectHealth
  className?: string
}) {
  const dotColor =
    health === "Critical"
      ? "bg-red-500"
      : health === "At Risk"
        ? "bg-amber-500"
        : "bg-emerald-500"
  return (
    <span
      className={cn("inline-block size-2 rounded-full", dotColor, className)}
      aria-label={`Health: ${health}`}
    />
  )
}

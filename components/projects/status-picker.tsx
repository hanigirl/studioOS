"use client"

import { Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { statusStyles } from "./status-styles"
import type { ProjectStatus } from "./types"

const statuses: ProjectStatus[] = [
  "Discovery",
  "Design",
  "Review",
  "Handoff",
  "Done",
]

export function StatusPicker({
  status,
  onChange,
}: {
  status: ProjectStatus
  onChange: (status: ProjectStatus) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Change status, currently ${status}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            "transition-[filter] hover:brightness-95 dark:hover:brightness-110",
            statusStyles[status]
          )}
        >
          {status}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        {statuses.map((s) => (
          <DropdownMenuItem key={s} onSelect={() => onChange(s)}>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                statusStyles[s]
              )}
            >
              {s}
            </span>
            {s === status && <Check className="ml-auto size-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

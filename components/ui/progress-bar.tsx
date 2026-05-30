import { cn } from "@/lib/utils"

interface TaskProgressBarProps {
  done: number
  total: number
  /**
   * compact: renders bar + % label inline (for table cells).
   * Default (false): renders "done / total" header row above the bar (for cards).
   */
  compact?: boolean
  /**
   * "sm": h-1 bar, tighter min-width (analytics dense rows).
   * "md" (default): h-1.5 bar, wider min-width (project table/card rows).
   */
  size?: "sm" | "md"
}

export function TaskProgressBar({
  done,
  total,
  compact = false,
  size = "md",
}: TaskProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const complete = done === total

  const bar = (
    <div
      className={cn(
        "overflow-hidden rounded-full bg-muted",
        compact ? "flex-1" : "w-full",
        size === "sm" ? "h-1" : "h-1.5"
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-300",
          complete ? "bg-emerald-500" : "bg-primary"
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          size === "sm" ? "min-w-[80px]" : "min-w-[100px]"
        )}
      >
        {bar}
        <span
          className={cn(
            "shrink-0 text-right text-xs tabular-nums text-muted-foreground",
            size === "sm" ? "w-[28px]" : "w-[30px]"
          )}
        >
          {pct}%
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs tabular-nums text-muted-foreground">{done} / {total}</span>
        <span className="text-xs font-medium tabular-nums">{pct}%</span>
      </div>
      {bar}
    </div>
  )
}

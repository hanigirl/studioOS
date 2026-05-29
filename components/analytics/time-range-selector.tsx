import { cn } from "@/lib/utils"
import type { TimeRange } from "./types"

const RANGES: { label: string; value: TimeRange }[] = [
  { label: "7d",  value: "7d"  },
  { label: "30d", value: "30d" },
  { label: "3m",  value: "3m"  },
  { label: "6m",  value: "6m"  },
  { label: "12m", value: "12m" },
]

export function TimeRangeSelector({
  value,
  onChange,
}: {
  value: TimeRange
  onChange: (v: TimeRange) => void
}) {
  return (
    <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
      {RANGES.map((r) => (
        <button
          key={r.value}
          type="button"
          onClick={() => onChange(r.value)}
          className={cn(
            "flex h-7 items-center rounded-md px-3 text-xs transition-colors",
            value === r.value
              ? "bg-background text-foreground shadow-sm font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}

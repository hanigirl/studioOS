import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TimeRange } from "./types"

const RANGES: { label: string; value: TimeRange }[] = [
  { label: "Weekly",    value: "7d"  },
  { label: "Monthly",   value: "30d" },
  { label: "Quarterly", value: "3m"  },
  { label: "6 Months",  value: "6m"  },
  { label: "Yearly",    value: "12m" },
]

export function TimeRangeSelector({
  value,
  onChange,
}: {
  value: TimeRange
  onChange: (v: TimeRange) => void
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as TimeRange)}>
      <SelectTrigger className="h-8 w-32 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {RANGES.map((r) => (
          <SelectItem key={r.value} value={r.value}>
            {r.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

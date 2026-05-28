import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "./types"

const STATS = [
  { label: "Total",        filter: (t: Task) => true              },
  { label: "To Do",        filter: (t: Task) => t.status === "To Do"        },
  { label: "In Progress",  filter: (t: Task) => t.status === "In Progress"  },
  { label: "Completed",    filter: (t: Task) => t.status === "Completed"    },
] as const

export function TaskStatsRow({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {STATS.map(({ label, filter }) => (
        <Card key={label}>
          <CardContent className="p-4 pt-3 pb-3 space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{tasks.filter(filter).length}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

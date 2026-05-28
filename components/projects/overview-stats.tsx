import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PulseProject } from "./types"

export function OverviewStats({ projects }: { projects: PulseProject[] }) {
  const active    = projects.filter(p => p.status !== "Done").length
  const inReview  = projects.filter(p => p.status === "Review").length
  const completed = projects.filter(p => p.status === "Done").length
  const overdue   = projects.filter(p => p.overdue).length

  const stats = [
    { title: "Active Projects", value: String(active),    caption: "Excluding completed" },
    { title: "In Review",       value: String(inReview),  caption: "Awaiting client feedback" },
    { title: "Completed",       value: String(completed), caption: "Across all clients" },
    { title: "Overdue",         value: String(overdue),   caption: "Past deadline" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.title}>
          <CardHeader>
            <CardTitle className="text-base font-medium leading-6">
              {s.title}
            </CardTitle>
            <p className="text-2xl font-bold leading-8 tracking-tight text-card-foreground">
              {s.value}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{s.caption}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

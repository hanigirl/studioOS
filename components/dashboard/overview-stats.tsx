import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DashboardStat {
  title: string
  value: string
  caption: string
}

const stats: DashboardStat[] = [
  { title: "Tasks Completed", value: "34", caption: "+12% from last week" },
  { title: "To Do", value: "12", caption: "-3 from last week" },
  { title: "Weekly Rating", value: "4.8", caption: "+0.3 from last week" },
  { title: "Active Clients", value: "8", caption: "+2 from last month" },
]

export function OverviewStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.title}>
          <CardHeader>
            <CardTitle className="text-base font-medium leading-6">
              {s.title}
            </CardTitle>
            <p className="text-2xl font-bold leading-8 tracking-tight">
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

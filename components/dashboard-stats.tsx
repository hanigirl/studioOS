import { StatCard } from "@/components/stat-card"

interface DashboardStat {
  title: string
  value: string
  change: string
  trend: string
  caption: string
}

const stats: DashboardStat[] = [
  {
    title: "Tasks Completed",
    value: "34",
    change: "+12%",
    trend: "Trending up this week",
    caption: "12% more tasks closed than last week",
  },
  {
    title: "To Do",
    value: "12",
    change: "-3",
    trend: "Down from last week",
    caption: "3 fewer tasks than last week",
  },
  {
    title: "Weekly Rating",
    value: "4.8",
    change: "+0.3",
    trend: "Trending up this week",
    caption: "0.3 higher than last week",
  },
  {
    title: "Active Clients",
    value: "8",
    change: "+2",
    trend: "New clients this month",
    caption: "2 more than last month",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
    </div>
  )
}

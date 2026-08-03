export interface DashboardStat {
  label: string
  value: string
  /** Shown inside the badge, e.g. "+12%" */
  change: string
  trend: "up" | "down"
  /** Trend line below the value, e.g. "Trending up this month" */
  trendText: string
  /** Muted caption at the bottom of the card */
  caption: string
}

export const dashboardStats: DashboardStat[] = [
  {
    label: "Tasks Completed",
    value: "34",
    change: "+12%",
    trend: "up",
    trendText: "Trending up this month",
    caption: "34 tasks completed this week",
  },
  {
    label: "To Do",
    value: "12",
    change: "-3",
    trend: "down",
    trendText: "Down from last week",
    caption: "3 fewer than last week",
  },
  {
    label: "Weekly Rating",
    value: "4.8",
    change: "+0.3",
    trend: "up",
    trendText: "Improving steadily",
    caption: "Average client satisfaction score",
  },
  {
    label: "Active Clients",
    value: "8",
    change: "+2",
    trend: "up",
    trendText: "Growing this month",
    caption: "2 new clients since last month",
  },
]

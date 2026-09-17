export interface DashboardStat {
  label: string
  value: string
  /** Muted caption at the bottom of the card */
  caption: string
}

export const dashboardStats: DashboardStat[] = [
  {
    label: "Tasks Completed",
    value: "34",
    caption: "+12% from last week",
  },
  {
    label: "To Do",
    value: "12",
    caption: "-3 from last week",
  },
  {
    label: "Weekly Rating",
    value: "4.8",
    caption: "+0.3 from last week",
  },
  {
    label: "Active Clients",
    value: "8",
    caption: "+2 from last month",
  },
]

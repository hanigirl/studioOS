import type { LucideIcon } from "lucide-react"
import type { ProjectStatus } from "@/components/projects/types"

export type TimeRange = "7d" | "30d" | "3m" | "6m" | "12m"

export interface KpiData {
  label: string
  value: string        // pre-formatted: "$18,400" | "87"
  delta: string        // "+14%" | "−1"
  deltaPositive: boolean
  icon: LucideIcon
}

export interface RevenueDataPoint {
  period: string
  revenue: number
}

export interface TasksDataPoint {
  period: string
  completed: number
}

export interface StatusDataPoint {
  status: string
  count: number
  colorKey: string     // key in chart component's ChartConfig
}

export interface WorkloadDataPoint {
  member: string
  tasks: number
  colorKey: string
}

export interface ClientDataPoint {
  client: string
  revenue: number
  colorKey: string
}

export interface ProjectPerformanceRow {
  id: string
  name: string
  subtitle: string
  client: string
  clientLogo: string
  status: ProjectStatus
  tasksDone: number
  tasksTotal: number
  overdueTasks: number
  revenue: number      // 0 → render "—"
  lastActivity: string // relative string e.g. "2 days ago"
}

export interface AnalyticsData {
  kpis: KpiData[]
  revenue: RevenueDataPoint[]
  tasks: TasksDataPoint[]
  statusBreakdown: StatusDataPoint[]
  workload: WorkloadDataPoint[]
  clientBreakdown: ClientDataPoint[]
  projectRows: ProjectPerformanceRow[]
}

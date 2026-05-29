"use client"

import { useEffect, useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { analyticsData } from "@/components/analytics/data"
import { AnalyticsKpiCard } from "@/components/analytics/kpi-card"
import { TimeRangeSelector } from "@/components/analytics/time-range-selector"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { TasksCompletedChart } from "@/components/analytics/tasks-completed-chart"
import { ProjectsByStatusChart } from "@/components/analytics/projects-by-status-chart"
import { TeamWorkloadChart } from "@/components/analytics/team-workload-chart"
import { ClientBreakdownChart } from "@/components/analytics/client-breakdown-chart"
import { ProjectPerformanceTable } from "@/components/analytics/project-performance-table"
import { AnalyticsSkeleton } from "@/components/analytics/analytics-skeleton"
import type { TimeRange } from "@/components/analytics/types"

export default function AnalyticsPage() {
  const [range, setRange]       = useState<TimeRange>("6m")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const data = analyticsData[range]

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-3">

        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Studio performance overview
            </p>
          </div>
          <TimeRangeSelector value={range} onChange={setRange} />
        </div>

        {isLoading ? (
          <AnalyticsSkeleton />
        ) : (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {data.kpis.map((kpi) => (
                <AnalyticsKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </div>

            {/* Charts row 1: Revenue (wide) + Status donut */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">
              <RevenueChart data={data.revenue} />
              <ProjectsByStatusChart data={data.statusBreakdown} />
            </div>

            {/* Charts row 2: Tasks + Workload + Client breakdown */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <TasksCompletedChart data={data.tasks} />
              <TeamWorkloadChart data={data.workload} />
              <ClientBreakdownChart data={data.clientBreakdown} />
            </div>

            {/* Project Performance table */}
            <ProjectPerformanceTable rows={data.projectRows} />
          </>
        )}

      </div>
    </TooltipProvider>
  )
}

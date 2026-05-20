import { ReportsKpiCard } from "@/components/reports-kpi-card"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Key performance indicators across your studio.
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <ReportsKpiCard
          title="Total Revenue"
          value="$1,250.00"
          change="+12.5%"
          trend="up"
          description="Trending up this month"
          footnote="Visitors for the last 6 months"
        />
        <ReportsKpiCard
          title="New Customers"
          value="1,234"
          change="-20%"
          trend="down"
          description="Down 20% this period"
          footnote="Acquisition needs attention"
        />
        <ReportsKpiCard
          title="Active Accounts"
          value="45,678"
          change="+12.5%"
          trend="up"
          description="Strong user retention"
          footnote="Engagement exceed targets"
        />
        <ReportsKpiCard
          title="Growth Rate"
          value="1,234"
          change="+4.5%"
          trend="up"
          description="Steady performance increase"
          footnote="Meets growth projections"
        />
      </div>
    </div>
  )
}

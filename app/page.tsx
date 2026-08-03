import { ActiveProjects } from "@/components/active-projects"
import { dashboardStats } from "@/components/dashboard/data"
import { StatCard } from "@/components/dashboard/stat-card"
import { RecentSalesTable } from "@/components/dashboard/recent-sales-table"
import { IncomeChart } from "@/components/income-chart"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <IncomeChart className="lg:col-span-2" />
        <RecentSalesTable className="lg:col-span-1" />
      </div>

      <ActiveProjects />
    </div>
  )
}

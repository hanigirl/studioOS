import { StatCard } from "@/components/dashboard/stat-card"
import { dashboardStats } from "@/components/dashboard/data"
import { IncomeChart } from "@/components/income-chart"
import { RecentSales } from "@/components/recent-sales"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IncomeChart />
        </div>
        <RecentSales />
      </div>
    </div>
  )
}

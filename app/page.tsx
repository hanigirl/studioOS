import { IncomeChart } from "@/components/income-chart"
import { RecentSales } from "@/components/recent-sales"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          An overview of your studio&apos;s performance
        </p>
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <IncomeChart />
        </div>
        <div className="lg:col-span-2">
          <RecentSales />
        </div>
      </div>

      <UpcomingDeadlines />
    </div>
  );
}

import { OverviewStats } from "@/components/dashboard/overview-stats";
import { RecentSalesTable } from "@/components/dashboard/recent-sales-table";
import { IncomeChart } from "@/components/income-chart";
import { RecentSales } from "@/components/recent-sales";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <OverviewStats />
      <div className="grid gap-4 lg:grid-cols-3">
        <IncomeChart className="lg:col-span-2" />
        <RecentSalesTable className="lg:col-span-1" />
      </div>
      <RecentSales />
    </div>
  );
}

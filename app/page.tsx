import { ActiveProjects } from "@/components/active-projects/active-projects";
import { DashboardStats } from "@/components/dashboard-stats";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { IncomeChart } from "@/components/income-chart";
import { RecentSales } from "@/components/recent-sales/recent-sales";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <DashboardTabs
        overview={
          <>
            <DashboardStats />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <IncomeChart />
              </div>
              <RecentSales />
            </div>
            <ActiveProjects />
          </>
        }
      />
    </div>
  );
}

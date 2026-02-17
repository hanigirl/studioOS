import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { IncomeChart } from "@/components/income-chart";
import { RecentSales } from "@/components/recent-sales";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Subscriptions"
          value="+2350"
          change="+180.1% from last month"
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Sales"
          value="+12,234"
          change="-3% from last month"
          trend="down"
          icon={CreditCard}
        />
        <StatCard
          title="Active Now"
          value="+573"
          change="+201 since last hour"
          trend="up"
          icon={Activity}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <IncomeChart />
        </div>
        <div className="lg:col-span-3">
          <RecentSales />
        </div>
      </div>
    </div>
  );
}

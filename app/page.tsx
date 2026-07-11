import { Bell, CheckCircle2, ListTodo, Plus, Star, Users } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { RecentSales } from "@/components/recent-sales";
import { IncomeChart } from "@/components/income-chart";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button className="bg-[#7B57E0] text-white hover:bg-[#7B57E0]/90">
            <Plus />
            Issue Report
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tasks Completed"
          value="34"
          change="+12% from last week"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="To Do"
          value="12"
          change="-3 from last week"
          icon={ListTodo}
          color="amber"
        />
        <StatCard
          title="Weekly Rating"
          value="4.8"
          change="+0.3 from last week"
          icon={Star}
          color="violet"
        />
        <StatCard
          title="Active Clients"
          value="8"
          change="+2 from last month"
          icon={Users}
          color="blue"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentSales />
        <IncomeChart />
      </div>
    </div>
  );
}

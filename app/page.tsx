import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { IncomeChart } from "@/components/income-chart";

const stats = [
  { title: "Tasks Completed", value: "34", change: "+12% from last week" },
  { title: "To Do",           value: "12", change: "-3 from last week" },
  { title: "Weekly Rating",   value: "4.8", change: "+0.3 from last week" },
  { title: "Active Clients",  value: "8",  change: "+2 from last month" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <div className="space-y-4 lg:w-fit">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Overview</h1>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0 space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                  <Card key={s.title} className="w-56">
                    <CardContent className="p-4 pt-3 pb-3 space-y-1">
                      <p className="text-sm text-muted-foreground">{s.title}</p>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className={cn(
                        "text-xs",
                        s.change.startsWith("+")
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      )}>{s.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <IncomeChart />
            </div>
          </TabsContent>

          <TabsContent value="today" className="mt-0">
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

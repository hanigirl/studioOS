import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HealthDot } from "@/components/projects/health-badge"
import {
  computeHealth,
  danielProjects,
  dueValue,
  overflowExtras,
  statusStyles,
} from "@/components/projects/data"
import { cn } from "@/lib/utils"

const upcomingDeadlines = [...danielProjects, ...overflowExtras]
  .filter((project) => project.tasksDone < project.tasksTotal)
  .sort((a, b) => dueValue(a.due) - dueValue(b.due))
  .slice(0, 5)

export function UpcomingDeadlines() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>
          Top 5 projects due soonest with tasks still remaining
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">
              View all projects
              <ArrowUpRight />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 text-left font-medium">Project</th>
                <th className="px-3 py-3 text-left font-medium">Client</th>
                <th className="px-3 py-3 text-left font-medium">Status</th>
                <th className="px-3 py-3 text-left font-medium">
                  <span className="inline-flex items-center gap-1">
                    Due Date
                    <ArrowDown className="size-3" aria-hidden />
                  </span>
                </th>
                <th className="px-3 py-3 text-left font-medium">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {upcomingDeadlines.map((project, index) => {
                const health = computeHealth(project)
                const isOverdue = project.overdue || project.daysToDeadline < 0
                const pct =
                  project.tasksTotal === 0
                    ? 0
                    : Math.round((project.tasksDone / project.tasksTotal) * 100)

                return (
                  <tr
                    key={project.id}
                    className={cn(
                      "hover:bg-muted/40 transition-colors",
                      index < upcomingDeadlines.length - 1 &&
                        "border-b border-border"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold leading-tight">
                          {project.name}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {project.subtitle}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarImage
                            src={project.clientLogo}
                            alt={project.client}
                          />
                          <AvatarFallback>{project.client[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{project.client}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="inline-flex items-center gap-2">
                        <HealthDot health={health} />
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                            statusStyles[project.status]
                          )}
                        >
                          {project.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={cn(
                          "text-sm font-medium tabular-nums",
                          isOverdue && "text-destructive"
                        )}
                      >
                        {project.due}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-1.5 w-24 overflow-hidden rounded-full bg-muted"
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${project.tasksDone} of ${project.tasksTotal} tasks done (${pct}%)`}
                        >
                          <div
                            className="h-full rounded-full bg-primary transition-[width] duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {project.tasksDone}/{project.tasksTotal}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

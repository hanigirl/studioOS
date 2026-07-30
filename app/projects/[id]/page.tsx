import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { computeHealth, danielProjects, overflowExtras } from "@/components/projects/data"
import { HealthBadge } from "@/components/projects/health-badge"
import { PulseTaskRow } from "@/components/projects/project-pulse-card"
import { cn } from "@/lib/utils"

const allProjects = [...danielProjects, ...overflowExtras]

// Only "App Redesign" has a real detail page for now — the rest of the
// rows in AllProjectsTable aren't linked yet, so their ids are omitted.
export function generateStaticParams() {
  return [{ id: "wix-app-redesign" }]
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = allProjects.find((p) => p.id === id)
  if (!project) notFound()

  const health = computeHealth(project)
  const pct =
    project.tasksTotal === 0
      ? 0
      : Math.round((project.tasksDone / project.tasksTotal) * 100)
  const isOverdue = project.overdue || project.daysToDeadline < 0

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/projects">
          <ArrowLeft />
          Back to projects
        </Link>
      </Button>

      <div className="flex items-start gap-4">
        <Avatar size="lg">
          <AvatarImage src={project.clientLogo} alt={project.client} />
          <AvatarFallback>{project.client[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {project.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {project.client} · {project.subtitle}
          </p>
        </div>
        <HealthBadge health={health} reason={project.healthReason} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>
              {project.tasksDone} of {project.tasksTotal} tasks done
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium tabular-nums">
                  {pct}% complete
                </span>
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    isOverdue
                      ? "font-medium text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  Due {project.due}
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-1.5">
              {project.nextTasks.map((task) => (
                <li key={task.id}>
                  <PulseTaskRow task={task} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium">{project.status}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due date</p>
              <p
                className={cn(
                  "text-sm font-medium",
                  isOverdue && "text-destructive"
                )}
              >
                {project.due}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Team</p>
              <AvatarGroup aria-label={`Team on ${project.name}`}>
                {project.team.map((m) => (
                  <Avatar key={m.name} size="sm" aria-label={m.name}>
                    <AvatarFallback className={cn("text-white", m.color)}>
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

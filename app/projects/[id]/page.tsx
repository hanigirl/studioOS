import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react"
import { danielProjects, overflowExtras } from "@/components/projects/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { statusStyles } from "@/components/projects/status-styles"

const allProjects = [...danielProjects, ...overflowExtras]

export function generateStaticParams() {
  return allProjects.map((p) => ({ id: p.id }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = allProjects.find((p) => p.id === id)
  if (!project) notFound()

  const taskPct =
    project.tasksTotal === 0
      ? 0
      : Math.round((project.tasksDone / project.tasksTotal) * 100)
  const isOverdue = project.overdue || project.daysToDeadline < 0

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/projects" aria-label="Back to Projects">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div className="space-y-0.5">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium",
            statusStyles[project.status]
          )}
        >
          {project.status}
        </span>
      </div>

      {/* Detail cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Client */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src={project.clientLogo} alt={project.client} />
                <AvatarFallback>{project.client[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{project.client}</span>
            </div>
          </CardContent>
        </Card>

        {/* Due date */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Due Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span className={cn("font-semibold", isOverdue && "text-destructive")}>
                {project.due}
              </span>
              {isOverdue && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  Overdue
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AvatarGroup>
                {project.team.map((m) => (
                  <Avatar key={m.name} size="sm">
                    <AvatarFallback className={cn("text-white", m.color)}>
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span className="text-sm text-muted-foreground">
                {project.team.map((m) => m.name).join(", ")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tasks progress */}
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {project.tasksDone} / {project.tasksTotal} completed
              </span>
              <span className="font-medium tabular-nums">{taskPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  taskPct === 100 ? "bg-emerald-500" : "bg-primary"
                )}
                style={{ width: `${taskPct}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Figma link */}
        {project.figmaUrl && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Figma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink className="size-4" />
                Open in Figma
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

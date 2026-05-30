import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { danielProjects, overflowExtras } from "@/components/projects/data"
import { statusStyles } from "@/components/projects/status-styles"

const projects = [...danielProjects, ...overflowExtras]

export function RecentSales() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>
            {projects.length} projects in progress.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild className="shrink-0 group">
          <Link href="/projects">
            View all projects
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {projects.map((project) => (
            <div key={project.name} className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarImage src={project.clientLogo} alt={project.client} />
                <AvatarFallback>{project.client[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">
                  {project.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.client}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                  statusStyles[project.status]
                )}
              >
                {project.status}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground w-14 text-right">
                {project.due}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

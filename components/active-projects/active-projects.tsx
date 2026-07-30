import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { activeProjects } from "./data"

export function ActiveProjects() {
  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>
            {activeProjects.length} projects in progress.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild className="shrink-0">
          <Link href="/projects">
            View all projects
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        {activeProjects.map((project) => (
          <div key={project.name} className="flex items-center gap-3">
            <Image
              src={project.logo}
              alt={project.client}
              className="size-8 shrink-0 object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-none font-medium">
                {project.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.client}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                project.status === "In Review"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              )}
            >
              {project.status}
            </span>
            <span className="w-14 shrink-0 text-right text-xs text-muted-foreground">
              {project.deadline}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

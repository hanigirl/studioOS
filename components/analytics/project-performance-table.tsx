import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { TaskProgressBar } from "@/components/ui/progress-bar"
import { statusStyles } from "@/components/projects/status-styles"
import type { ProjectPerformanceRow } from "./types"

const ROW_LIMIT = 4

function formatRevenue(value: number) {
  if (value === 0) return null
  return `$${value.toLocaleString()}`
}


export function ProjectPerformanceTable({ rows }: { rows: ProjectPerformanceRow[] }) {
  const visible = rows.slice(0, ROW_LIMIT)
  const hidden  = rows.length - visible.length

  return (
    <Card className="transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="px-6 pb-2">
        <CardTitle className="text-base font-semibold">Project Performance</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 w-[180px] text-sm">Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="min-w-[90px]">Progress</TableHead>
              <TableHead className="pr-4">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-center py-6">
                    <p className="text-sm text-muted-foreground">No projects for this period</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              visible.map((row) => (
                <TableRow key={row.id} className="h-9">
                  <TableCell className="pl-6 py-1.5 w-[180px]">
                    <span className="text-sm font-medium leading-tight truncate block max-w-[160px]">
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell className="py-1.5">
                    <span className="text-sm text-muted-foreground">{row.client}</span>
                  </TableCell>
                  <TableCell className="py-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[row.status])}>
                        {row.status}
                      </span>
                      {row.overdueTasks > 0 && (
                        <span className="text-xs font-medium text-destructive tabular-nums">
                          {row.overdueTasks} overdue
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-1.5">
                    <TaskProgressBar done={row.tasksDone} total={row.tasksTotal} compact size="sm" />
                  </TableCell>
                  <TableCell className="pr-4 py-1.5 tabular-nums text-sm">
                    {formatRevenue(row.revenue) ?? (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {hidden > 0 && (
          <div className="border-t border-border px-6 pt-[19px] pb-[5px]">
            <p className="text-xs text-muted-foreground">+{hidden} more project{hidden !== 1 ? "s" : ""}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

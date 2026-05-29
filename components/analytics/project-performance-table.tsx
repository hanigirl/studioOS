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
import { statusStyles } from "@/components/projects/status-styles"
import type { ProjectPerformanceRow } from "./types"

const ROW_LIMIT = 4

function formatRevenue(value: number) {
  if (value === 0) return null
  return `$${value.toLocaleString()}`
}

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const complete = done === total
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            complete ? "bg-emerald-500" : "bg-primary"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground shrink-0 w-[28px] text-right">
        {pct}%
      </span>
    </div>
  )
}

export function ProjectPerformanceTable({ rows }: { rows: ProjectPerformanceRow[] }) {
  const visible = rows.slice(0, ROW_LIMIT)
  const hidden  = rows.length - visible.length

  return (
    <Card>
      <CardHeader className="px-4 py-3 pb-1">
        <CardTitle className="text-sm font-medium">Project Performance</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4 w-[180px]">Project</TableHead>
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
                  <TableCell className="pl-4 py-1.5 w-[180px]">
                    <span className="text-sm font-medium leading-tight truncate block max-w-[160px]">
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell className="py-1.5">
                    <span className="text-sm text-muted-foreground">{row.client}</span>
                  </TableCell>
                  <TableCell className="py-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium", statusStyles[row.status])}>
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
                    <ProgressBar done={row.tasksDone} total={row.tasksTotal} />
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
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground">+{hidden} more project{hidden !== 1 ? "s" : ""}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

# PRD: Analytics Screen

## 1. Screen Overview

The Analytics screen lives at `/analytics` inside the Studio OS app shell (sidebar + header). It gives studio owners, project managers, and studio leads a single place to evaluate studio performance across revenue, project health, task throughput, team workload, and client activity. The screen replaces the current placeholder (`app/analytics/page.tsx`) and is fully client-side with static mock data — no backend or API in v1.

---

## 2. User Goals

- See monthly revenue at a glance and understand the trend over time.
- Identify which projects are overdue or at risk before they escalate.
- Understand how workload is distributed across the team.
- Evaluate which clients or projects are generating the most revenue and activity.
- Filter all data by a time period without navigating away.

---

## 3. Business Goals

- Establish Analytics as the authoritative performance screen — the go-to place for end-of-week or end-of-month reviews.
- Surface bottlenecks (overdue tasks, stalled projects) proactively in the same view as revenue data.
- Build a foundation that can be wired to real data in v2 with no structural changes.

---

## 4. Primary Users

| Role | Context | Frequency |
|---|---|---|
| Studio Owner | Reviews revenue, client health, team load | Weekly / monthly |
| Project Manager | Monitors overdue tasks, project status, bottlenecks | Daily / weekly |
| Studio Lead | Tracks team workload balance and task throughput | Weekly |

---

## 5. Main Use Cases

**UC-01 — Revenue overview**
Trigger: User opens Analytics. Action: Sees the monthly revenue KPI and the revenue-over-time chart. Outcome: Understands revenue trend for the selected period.

**UC-02 — Change time period**
Trigger: User clicks a time range button (7d / 30d / 3m / 6m / 12m). Action: All KPI cards, charts, and the table update to reflect the selected range. Outcome: User can compare performance across periods without navigating away.

**UC-03 — Identify overdue and at-risk projects**
Trigger: User scans the Overdue & Risk Insights section. Action: Reads the alert cards listing overdue projects and at-risk items. Outcome: Takes action (navigates to the project) before reviewing further.

**UC-04 — Evaluate team workload**
Trigger: User reviews the Team Workload chart. Action: Compares task count per team member for the period. Outcome: Identifies imbalance or overloaded members.

**UC-05 — Review project performance table**
Trigger: User scrolls to the Project Performance table. Action: Reads per-project data — status, progress, overdue tasks, revenue, last activity. Outcome: Can prioritize follow-ups with clients or team members.

---

## 6. Functional Requirements

**FR-01** — The page must render a global time range selector with options: 7d · 30d · 3m · 6m · 12m. Default selection is 6m.

**FR-02** — Changing the time range must update all KPI cards, all six charts, and the Project Performance table simultaneously.

**FR-03** — Five KPI cards must appear at the top: Monthly Revenue · Active Projects · Completed Tasks · Overdue Tasks · Team Workload (average tasks per member). Each shows the value and a delta vs. the previous equivalent period (e.g. +12% vs. last 6m).

**FR-04** — Revenue Over Time chart: line chart, one data point per week or month depending on range, x-axis = date, y-axis = revenue in USD.

**FR-05** — Tasks Completed chart: bar chart, tasks completed per period bucket (week/month), colored with `bg-primary` equivalent.

**FR-06** — Projects by Status chart: donut chart, segments = Discovery / Design / Review / Handoff / Done. Uses the same status color palette as `all-projects-table.tsx` (`statusStyles`).

**FR-07** — Team Workload chart: horizontal bar chart, one bar per team member, value = active task count. Uses team member avatar colors from `components/projects/data.ts`.

**FR-08** — Client Breakdown chart: bar chart, one bar per client, value = revenue attributed to that client for the period.

**FR-09** — Overdue & Risk Insights section: shows a list of alert cards — one per project that is overdue or at risk. Each card shows project name, client, health status (Critical / At Risk), and a reason string. Uses the `emerald-*` / `amber-*` / `red-*` status color triad. Links to `/projects/[id]` (no deep drilldown in v1).

**FR-10** — Project Performance table: columns are Project · Client · Status · Progress · Completed Tasks · Overdue Tasks · Revenue · Last Activity. Missing values display as `—`. Status uses the `statusStyles` pill pattern. Progress uses the inline progress bar from `all-projects-table.tsx`.

**FR-11** — All sections must render a loading skeleton state during simulated load (match the 1 400 ms pattern used in `AllProjectsTable`).

**FR-12** — All sections must render an empty state when filtered data returns zero results. Empty state shows a muted icon + label + sub-label.

**FR-13** — All monetary values display as USD with thousands separator (e.g. `$12,400`). No decimals unless the value is below `$100`.

---

## 7. Content Requirements

### KPI Labels and Values (static mock, 6m default)

| Card | Value | Delta |
|---|---|---|
| Monthly Revenue | $18,400 | +14% vs. prev. 6m |
| Active Projects | 6 | +2 vs. prev. 6m |
| Completed Tasks | 87 | +23% vs. prev. 6m |
| Overdue Tasks | 3 | −1 vs. prev. 6m |
| Avg. Tasks / Member | 17.4 | +4% vs. prev. 6m |

### Chart Data (static mock)

All chart data lives in `components/analytics/data.ts` keyed by time range. See Section 14 for the TypeScript shape.

### Table Columns

| Column | Type | Notes |
|---|---|---|
| Project | string | Project name + subtitle (two-line cell) |
| Client | string | Avatar + name, same pattern as Projects table |
| Status | ProjectStatus | `statusStyles` pill |
| Progress | number | Inline progress bar (done/total) |
| Completed Tasks | number | Integer |
| Overdue Tasks | number | Integer, red text if > 0 |
| Revenue | number | USD formatted |
| Last Activity | string | Relative date string e.g. "2 days ago" |

### Empty State Copy

- Icon: `BarChart3` (lucide)
- Heading: "No data for this period"
- Sub-label: "Try selecting a wider time range."

### Error State Copy

- Icon: `AlertCircle` (lucide)
- Heading: "Could not load analytics"
- Sub-label: "Refresh the page or try again later."

---

## 8. UX Requirements

**UX-01** — Time range selector is sticky within the page header area (not globally sticky in the app shell). It renders as a pill-toggle group, same pattern as the view toggle in `AllProjectsTable`.

**UX-02** — KPI delta values use color: positive delta = `text-emerald-600 dark:text-emerald-400`, negative delta = `text-red-600 dark:text-red-400`, neutral = `text-muted-foreground`. This matches the existing Dashboard KPI card pattern in `app/page.tsx`.

**UX-03** — Overdue & Risk Insights section appears before the charts if there are any at-risk or overdue projects, so the user sees action items first. If there are none, the section is hidden (not an empty state — just absent).

**UX-04** — Chart tooltips must show the exact value on hover. Use `ChartTooltip` from `components/ui/chart.tsx`.

**UX-05** — Project Performance table rows are not clickable in v1 (no row navigation — that already exists on the Projects screen). The table is read-only.

**UX-06** — All number values in the table use `tabular-nums` for alignment.

**UX-07** — The loading state uses `Skeleton` from `components/ui/skeleton.tsx` matching the shape of each section (card skeletons for KPIs, rectangular skeletons for charts, row skeletons for the table).

---

## 9. UI Requirements

**UI-01 — Page header**
Same pattern as Projects page: page title (`text-3xl font-bold tracking-tight`) + subtitle (`text-sm text-muted-foreground`) on the left. Time range selector on the right.

**UI-02 — Time range selector**
Pill-toggle group. Same visual pattern as the Grid/List view toggle in `AllProjectsTable`: `rounded-lg border border-border bg-muted/40 p-0.5`, active pill = `bg-background text-foreground shadow-sm`, inactive = `text-muted-foreground hover:text-foreground`. Labels: `7d` · `30d` · `3m` · `6m` · `12m`.

**UI-03 — KPI cards row**
Five cards in a responsive grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`. Use `Card` + `CardContent` from `components/ui/card.tsx`. Same layout as `app/page.tsx` stats cards: label (`text-sm text-muted-foreground`) → value (`text-2xl font-bold`) → delta (`text-xs`).

**UI-04 — Charts grid**
Two rows of charts below the KPI cards:
- Row 1: Revenue Over Time (full width, `col-span-full` or `lg:col-span-4`) + Projects by Status donut (`lg:col-span-2`). Grid: `grid-cols-1 lg:grid-cols-6`.
- Row 2: Tasks Completed (half width) + Team Workload (half width). Grid: `grid-cols-1 lg:grid-cols-2`.
- Row 3: Client Breakdown (full width).

Each chart lives inside a `Card` with `CardHeader` (title + optional subtitle) and `CardContent`. Use `ChartContainer` from `components/ui/chart.tsx` wrapping recharts components.

**UI-05 — Overdue & Risk Insights**
Renders as a horizontal scrollable row of compact alert cards between the KPI row and the charts. Each card: `rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-900/20` for At Risk; `border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-900/20` for Critical. Contains project name, client, health badge (reuse `HealthBadge` from `components/projects/health-badge.tsx`), and reason string.

**UI-06 — Project Performance table**
Use `Card` wrapping a `<table>` element, identical structure to the table view in `AllProjectsTable`. `CardHeader` with title "Project Performance". No sorting in v1. Status pill uses `statusStyles` from `components/analytics/analytics-table.tsx` (copy the record from `all-projects-table.tsx`). Progress bar: same inline `<div>` pattern as `TaskProgress` in `all-projects-table.tsx`.

**UI-07 — Spacing and layout**
Page wrapper: `space-y-6`. Section spacing matches Projects page. Standard page padding is handled by the root layout — do not add extra padding to the page component.

---

## 10. Components Needed

### Existing — Reuse

| Component | Location | Usage |
|---|---|---|
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` | `components/ui/card.tsx` | KPI cards, chart cards, table card |
| `Skeleton` | `components/ui/skeleton.tsx` | All loading states |
| `ChartContainer`, `ChartTooltip` | `components/ui/chart.tsx` | Wrapping all recharts charts |
| `Avatar`, `AvatarFallback`, `AvatarImage` | `components/ui/avatar.tsx` | Client column in table |
| `Separator` | `components/ui/separator.tsx` | Dividers where needed |
| `HealthBadge` | `components/projects/health-badge.tsx` | Overdue & Risk insight cards |
| `statusStyles` record | `all-projects-table.tsx` (copy, do not import) | Status pills in table |

### New — Build

| Component | File | Description |
|---|---|---|
| `AnalyticsKpiCard` | `components/analytics/kpi-card.tsx` | Card showing label, value, delta. Composes `Card` + `CardContent`. Accepts `label`, `value`, `delta`, `deltaPositive` props. |
| `TimeRangeSelector` | `components/analytics/time-range-selector.tsx` | Pill-toggle for 7d/30d/3m/6m/12m. Accepts `value`, `onChange`. Pure presentational. |
| `RevenueChart` | `components/analytics/revenue-chart.tsx` | `ChartContainer` + recharts `LineChart`. |
| `TasksCompletedChart` | `components/analytics/tasks-completed-chart.tsx` | `ChartContainer` + recharts `BarChart`. |
| `ProjectsByStatusChart` | `components/analytics/projects-by-status-chart.tsx` | `ChartContainer` + recharts `PieChart` (donut via `innerRadius`). |
| `TeamWorkloadChart` | `components/analytics/team-workload-chart.tsx` | `ChartContainer` + recharts `BarChart` horizontal. |
| `ClientBreakdownChart` | `components/analytics/client-breakdown-chart.tsx` | `ChartContainer` + recharts `BarChart`. |
| `RiskInsightsSection` | `components/analytics/risk-insights-section.tsx` | Horizontal scroll row of alert cards. Returns `null` when no at-risk projects. |
| `ProjectPerformanceTable` | `components/analytics/project-performance-table.tsx` | Read-only table in a `Card`. Composes `Avatar`, status pill, progress bar. |
| `AnalyticsSkeleton` | `components/analytics/analytics-skeleton.tsx` | Full-page skeleton matching the layout. |

---

## 11. States

### KPI Cards
- **Default:** Value + delta displayed.
- **Loading:** Three `Skeleton` lines per card (label, value, delta).
- **Empty:** Value shows `—`, delta hidden.

### Charts
- **Default:** Chart renders with data.
- **Loading:** Rectangular `Skeleton` matching the chart's expected height (`h-48` or `h-64`).
- **Empty:** Centered `BarChart3` icon + "No data for this period" text inside the card body.
- **Error:** `AlertCircle` icon + error message inside the card body.

### Overdue & Risk Insights
- **Has items:** Horizontal row of alert cards visible.
- **No items:** Section is completely absent from the DOM (do not render an empty state here).

### Project Performance Table
- **Default:** Rows with data.
- **Loading:** 5 skeleton rows, each matching column widths.
- **Empty:** Full-width cell spanning all columns, centered `BarChart3` icon + "No projects for this period".
- **Long project name:** Truncate at one line with `truncate max-w-[160px]` + `Tooltip` showing full name.
- **Missing value:** Display `—` in `text-muted-foreground/40`.

---

## 12. Edge Cases

- **Zero revenue period:** Revenue chart renders an empty state inside the chart card, not a broken axis.
- **Single team member:** Team Workload chart renders correctly with one bar.
- **All projects healthy:** Risk Insights section is absent; no empty state shown.
- **Very large revenue value:** `$1,240,000` — ensure the KPI card value doesn't overflow its card width on small screens. Use `text-xl` fallback if `text-2xl` overflows (handle with `truncate`).
- **One project only:** Charts and table render correctly without layout breaks.
- **Time range with no completed tasks:** Tasks Completed chart shows all-zero bars, not an error.
- **Overdue tasks count = 0:** KPI delta for Overdue Tasks renders in `text-emerald-*` (fewer is better — invert the delta color logic for this metric only).

---

## 13. Success Criteria

1. Changing the time range selector updates all KPIs, all charts, and the table without a page reload.
2. The Overdue & Risk Insights section shows only projects where `health === "Critical"` or `health === "At Risk"` (derived from `computeHealth()` in `components/projects/data.ts`).
3. All monetary values display as `$XX,XXX` USD with no decimals (except sub-`$100` values).
4. The loading state (skeleton) is visible for ~1 400 ms on first mount, matching the Projects screen behavior.
5. Every chart renders a correct empty state (icon + copy) when the filtered dataset is empty.
6. The screen passes TypeScript strict-mode type check with zero errors (`npx tsc --noEmit`).

---

## 14. Implementation Notes

### Routing
- Page file: `app/analytics/page.tsx` (replace the existing placeholder).
- Must be `"use client"` — the time range selector requires React state.

### Folder structure
```
components/analytics/
├── types.ts
├── data.ts
├── kpi-card.tsx
├── time-range-selector.tsx
├── revenue-chart.tsx
├── tasks-completed-chart.tsx
├── projects-by-status-chart.tsx
├── team-workload-chart.tsx
├── client-breakdown-chart.tsx
├── risk-insights-section.tsx
├── project-performance-table.tsx
└── analytics-skeleton.tsx
```

### TypeScript types (`components/analytics/types.ts`)
```ts
export type TimeRange = "7d" | "30d" | "3m" | "6m" | "12m"

export interface KpiData {
  label: string
  value: string          // pre-formatted, e.g. "$18,400" or "87"
  delta: string          // e.g. "+14%" or "−1"
  deltaPositive: boolean // true = good direction, false = bad
}

export interface RevenueDataPoint {
  period: string   // "Jan", "Feb", "Week 1", etc.
  revenue: number
}

export interface TasksDataPoint {
  period: string
  completed: number
}

export interface StatusDataPoint {
  status: string
  count: number
  fill: string     // Tailwind class converted to hex for recharts
}

export interface WorkloadDataPoint {
  member: string
  tasks: number
  color: string    // bg-* class for avatar; hex for recharts fill
}

export interface ClientDataPoint {
  client: string
  revenue: number
}

export interface ProjectPerformanceRow {
  id: string
  name: string
  subtitle: string
  client: string
  clientLogo: string
  status: import("@/components/projects/types").ProjectStatus
  tasksDone: number
  tasksTotal: number
  overdueTasks: number
  revenue: number       // 0 = display "—"
  lastActivity: string  // "2 days ago"
}

export interface AnalyticsData {
  kpis: KpiData[]
  revenue: RevenueDataPoint[]
  tasks: TasksDataPoint[]
  statusBreakdown: StatusDataPoint[]
  workload: WorkloadDataPoint[]
  clientBreakdown: ClientDataPoint[]
  projectRows: ProjectPerformanceRow[]
}
```

### Data (`components/analytics/data.ts`)
Export a `Record<TimeRange, AnalyticsData>` named `analyticsData`. Populate with realistic-looking mock numbers derived from the 6 existing projects and 5 team members in `components/projects/data.ts`. Revenue figures should be in the $3,000–$6,000/project range per period.

### Chart library
Use recharts primitives (`LineChart`, `BarChart`, `PieChart`, `Cell`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `ResponsiveContainer`) wrapped in `ChartContainer` from `components/ui/chart.tsx`.

### Delta color inversion
The Overdue Tasks KPI card inverts the delta color: a negative delta (fewer overdue tasks) is `deltaPositive: true`. Pass this flag from `data.ts` — do not compute it in the component.

### recharts colors
recharts requires hex values for `fill` and `stroke`. Map the semantic Tailwind tokens to hex at the data layer (in `data.ts`) — do not use CSS variables inside recharts props directly, as recharts does not resolve them.

### No drilldown
The Overdue & Risk Insights cards and the Project Performance table do not navigate to project detail pages in v1. Remove any `cursor-pointer` or `onClick` from table rows.

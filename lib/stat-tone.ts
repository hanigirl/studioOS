// Semantic tone shared by every stat/KPI card in the app. Green is reserved
// for genuinely good news, amber/red flag what needs attention — mirrors the
// Healthy/At Risk/Critical triad in components/projects/health-badge.tsx.
export type StatTone = "neutral" | "positive" | "warning" | "critical"

export const statToneClasses: Record<
  StatTone,
  { card: string; caption: string }
> = {
  neutral: {
    card: "",
    caption: "text-muted-foreground",
  },
  positive: {
    card: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    caption: "text-emerald-700/80 dark:text-emerald-400/80",
  },
  warning: {
    card: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    caption: "text-amber-700/80 dark:text-amber-400/80",
  },
  critical: {
    card: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    caption: "text-red-700/80 dark:text-red-400/80",
  },
}

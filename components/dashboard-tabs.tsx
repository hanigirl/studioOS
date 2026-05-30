"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TodayContent } from "@/components/dashboard-today/today-content"
import { LoadingState as TodayLoadingState } from "@/components/dashboard-today/loading-state"

type TabValue = "overview" | "today"

const STORAGE_KEY = "studio-os.dashboard-tab"

function isTabValue(v: string | null | undefined): v is TabValue {
  return v === "overview" || v === "today"
}

interface DashboardTabsProps {
  /** The Overview tab body (existing dashboard content). */
  overview: React.ReactNode
}

/**
 * Two-tab switcher under the Dashboard heading. Persists the active tab to
 * localStorage and supports `?tab=overview|today` deep links.
 *
 * UX rationale (passes the 3-question scrutiny in nehorai.md §5.5):
 * - JTBD differs: Overview = "Am I on track this week?" (passive 5s glance),
 *   Today = "What do I do next?" (active 30s plan-the-day).
 * - You cannot reach Today's content from Overview (no daily ordering surfaced
 *   there) and vice versa — different views, different jobs.
 * - Click changes the panel content entirely; no decoration.
 */
function DashboardTabsImpl({ overview }: DashboardTabsProps) {
  const params = useSearchParams()
  const urlTab = params.get("tab")

  const [storedTab, setStoredTab] = useState<TabValue>(() => {
    if (typeof window === "undefined") return "overview"
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (isTabValue(stored)) return stored
    } catch {}
    return "overview"
  })

  // URL param takes priority over stored tab.
  const value: TabValue = isTabValue(urlTab) ? urlTab : storedTab

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
  }, [value])

  return (
    <Tabs
      value={value}
      onValueChange={(v) => { if (isTabValue(v)) setStoredTab(v) }}
      className="space-y-6"
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-6">
        {overview}
      </TabsContent>
      <TabsContent value="today" className="space-y-6">
        <TodayContent />
      </TabsContent>
    </Tabs>
  )
}

/**
 * Suspense boundary required because `useSearchParams` suspends during static
 * export prerendering.
 */
export function DashboardTabs(props: DashboardTabsProps) {
  return (
    <Suspense fallback={<TabsFallback overview={props.overview} />}>
      <DashboardTabsImpl {...props} />
    </Suspense>
  )
}

function TabsFallback({ overview }: { overview: React.ReactNode }) {
  // Static fallback: render Overview while client hydrates. Avoids layout jump
  // because TabsList + Overview heights are stable.
  return (
    <div className="space-y-6">
      <div className="bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-[3px]">
        <div className="h-[calc(100%-1px)] rounded-md bg-card px-3 py-1 text-sm font-medium">
          Overview
        </div>
        <div className="h-[calc(100%-1px)] px-3 py-1 text-sm font-medium opacity-60">
          Today
        </div>
      </div>
      <div className="space-y-6">{overview}</div>
      <div className="sr-only" aria-hidden>
        <TodayLoadingState />
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { AllProjectsTable } from "./all-projects-table"
import { AllProjectsTableSkeleton } from "./all-projects-table-skeleton"
import type { PulseProject } from "./types"

/**
 * Shows the skeleton while the projects "load", then swaps in the real table.
 * There's no backend yet, so loading is simulated with a short delay — replace
 * the timeout with a real fetch when the API lands.
 */
export function ProjectsTableLoader({
  projects,
}: {
  projects: PulseProject[]
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return loading ? (
    <AllProjectsTableSkeleton />
  ) : (
    <AllProjectsTable projects={projects} />
  )
}

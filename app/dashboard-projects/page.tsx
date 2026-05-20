// Removed 2026-05-05 — IA Phase 1 (Architecture D).
//
// `/dashboard-projects` used to be a separate Project Pulse view. We collapsed
// it into `/projects` so a single surface owns the Project entity, with an
// internal Pulse section for triage and a table for management. Two routes
// for the same entity at different angles created duplicate IA and risked a
// drift between two parallel data sources.
//
// We can't physically delete the file (no rm permission), so we render
// `notFound()` to enforce HTTP 404 — matches the user-approved decision and
// stops anyone from arriving at a stale page. Phase 2 may add a redirect
// shim if external links exist.
//
// See `.claude/agents/shared/lessons.md` —
// "IA: ישות אחת = surface אחד" (2026-05-05).

import { notFound } from "next/navigation"

export default function DashboardProjectsPage() {
  notFound()
}

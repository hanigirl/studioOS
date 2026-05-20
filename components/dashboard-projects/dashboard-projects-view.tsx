// Removed 2026-05-05 — IA Phase 1 (Architecture D).
//
// `DashboardProjectsView` was the standalone Project Pulse view rendered at
// `/dashboard-projects`. Its content moved into `<PulseSection>` inside
// `/projects` (see `components/projects/pulse-section.tsx`). Same building
// blocks (cards + Other strip), now wrapped in conditional rendering: stress
// state shows the cards, healthy state collapses to a banner.
//
// File kept empty (rather than deleted) because rm is not permitted in this
// session.
export {}

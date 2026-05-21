// Removed: Today task rows now use the priority pill from
// components/kanban-board.tsx (red-100 / amber-100 / muted), so the visual
// language matches the kanban and Project Pulse cards.
//
// The Today zone (Now / Later / Blocked / Waiting) plays the role the kanban
// column plays — it is the status grouping. So the row itself only carries
// priority, never status. See components/dashboard-today/task-row.tsx.
//
// This file is intentionally empty. Do not re-introduce a status pill on
// task rows without coordinating with the kanban TaskCard contract.
export {}

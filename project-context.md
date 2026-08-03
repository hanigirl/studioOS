# Project Context — studioOS

## Decisions made
- **Language for this project (terminal): English.** When Oren talks to Claude from the terminal in this project, reply in English (overrides the global Hebrew-response default). Stated 2026-07-27.

## Session log
- 2026-07-27 — Ran the project (npm install + `npm run dev` on port 3001). Built dashboard stat cards (`components/dashboard/stat-card.tsx` + `data.ts`) and added the Income grouped bar chart (`components/income-chart.tsx`) to the left column under the cards in `app/page.tsx`. Set terminal-response language to English.

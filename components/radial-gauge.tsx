import { cn } from "@/lib/utils"

const TICK_COUNT = 36

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

interface RadialGaugeProps {
  size?: number
  /** Percentage (0-100) of ticks to highlight as the active value. Omit for the plain decorative gradient. */
  value?: number
  className?: string
}

export function RadialGauge({ size = 128, value, className }: RadialGaugeProps) {
  const cx = 50
  const cy = 50
  const inner = 30
  const outer = 46
  const activeTicks =
    value != null ? Math.round((Math.min(Math.max(value, 0), 100) / 100) * TICK_COUNT) : null

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: size, height: size }}
      className={cn("text-violet-500", className)}
      aria-hidden
    >
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const angle = (360 / TICK_COUNT) * i
        const from = polar(cx, cy, inner, angle)
        const to = polar(cx, cy, outer, angle)
        const isActive = activeTicks == null ? null : i < activeTicks
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            className={
              isActive === null
                ? undefined
                : isActive
                  ? "text-violet-700 dark:text-violet-400"
                  : "text-muted-foreground/25"
            }
            opacity={isActive === null ? 0.15 + (i / TICK_COUNT) * 0.85 : undefined}
          />
        )
      })}
    </svg>
  )
}

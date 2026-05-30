import { cn } from "@/lib/utils"

interface FilterPillProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  /** "md" (default): px-3.5 py-1.5 — tab-style pills. "sm": px-2.5 py-1 — compact popover pills. */
  size?: "sm" | "md"
  className?: string
}

export function FilterPill({
  active,
  onClick,
  children,
  size = "md",
  className,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full text-xs font-medium transition-colors",
        size === "sm" ? "px-2.5 py-1" : "px-3.5 py-1.5",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border text-foreground hover:bg-accent",
        className
      )}
    >
      {children}
    </button>
  )
}

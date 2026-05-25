import { cn } from "@/lib/utils"

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col flex-1 w-full px-10 py-8", className)}>
      {children}
    </div>
  )
}

import { Separator } from "@/components/ui/separator"

interface SettingsSectionShellProps {
  title: string
  description: string
  children: React.ReactNode
}

export function SettingsSectionShell({ title, description, children }: SettingsSectionShellProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  )
}

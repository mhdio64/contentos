import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/20 text-center p-6 w-full min-h-[220px]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 mb-3">
        <Icon className="h-5 w-5 text-muted-foreground/70" />
      </div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-[13px] text-muted-foreground max-w-[250px] mb-4 leading-relaxed">
        {description}
      </p>
      {action}
    </div>
  )
}

import { Calendar } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { getCalendarItems } from "@/lib/content-management-data"

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  const items = await getCalendarItems()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} scheduled {items.length === 1 ? "item" : "items"} on the calendar.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Scheduled Content</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length > 0 ? (
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col items-center justify-center bg-muted rounded-md w-10 h-10 shrink-0">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase leading-none mb-1">
                        {item.dateLabel}
                      </span>
                      <span className="text-sm font-bold leading-none">{item.dayLabel}</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium leading-tight truncate">{item.title}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {item.client} · {item.channel} · {item.timeLabel}
                      </span>
                    </div>
                    <Badge
                      variant={item.status === "SCHEDULED" ? "default" : "secondary"}
                      className="shrink-0 text-[10px] px-1.5 py-0 rounded-sm font-medium uppercase tracking-wider"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="Nothing scheduled"
                description="Content with a scheduled date will appear here."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

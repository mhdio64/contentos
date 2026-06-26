import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import {
  formatPersianDay,
  formatPersianMonthShort,
  formatPersianTime,
} from "@/lib/persian-format"

export interface UpcomingEvent {
  id: string
  title: string
  scheduledAt: Date
}

export interface PublishingCalendarProps {
  events: UpcomingEvent[]
}

export function PublishingCalendar({ events }: PublishingCalendarProps) {
  const hasEvents = events && events.length > 0

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">تقویم پیش‌رو</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {hasEvents ? (
          <div className="flex flex-col gap-3">
            {events.map(event => (
              <div key={event.id} className="flex items-center gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                <div className="flex flex-col items-center justify-center bg-muted rounded-md w-10 h-10 shrink-0">
                  <span className="text-[10px] font-medium text-muted-foreground leading-none mb-1">
                    {formatPersianMonthShort(event.scheduledAt)}
                  </span>
                  <span className="text-sm font-bold leading-none">
                    {formatPersianDay(event.scheduledAt)}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span dir="auto" className="text-sm font-medium leading-tight truncate block">{event.title}</span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    {formatPersianTime(event.scheduledAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Calendar} 
            title="محتوای زمان‌بندی‌شده‌ای نیست" 
            description="تقویم انتشار شما برای ۷ روز آینده خالی است."
            action={
              <Button variant="outline" size="sm">
                <Plus className="me-2 h-4 w-4" />
                زمان‌بندی انتشار
              </Button>
            }
          />
        )}
      </CardContent>
    </Card>
  )
}

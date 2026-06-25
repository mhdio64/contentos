import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"

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
        <CardTitle className="text-sm font-semibold">Upcoming Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {hasEvents ? (
          <div className="flex flex-col gap-3">
            {events.map(event => (
              <div key={event.id} className="flex items-center gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                <div className="flex flex-col items-center justify-center bg-muted rounded-md w-10 h-10 shrink-0">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase leading-none mb-1">
                    {event.scheduledAt.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-sm font-bold leading-none">
                    {event.scheduledAt.getDate()}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium leading-tight truncate">{event.title}</span>
                  <span className="text-[11px] text-muted-foreground mt-0.5">
                    {event.scheduledAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Calendar} 
            title="No scheduled content" 
            description="Your publishing calendar is clear for the next 7 days."
            action={
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
            }
          />
        )}
      </CardContent>
    </Card>
  )
}

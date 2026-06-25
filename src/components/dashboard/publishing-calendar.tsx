import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"

export function PublishingCalendar() {
  const hasEvents = false // Static version: showcase the empty state

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Upcoming Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {hasEvents ? (
          <div>
            {/* List of events would go here */}
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

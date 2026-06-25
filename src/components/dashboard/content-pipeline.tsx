import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const pipeline = [
  {
    id: "1",
    title: "Q3 Launch Announcement",
    client: "Acme Corp",
    stage: "In Review",
    type: "Blog Post",
  },
  {
    id: "2",
    title: "10 Tips for Remote Work",
    client: "Global Tech",
    stage: "Drafting",
    type: "LinkedIn Carousel",
  },
  {
    id: "3",
    title: "Product Update V2",
    client: "Acme Corp",
    stage: "Scheduled",
    type: "Email Newsletter",
  },
  {
    id: "4",
    title: "Founder Interview",
    client: "Startup Inc",
    stage: "Drafting",
    type: "Video Script",
  }
]

export function ContentPipeline() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Content Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          {pipeline.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
              <div className="flex flex-col gap-1.5 min-w-0 pr-4">
                <span className="text-sm font-medium leading-none truncate">{item.title}</span>
                <span className="text-xs text-muted-foreground truncate">{item.client} • {item.type}</span>
              </div>
              <Badge 
                variant={item.stage === "In Review" ? "destructive" : item.stage === "Scheduled" ? "default" : "secondary"}
                className="shrink-0"
              >
                {item.stage}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

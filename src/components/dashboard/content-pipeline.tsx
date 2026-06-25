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
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Content Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-col">
          {pipeline.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border/40 py-3 first:pt-0 last:border-0 last:pb-0">
              <div className="flex flex-col gap-0.5 min-w-0 pr-4">
                <span className="text-[13px] font-medium leading-tight truncate">{item.title}</span>
                <span className="text-[11px] text-muted-foreground truncate">{item.client} &middot; {item.type}</span>
              </div>
              <Badge 
                variant={item.stage === "In Review" ? "destructive" : item.stage === "Scheduled" ? "default" : "secondary"}
                className="shrink-0 text-[10px] px-1.5 py-0 rounded-sm font-medium uppercase tracking-wider"
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

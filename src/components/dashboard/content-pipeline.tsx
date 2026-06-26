import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getContentStatusLabel } from "@/lib/persian-format"

export interface ContentPipelineItem {
  id: string
  title: string
  client: string
  stage: string
  type: string
}

export interface ContentPipelineProps {
  items: ContentPipelineItem[]
}

export function ContentPipeline({ items }: ContentPipelineProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">جریان تولید محتوا</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-col">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border/40 py-3 first:pt-0 last:border-0 last:pb-0">
              <div className="flex flex-col gap-0.5 min-w-0 pe-4">
                <span dir="auto" className="text-[13px] font-medium leading-tight truncate block">{item.title}</span>
                <span className="text-[11px] text-muted-foreground truncate block">
                  <span dir="auto">{item.client}</span>
                  {" · "}
                  <span dir="auto">{item.type === "Unassigned" ? "تخصیص‌نیافته" : item.type}</span>
                </span>
              </div>
              <Badge 
                variant={item.stage === "REVIEW" ? "destructive" : item.stage === "SCHEDULED" ? "default" : "secondary"}
                className="shrink-0 text-[10px] px-1.5 py-0 rounded-sm font-medium"
              >
                {getContentStatusLabel(item.stage)}
              </Badge>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              محتوایی یافت نشد.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

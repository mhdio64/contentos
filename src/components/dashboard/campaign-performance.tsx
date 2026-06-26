import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getCampaignStatusLabel } from "@/lib/persian-format"

export interface CampaignPerformanceItem {
  id: string
  name: string
  client: string
  status: string
}

export interface CampaignPerformanceProps {
  campaigns: CampaignPerformanceItem[]
}

export function CampaignPerformance({ campaigns }: CampaignPerformanceProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">عملکرد کمپین‌ها</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-8 text-xs font-medium">کمپین</TableHead>
                <TableHead className="h-8 text-xs font-medium">مشتری</TableHead>
                <TableHead className="h-8 text-xs font-medium">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id} className="border-border/40">
                  <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                    <span dir="auto">{c.name}</span>
                  </TableCell>
                  <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                    <span dir="auto">{c.client}</span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge variant={c.status === "ACTIVE" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0 font-medium rounded-sm">
                      {getCampaignStatusLabel(c.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {campaigns.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              کمپینی یافت نشد.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const campaigns = [
  {
    id: "C1",
    name: "Summer Promo 2026",
    client: "RetailCo",
    status: "Active",
    spend: "$4,200",
    conversions: 142,
  },
  {
    id: "C2",
    name: "Enterprise Webinar",
    client: "CloudSync",
    status: "Paused",
    spend: "$1,100",
    conversions: 28,
  },
  {
    id: "C3",
    name: "New Feature Launch",
    client: "SaaS Inc",
    status: "Active",
    spend: "$8,500",
    conversions: 310,
  },
]

export function CampaignPerformance() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-8 text-xs font-medium">Campaign</TableHead>
                <TableHead className="h-8 text-xs font-medium">Client</TableHead>
                <TableHead className="h-8 text-xs font-medium">Status</TableHead>
                <TableHead className="h-8 text-xs font-medium text-right">Spend</TableHead>
                <TableHead className="h-8 text-xs font-medium text-right">Conversions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id} className="border-border/40">
                  <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">{c.name}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">{c.client}</TableCell>
                  <TableCell className="py-2.5">
                    <Badge variant={c.status === "Active" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0 font-medium rounded-sm uppercase tracking-wider">
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2.5 text-[13px] text-right text-muted-foreground">{c.spend}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-right font-medium">{c.conversions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

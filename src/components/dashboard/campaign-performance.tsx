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
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium whitespace-nowrap">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{c.client}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Active" ? "default" : "secondary"}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{c.spend}</TableCell>
                  <TableCell className="text-right font-medium">{c.conversions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

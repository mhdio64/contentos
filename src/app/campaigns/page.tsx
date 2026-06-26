import { Briefcase } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCampaigns } from "@/lib/content-management-data"

export const dynamic = "force-dynamic"

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {campaigns.length} {campaigns.length === 1 ? "campaign" : "campaigns"} tracked.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">Campaign</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Client</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Status</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Date Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                          {campaign.name}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {campaign.client}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm uppercase tracking-wider"
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {campaign.dateRange}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={Briefcase}
                title="No campaigns yet"
                description="Campaign records will appear here once they are created."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

import { Share2 } from "lucide-react"
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
import { getChannels } from "@/lib/content-management-data"

export const dynamic = "force-dynamic"

export default async function ChannelsPage() {
  const channels = await getChannels()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Channels</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {channels.length} publishing {channels.length === 1 ? "channel" : "channels"} configured.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Publishing Channels</CardTitle>
          </CardHeader>
          <CardContent>
            {channels.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">Name</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Type</TableHead>
                      <TableHead className="h-8 text-xs font-medium text-right">Content Items</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channels.map((channel) => (
                      <TableRow key={channel.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                          {channel.name}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm uppercase tracking-wider"
                          >
                            {channel.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground text-right tabular-nums">
                          {channel.contentCount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={Share2}
                title="No channels configured"
                description="Publishing channels will appear here once they are set up."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

import Link from "next/link"
import { Users } from "lucide-react"
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
import { getClients } from "@/lib/content-management-data"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {clients.length} {clients.length === 1 ? "client" : "clients"} in your workspace.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">All Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {clients.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">Name</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Industry</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Contact</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Status</TableHead>
                      <TableHead className="h-8 text-xs font-medium text-right">Campaigns</TableHead>
                      <TableHead className="h-8 text-xs font-medium text-right">Content</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                          <Link
                            href={`/clients/${client.slug}`}
                            className="hover:text-primary hover:underline"
                          >
                            {client.name}
                          </Link>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {client.industry}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {client.contactName}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={client.status === "ACTIVE" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm uppercase tracking-wider"
                          >
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground text-right tabular-nums">
                          {client.campaignCount}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground text-right tabular-nums">
                          {client.contentCount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No clients yet"
                description="Client records will appear here once they are added to the workspace."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

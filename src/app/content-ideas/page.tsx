import { FileText } from "lucide-react"
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
import { getContentIdeas } from "@/lib/content-management-data"

export const dynamic = "force-dynamic"

function priorityVariant(priority: string) {
  if (priority === "URGENT" || priority === "HIGH") return "destructive" as const
  if (priority === "MEDIUM") return "default" as const
  return "secondary" as const
}

export default async function ContentIdeasPage() {
  const ideas = await getContentIdeas()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Content Ideas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {ideas.length} {ideas.length === 1 ? "idea" : "ideas"} in the backlog.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Idea Backlog</CardTitle>
          </CardHeader>
          <CardContent>
            {ideas.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">Title</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Client</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Campaign</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Channel</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Priority</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Scheduled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ideas.map((idea) => (
                      <TableRow key={idea.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium max-w-[240px] truncate">
                          {idea.title}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {idea.client}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {idea.campaign}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {idea.channel}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={priorityVariant(idea.priority)}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm uppercase tracking-wider"
                          >
                            {idea.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {idea.scheduledAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={FileText}
                title="No content ideas yet"
                description="Content items with idea status will appear here."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

import { CheckSquare } from "lucide-react"
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
import { getReviewQueue } from "@/lib/content-management-data"

export const dynamic = "force-dynamic"

function priorityVariant(priority: string) {
  if (priority === "URGENT" || priority === "HIGH") return "destructive" as const
  if (priority === "MEDIUM") return "default" as const
  return "secondary" as const
}

export default async function ReviewsPage() {
  const reviews = await getReviewQueue()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {reviews.length} {reviews.length === 1 ? "item" : "items"} awaiting review.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Review Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">Title</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Client</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Campaign</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Channel</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Priority</TableHead>
                      <TableHead className="h-8 text-xs font-medium">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((item) => (
                      <TableRow key={item.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium max-w-[240px] truncate">
                          {item.title}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {item.client}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {item.campaign}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {item.channel}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={priorityVariant(item.priority)}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm uppercase tracking-wider"
                          >
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          {item.updatedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={CheckSquare}
                title="Review queue is clear"
                description="Content items in review status will appear here."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

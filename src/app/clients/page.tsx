import Link from "next/link"
import { Plus, Users } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import {
  formatPersianNumber,
  getClientStatusLabel,
} from "@/lib/persian-format"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">مشتریان</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {formatPersianNumber(clients.length)} مشتری در فضای کاری شما.
            </p>
          </div>
          <Button asChild size="sm">
            <Link href="/clients/new">
              <Plus className="size-3.5" />
              مشتری جدید
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">همه مشتریان</CardTitle>
          </CardHeader>
          <CardContent>
            {clients.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">نام</TableHead>
                      <TableHead className="h-8 text-xs font-medium">صنعت</TableHead>
                      <TableHead className="h-8 text-xs font-medium">رابط</TableHead>
                      <TableHead className="h-8 text-xs font-medium">وضعیت</TableHead>
                      <TableHead className="h-8 text-xs font-medium text-end">کمپین‌ها</TableHead>
                      <TableHead className="h-8 text-xs font-medium text-end">محتوا</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                          <Link
                            href={`/clients/${encodeURIComponent(client.slug)}`}
                            className="hover:text-primary hover:underline"
                            dir="auto"
                          >
                            {client.name}
                          </Link>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="auto">{client.industry}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="auto">{client.contactName}</span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={client.status === "ACTIVE" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm"
                          >
                            {getClientStatusLabel(client.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground text-end tabular-nums">
                          {formatPersianNumber(client.campaignCount)}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground text-end tabular-nums">
                          {formatPersianNumber(client.contentCount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="هنوز مشتری ثبت نشده"
                description="پس از افزودن مشتری، رکوردها در اینجا نمایش داده می‌شوند."
                action={
                  <Button asChild variant="outline" size="sm">
                    <Link href="/clients/new">
                      <Plus className="size-3.5" />
                      مشتری جدید
                    </Link>
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

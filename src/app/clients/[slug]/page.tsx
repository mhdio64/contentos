import Link from "next/link"
import { notFound } from "next/navigation"
import { Briefcase, Clock, FileText, Plus, UserRound } from "lucide-react"
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
import { getClientDetail } from "@/lib/content-management-data"
import {
  getCampaignStatusLabel,
  getClientStatusLabel,
  getContentPriorityLabel,
  getContentStatusLabel,
  getActivityTypeLabel,
  EMPTY_LABEL,
} from "@/lib/persian-format"

export const dynamic = "force-dynamic"

function priorityVariant(priority: string) {
  if (priority === "URGENT" || priority === "HIGH") return "destructive" as const
  if (priority === "MEDIUM") return "default" as const
  return "secondary" as const
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug)
  } catch {
    decodedSlug = slug
  }
  const client = await getClientDetail(decodedSlug)

  if (!client) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <Link
          href="/clients"
          className="text-sm text-muted-foreground hover:text-foreground w-fit"
        >
          بازگشت به مشتریان
        </Link>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-semibold tracking-tight" dir="auto">{client.name}</h1>
            <Badge
              variant={client.status === "ACTIVE" ? "default" : "secondary"}
              className="text-[10px] px-1.5 py-0 font-medium rounded-sm"
            >
              {getClientStatusLabel(client.status)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            <span dir="auto">{client.industry}</span>
            {" · "}
            <span dir="auto">{client.contactName}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ایجاد: {client.createdAt} · به‌روزرسانی: {client.updatedAt}
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-sm font-medium">مخاطبان</CardTitle>
              <Button asChild size="sm" variant="outline">
                <Link
                  href={`/clients/${encodeURIComponent(client.slug)}/contacts/new`}
                >
                  <Plus className="size-3.5" />
                  مخاطب جدید
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {client.contacts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">نام</TableHead>
                      <TableHead className="h-8 text-xs font-medium">سمت</TableHead>
                      <TableHead className="h-8 text-xs font-medium">تلفن</TableHead>
                      <TableHead className="h-8 text-xs font-medium">ایمیل</TableHead>
                      <TableHead className="h-8 text-xs font-medium">اصلی</TableHead>
                      <TableHead className="h-8 text-xs font-medium">یادداشت</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.contacts.map((contact) => (
                      <TableRow key={contact.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                          <span dir="auto">{contact.name}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="auto">{contact.title}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="ltr">{contact.phone}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="ltr">{contact.email}</span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          {contact.isPrimary ? (
                            <Badge
                              variant="default"
                              className="text-[10px] px-1.5 py-0 font-medium rounded-sm"
                            >
                              اصلی
                            </Badge>
                          ) : (
                            <span className="text-[13px] text-muted-foreground">
                              {EMPTY_LABEL}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground max-w-[240px]">
                          <span dir="auto" className="block truncate">
                            {contact.notes}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={UserRound}
                title="هنوز مخاطبی ثبت نشده"
                description="مخاطبان این مشتری پس از افزودن، در اینجا نمایش داده می‌شوند."
                action={
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={`/clients/${encodeURIComponent(client.slug)}/contacts/new`}
                    >
                      <Plus className="size-3.5" />
                      مخاطب جدید
                    </Link>
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm font-medium">فعالیت‌ها</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ۲۰ فعالیت اخیر مشتری
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link
                  href={`/clients/${encodeURIComponent(client.slug)}/activities/new`}
                >
                  <Plus className="size-3.5" />
                  فعالیت جدید
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {client.activities.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {client.activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-md border border-border/40 px-3 py-2.5"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 font-medium rounded-sm shrink-0"
                        >
                          {getActivityTypeLabel(activity.type)}
                        </Badge>
                        <span
                          dir="auto"
                          className="text-[13px] font-medium leading-snug"
                        >
                          {activity.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
                        {activity.occurredAt}
                      </span>
                    </div>
                    {activity.contactName ? (
                      <p className="text-[11px] text-muted-foreground mt-1">
                        مخاطب: <span dir="auto">{activity.contactName}</span>
                      </p>
                    ) : null}
                    {activity.body ? (
                      <p
                        dir="auto"
                        className="text-[13px] text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed"
                      >
                        {activity.body}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={Clock}
                title="هنوز فعالیتی ثبت نشده"
                description="فعالیت‌های این مشتری پس از ثبت، در اینجا نمایش داده می‌شوند."
                action={
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={`/clients/${encodeURIComponent(client.slug)}/activities/new`}
                    >
                      <Plus className="size-3.5" />
                      فعالیت جدید
                    </Link>
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">کمپین‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            {client.campaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">کمپین</TableHead>
                      <TableHead className="h-8 text-xs font-medium">وضعیت</TableHead>
                      <TableHead className="h-8 text-xs font-medium">بازه زمانی</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.campaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium whitespace-nowrap">
                          <span dir="auto">{campaign.name}</span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm"
                          >
                            {getCampaignStatusLabel(campaign.status)}
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
                title="هنوز کمپینی ثبت نشده"
                description="کمپین‌های این مشتری پس از ایجاد، در اینجا نمایش داده می‌شوند."
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">محتوا</CardTitle>
          </CardHeader>
          <CardContent>
            {client.contentItems.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-8 text-xs font-medium">عنوان</TableHead>
                      <TableHead className="h-8 text-xs font-medium">وضعیت</TableHead>
                      <TableHead className="h-8 text-xs font-medium">کمپین</TableHead>
                      <TableHead className="h-8 text-xs font-medium">کانال</TableHead>
                      <TableHead className="h-8 text-xs font-medium">اولویت</TableHead>
                      <TableHead className="h-8 text-xs font-medium">به‌روزرسانی</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.contentItems.map((item) => (
                      <TableRow key={item.id} className="border-border/40">
                        <TableCell className="py-2.5 text-[13px] font-medium max-w-[240px]">
                          <span dir="auto" className="block truncate">{item.title}</span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm"
                          >
                            {getContentStatusLabel(item.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="auto">{item.campaign}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-[13px] text-muted-foreground whitespace-nowrap">
                          <span dir="auto">{item.channel}</span>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={priorityVariant(item.priority)}
                            className="text-[10px] px-1.5 py-0 font-medium rounded-sm"
                          >
                            {getContentPriorityLabel(item.priority)}
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
                icon={FileText}
                title="هنوز محتوایی ثبت نشده"
                description="محتوای این مشتری پس از افزودن، در اینجا نمایش داده می‌شود."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

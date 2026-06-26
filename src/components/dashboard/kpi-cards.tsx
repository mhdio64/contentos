import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, CheckCircle2, Layers } from "lucide-react"
import { formatPersianNumber } from "@/lib/persian-format"

export interface KpiCardsProps {
  activeCampaigns: number
  contentInReview: number
  scheduledContent: number
  activeChannels: number
}

export function KpiCards({ activeCampaigns, contentInReview, scheduledContent, activeChannels }: KpiCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">کمپین‌های فعال</CardTitle>
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatPersianNumber(activeCampaigns)}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            در حال اجرا
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">محتوای در بازبینی</CardTitle>
          <FileText className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatPersianNumber(contentInReview)}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            نیازمند تأیید
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">محتوای زمان‌بندی‌شده</CardTitle>
          <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatPersianNumber(scheduledContent)}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            در انتظار انتشار
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">کانال‌های فعال</CardTitle>
          <Layers className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatPersianNumber(activeChannels)}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            مقصدهای انتشار
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

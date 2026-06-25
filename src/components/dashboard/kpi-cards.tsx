import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, CheckCircle2, Layers } from "lucide-react"

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
          <CardTitle className="text-xs font-medium text-muted-foreground">Active Campaigns</CardTitle>
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{activeCampaigns}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Currently running
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Content in Review</CardTitle>
          <FileText className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{contentInReview}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Requires your approval
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Scheduled Content</CardTitle>
          <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{scheduledContent}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Waiting to be published
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Active Channels</CardTitle>
          <Layers className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{activeChannels}</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Publishing destinations
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

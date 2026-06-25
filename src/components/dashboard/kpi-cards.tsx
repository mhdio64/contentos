import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, CheckCircle2, TrendingUp } from "lucide-react"

export function KpiCards() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Active Campaigns</CardTitle>
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">12</div>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-500 font-medium flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> +2</span> from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Content in Review</CardTitle>
          <FileText className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">24</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Requires your approval
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Published this Week</CardTitle>
          <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">38</div>
          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-500 font-medium flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> +14%</span> vs last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Avg. Engagement</CardTitle>
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground/70" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">4.2%</div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Across all active channels
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

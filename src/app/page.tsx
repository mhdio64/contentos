import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { ContentPipeline } from "@/components/dashboard/content-pipeline"
import { PublishingCalendar } from "@/components/dashboard/publishing-calendar"
import { CampaignPerformance } from "@/components/dashboard/campaign-performance"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your content operations and campaign performance.
          </p>
        </div>
        
        <KpiCards />
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-6">
            <ContentPipeline />
            <CampaignPerformance />
          </div>
          <div className="flex flex-col gap-6">
            <PublishingCalendar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

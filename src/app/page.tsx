import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { ContentPipeline } from "@/components/dashboard/content-pipeline"
import { PublishingCalendar } from "@/components/dashboard/publishing-calendar"
import { CampaignPerformance } from "@/components/dashboard/campaign-performance"
import { getCampaignPerformance, getContentPipeline, getDashboardKpis, getUpcomingContent } from "@/lib/dashboard-data"

// Set revalidation if needed or leave dynamic depending on the framework config.
// For now, it will fetch dynamically on request since we are reading from DB.
export const dynamic = "force-dynamic"

export default async function Home() {
  const [kpis, pipelineItems, campaigns, upcomingEvents] = await Promise.all([
    getDashboardKpis(),
    getContentPipeline(),
    getCampaignPerformance(),
    getUpcomingContent(),
  ])

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">داشبورد</h1>
          <p className="text-sm text-muted-foreground mt-1">
            نمای کلی عملیات محتوا و عملکرد کمپین‌ها
          </p>
        </div>
        
        <KpiCards {...kpis} />
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
            <ContentPipeline items={pipelineItems} />
            <CampaignPerformance campaigns={campaigns} />
          </div>
          <div className="flex flex-col gap-4">
            <PublishingCalendar events={upcomingEvents} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

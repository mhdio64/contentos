import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateClientForm } from "./create-client-form"

export const dynamic = "force-dynamic"

export default function NewClientPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <Link
          href="/clients"
          className="text-sm text-muted-foreground hover:text-foreground w-fit"
        >
          ← Back to clients
        </Link>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">New client</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add a client record to your workspace.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Client details</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateClientForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

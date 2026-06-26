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
          بازگشت به مشتریان
        </Link>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">مشتری جدید</h1>
          <p className="text-sm text-muted-foreground mt-1">
            یک رکورد مشتری به فضای کاری خود اضافه کنید.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">جزئیات مشتری</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateClientForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

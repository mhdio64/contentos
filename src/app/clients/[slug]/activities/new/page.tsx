import Link from "next/link"
import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getClientActivityCreateContext } from "@/lib/content-management-data"
import { toDatetimeLocalValue } from "@/lib/persian-format"
import { CreateActivityForm } from "./create-activity-form"

export const dynamic = "force-dynamic"

export default async function NewActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const client = await getClientActivityCreateContext(decodedSlug)

  if (!client) {
    notFound()
  }

  const defaultValues = {
    type: "NOTE",
    title: "",
    body: "",
    occurredAt: toDatetimeLocalValue(new Date()),
    contactId: "",
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
        <Link
          href={`/clients/${encodeURIComponent(client.slug)}`}
          className="text-sm text-muted-foreground hover:text-foreground w-fit"
        >
          بازگشت به {client.name}
        </Link>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">فعالیت جدید</h1>
          <p className="text-sm text-muted-foreground mt-1">
            یک فعالیت برای <span dir="auto">{client.name}</span> ثبت کنید.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">جزئیات فعالیت</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateActivityForm
              clientSlug={client.slug}
              contacts={client.contacts}
              defaultValues={defaultValues}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

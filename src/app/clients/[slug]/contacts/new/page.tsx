import Link from "next/link"
import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getClientContactCreateContext } from "@/lib/content-management-data"
import { CreateContactForm } from "./create-contact-form"

export const dynamic = "force-dynamic"

export default async function NewContactPage({
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

  const client = await getClientContactCreateContext(decodedSlug)

  if (!client) {
    notFound()
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
          <h1 className="text-xl font-semibold tracking-tight">مخاطب جدید</h1>
          <p className="text-sm text-muted-foreground mt-1">
            یک مخاطب برای <span dir="auto">{client.name}</span> اضافه کنید.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">جزئیات مخاطب</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateContactForm
              clientSlug={client.slug}
              defaultIsPrimary={client.defaultIsPrimary}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

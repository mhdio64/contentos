"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { slugify } from "@/lib/slug"

const CLIENT_STATUSES = ["ACTIVE", "PAUSED", "ARCHIVED"] as const
type ClientStatusValue = (typeof CLIENT_STATUSES)[number]

const NAME_MAX_LENGTH = 120
const OPTIONAL_TEXT_MAX_LENGTH = 120

export type CreateClientState = {
  error?: string | null
  fieldErrors?: {
    name?: string
    industry?: string
    contactName?: string
    status?: string
  }
  values?: {
    name: string
    industry: string
    contactName: string
    status: string
  }
}

function isClientStatus(value: string): value is ClientStatusValue {
  return (CLIENT_STATUSES as readonly string[]).includes(value)
}

function parseFormData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    industry: String(formData.get("industry") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    status: String(formData.get("status") ?? "ACTIVE").trim(),
  }
}

function isPrismaUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  )
}

export async function createClient(
  _prevState: CreateClientState,
  formData: FormData
): Promise<CreateClientState> {
  const values = parseFormData(formData)
  const fieldErrors: NonNullable<CreateClientState["fieldErrors"]> = {}

  if (!values.name) {
    fieldErrors.name = "Name is required."
  } else if (values.name.length > NAME_MAX_LENGTH) {
    fieldErrors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`
  }

  if (values.industry.length > OPTIONAL_TEXT_MAX_LENGTH) {
    fieldErrors.industry = `Industry must be ${OPTIONAL_TEXT_MAX_LENGTH} characters or fewer.`
  }

  if (values.contactName.length > OPTIONAL_TEXT_MAX_LENGTH) {
    fieldErrors.contactName = `Contact name must be ${OPTIONAL_TEXT_MAX_LENGTH} characters or fewer.`
  }

  const statusInput = values.status
  if (!isClientStatus(statusInput)) {
    fieldErrors.status = "Status must be Active, Paused, or Archived."
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values }
  }

  const status = statusInput as ClientStatusValue

  const slug = slugify(values.name)
  if (!slug) {
    return {
      fieldErrors: {
        name: "Name must contain at least one letter or number.",
      },
      values,
    }
  }

  const existing = await db.client.findUnique({ where: { slug } })
  if (existing) {
    return {
      error:
        "A client with this name already exists. Please use a different name.",
      values,
    }
  }

  let client: { slug: string }
  try {
    client = await db.client.create({
      data: {
        name: values.name,
        slug,
        status,
        industry: values.industry || null,
        contactName: values.contactName || null,
      },
    })
  } catch (error) {
    if (isPrismaUniqueConstraintError(error)) {
      return {
        error:
          "A client with this name already exists. Please use a different name.",
        values,
      }
    }
    throw error
  }

  revalidatePath("/clients")
  revalidatePath(`/clients/${encodeURIComponent(client.slug)}`)
  redirect(`/clients/${encodeURIComponent(client.slug)}`)
}

"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { formatPersianNumber } from "@/lib/persian-format"

const NAME_MAX_LENGTH = 120
const TITLE_MAX_LENGTH = 120
const PHONE_MAX_LENGTH = 40
const EMAIL_MAX_LENGTH = 254
const NOTES_MAX_LENGTH = 2000

const PHONE_PATTERN = /^[\d+\s\-()]+$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type CreateContactState = {
  error?: string | null
  fieldErrors?: {
    name?: string
    title?: string
    phone?: string
    email?: string
    notes?: string
  }
  values?: {
    name: string
    title: string
    phone: string
    email: string
    isPrimary: boolean
    notes: string
  }
}

function parseFormData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    isPrimary: formData.get("isPrimary") === "on",
    notes: String(formData.get("notes") ?? "").trim(),
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

function validateValues(values: NonNullable<CreateContactState["values"]>) {
  const fieldErrors: NonNullable<CreateContactState["fieldErrors"]> = {}

  if (!values.name) {
    fieldErrors.name = "نام الزامی است."
  } else if (values.name.length > NAME_MAX_LENGTH) {
    fieldErrors.name = `نام باید حداکثر ${formatPersianNumber(NAME_MAX_LENGTH)} کاراکتر باشد.`
  }

  if (values.title.length > TITLE_MAX_LENGTH) {
    fieldErrors.title = `سمت باید حداکثر ${formatPersianNumber(TITLE_MAX_LENGTH)} کاراکتر باشد.`
  }

  if (values.phone.length > PHONE_MAX_LENGTH) {
    fieldErrors.phone = `تلفن باید حداکثر ${formatPersianNumber(PHONE_MAX_LENGTH)} کاراکتر باشد.`
  } else if (values.phone && !PHONE_PATTERN.test(values.phone)) {
    fieldErrors.phone = "فرمت تلفن معتبر نیست."
  }

  if (values.email.length > EMAIL_MAX_LENGTH) {
    fieldErrors.email = `ایمیل باید حداکثر ${formatPersianNumber(EMAIL_MAX_LENGTH)} کاراکتر باشد.`
  } else if (values.email && !EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "فرمت ایمیل معتبر نیست."
  }

  if (values.notes.length > NOTES_MAX_LENGTH) {
    fieldErrors.notes = `یادداشت باید حداکثر ${formatPersianNumber(NOTES_MAX_LENGTH)} کاراکتر باشد.`
  }

  return fieldErrors
}

export async function createContact(
  clientSlug: string,
  _prevState: CreateContactState,
  formData: FormData
): Promise<CreateContactState> {
  const values = parseFormData(formData)
  const fieldErrors = validateValues(values)

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values }
  }

  let decodedSlug = clientSlug
  try {
    decodedSlug = decodeURIComponent(clientSlug)
  } catch {
    decodedSlug = clientSlug
  }

  const client = await db.client.findUnique({
    where: { slug: decodedSlug },
    select: { id: true, slug: true },
  })

  if (!client) {
    return {
      error: "مشتری یافت نشد.",
      values,
    }
  }

  let created = false

  try {
    await db.$transaction(async (tx) => {
      if (values.isPrimary) {
        await tx.contact.updateMany({
          where: { clientId: client.id, isPrimary: true },
          data: { isPrimary: false },
        })
      }

      await tx.contact.create({
        data: {
          name: values.name,
          title: values.title || null,
          phone: values.phone || null,
          email: values.email || null,
          isPrimary: values.isPrimary,
          notes: values.notes || null,
          clientId: client.id,
        },
      })
    })
    created = true
  } catch (error) {
    if (isPrismaUniqueConstraintError(error)) {
      return {
        error:
          "در حال حاضر فقط یک مخاطب اصلی برای هر مشتری مجاز است. لطفاً دوباره تلاش کنید.",
        values,
      }
    }
    throw error
  }

  if (created) {
    revalidatePath("/clients")
    revalidatePath(`/clients/${encodeURIComponent(client.slug)}`)
    redirect(`/clients/${encodeURIComponent(client.slug)}`)
  }

  return { values }
}

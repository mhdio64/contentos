"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { formatPersianNumber } from "@/lib/persian-format"

const ACTIVITY_TYPES = [
  "NOTE",
  "CALL",
  "MEETING",
  "MESSAGE",
  "APPROVAL",
  "REVISION",
  "FOLLOW_UP",
] as const

type ActivityTypeValue = (typeof ACTIVITY_TYPES)[number]

const TITLE_MAX_LENGTH = 200
const BODY_MAX_LENGTH = 2000
const FUTURE_TOLERANCE_MS = 5 * 60 * 1000
const DATETIME_LOCAL_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/
const MIN_TIMEZONE_OFFSET_MINUTES = -14 * 60
const MAX_TIMEZONE_OFFSET_MINUTES = 14 * 60

export type CreateActivityState = {
  error?: string | null
  fieldErrors?: {
    type?: string
    title?: string
    body?: string
    occurredAt?: string
    contactId?: string
  }
  values?: {
    type: string
    title: string
    body: string
    occurredAt: string
    contactId: string
  }
}

function isActivityType(value: string): value is ActivityTypeValue {
  return (ACTIVITY_TYPES as readonly string[]).includes(value)
}

function parseFormData(formData: FormData) {
  return {
    values: {
      type: String(formData.get("type") ?? "").trim(),
      title: String(formData.get("title") ?? "").trim(),
      body: String(formData.get("body") ?? "").trim(),
      occurredAt: String(formData.get("occurredAt") ?? "").trim(),
      contactId: String(formData.get("contactId") ?? "").trim(),
    },
    occurredAtTimezoneOffset: String(
      formData.get("occurredAtTimezoneOffset") ?? ""
    ).trim(),
  }
}

function parseTimezoneOffset(value: string): number | null {
  const parsed = Number(value)
  if (
    !Number.isInteger(parsed) ||
    parsed < MIN_TIMEZONE_OFFSET_MINUTES ||
    parsed > MAX_TIMEZONE_OFFSET_MINUTES
  ) {
    return null
  }

  return parsed
}

function parseOccurredAt(value: string, timezoneOffset: string): Date | null {
  if (!value) {
    return new Date()
  }

  const offsetMinutes = parseTimezoneOffset(timezoneOffset)
  const match = DATETIME_LOCAL_PATTERN.exec(value)
  if (offsetMinutes === null || !match) {
    return null
  }

  const [, yearText, monthText, dayText, hourText, minuteText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const hour = Number(hourText)
  const minute = Number(minuteText)

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour > 23 ||
    minute > 59
  ) {
    return null
  }

  const localTimestamp = Date.UTC(year, month - 1, day, hour, minute)
  const normalized = new Date(localTimestamp)
  if (
    normalized.getUTCFullYear() !== year ||
    normalized.getUTCMonth() !== month - 1 ||
    normalized.getUTCDate() !== day ||
    normalized.getUTCHours() !== hour ||
    normalized.getUTCMinutes() !== minute
  ) {
    return null
  }

  return new Date(localTimestamp + offsetMinutes * 60 * 1000)
}

function validateValues(
  values: NonNullable<CreateActivityState["values"]>,
  occurredAtTimezoneOffset: string
) {
  const fieldErrors: NonNullable<CreateActivityState["fieldErrors"]> = {}

  if (!values.type) {
    fieldErrors.type = "نوع فعالیت الزامی است."
  } else if (!isActivityType(values.type)) {
    fieldErrors.type = "نوع فعالیت معتبر نیست."
  }

  if (!values.title) {
    fieldErrors.title = "عنوان الزامی است."
  } else if (values.title.length > TITLE_MAX_LENGTH) {
    fieldErrors.title = `عنوان باید حداکثر ${formatPersianNumber(TITLE_MAX_LENGTH)} کاراکتر باشد.`
  }

  if (values.body.length > BODY_MAX_LENGTH) {
    fieldErrors.body = `شرح باید حداکثر ${formatPersianNumber(BODY_MAX_LENGTH)} کاراکتر باشد.`
  }

  const occurredAt = parseOccurredAt(
    values.occurredAt,
    occurredAtTimezoneOffset
  )
  if (!occurredAt) {
    fieldErrors.occurredAt = "تاریخ وقوع معتبر نیست."
  } else {
    const maxAllowed = Date.now() + FUTURE_TOLERANCE_MS
    if (occurredAt.getTime() > maxAllowed) {
      fieldErrors.occurredAt =
        "تاریخ وقوع نمی‌تواند بیش از ۵ دقیقه در آینده باشد."
    }
  }

  return { fieldErrors, occurredAt }
}

function decodeClientSlug(slug: string) {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

export async function createActivity(
  clientSlug: string,
  _prevState: CreateActivityState,
  formData: FormData
): Promise<CreateActivityState> {
  const { values, occurredAtTimezoneOffset } = parseFormData(formData)
  const { fieldErrors, occurredAt } = validateValues(
    values,
    occurredAtTimezoneOffset
  )

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values }
  }

  const decodedSlug = decodeClientSlug(clientSlug)

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

  if (values.contactId) {
    const contact = await db.contact.findFirst({
      where: { id: values.contactId, clientId: client.id },
      select: { id: true },
    })

    if (!contact) {
      return {
        fieldErrors: {
          contactId: "مخاطب انتخاب‌شده متعلق به این مشتری نیست.",
        },
        values,
      }
    }
  }

  await db.activity.create({
    data: {
      type: values.type as ActivityTypeValue,
      title: values.title,
      body: values.body || null,
      occurredAt: occurredAt!,
      clientId: client.id,
      contactId: values.contactId || null,
    },
  })

  revalidatePath("/clients")
  revalidatePath(`/clients/${encodeURIComponent(client.slug)}`)
  redirect(`/clients/${encodeURIComponent(client.slug)}`)
}

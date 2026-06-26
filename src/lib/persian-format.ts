export const EMPTY_LABEL = "—"

const persianDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "short",
  day: "numeric",
})

const persianDateTimeFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

export function formatPersianDate(date: Date): string {
  return persianDateFormatter.format(date)
}

export function formatPersianDateTime(date: Date): string {
  return persianDateTimeFormatter.format(date)
}

export function formatPersianDateRange(
  startsAt: Date | null,
  endsAt: Date | null
): string {
  if (startsAt && endsAt) {
    return `از ${formatPersianDate(startsAt)} تا ${formatPersianDate(endsAt)}`
  }
  if (startsAt) {
    return `از ${formatPersianDate(startsAt)}`
  }
  if (endsAt) {
    return `تا ${formatPersianDate(endsAt)}`
  }
  return EMPTY_LABEL
}

export function formatPersianNumber(n: number): string {
  return n.toLocaleString("fa-IR")
}

export function formatPersianTime(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export function formatPersianMonthShort(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "short",
  }).format(date)
}

export function formatPersianDay(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
  }).format(date)
}

export const CLIENT_STATUS_LABELS = {
  ACTIVE: "فعال",
  PAUSED: "متوقف",
  ARCHIVED: "بایگانی",
} as const

export const CAMPAIGN_STATUS_LABELS = {
  PLANNED: "برنامه‌ریزی‌شده",
  ACTIVE: "فعال",
  PAUSED: "متوقف",
  COMPLETED: "پایان‌یافته",
} as const

export const CONTENT_STATUS_LABELS = {
  IDEA: "ایده",
  DRAFT: "پیش‌نویس",
  REVIEW: "در انتظار بازبینی",
  APPROVED: "تأییدشده",
  SCHEDULED: "زمان‌بندی‌شده",
  PUBLISHED: "منتشرشده",
  ARCHIVED: "بایگانی",
} as const

export const CONTENT_PRIORITY_LABELS = {
  LOW: "کم",
  MEDIUM: "متوسط",
  HIGH: "بالا",
  URGENT: "فوری",
} as const

export const ACTIVITY_TYPE_LABELS = {
  NOTE: "یادداشت",
  CALL: "تماس",
  MEETING: "جلسه",
  MESSAGE: "پیام",
  APPROVAL: "تأیید",
  REVISION: "اصلاح",
  FOLLOW_UP: "پیگیری",
} as const

type LabelMap = Record<string, string>

function getLabel(map: LabelMap, value: string): string {
  return map[value] ?? value
}

export function getClientStatusLabel(status: string): string {
  return getLabel(CLIENT_STATUS_LABELS, status)
}

export function getCampaignStatusLabel(status: string): string {
  return getLabel(CAMPAIGN_STATUS_LABELS, status)
}

export function getContentStatusLabel(status: string): string {
  return getLabel(CONTENT_STATUS_LABELS, status)
}

export function getContentPriorityLabel(priority: string): string {
  return getLabel(CONTENT_PRIORITY_LABELS, priority)
}

export function getActivityTypeLabel(type: string): string {
  return getLabel(ACTIVITY_TYPE_LABELS, type)
}

/** Local datetime string for HTML datetime-local inputs: YYYY-MM-DDTHH:mm */
export function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

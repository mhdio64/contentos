"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ACTIVITY_TYPE_LABELS } from "@/lib/persian-format"
import {
  createActivity,
  type CreateActivityState,
} from "./actions"

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  "dark:bg-input/30"
)

type ContactOption = {
  id: string
  name: string
}

type CreateActivityFormProps = {
  clientSlug: string
  contacts: ContactOption[]
  defaultValues: NonNullable<CreateActivityState["values"]>
}

export function CreateActivityForm({
  clientSlug,
  contacts,
  defaultValues,
}: CreateActivityFormProps) {
  const boundAction = createActivity.bind(null, clientSlug)
  const [state, formAction, isPending] = useActionState(boundAction, {
    values: defaultValues,
  } satisfies CreateActivityState)

  const values = state.values ?? defaultValues

  return (
    <form
      action={formAction}
      key={JSON.stringify(state)}
      className="flex flex-col gap-4"
    >
      {state.error ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-[13px] text-destructive"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="type" className="text-xs font-medium">
          نوع فعالیت <span className="text-destructive">*</span>
        </label>
        <select
          id="type"
          name="type"
          defaultValue={values.type}
          className={selectClassName}
          aria-invalid={Boolean(state.fieldErrors?.type)}
          aria-describedby={state.fieldErrors?.type ? "type-error" : undefined}
        >
          {Object.entries(ACTIVITY_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.type ? (
          <p id="type-error" className="text-[13px] text-destructive">
            {state.fieldErrors.type}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-xs font-medium">
          عنوان <span className="text-destructive">*</span>
        </label>
        <Input
          id="title"
          name="title"
          maxLength={200}
          defaultValue={values.title}
          dir="auto"
          aria-invalid={Boolean(state.fieldErrors?.title)}
          aria-describedby={
            state.fieldErrors?.title ? "title-error" : undefined
          }
        />
        {state.fieldErrors?.title ? (
          <p id="title-error" className="text-[13px] text-destructive">
            {state.fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="body" className="text-xs font-medium">
          شرح
        </label>
        <Textarea
          id="body"
          name="body"
          maxLength={2000}
          rows={4}
          defaultValue={values.body}
          dir="auto"
          aria-invalid={Boolean(state.fieldErrors?.body)}
          aria-describedby={state.fieldErrors?.body ? "body-error" : undefined}
        />
        {state.fieldErrors?.body ? (
          <p id="body-error" className="text-[13px] text-destructive">
            {state.fieldErrors.body}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="occurredAt" className="text-xs font-medium">
          تاریخ وقوع
        </label>
        <Input
          id="occurredAt"
          name="occurredAt"
          type="datetime-local"
          defaultValue={values.occurredAt}
          dir="ltr"
          aria-invalid={Boolean(state.fieldErrors?.occurredAt)}
          aria-describedby={
            state.fieldErrors?.occurredAt ? "occurredAt-error" : undefined
          }
        />
        {state.fieldErrors?.occurredAt ? (
          <p id="occurredAt-error" className="text-[13px] text-destructive">
            {state.fieldErrors.occurredAt}
          </p>
        ) : null}
      </div>

      {contacts.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactId" className="text-xs font-medium">
            مخاطب مرتبط
          </label>
          <select
            id="contactId"
            name="contactId"
            defaultValue={values.contactId}
            className={selectClassName}
            aria-invalid={Boolean(state.fieldErrors?.contactId)}
            aria-describedby={
              state.fieldErrors?.contactId ? "contactId-error" : undefined
            }
          >
            <option value="">بدون مخاطب</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </select>
          {state.fieldErrors?.contactId ? (
            <p id="contactId-error" className="text-[13px] text-destructive">
              {state.fieldErrors.contactId}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-center gap-2 pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ایجاد…" : "ایجاد فعالیت"}
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/clients/${encodeURIComponent(clientSlug)}`}>
            انصراف
          </Link>
        </Button>
      </div>
    </form>
  )
}

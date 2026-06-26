"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createContact, type CreateContactState } from "./actions"

const checkboxClassName = cn(
  "size-4 rounded border border-input accent-primary",
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
)

type CreateContactFormProps = {
  clientSlug: string
  defaultIsPrimary: boolean
}

export function CreateContactForm({
  clientSlug,
  defaultIsPrimary,
}: CreateContactFormProps) {
  const boundAction = createContact.bind(null, clientSlug)
  const [state, formAction, isPending] = useActionState(boundAction, {
    values: {
      name: "",
      title: "",
      phone: "",
      email: "",
      isPrimary: defaultIsPrimary,
      notes: "",
    },
  } satisfies CreateContactState)

  const values = state.values ?? {
    name: "",
    title: "",
    phone: "",
    email: "",
    isPrimary: defaultIsPrimary,
    notes: "",
  }

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
        <label htmlFor="name" className="text-xs font-medium">
          نام <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          name="name"
          maxLength={120}
          defaultValue={values.name}
          dir="auto"
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
        />
        {state.fieldErrors?.name ? (
          <p id="name-error" className="text-[13px] text-destructive">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-xs font-medium">
          سمت
        </label>
        <Input
          id="title"
          name="title"
          maxLength={120}
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
        <label htmlFor="phone" className="text-xs font-medium">
          تلفن
        </label>
        <Input
          id="phone"
          name="phone"
          maxLength={40}
          defaultValue={values.phone}
          dir="ltr"
          aria-invalid={Boolean(state.fieldErrors?.phone)}
          aria-describedby={
            state.fieldErrors?.phone ? "phone-error" : undefined
          }
        />
        {state.fieldErrors?.phone ? (
          <p id="phone-error" className="text-[13px] text-destructive">
            {state.fieldErrors.phone}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium">
          ایمیل
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          maxLength={254}
          defaultValue={values.email}
          dir="ltr"
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "email-error" : undefined
          }
        />
        {state.fieldErrors?.email ? (
          <p id="email-error" className="text-[13px] text-destructive">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isPrimary"
          name="isPrimary"
          type="checkbox"
          defaultChecked={values.isPrimary}
          className={checkboxClassName}
        />
        <label htmlFor="isPrimary" className="text-xs font-medium">
          مخاطب اصلی
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className="text-xs font-medium">
          یادداشت
        </label>
        <Textarea
          id="notes"
          name="notes"
          maxLength={2000}
          rows={3}
          defaultValue={values.notes}
          dir="auto"
          aria-invalid={Boolean(state.fieldErrors?.notes)}
          aria-describedby={
            state.fieldErrors?.notes ? "notes-error" : undefined
          }
        />
        {state.fieldErrors?.notes ? (
          <p id="notes-error" className="text-[13px] text-destructive">
            {state.fieldErrors.notes}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ایجاد…" : "ایجاد مخاطب"}
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

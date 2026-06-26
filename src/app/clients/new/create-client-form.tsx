"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { createClient, type CreateClientState } from "./actions"

const initialState: CreateClientState = {}

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  "dark:bg-input/30"
)

export function CreateClientForm() {
  const [state, formAction, isPending] = useActionState(
    createClient,
    initialState
  )

  const values = state.values ?? {
    name: "",
    industry: "",
    contactName: "",
    status: "ACTIVE",
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
          Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          name="name"
          required
          maxLength={120}
          defaultValue={values.name}
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
        <label htmlFor="industry" className="text-xs font-medium">
          Industry
        </label>
        <Input
          id="industry"
          name="industry"
          maxLength={120}
          defaultValue={values.industry}
          aria-invalid={Boolean(state.fieldErrors?.industry)}
          aria-describedby={
            state.fieldErrors?.industry ? "industry-error" : undefined
          }
        />
        {state.fieldErrors?.industry ? (
          <p id="industry-error" className="text-[13px] text-destructive">
            {state.fieldErrors.industry}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contactName" className="text-xs font-medium">
          Contact name
        </label>
        <Input
          id="contactName"
          name="contactName"
          maxLength={120}
          defaultValue={values.contactName}
          aria-invalid={Boolean(state.fieldErrors?.contactName)}
          aria-describedby={
            state.fieldErrors?.contactName ? "contactName-error" : undefined
          }
        />
        {state.fieldErrors?.contactName ? (
          <p id="contactName-error" className="text-[13px] text-destructive">
            {state.fieldErrors.contactName}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="status" className="text-xs font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={values.status}
          className={selectClassName}
          aria-invalid={Boolean(state.fieldErrors?.status)}
          aria-describedby={
            state.fieldErrors?.status ? "status-error" : undefined
          }
        >
          <option value="ACTIVE">Active</option>
          <option value="PAUSED">Paused</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        {state.fieldErrors?.status ? (
          <p id="status-error" className="text-[13px] text-destructive">
            {state.fieldErrors.status}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create client"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/clients">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}

"use client";

import { createLead, type CreateLeadState } from "@/app/actions/leads";
import type { ServiceArea } from "@/types/database";
import { useActionState } from "react";

const initial: CreateLeadState = { ok: false, error: null };

const projectTypes: { value: string; label: string }[] = [
  { value: "", label: "Select project type" },
  { value: "playground", label: "Playground" },
  { value: "hoa", label: "HOA / community" },
  { value: "school", label: "School" },
  { value: "park", label: "Park / municipal" },
  { value: "residential", label: "Residential landscaping" },
  { value: "other", label: "Other" },
];

type Props = {
  areas: Pick<ServiceArea, "id" | "name" | "slug">[];
  defaultAreaId?: string;
  id?: string;
  title?: string;
  subtitle?: string;
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] shadow-sm outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20";

export function LeadForm({
  areas,
  defaultAreaId,
  id = "estimate",
  title = "Get your free estimate",
  subtitle = "Tell us about your site. We install rubber mulch — crews on the ground, not bags on a pallet.",
}: Props) {
  const [state, formAction, pending] = useActionState(createLead, initial);

  if (state.ok) {
    return (
      <div
        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-sm"
        id={id}
      >
        <p className="text-lg font-semibold text-[var(--color-ink)]">
          Thank you — we received your request.
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Our team will review your details and reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      action={formAction}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{subtitle}</p>

      {state.error ? (
        <p
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="service_area_id"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Service area
          </label>
          <select
            id="service_area_id"
            name="service_area_id"
            className={fieldClass}
            required
            defaultValue={defaultAreaId ?? ""}
          >
            <option value="" disabled>
              Choose your area
            </option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="full_name"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Phone <span className="font-normal text-[var(--color-ink-muted)]">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="project_type"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Project type
          </label>
          <select
            id="project_type"
            name="project_type"
            className={fieldClass}
            defaultValue=""
          >
            {projectTypes.map((pt) => (
              <option key={pt.value || "empty"} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={fieldClass}
            placeholder="Approximate area size, timeline, access notes, safety requirements…"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-semibold text-white shadow-md transition hover:bg-[var(--color-accent-hover)] disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
        >
          {pending ? "Sending…" : "Request my estimate"}
        </button>
      </div>
    </form>
  );
}

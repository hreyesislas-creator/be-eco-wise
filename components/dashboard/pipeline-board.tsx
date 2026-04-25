import type { LeadStatus, LeadWithArea } from "@/types/database";
import Link from "next/link";

const columns: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
];

type Props = {
  leads: LeadWithArea[];
};

export function PipelineBoard({ leads }: Props) {
  const grouped = columns.map((status) => ({
    status,
    items: leads.filter((l) => l.status === status),
  }));

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[720px] gap-3">
        {grouped.map((col) => (
          <div
            key={col.status}
            className="flex w-56 shrink-0 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)]"
          >
            <div className="border-b border-[var(--color-border)] px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                {col.status}
              </p>
              <p className="text-lg font-semibold text-[var(--color-ink)]">
                {col.items.length}
              </p>
            </div>
            <ul className="flex max-h-[320px] flex-col gap-2 overflow-y-auto p-2">
              {col.items.map((lead) => (
                <li key={lead.id}>
                  <div className="rounded-lg border border-[var(--color-border)] bg-white p-2.5 shadow-sm">
                    <p className="text-sm font-medium text-[var(--color-ink)]">
                      {lead.full_name}
                    </p>
                    <p className="truncate text-xs text-[var(--color-ink-muted)]">
                      {lead.email}
                    </p>
                    {lead.service_areas?.name ? (
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                        {lead.service_areas.name}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
              {col.items.length === 0 ? (
                <li className="px-1 py-4 text-center text-xs text-[var(--color-ink-faint)]">
                  No leads
                </li>
              ) : null}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--color-ink-muted)]">
        Update a lead&apos;s status in the table below and click Save — the board
        updates on the next navigation.
      </p>
      <Link
        href="#leads-table"
        className="mt-2 inline-block text-xs font-semibold text-[var(--color-accent)] hover:underline"
      >
        Jump to table →
      </Link>
    </div>
  );
}

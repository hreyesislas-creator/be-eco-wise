import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { LeadStatusForm } from "@/components/dashboard/lead-status-form";
import { listLeadsForDashboard } from "@/lib/data/leads";
import type { LeadStatus } from "@/types/database";
import Link from "next/link";

const STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
];

function isLeadStatus(v: string): v is LeadStatus {
  return (STATUSES as readonly string[]).includes(v);
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const raw = sp.status ?? "all";
  const filter: LeadStatus | "all" =
    raw === "all" || !isLeadStatus(raw) ? "all" : raw;

  const allLeads = await listLeadsForDashboard("all");
  const tableLeads =
    filter === "all"
      ? allLeads
      : allLeads.filter((l) => l.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Leads</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
        Pipeline overview and detailed list. Filter the table by status — the
        board always reflects all open pipeline stages.
      </p>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
          Pipeline
        </h2>
        <div className="mt-4">
          <PipelineBoard leads={allLeads} />
        </div>
      </section>

      <section className="mt-14" id="leads-table">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
            All leads
          </h2>
          <div className="flex flex-wrap gap-2">
            <FilterChip href="/dashboard" label="All" active={filter === "all"} />
            {STATUSES.map((s) => (
              <FilterChip
                key={s}
                href={`/dashboard?status=${s}`}
                label={s}
                active={filter === s}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)] text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {tableLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[var(--color-ink-muted)]"
                  >
                    No leads for this filter.
                  </td>
                </tr>
              ) : (
                tableLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[var(--color-surface-2)]/60">
                    <td className="px-4 py-3 font-medium text-[var(--color-ink)]">
                      {lead.full_name}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink-muted)]">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink-muted)]">
                      {lead.service_areas?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink-muted)]">
                      {lead.project_type ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <LeadStatusForm leadId={lead.id} current={lead.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--color-ink-muted)]">
                      {new Date(lead.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition ${
        active
          ? "bg-[var(--color-ink)] text-white"
          : "border border-[var(--color-border)] bg-white text-[var(--color-ink-muted)] hover:border-[var(--color-ink-faint)]"
      }`}
    >
      {label}
    </Link>
  );
}

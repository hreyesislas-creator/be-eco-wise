import { updateLeadStatusFromForm } from "@/app/dashboard/actions";
import type { LeadStatus } from "@/types/database";

const statuses: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
];

type Props = {
  leadId: string;
  current: LeadStatus;
};

export function LeadStatusForm({ leadId, current }: Props) {
  return (
    <form action={updateLeadStatusFromForm} className="inline-flex items-center gap-2">
      <input type="hidden" name="lead_id" value={leadId} />
      <label htmlFor={`status-${leadId}`} className="sr-only">
        Update status
      </label>
      <select
        id={`status-${leadId}`}
        name="status"
        defaultValue={current}
        className="rounded-lg border border-[var(--color-border)] bg-white px-2 py-1.5 text-xs font-medium text-[var(--color-ink)]"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-lg bg-[var(--color-ink)] px-2 py-1.5 text-xs font-semibold text-white hover:opacity-90"
      >
        Save
      </button>
    </form>
  );
}

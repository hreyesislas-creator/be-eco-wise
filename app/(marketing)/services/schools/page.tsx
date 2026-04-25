import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School Rubber Mulch Installation | Be Eco Wise",
  description:
    "Rubber mulch installation for schools — scheduling, communication, and durable surfacing.",
};

export default function SchoolsServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/services"
        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        ← All services
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Schools
      </h1>
      <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
        School projects demand clear timelines and minimal disruption. We
        coordinate around bell schedules, events, and access points — and deliver
        installs sized for playgrounds, walk-offs, and high-traffic outdoor
        zones.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-[var(--color-ink-muted)]">
        <li>Project communication aligned with facilities teams</li>
        <li>Attention to student safety and circulation during work</li>
        <li>Durable surfacing for daily foot traffic and equipment areas</li>
      </ul>
      <Link
        href="/#estimate"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
      >
        Talk to our school team
      </Link>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Rubber mulch installation for playgrounds, schools, HOAs, parks, and residential properties in Southern California.",
};

const rows = [
  {
    title: "Playgrounds",
    href: "/services/playgrounds",
    body: "Fall-zone planning, borders, and finishes for public and private play equipment.",
  },
  {
    title: "Schools & districts",
    href: "/services/schools",
    body: "Schedules aligned with campuses, facilities teams, and outdoor learning zones.",
  },
  {
    title: "HOA & master-planned communities",
    href: "/services/hoa",
    body: "Common areas, entrances, and amenity zones that stay presentable with less constant mulch churn.",
  },
  {
    title: "Parks & municipalities",
    href: "/services/parks",
    body: "Paths, tree wells, and recreation zones sized for public use and maintenance realities.",
  },
  {
    title: "Residential",
    href: "/services/residential",
    body: "Premium landscape beds and tree rings with crisp edging and a maintained look.",
  },
];

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Who we serve
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Industries & property types
      </h1>
      <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
        We are installation-first: one surfacing discipline applied to the rules,
        traffic, and stakeholders of each property type — not a one-size cart
        checkout.
      </p>
      <ul className="mt-12 space-y-4">
        {rows.map((row) => (
          <li key={row.title}>
            <Link
              href={row.href}
              className="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition hover:border-[var(--color-accent)]/35 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                {row.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                {row.body}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent)]">
                Service details →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-8 text-center">
        <p className="font-semibold text-[var(--color-ink)]">
          Not sure which bucket fits your site?
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Request an estimate — we&apos;ll route your project to the right crew
          and scope.
        </p>
        <Link
          href="/#estimate"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
        >
          Get free estimate
        </Link>
      </div>
    </div>
  );
}

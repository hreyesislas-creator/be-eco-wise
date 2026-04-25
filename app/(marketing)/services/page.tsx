import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Be Eco Wise",
  description:
    "Rubber mulch installation for playgrounds, schools, HOAs, parks, and residential landscapes.",
};

const services = [
  {
    href: "/services/playgrounds",
    title: "Playgrounds",
    blurb:
      "Fall-zone depth, clean borders, and finishes that hold up to daily play and weather.",
  },
  {
    href: "/services/schools",
    title: "Schools",
    blurb:
      "Campus-friendly scheduling, clear communication, and installs sized for athletic and play zones.",
  },
  {
    href: "/services/hoa",
    title: "HOA communities",
    blurb:
      "Common areas and entrances that stay tidy — less erosion, less constant top-offs.",
  },
  {
    href: "/services/parks",
    title: "Parks",
    blurb:
      "Municipal projects with attention to pathways, tree wells, and public safety expectations.",
  },
  {
    href: "/services/residential",
    title: "Residential landscaping",
    blurb:
      "Premium landscape rubber mulch with crisp edging and a maintained, design-forward look.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
        What we install
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Installation-first rubber mulch
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
        We are not a mulch retailer. Be Eco Wise plans and installs rubber mulch
        surfacing for properties that need durability, safety-minded depth, and
        a professional finish.
      </p>

      <ul className="mt-14 space-y-4">
        {services.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition hover:border-[var(--color-accent)]/35 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                  {s.title}
                </h2>
                <p className="mt-1 max-w-xl text-sm text-[var(--color-ink-muted)]">
                  {s.blurb}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-[var(--color-accent)]">
                View details →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-ink)]">
          Ready to talk through your site?
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Share a few details and we will follow up with next steps.
        </p>
        <Link
          href="/#estimate"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white shadow-md hover:bg-[var(--color-accent-hover)]"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}

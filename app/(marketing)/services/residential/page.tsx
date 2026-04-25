import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Residential Rubber Mulch Installation | Be Eco Wise",
  description:
    "Landscape rubber mulch installation for residential properties — premium finish and edging.",
};

export default function ResidentialServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/services"
        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        ← All services
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Residential landscaping
      </h1>
      <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
        For homeowners who want a refined landscape surface — not bags left at
        the curb. We install rubber mulch with clean transitions, stable edges,
        and a crew that respects your property.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-[var(--color-ink-muted)]">
        <li>Planting beds, tree rings, and design-forward layouts</li>
        <li>Low-mud, low-float maintenance profile</li>
        <li>Professional site cleanup</li>
      </ul>
      <Link
        href="/#estimate"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
      >
        Book a residential consult
      </Link>
    </div>
  );
}

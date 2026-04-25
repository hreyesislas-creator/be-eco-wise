import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HOA Rubber Mulch Installation | Be Eco Wise",
  description:
    "Rubber mulch for HOA common areas and entrances — clean edges, lower maintenance.",
};

export default function HoaServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/services"
        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        ← All services
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        HOA communities
      </h1>
      <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
        Common areas should look intentional year-round. We install rubber mulch
        with crisp borders and stable containment so boards spend less time
        chasing washouts, weeds, and constant refresh cycles.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-[var(--color-ink-muted)]">
        <li>Entrances, islands, and amenity zones</li>
        <li>Neighborhood-friendly crew standards</li>
        <li>Documentation you can share with committees</li>
      </ul>
      <Link
        href="/#estimate"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
      >
        Request an HOA walkthrough
      </Link>
    </div>
  );
}

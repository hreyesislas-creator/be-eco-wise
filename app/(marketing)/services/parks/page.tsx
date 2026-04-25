import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Park Rubber Mulch Installation | Be Eco Wise",
  description:
    "Municipal and park rubber mulch installation — pathways, play areas, and public spaces.",
};

export default function ParksServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/services"
        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        ← All services
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Parks
      </h1>
      <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
        Public spaces need surfacing that performs under heavy use. We plan
        installs around pathways, tree wells, play equipment zones, and the
        realities of municipal maintenance schedules.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-[var(--color-ink-muted)]">
        <li>Scoping for multi-area parks and greenways</li>
        <li>Attention to public access and staging</li>
        <li>Finishes built for long inspection cycles</li>
      </ul>
      <Link
        href="/#estimate"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
      >
        Start a parks inquiry
      </Link>
    </div>
  );
}

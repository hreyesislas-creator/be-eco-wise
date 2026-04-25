import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Playground Rubber Mulch Installation | Be Eco Wise",
  description:
    "Professional rubber mulch installation for playgrounds — depth, borders, and durable surfacing.",
};

export default function PlaygroundsServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/services"
        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        ← All services
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Playgrounds
      </h1>
      <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
        We install rubber mulch for play areas that need consistent depth, clean
        borders, and surfacing that stands up to weather and daily use. Our
        process is built around site access, drainage, and a finished look that
        reflects well on your property.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-[var(--color-ink-muted)]">
        <li>Fall-zone and use-area planning</li>
        <li>Edging and containment that reduces migration</li>
        <li>Crews experienced with public and private play spaces</li>
      </ul>
      <Link
        href="/#estimate"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
      >
        Request a playground consult
      </Link>
    </div>
  );
}

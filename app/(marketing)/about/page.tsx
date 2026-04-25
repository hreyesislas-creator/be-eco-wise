import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Be Eco Wise installs rubber mulch surfacing for Southern California properties — installation-first, not retail.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        About
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Installation-first surfacing
      </h1>
      <div className="mt-8 space-y-4 text-[var(--color-ink-muted)]">
        <p className="text-lg leading-relaxed text-[var(--color-ink)]">
          Be Eco Wise focuses on{" "}
          <strong className="font-semibold text-[var(--color-ink)]">
            rubber mulch installed on-site
          </strong>{" "}
          for playgrounds, schools, HOAs, parks, and residential landscapes
          across Southern California.
        </p>
        <p className="leading-relaxed">
          Our work is scoped around depth, drainage, containment, and the
          expectations of facilities directors, HOA boards, and homeowners — not
          around shopping carts or SKU counts. When you request an estimate,
          you&apos;re starting a conversation with a crew-based service, not a
          shipment tracking number.
        </p>
        <p className="leading-relaxed">
          We partner with material standards that emphasize clean, wire-free
          rubber and long-term outdoor performance, then deliver the value where
          it matters: professional installation and a finish you can inspect.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/locations"
          className="text-sm font-semibold text-[var(--color-accent)] hover:underline"
        >
          Service areas →
        </Link>
        <Link
          href="/#estimate"
          className="text-sm font-semibold text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          Get free estimate
        </Link>
      </div>
    </div>
  );
}

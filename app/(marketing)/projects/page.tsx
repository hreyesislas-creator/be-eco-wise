import { tempBecowiseImages } from "@/constants/temp-becowise-images";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Examples of rubber mulch installations — playgrounds, landscapes, and public spaces.",
};

const gallery = [
  {
    src: tempBecowiseImages.heroFeature,
    caption: "Landscape & playground surfacing",
    alt: "Rubber mulch installation project",
  },
  {
    src: tempBecowiseImages.industryPlayground,
    caption: "Play areas",
    alt: "Playground rubber mulch project",
  },
  {
    src: tempBecowiseImages.industryLandscape,
    caption: "HOA & residential",
    alt: "Landscape rubber mulch project",
  },
  {
    src: tempBecowiseImages.heroSecondary,
    caption: "Finished install detail",
    alt: "Rubber mulch finish detail",
  },
  {
    src: tempBecowiseImages.processLandscape,
    caption: "Residential beds",
    alt: "Residential rubber mulch landscaping",
  },
  {
    src: tempBecowiseImages.industrySports,
    caption: "Schools & parks",
    alt: "School or park outdoor surfacing",
  },
] as const;

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Installations
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
        Reference photography from the Be Eco Wise brand library (temporary
        remote assets). Case studies and local Southern California project pages
        can replace this grid when content is ready.
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <li
            key={item.caption}
            className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <p className="px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-14 text-center">
        <Link
          href="/#estimate"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
        >
          Discuss your project
        </Link>
      </div>
    </div>
  );
}

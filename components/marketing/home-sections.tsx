import { LocalImageFillWithFallback } from "@/components/marketing/local-image-fill-fallback";
import {
  homeCtaBackgroundImage,
  homeStandardsImages,
  homeWhyImage,
} from "@/constants/local-marketing-images";
import Link from "next/link";

export { HomeHeroSection } from "@/components/marketing/home-hero";

export function HomeTrustSection() {
  const items = [
    {
      src: homeStandardsImages.responsibleSourcing,
      alt: "Responsible tire recycling and processing",
      title: "Responsible sourcing",
      body: "Wire-free, recycling-forward material — built for years outside, not seasonal mulch churn.",
    },
    {
      src: homeStandardsImages.specificationGrade,
      alt: "Wire-free rubber processing",
      title: "Specification-grade product",
      body: "Clean granules for play, pets, and public scrutiny — we install what we'd stake our name on.",
    },
    {
      src: homeStandardsImages.fieldExecution,
      alt: "Playground safety surfacing",
      title: "Field execution",
      body: "Depth, borders, and drainage planned for real traffic — not a rushed top-dress.",
    },
  ];

  return (
    <section className="border-y border-black/[0.06] bg-[var(--home-warm-paper)]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--color-ink-faint)]">
          Standards
        </p>
        <h2 className="mx-auto mt-5 max-w-2xl text-center text-3xl font-light tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl">
          Material integrity, then craftsmanship
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-base font-light leading-relaxed text-[var(--color-ink-muted)]">
          A service business measured by how the site looks the week after we
          leave — and years after.
        </p>
        <div className="mt-20 grid gap-16 sm:grid-cols-3 sm:gap-10">
          {items.map((item) => (
            <div key={item.title} className="text-center sm:text-left">
              <div className="group/card relative mx-auto aspect-[5/3] max-w-sm overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:mx-0 sm:max-w-none">
                <LocalImageFillWithFallback
                  src={item.src}
                  alt={item.alt}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  cardHover
                />
              </div>
              <h3 className="mt-8 text-lg font-medium tracking-tight text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-ink-muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const industryRows = [
  {
    title: "Playgrounds",
    body: "Fall zones, containment, finishes that hold up to daily play.",
    href: "/services/playgrounds",
  },
  {
    title: "Schools & campuses",
    body: "Schedules and communication aligned with facilities teams.",
    href: "/services/schools",
  },
  {
    title: "HOA & communities",
    body: "Entrances and common areas that stay composed year-round.",
    href: "/services/hoa",
  },
  {
    title: "Parks & municipalities",
    body: "Public-scale planning for paths, wells, and heavy use.",
    href: "/services/parks",
  },
  {
    title: "Residential estates",
    body: "Landscape beds and tree rings with a maintained, design-forward edge.",
    href: "/services/residential",
  },
];

export function HomeIndustriesSection() {
  return (
    <section
      id="industries"
      className="scroll-mt-24 bg-[var(--home-charcoal)] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--home-accent-light)]/80">
              Who we serve
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Property types, one installation standard
            </h2>
          </div>
          <Link
            href="/industries"
            className="shrink-0 text-sm font-medium text-[var(--home-accent-light)] transition hover:text-white"
          >
            Full overview →
          </Link>
        </div>
        <ul className="mt-16 border-t border-white/10">
          {industryRows.map((row) => (
            <li key={row.title} className="border-b border-white/10">
              <Link
                href={row.href}
                className="group flex flex-col gap-2 py-8 transition sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-10"
              >
                <span className="text-xl font-light tracking-tight text-white group-hover:text-[var(--home-accent-light)] sm:text-2xl">
                  {row.title}
                </span>
                <span className="max-w-md text-sm font-light leading-relaxed text-white/50 sm:text-right">
                  {row.body}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeWhySection() {
  return (
    <section className="bg-[var(--home-warm-paper)]">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
          <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] lg:max-h-none">
            <LocalImageFillWithFallback
              src={homeWhyImage}
              alt="Finished rubber mulch installation"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--color-ink-faint)]">
              Why Be Eco Wise
            </p>
            <blockquote className="mt-6 text-2xl font-light leading-snug tracking-[-0.02em] text-[var(--color-ink)] sm:text-3xl sm:leading-snug">
              We scope for containment, drainage, and the moment someone kicks the
              edge — because that&apos;s when cheap installs fall apart.
            </blockquote>
            <p className="mt-8 text-base font-light leading-relaxed text-[var(--color-ink-muted)]">
              Boards, parents, and facilities directors get clear communication,
              professional crews, and a surface you can walk with confidence —
              not a SKU count or a tracking number.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
              <Link
                href="/about"
                className="text-[var(--color-ink)] underline decoration-[var(--color-border)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
              >
                Our approach
              </Link>
              <Link
                href="/locations"
                className="text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
              >
                Service areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    step: "I",
    title: "Consult",
    body: "Dimensions, photos, timing — we return a scoped path forward.",
  },
  {
    step: "II",
    title: "Site review",
    body: "Access, drainage, fall zones, HOA or district requirements.",
  },
  {
    step: "III",
    title: "Install",
    body: "Depth, edges, containment — full cleanup before handoff.",
  },
  {
    step: "IV",
    title: "Walkthrough",
    body: "Final sign-off and notes for your maintenance partners.",
  },
];

export function HomeProcessSection() {
  return (
    <section className="border-t border-white/5 bg-[var(--home-void)] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--home-accent-light)]/75">
          Process
        </p>
        <h2 className="mt-4 max-w-lg text-3xl font-light tracking-[-0.02em] sm:text-4xl">
          From first call to finished surface
        </h2>
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 ? (
                <div
                  className="absolute left-[1.125rem] top-10 hidden h-px w-[calc(100%+2rem)] bg-gradient-to-r from-white/20 to-transparent lg:block"
                  aria-hidden
                />
              ) : null}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--home-accent)]/40 text-xs font-medium text-[var(--home-accent-light)]">
                {s.step}
              </div>
              <h3 className="mt-6 text-lg font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeEstimateCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[var(--home-charcoal)]">
      <div className="absolute inset-0 opacity-30">
        <LocalImageFillWithFallback
          src={homeCtaBackgroundImage}
          alt=""
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--home-void)] via-[var(--home-charcoal)]/95 to-[var(--home-charcoal)]" />
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
        <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-[var(--home-accent)] to-transparent" />
        <h2 className="text-3xl font-light tracking-[-0.02em] text-white sm:text-4xl">
          Ready for an exact number on your site?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-white/55">
          Use the calculator above for a ballpark, then send details — we&apos;ll
          refine scope, access, and prep on a walkthrough.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/#estimate"
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full bg-[var(--home-accent)] px-10 text-sm font-semibold tracking-wide text-[#050807] transition hover:bg-[var(--home-accent-hover)]"
          >
            Get exact estimate
          </Link>
          <Link
            href="/locations"
            className="text-sm font-medium text-white/50 transition hover:text-white"
          >
            Browse service areas →
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { CoverageCalculatorPanel } from "@/components/marketing/coverage-calculator-panel";
import { PremiumPhotoLayers } from "@/components/marketing/premium-photo-layers";
import { localMarketingImages } from "@/constants/local-marketing-images";
import type { ProjectKind } from "@/lib/marketing/coverage-calculator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type SVGProps } from "react";

/* Hero background: localMarketingImages.heroBackground → /images/hero-background.webp */

const iconClass =
  "h-[15px] w-[15px] shrink-0 text-[var(--home-accent-light)]/55";

function IconRecycled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={iconClass} {...props}>
      <path
        d="M12 4L8 9h8L12 4zM7 14l-3 2 3 2M17 14l3 2-3 2M12 20l4-5H8l4 5z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconKidSafe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={iconClass} {...props}>
      <path
        d="M12 3l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11v3M12 8h.01"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWireFree(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={iconClass} {...props}>
      <path
        d="M4 12c2-4 6-6 10-6M20 12c-2 4-6 6-10 6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M6 18L18 6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconNoRot(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={iconClass} {...props}>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M15 16l4 4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={iconClass} {...props}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M8 8l8 8M16 8L8 16"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLowMaint(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={iconClass} {...props}>
      <path
        d="M4 16c3-2 6-2 8 0s5 2 8 0"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M4 12c3-2 6-2 8 0s5 2 8 0"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M4 8c3-2 6-2 8 0s5 2 8 0"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BENEFITS = [
  { label: "Recycled material", Icon: IconRecycled },
  { label: "Kid-safe surfacing", Icon: IconKidSafe },
  { label: "Wire-free standard", Icon: IconWireFree },
  { label: "Does not rot", Icon: IconNoRot },
  { label: "Pest-resistant", Icon: IconPest },
  { label: "Low maintenance", Icon: IconLowMaint },
] as const;

function HeroBenefitsRow() {
  return (
    <ul className="relative mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5 sm:gap-x-8">
      {BENEFITS.map(({ label, Icon }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/42"
        >
          <Icon />
          <span className="font-normal tracking-wide normal-case text-white/48">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HomeHeroSection() {
  const [projectKind, setProjectKind] = useState<ProjectKind>("landscape");
  const [heroImageOk, setHeroImageOk] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const href = localMarketingImages.heroBackground;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const t = 1 - Math.min(1, Math.max(0, r.bottom / (r.height + vh)));
      setParallaxY(t * 3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--home-void)]"
    >
      {/* L1: hero photo — stronger visibility; overlays below keep type readable */}
      {heroImageOk ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ transform: `translateY(${parallaxY}px)` }}
          aria-hidden
        >
          <div className="absolute inset-0 opacity-[0.42]">
            <div
              className="absolute inset-0 scale-[1.07]"
              style={{
                filter:
                  "blur(1px) brightness(1.12) saturate(0.9) contrast(1.05)",
                WebkitFilter:
                  "blur(1px) brightness(1.12) saturate(0.9) contrast(1.05)",
              }}
            >
              <Image
                src={localMarketingImages.heroBackground}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
                onError={() => setHeroImageOk(false)}
              />
            </div>
          </div>
          <PremiumPhotoLayers />
        </div>
      ) : null}

      {/* Base gradient — dark green wash (nudged darker so brighter photo doesn’t compete with copy) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--home-void)]/94 via-[#0a1210]/82 to-[#0d1815]/76" />
      {/* Readability veil — light extra tint */}
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--home-void)]/23"
        aria-hidden
      />
      {/* Mint radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_20%,rgba(93,205,165,0.08),transparent)]" />
      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_42%,transparent_32%,rgba(0,0,0,0.4)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.28)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:pt-28">
        <div className="grid min-w-0 items-start gap-14 lg:grid-cols-[1.15fr_minmax(300px,0.85fr)] lg:gap-10 xl:grid-cols-[1.2fr_minmax(300px,0.8fr)] xl:gap-12">
          <div className="relative min-w-0 max-w-2xl xl:max-w-[42.5rem]">
            <div
              className="pointer-events-none absolute -left-24 top-0 h-[min(28rem,55vh)] w-[min(28rem,90vw)] -translate-y-8 rounded-full bg-[var(--home-accent)]/[0.07] blur-[100px]"
              aria-hidden
            />

            <p className="relative text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--home-accent-light)]/90">
              Southern California · Rubber mulch installation
            </p>
            <p className="relative mt-2 text-[10px] font-light uppercase tracking-[0.32em] text-white/32">
              Rubber mulch surfacing · Crew-installed
            </p>
            <h1 className="relative mt-6 max-w-[18ch] text-[2.35rem] font-extralight leading-[1.08] tracking-[-0.03em] text-white sm:max-w-[20ch] sm:text-5xl lg:max-w-[22ch] lg:text-6xl xl:text-[3.5rem]">
              Surfacing that
              <span className="block font-light text-[var(--home-accent-light)]">
                earns its place
              </span>
              <span className="mt-1 block text-white/95">on your site.</span>
            </h1>
            <p className="relative mt-8 max-w-xl text-lg font-light leading-relaxed text-white/55 sm:text-xl sm:leading-relaxed">
              We install rubber mulch surfaces that replace dirt, wood chips,
              and gravel — cleaner, safer, and built to last.
            </p>
            <p className="relative mt-4 max-w-xl text-base font-light leading-relaxed tracking-tight text-white/75">
              Installed surfaces across parks, schools, and residential
              communities.
            </p>
            <p className="relative mt-3 max-w-xl text-sm font-light leading-relaxed text-white/40">
              For HOAs, schools, playgrounds, and landscape projects across
              Southern California.
            </p>
            <p className="relative mt-2 max-w-xl text-sm font-light leading-relaxed text-white/38">
              No rot. No bugs. No constant replacement.
            </p>
            <div className="relative mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col items-stretch gap-2 sm:items-start">
                <Link
                  href="/#estimate"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--home-accent)] px-10 text-sm font-semibold tracking-wide text-[#050807] transition hover:bg-[var(--home-accent-hover)]"
                >
                  Get your exact price
                </Link>
                <p className="text-center text-[11px] font-light leading-snug text-white/38 sm:text-left">
                  Takes 2–5 minutes · No obligation
                </p>
                <p className="text-center text-xs font-light leading-snug text-white/40 sm:text-left">
                  No site visit required to get started.
                </p>
              </div>
              <Link
                href="/#estimate"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
              >
                <span className="border-b border-white/30 pb-0.5 transition group-hover:border-white">
                  Request site visit
                </span>
                <span aria-hidden className="text-[var(--home-accent-light)]">
                  →
                </span>
              </Link>
            </div>

            <p className="relative mt-5 max-w-xl text-center text-[11px] font-light leading-relaxed text-white/30 sm:text-left">
              Installation scheduled based on current project queue.
            </p>

            <HeroBenefitsRow />
          </div>

          <div className="min-w-0 lg:sticky lg:top-28">
            <CoverageCalculatorPanel
              projectKind={projectKind}
              onProjectKindChange={setProjectKind}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

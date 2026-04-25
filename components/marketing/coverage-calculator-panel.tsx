"use client";

import {
  computeCalculator,
  coverageForDepth,
  defaultDepthForProject,
  DEPTH_OPTIONS,
  playgroundDepthWarning,
  PROJECT_KIND_LABELS,
  type ProjectKind,
} from "@/lib/marketing/coverage-calculator";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const kinds: ProjectKind[] = [
  "landscape",
  "playground",
  "hoa",
  "school_park",
];

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function formatTons(n: number) {
  return n >= 100 ? n.toFixed(1) : n.toFixed(2);
}

export type CoverageCalculatorPanelProps = {
  /** When set with `onProjectKindChange`, project type is controlled by the parent (e.g. hero background sync). */
  projectKind?: ProjectKind;
  onProjectKindChange?: (kind: ProjectKind) => void;
};

export function CoverageCalculatorPanel({
  projectKind: projectKindProp,
  onProjectKindChange,
}: CoverageCalculatorPanelProps = {}) {
  const [internalKind, setInternalKind] = useState<ProjectKind>("landscape");
  const projectKind =
    projectKindProp !== undefined ? projectKindProp : internalKind;

  const setProjectKind = (k: ProjectKind) => {
    onProjectKindChange?.(k);
    if (projectKindProp === undefined) setInternalKind(k);
  };

  const [depth, setDepth] = useState(() =>
    defaultDepthForProject("landscape"),
  );
  const [areaInput, setAreaInput] = useState("1200");

  useEffect(() => {
    setDepth(defaultDepthForProject(projectKind));
  }, [projectKind]);

  const areaSqFt = parseFloat(areaInput.replace(/,/g, "")) || 0;

  const result = useMemo(
    () => computeCalculator(areaSqFt, depth, projectKind),
    [areaSqFt, depth, projectKind],
  );

  const showSafetyWarning = playgroundDepthWarning(projectKind, depth);

  return (
    <div
      id="calculator"
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--home-accent)]/20 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">
          Coverage & cost
        </p>
        <h2 className="mt-2 text-2xl font-light tracking-[-0.02em] text-white sm:text-[1.65rem]">
          Rubber mulch calculator
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Ballpark material + labor from your square footage and depth. Final
          pricing depends on site conditions — we&apos;ll confirm on walkthrough.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="calc-project"
              className="text-xs font-medium text-white/70"
            >
              Project type
            </label>
            <select
              id="calc-project"
              value={projectKind}
              onChange={(e) =>
                setProjectKind(e.target.value as ProjectKind)
              }
              className="mt-1.5 w-full cursor-pointer rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--home-accent)]/60 focus:ring-1 focus:ring-[var(--home-accent)]/40"
            >
              {kinds.map((k) => (
                <option key={k} value={k} className="bg-[#1a2220] text-white">
                  {PROJECT_KIND_LABELS[k].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="calc-area"
              className="text-xs font-medium text-white/70"
            >
              Area (sq ft)
            </label>
            <input
              id="calc-area"
              type="text"
              inputMode="decimal"
              value={areaInput}
              onChange={(e) => setAreaInput(e.target.value)}
              placeholder="e.g. 2400"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white tabular-nums placeholder:text-white/35 outline-none transition focus:border-[var(--home-accent)]/60 focus:ring-1 focus:ring-[var(--home-accent)]/40"
            />
          </div>

          <div>
            <label
              htmlFor="calc-depth"
              className="text-xs font-medium text-white/70"
            >
              Depth (inches)
            </label>
            <select
              id="calc-depth"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="mt-1.5 w-full cursor-pointer rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--home-accent)]/60 focus:ring-1 focus:ring-[var(--home-accent)]/40"
            >
              {DEPTH_OPTIONS.map((d) => (
                <option key={d} value={d} className="bg-[#1a2220] text-white">
                  {d}&quot; — {coverageForDepth(d) ?? "—"} sq ft / ton
                </option>
              ))}
            </select>
          </div>
        </div>

        {showSafetyWarning ? (
          <p
            className="mt-4 rounded-xl border border-amber-400/35 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-100/95"
            role="status"
          >
            For playground safety, depths of 4 inches or more are recommended.
          </p>
        ) : null}

        <div className="mt-6 border-t border-white/10 pt-6">
          {result ? (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-white/80">
                <dt className="text-white/55">Tons required</dt>
                <dd className="font-medium tabular-nums text-white">
                  {formatTons(result.tons)} tons
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-white/80">
                <dt className="text-white/55">Material (est.)</dt>
                <dd className="font-medium tabular-nums text-white">
                  {formatUsd(result.materialUsd)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-white/80">
                <dt className="text-white/55">Labor (range)</dt>
                <dd className="font-medium tabular-nums text-white">
                  {formatUsd(result.laborLowUsd)} – {formatUsd(result.laborHighUsd)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
                <dt className="text-sm font-semibold text-white">Total (range)</dt>
                <dd className="text-base font-semibold tabular-nums tracking-tight text-[var(--home-accent-light)]">
                  {formatUsd(result.totalLowUsd)} –{" "}
                  {formatUsd(result.totalHighUsd)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-white/45">
              Enter a valid area in square feet to see estimates.
            </p>
          )}
        </div>

        <Link
          href="/#estimate"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[var(--home-accent)] text-sm font-semibold tracking-wide text-[#0a0f0d] transition hover:bg-[var(--home-accent-hover)]"
        >
          Get exact estimate
        </Link>
        <p className="mt-3 text-center text-[10px] leading-relaxed text-white/40">
          $750/ton material · install rates vary by site access and prep
        </p>
      </div>
    </div>
  );
}

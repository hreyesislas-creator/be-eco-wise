/**
 * Rubber mulch coverage & ballpark cost calculator (marketing only).
 * Not a binding quote — directs users to Get Exact Estimate.
 */

export const COVERAGE_SQFT_PER_TON: Record<number, number> = {
  2: 400,
  3: 300,
  4: 200,
  5: 160,
  6: 133,
  7: 114,
  8: 100,
  9: 89,
  10: 80,
};

export const DEPTH_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const MATERIAL_USD_PER_TON = 750;

export type ProjectKind = "landscape" | "playground" | "hoa" | "school_park";

export const PROJECT_KIND_LABELS: Record<
  ProjectKind,
  { label: string; short: string }
> = {
  landscape: { label: "Landscape", short: "Landscape" },
  playground: { label: "Playground", short: "Playground" },
  hoa: { label: "HOA / common area", short: "HOA" },
  school_park: { label: "School / park", short: "School / park" },
};

/** Labor install range ($/sq ft) by project category. */
export function laborDollarsPerSqFt(
  kind: ProjectKind,
): { low: number; high: number } {
  if (kind === "playground" || kind === "school_park") {
    return { low: 4, high: 7 };
  }
  return { low: 2.5, high: 4.5 };
}

export function defaultDepthForProject(kind: ProjectKind): number {
  if (kind === "playground" || kind === "school_park") return 4;
  return 2;
}

export function coverageForDepth(depthInches: number): number | undefined {
  return COVERAGE_SQFT_PER_TON[depthInches];
}

export function playgroundDepthWarning(
  kind: ProjectKind,
  depthInches: number,
): boolean {
  return kind === "playground" && depthInches < 4;
}

export type CalculatorResult = {
  tons: number;
  materialUsd: number;
  laborLowUsd: number;
  laborHighUsd: number;
  totalLowUsd: number;
  totalHighUsd: number;
  coverageSqFtPerTon: number;
};

export function computeCalculator(
  areaSqFt: number,
  depthInches: number,
  kind: ProjectKind,
): CalculatorResult | null {
  if (!Number.isFinite(areaSqFt) || areaSqFt <= 0) return null;
  const coverage = coverageForDepth(depthInches);
  if (coverage === undefined) return null;

  const tons = areaSqFt / coverage;
  const materialUsd = tons * MATERIAL_USD_PER_TON;
  const { low, high } = laborDollarsPerSqFt(kind);
  const laborLowUsd = areaSqFt * low;
  const laborHighUsd = areaSqFt * high;

  return {
    tons,
    materialUsd,
    laborLowUsd,
    laborHighUsd,
    totalLowUsd: materialUsd + laborLowUsd,
    totalHighUsd: materialUsd + laborHighUsd,
    coverageSqFtPerTon: coverage,
  };
}

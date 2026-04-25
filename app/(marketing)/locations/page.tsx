import type { Metadata } from "next";
import { listServiceAreas } from "@/lib/data/service-areas";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas | Be Eco Wise",
  description:
    "Regions where Be Eco Wise installs rubber mulch for playgrounds, schools, HOAs, parks, and homes.",
};

export default async function LocationsIndexPage() {
  const areas = await listServiceAreas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
        Where we install
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Service areas
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
        Each area page is tuned for local search and includes a direct path to
        request a site visit with the correct region pre-selected.
      </p>

      {areas.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-ink-muted)]">
          No service areas loaded. Add{" "}
          <code className="rounded bg-[var(--color-surface-2)] px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-[var(--color-surface-2)] px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          to{" "}
          <code className="rounded bg-[var(--color-surface-2)] px-1.5 py-0.5 text-xs">
            .env.local
          </code>{" "}
          and run the SQL migration in Supabase.
        </p>
      ) : (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {areas.map((a) => (
            <li key={a.id}>
              <Link
                href={`/locations/${a.slug}`}
                className="block rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition hover:border-[var(--color-accent)]/35 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                  {a.name}
                </h2>
                {(a.state || a.region_label) && (
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                    {[a.region_label, a.state].filter(Boolean).join(" · ")}
                  </p>
                )}
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">
                  View local page →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { LeadForm } from "@/components/forms/lead-form";
import { getServiceAreaBySlug, listServiceAreas } from "@/lib/data/service-areas";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  if (!area) {
    return { title: "Location | Be Eco Wise" };
  }
  return {
    title: area.meta_title ?? `${area.name} | Be Eco Wise`,
    description:
      area.meta_description ??
      `Rubber mulch installation in ${area.name}. Playgrounds, schools, HOAs, parks, and residential projects.`,
  };
}

export const dynamic = "force-dynamic";

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  if (!area) notFound();

  const areas = await listServiceAreas();

  return (
    <div>
      <div className="border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Link
            href="/locations"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            ← All service areas
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            {area.region_label ?? "Service area"}
            {area.state ? ` · ${area.state}` : ""}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Rubber mulch installation in {area.name}
          </h1>
          {area.description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
              {area.description}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#estimate"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-8 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/20 hover:bg-[var(--color-accent-hover)]"
            >
              Get free estimate
            </a>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-8 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink-faint)]"
            >
              Our services
            </Link>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">
              Why property teams choose Be Eco Wise
            </h2>
            <ul className="mt-6 space-y-4 text-[var(--color-ink-muted)]">
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  aria-hidden
                />
                Installation crews — not drop-shipped pallets and a “good luck”
                note.
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  aria-hidden
                />
                Playgrounds, schools, HOAs, parks, and residential landscapes.
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  aria-hidden
                />
                Clear proposals and professional site cleanup.
              </li>
            </ul>
          </div>
          <LeadForm
            areas={areas}
            defaultAreaId={area.id}
            id="estimate"
            title={`Get your ${area.name} estimate`}
            subtitle="Request a site visit or written scope — we install rubber mulch on your property, we don’t leave pallets at the curb."
          />
        </div>
      </section>
    </div>
  );
}

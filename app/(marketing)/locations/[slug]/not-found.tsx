import Link from "next/link";

export default function LocationNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">
        Location not found
      </h1>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
        That service area does not exist or is not published yet.
      </p>
      <Link
        href="/locations"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
      >
        Browse service areas
      </Link>
    </div>
  );
}

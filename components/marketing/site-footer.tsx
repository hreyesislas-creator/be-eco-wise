import Link from "next/link";

const col = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "All services" },
      { href: "/services/playgrounds", label: "Playgrounds" },
      { href: "/services/schools", label: "Schools" },
      { href: "/services/hoa", label: "HOA communities" },
      { href: "/services/parks", label: "Parks" },
      { href: "/services/residential", label: "Residential" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/industries", label: "Industries" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      { href: "/locations", label: "Service areas" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-ink)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-xl font-semibold tracking-tight">
              Be Eco<span className="text-[var(--color-accent-light)]"> Wise</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Rubber mulch surfacing installed for Southern California
              playgrounds, schools, HOAs, parks, and residential landscapes —
              planned depth, professional crews, and a finish built to last.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/#estimate"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                Get free estimate
              </Link>
              <Link
                href="/#estimate"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request site visit
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {col.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Be Eco Wise. All rights reserved.</p>
          <p className="max-w-prose sm:text-right">
            Marketing imagery on this preview may load from becowise.com
            temporarily for design approval — final assets will be hosted locally.
          </p>
        </div>
      </div>
    </footer>
  );
}

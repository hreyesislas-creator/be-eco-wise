import { HeaderLogo } from "@/components/marketing/header-logo";
import Link from "next/link";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/locations", label: "Locations" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Be Eco Wise — home"
          className="flex shrink-0 items-center"
        >
          <HeaderLogo />
        </Link>

        <nav
          className="hidden items-center gap-7 text-[13px] font-semibold text-[var(--color-ink-muted)] lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#estimate"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-accent)] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[var(--color-accent-hover)] sm:px-5"
          >
            Get estimate
          </Link>

          <details className="relative lg:hidden">
            <summary
              className="flex h-10 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-3 text-xs font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              Menu
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2 shadow-xl">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#estimate"
                className="block border-t border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accent)]"
              >
                Get free estimate
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

import { signOut } from "@/app/dashboard/actions";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Be Eco Wise",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-[var(--color-bg)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[var(--color-ink)]"
            >
              Be Eco Wise
            </Link>
            <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
              CRM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            >
              View site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}

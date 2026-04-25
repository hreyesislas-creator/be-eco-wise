import { LoginFormWrapper } from "@/app/login/login-form";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; missingEnv?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next?.startsWith("/") ? sp.next : "/dashboard";
  const missingEnv = sp.missingEnv === "1";

  return (
    <div className="flex min-h-full flex-col bg-[var(--color-bg)]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          ← Back to site
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-[var(--color-ink)]">
          Staff sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Access the Be Eco Wise lead dashboard. Create users in the Supabase
          Auth dashboard (Email provider).
        </p>
        <LoginFormWrapper next={next} missingEnv={missingEnv} />
      </div>
    </div>
  );
}

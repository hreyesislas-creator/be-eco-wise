"use client";

import { signInWithPassword, type LoginState } from "@/app/login/actions";
import { useActionState } from "react";

const initial: LoginState = { error: null };

export function LoginFormWrapper({
  next,
  missingEnv,
}: {
  next: string;
  missingEnv: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    signInWithPassword,
    initial,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={next} />
      {missingEnv ? (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Supabase environment variables are missing. Copy{" "}
          <code className="rounded bg-white/60 px-1">.env.local.example</code> to{" "}
          <code className="rounded bg-white/60 px-1">.env.local</code> and add your
          project keys.
        </p>
      ) : null}
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium text-[var(--color-ink)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium text-[var(--color-ink)]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-ink)] text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

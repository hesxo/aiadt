"use client";

import { useTailorCut } from "@/lib/store";
import type { UserRole } from "@/lib/types";

export function LoginScreen() {
  const { login } = useTailorCut();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-gray)] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg ring-1 ring-[var(--border)]">
        <h1 className="text-center text-2xl font-semibold tracking-tight">TailorCut</h1>
        <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
          Waste-smart cutting for small tailor shops — demo workspace
        </p>

        <div className="mt-8 rounded-2xl bg-[var(--bg-gray)] p-4 text-sm text-[var(--text-secondary)]">
          <p className="font-medium text-[var(--text)]">How to use</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4">
            <li>Pick a role and sign in (no password).</li>
            <li>Open <strong>Patterns</strong> — choose fabric + order, add pieces, plan layout.</li>
            <li><strong>Confirm cut</strong> to update stock, scraps, and order totals.</li>
            <li>Admins can open <strong>Reports</strong> and copy CSV history.</li>
          </ol>
        </div>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={() => login("tailor" satisfies UserRole)}
            className="w-full rounded-xl bg-[var(--text)] py-3 text-sm font-medium text-white"
          >
            Continue as Tailor
          </button>
          <button
            type="button"
            onClick={() => login("admin" satisfies UserRole)}
            className="w-full rounded-xl border border-[var(--border)] py-3 text-sm font-medium"
          >
            Continue as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
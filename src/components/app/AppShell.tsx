"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTailorCut } from "@/lib/store";

const baseNav = [
  { href: "/", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/patterns", label: "Patterns" },
  { href: "/orders", label: "Orders" },
  { href: "/scraps", label: "Scraps" },
  { href: "/reports", label: "Reports", adminOnly: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { session, logout } = useTailorCut();

  const nav = baseNav.filter((item) => !item.adminOnly || session?.role === "admin");

  return (
    <div className="flex min-h-screen bg-[var(--bg-gray)]">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-elevated)] p-4 md:flex">
        <Link href="/" className="mb-8 px-2 text-lg font-semibold tracking-tight">
          TailorCut
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5" aria-label="App">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--text)] font-medium text-white"
                    : "text-[var(--text-secondary)] hover:bg-black/[0.04] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/presentation"
          className="mt-4 rounded-lg px-3 py-2 text-xs text-[var(--text-tertiary)] hover:text-[var(--accent)]"
        >
          Project presentation →
        </Link>
        <div className="mt-4 rounded-xl bg-[var(--bg-gray)] p-3 text-xs text-[var(--text-secondary)]">
          <p className="font-medium text-[var(--text)]">{session?.displayName}</p>
          <p className="mt-0.5 capitalize">{session?.role} · Demo</p>
          <button type="button" onClick={logout} className="mt-2 text-[var(--accent)]">
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-[var(--border)] bg-[rgba(251,251,253,0.8)] px-4 backdrop-blur-xl md:hidden">
          <Link href="/" className="font-semibold">
            TailorCut
          </Link>
          <button
            type="button"
            className="rounded-lg px-3 py-1 text-sm font-medium text-[var(--accent)]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Menu
          </button>
        </header>

        {open && (
          <nav className="border-b border-[var(--border)] bg-white px-4 py-3 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
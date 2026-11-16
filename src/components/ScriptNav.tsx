"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/presentation", label: "Deck" },
  { href: "/script", label: "Script" },
];

export function ScriptNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(251,251,253,0.85)] backdrop-blur-xl">
      <nav
        className="mx-auto flex h-11 max-w-[var(--max-width-wide)] items-center justify-between px-4 sm:px-6"
        aria-label="Script navigation"
      >
        <Link href="/presentation" className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
          TailorCut
        </Link>
        <ul className="flex items-center gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-xs transition ${
                    active
                      ? "font-medium text-[var(--text)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/"
          className="rounded-full bg-[var(--accent)] px-3.5 py-1 text-xs font-medium text-white transition hover:brightness-110"
        >
          Open app
        </Link>
      </nav>
    </header>
  );
}
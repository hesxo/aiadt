"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#introduction", label: "Overview" },
  { href: "#problem", label: "Problem" },
  { href: "#features", label: "Features" },
  { href: "#architecture", label: "Architecture" },
  { href: "#stack", label: "Technology" },
];

export function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
  <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,box-shadow] duration-300 ${
          scrolled || menuOpen
            ? "bg-[rgba(251,251,253,0.72)] shadow-[0_1px_0_var(--border)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-11 max-w-[1200px] items-center justify-between px-4 sm:px-6"
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="text-[17px] font-semibold tracking-tight text-[var(--text)]"
            onClick={() => setMenuOpen(false)}
          >
            AIADT
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs font-normal text-[var(--text)] opacity-80 transition-opacity hover:opacity-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#conclusion"
            className="hidden rounded-full bg-[var(--accent)] px-3.5 py-1 text-xs font-medium text-white transition hover:brightness-110 md:inline-block"
          >
            Get started
          </Link>

          <button
            type="button"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-5 bg-[var(--text)] transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[var(--text)] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[var(--text)] transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[rgba(251,251,253,0.98)] pt-14 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 px-8 py-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-3xl font-semibold tracking-tight text-[var(--text)]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#conclusion"
            className="mt-4 inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white"
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </Link>
        </div>
      </div>
    </>
  );
}
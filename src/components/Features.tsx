"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type TabId = "functional" | "nonfunctional" | "scope";

const functional = [
  { id: "FR1", title: "User registration & login", desc: "Secure accounts with Admin and Tailor roles." },
  { id: "FR2", title: "Fabric data input", desc: "Log type, colour, dimensions, and unit cost." },
  { id: "FR3", title: "Pattern layout engine", desc: "Optimal placement to minimize cutting waste." },
  { id: "FR4", title: "Scrap tracking", desc: "Auto-log leftovers and match to future orders." },
  { id: "FR5", title: "Order management", desc: "Link fabric usage and scraps to each customer order." },
  { id: "FR6", title: "Search & reporting", desc: "Inventory search plus waste, savings, and upcycling reports." },
];

const nonfunctional = [
  { title: "Performance", desc: "Layouts under 3 seconds · Reports under 5 seconds · 50 concurrent users." },
  { title: "Security", desc: "TLS 1.2+, RBAC, bcrypt passwords, audit logs." },
  { title: "Usability", desc: "Simple UI · Core tasks in ≤ 3 steps · Multi-language." },
  { title: "Reliability", desc: "99% uptime · Offline entry · Daily backups · RTO < 4 hours." },
];

const inScope = [
  "Pattern layout optimization",
  "Inventory & low-stock alerts",
  "Scrap logging & upcycling suggestions",
  "Orders linked to fabric usage",
  "PDF/CSV reports",
  "Admin & Tailor roles",
  "Mobile browser + offline entry",
];

const outScope = [
  "E-commerce / POS integration",
  "Physical cutter automation",
  "AI fabric defect recognition",
  "3D garment simulation",
  "MVP time-box · rule-based engine (not trained ML)",
];

const tabs: { id: TabId; label: string }[] = [
  { id: "functional", label: "Functional" },
  { id: "nonfunctional", label: "Non-functional" },
  { id: "scope", label: "Scope & limits" },
];

export function Features() {
  const [active, setActive] = useState<TabId>("functional");

  return (
    <section id="features" className="section-pad bg-[var(--bg-gray)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">System requirements</p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <div
            className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-[var(--border)]"
            role="tablist"
            aria-label="Requirement type"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === tab.id}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  active === tab.id
                    ? "bg-[var(--text)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
                onClick={() => setActive(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10">
          {active === "functional" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
              {functional.map((f) => (
                <article
                  key={f.id}
                  className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[var(--border)] transition hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {f.id}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{f.desc}</p>
                </article>
              ))}
            </div>
          )}

          {active === "nonfunctional" && (
            <div className="grid gap-4 sm:grid-cols-2" role="tabpanel">
              {nonfunctional.map((n) => (
                <article
                  key={n.title}
                  className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[var(--border)]"
                >
                  <h3 className="text-xl font-semibold">{n.title}</h3>
                  <p className="mt-3 text-[var(--text-secondary)]">{n.desc}</p>
                </article>
              ))}
            </div>
          )}

          {active === "scope" && (
            <div className="grid gap-6 md:grid-cols-2" role="tabpanel">
              <div className="rounded-3xl bg-white p-8 ring-1 ring-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--accent-green)]">In scope</h3>
                <ul className="mt-4 space-y-2 text-[var(--text-secondary)]">
                  {inScope.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-[var(--accent-green)]">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--text-tertiary)]">Out of scope (v1)</h3>
                <ul className="mt-4 space-y-2 text-[var(--text-tertiary)]">
                  {outScope.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span>—</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
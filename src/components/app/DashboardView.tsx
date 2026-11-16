"use client";

import Link from "next/link";
import { isLowStock, useTailorCut } from "@/lib/store";

export function DashboardView() {
  const { state, metrics } = useTailorCut();
  const lowStock = state.fabrics.filter(isLowStock).length;
  const activeOrders = state.orders.filter((o) => o.status !== "complete").length;

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-[var(--text-secondary)]">TailorCut — plan cuts, track stock, cut waste.</p>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-[var(--text-secondary)] ring-1 ring-[var(--border)]">
        <strong className="text-[var(--text)]">Quick flow:</strong> Patterns → Plan layout → Confirm cut → check
        Inventory, Scraps, and Orders. Admins: Reports for CSV export.
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Cuts recorded", value: String(metrics.cutsRecorded) },
          { label: "Fabric cut", value: `${(metrics.fabricUsedCm / 100).toFixed(2)} m` },
          { label: "Avg waste", value: `${metrics.avgWaste}%` },
          { label: "Total saved", value: `Rs. ${metrics.totalSavedLkr.toLocaleString()}` },
        ].map((m) => (
          <article key={m.label} className="rounded-2xl bg-white p-5 ring-1 ring-[var(--border)]">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold">{m.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
          <div className="mb-4 flex justify-between">
            <h2 className="text-lg font-semibold">Active orders</h2>
            <Link href="/orders" className="text-sm text-[var(--accent)]">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-[var(--border)]">
            {state.orders.map((o) => (
              <li key={o.id} className="flex justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{o.customer}</p>
                  <p className="text-[var(--text-secondary)]">{o.garment}</p>
                </div>
                <span className="rounded-full bg-[var(--bg-gray)] px-2.5 py-0.5 text-xs capitalize">{o.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
          <h2 className="text-lg font-semibold">Alerts</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl bg-[#fff8e6] p-3">
              <strong>{lowStock}</strong> fabrics under 2m
            </li>
            <li className="rounded-xl bg-[var(--bg-gray)] p-3">
              <strong>{state.scraps.length}</strong> scraps in bank
            </li>
            <li className="rounded-xl bg-[var(--bg-gray)] p-3">
              <strong>{activeOrders}</strong> orders in progress
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/patterns"
          className="rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-white"
        >
          Open layout planner
        </Link>
        <Link href="/inventory" className="rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm">
          Add stock
        </Link>
      </div>
    </div>
  );
}
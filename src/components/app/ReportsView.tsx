"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTailorCut } from "@/lib/store";

export function ReportsView() {
  const { session, metrics, state, exportCutHistoryCsv } = useTailorCut();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (session && session.role !== "admin") {
      router.replace("/");
    }
  }, [session, router]);

  if (!session || session.role !== "admin") {
    return <p className="text-sm text-[var(--text-secondary)]">Admin access only.</p>;
  }

  const copyCsv = async () => {
    const text = exportCutHistoryCsv();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Cuts recorded", value: metrics.cutsRecorded },
          { label: "Fabric used (cm)", value: metrics.fabricUsedCm },
          { label: "Avg waste %", value: metrics.avgWaste },
          { label: "Total saved LKR", value: metrics.totalSavedLkr },
        ].map((m) => (
          <article key={m.label} className="rounded-2xl bg-white p-5 ring-1 ring-[var(--border)]">
            <p className="text-xs uppercase text-[var(--text-tertiary)]">{m.label}</p>
            <p className="mt-2 text-2xl font-semibold">{m.value}</p>
          </article>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)]">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="font-semibold">Cutting history</h2>
          <button
            type="button"
            onClick={copyCsv}
            className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white"
          >
            {copied ? "Copied!" : "Copy CSV"}
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--bg-gray)] text-xs uppercase text-[var(--text-tertiary)]">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Fabric</th>
              <th className="px-4 py-2">Length</th>
              <th className="px-4 py-2">Waste</th>
              <th className="px-4 py-2">Saved</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {state.cutHistory.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--text-secondary)]">
                  No cuts yet — confirm a layout in Patterns.
                </td>
              </tr>
            ) : (
              state.cutHistory.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(c.at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{c.orderId}</td>
                  <td className="px-4 py-2">{c.fabricType}</td>
                  <td className="px-4 py-2">{(c.fabricLengthCm / 100).toFixed(2)} m</td>
                  <td className="px-4 py-2">{c.wastePercent}%</td>
                  <td className="px-4 py-2">Rs. {c.savedLkr}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import { isLowStock, useTailorCut } from "@/lib/store";

export function InventoryView() {
  const { state, addFabric } = useTailorCut();
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    type: "",
    color: "",
    widthCm: 150,
    lengthCm: 300,
    unitCostPerM: 800,
  });

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return state.fabrics;
    return state.fabrics.filter(
      (f) => f.type.toLowerCase().includes(query) || f.color.toLowerCase().includes(query),
    );
  }, [q, state.fabrics]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type.trim() || !form.color.trim()) return;
    addFabric({
      type: form.type.trim(),
      color: form.color.trim(),
      widthCm: form.widthCm,
      lengthCm: form.lengthCm,
      unitCostPerM: form.unitCostPerM,
    });
    setForm({ type: "", color: "", widthCm: 150, lengthCm: 300, unitCostPerM: 800 });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Fabric inventory</h1>

      <input
        type="search"
        placeholder="Search type or colour…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full max-w-md rounded-xl border border-[var(--border)] px-4 py-2 text-sm"
      />

      <form onSubmit={submit} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
        <h2 className="text-sm font-semibold">Add fabric roll</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <input
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="rounded-lg border px-3 py-2 text-sm"
          />
          <input
            placeholder="Colour"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            className="rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Width cm"
            value={form.widthCm}
            onChange={(e) => setForm({ ...form, widthCm: Number(e.target.value) })}
            className="rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Length cm"
            value={form.lengthCm}
            onChange={(e) => setForm({ ...form, lengthCm: Number(e.target.value) })}
            className="rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Rs/m"
            value={form.unitCostPerM}
            onChange={(e) => setForm({ ...form, unitCostPerM: Number(e.target.value) })}
            className="rounded-lg border px-3 py-2 text-sm"
          />
        </div>
        <button type="submit" className="mt-4 rounded-lg bg-[var(--text)] px-4 py-2 text-sm text-white">
          Save fabric
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-[var(--bg-gray)] text-xs uppercase text-[var(--text-tertiary)]">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Colour</th>
              <th className="px-4 py-3">Roll</th>
              <th className="px-4 py-3">Left</th>
              <th className="px-4 py-3">Rs/m</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-3 font-mono text-xs">{f.id}</td>
                <td className="px-4 py-3">{f.type}</td>
                <td className="px-4 py-3">{f.color}</td>
                <td className="px-4 py-3">
                  {f.widthCm}cm wide
                </td>
                <td className="px-4 py-3">{(f.lengthCm / 100).toFixed(2)} m</td>
                <td className="px-4 py-3">{f.unitCostPerM}</td>
                <td className="px-4 py-3">
                  {isLowStock(f) ? (
                    <span className="rounded-full bg-[#fff3cd] px-2 text-xs">Low (&lt;2m)</span>
                  ) : (
                    <span className="rounded-full bg-[#e8f8ee] px-2 text-xs">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
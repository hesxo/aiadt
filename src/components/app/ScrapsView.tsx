"use client";

import { useState } from "react";
import { useTailorCut } from "@/lib/store";

export function ScrapsView() {
  const { state, addScrap, deleteScrap } = useTailorCut();
  const [fabricId, setFabricId] = useState(state.fabrics[0]?.id ?? "");
  const [widthCm, setWidthCm] = useState(30);
  const [lengthCm, setLengthCm] = useState(40);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const fabric = state.fabrics.find((f) => f.id === fabricId);
    if (!fabric) return;
    addScrap({
      fabricId: fabric.id,
      fabricType: fabric.type,
      color: fabric.color,
      widthCm,
      lengthCm,
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Scrap bank</h1>
      <p className="text-sm text-[var(--text-secondary)]">
        Leftovers for reuse. Layout planner consumes matching scraps before new fabric.
      </p>

      <form onSubmit={add} className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 ring-1 ring-[var(--border)]">
        <select
          value={fabricId}
          onChange={(e) => setFabricId(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          {state.fabrics.map((f) => (
            <option key={f.id} value={f.id}>
              {f.type} · {f.color}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={widthCm}
          onChange={(e) => setWidthCm(Number(e.target.value))}
          className="w-24 rounded-lg border px-2 py-2 text-sm"
          placeholder="W"
        />
        <input
          type="number"
          min={1}
          value={lengthCm}
          onChange={(e) => setLengthCm(Number(e.target.value))}
          className="w-24 rounded-lg border px-2 py-2 text-sm"
          placeholder="L"
        />
        <button type="submit" className="rounded-lg bg-[var(--text)] px-4 py-2 text-sm text-white">
          Log scrap
        </button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {state.scraps.map((s) => (
          <article key={s.id} className="rounded-2xl bg-white p-5 ring-1 ring-[var(--border)]">
            <p className="font-mono text-xs">{s.id}</p>
            <p className="font-medium">
              {s.fabricType} · {s.color}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {s.widthCm} × {s.lengthCm} cm
            </p>
            <p className="mt-2 text-sm text-[var(--accent)]">Reuse: {s.reuseIdea}</p>
            {s.matchedOrderId && (
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">Hint order {s.matchedOrderId}</p>
            )}
            <button
              type="button"
              onClick={() => deleteScrap(s.id)}
              className="mt-3 text-xs text-red-600"
            >
              Remove
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
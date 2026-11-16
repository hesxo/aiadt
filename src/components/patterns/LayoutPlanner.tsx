"use client";

import { useMemo, useState } from "react";
import { LayoutSvg } from "./LayoutSvg";
import { useTailorCut } from "@/lib/store";
import type { LayoutPlan, PieceInput } from "@/lib/types";

const DEMO_PIECES: PieceInput[] = [
  { id: "p1", name: "Front panel", widthCm: 60, heightCm: 90, quantity: 1 },
  { id: "p2", name: "Sleeve", widthCm: 40, heightCm: 55, quantity: 2 },
  { id: "p3", name: "Collar", widthCm: 25, heightCm: 8, quantity: 1 },
];

function newPieceId() {
  return `p-${Math.random().toString(36).slice(2, 8)}`;
}

export function LayoutPlanner() {
  const { state, createLayoutPlan, confirmCut } = useTailorCut();
  const [fabricId, setFabricId] = useState(state.fabrics[0]?.id ?? "");
  const [orderId, setOrderId] = useState(state.orders[0]?.id ?? "");
  const [pieces, setPieces] = useState<PieceInput[]>(DEMO_PIECES);
  const [allowRotation, setAllowRotation] = useState(true);
  const [plan, setPlan] = useState<LayoutPlan | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fabric = state.fabrics.find((f) => f.id === fabricId);

  const matchingScrapCount = useMemo(() => {
    if (!fabric) return 0;
    return state.scraps.filter(
      (s) => s.fabricId === fabric.id || (s.fabricType === fabric.type && s.color === fabric.color),
    ).length;
  }, [fabric, state.scraps]);

  const updatePiece = (id: string, patch: Partial<PieceInput>) => {
    setPieces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    setPlan(null);
  };

  const addPiece = () => {
    setPieces((prev) => [
      ...prev,
      { id: newPieceId(), name: "Piece", widthCm: 30, heightCm: 40, quantity: 1 },
    ]);
    setPlan(null);
  };

  const removePiece = (id: string) => {
    setPieces((prev) => prev.filter((p) => p.id !== id));
    setPlan(null);
  };

  const runPlan = () => {
    setMessage(null);
    try {
      const next = createLayoutPlan(fabricId, orderId, pieces, allowRotation);
      setPlan(next);
    } catch {
      setMessage("Could not plan layout — check fabric and pieces.");
    }
  };

  const runConfirm = () => {
    if (!plan) return;
    const res = confirmCut(plan);
    if (res.ok) {
      setMessage("Cut recorded — stock, scraps, and order updated.");
      setPlan(null);
    } else {
      setMessage(res.error ?? "Could not confirm cut.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Layout planner</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Uses matching scraps first, then rolls fabric. Scraps available for this fabric:{" "}
          <strong>{matchingScrapCount}</strong>
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-[var(--border)] sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-[var(--text-secondary)]">Fabric</span>
          <select
            className="mt-1 w-full rounded-xl border border-[var(--border)] px-3 py-2"
            value={fabricId}
            onChange={(e) => {
              setFabricId(e.target.value);
              setPlan(null);
            }}
          >
            {state.fabrics.map((f) => (
              <option key={f.id} value={f.id}>
                {f.type} · {f.color} ({(f.lengthCm / 100).toFixed(2)}m left)
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-[var(--text-secondary)]">Order</span>
          <select
            className="mt-1 w-full rounded-xl border border-[var(--border)] px-3 py-2"
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              setPlan(null);
            }}
          >
            {state.orders.map((o) => (
              <option key={o.id} value={o.id}>
                {o.id} — {o.customer} ({o.garment})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Pieces</h2>
          <button
            type="button"
            onClick={addPiece}
            className="rounded-lg bg-[var(--bg-gray)] px-3 py-1.5 text-sm"
          >
            Add piece
          </button>
        </div>
        <div className="space-y-3">
          {pieces.map((p) => (
            <div
              key={p.id}
              className="grid gap-2 rounded-xl bg-[var(--bg-gray)] p-3 sm:grid-cols-6 sm:items-end"
            >
              <label className="text-xs sm:col-span-2">
                Name
                <input
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-2 py-1.5 text-sm"
                  value={p.name}
                  onChange={(e) => updatePiece(p.id, { name: e.target.value })}
                />
              </label>
              <label className="text-xs">
                W (cm)
                <input
                  type="number"
                  min={1}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-2 py-1.5 text-sm"
                  value={p.widthCm}
                  onChange={(e) => updatePiece(p.id, { widthCm: Number(e.target.value) })}
                />
              </label>
              <label className="text-xs">
                H (cm)
                <input
                  type="number"
                  min={1}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-2 py-1.5 text-sm"
                  value={p.heightCm}
                  onChange={(e) => updatePiece(p.id, { heightCm: Number(e.target.value) })}
                />
              </label>
              <label className="text-xs">
                Qty
                <input
                  type="number"
                  min={1}
                  className="mt-1 w-full rounded-lg border border-[var(--border)] px-2 py-1.5 text-sm"
                  value={p.quantity}
                  onChange={(e) => updatePiece(p.id, { quantity: Number(e.target.value) })}
                />
              </label>
              <button
                type="button"
                onClick={() => removePiece(p.id)}
                className="text-xs text-red-600 sm:pb-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={allowRotation}
            onChange={(e) => {
              setAllowRotation(e.target.checked);
              setPlan(null);
            }}
          />
          Allow piece rotation
        </label>
        <button
          type="button"
          onClick={runPlan}
          className="mt-4 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white"
        >
          Plan layout
        </button>
      </div>

      {plan && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
            <LayoutSvg plan={plan} scraps={state.scraps} />
          </div>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
            <p className="text-sm text-[var(--text-secondary)]">Fabric needed (roll)</p>
            <p className="text-3xl font-semibold">{(plan.fabricLengthCm / 100).toFixed(2)} m</p>
            <p className="mt-4 text-sm">
              Waste <strong className="text-[var(--text)]">{plan.wastePercent}%</strong>
              <span className="text-[var(--text-tertiary)]">
                {" "}
                (naive ~{plan.naiveWastePercent}%)
              </span>
            </p>
            <p className="mt-2 text-sm">
              Saved vs naive layout:{" "}
              <strong className="text-[var(--accent-green)]">Rs. {plan.savedLkr.toLocaleString()}</strong>
            </p>
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">
              Scraps used: {plan.scrapIdsUsed.length || "none"} · Pieces placed: {plan.placed.length}
            </p>
            <button
              type="button"
              onClick={runConfirm}
              className="mt-6 w-full rounded-xl bg-[var(--text)] py-3 text-sm font-medium text-white"
            >
              Confirm cut
            </button>
          </div>
        </div>
      )}

      {message && (
        <p className="rounded-xl bg-[var(--bg-gray)] px-4 py-3 text-sm" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
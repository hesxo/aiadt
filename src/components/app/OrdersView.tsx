"use client";

import { useState } from "react";
import { useTailorCut } from "@/lib/store";
import type { OrderStatus } from "@/lib/types";

export function OrdersView() {
  const { state, addOrder, updateOrderStatus } = useTailorCut();
  const [customer, setCustomer] = useState("");
  const [garment, setGarment] = useState("");

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !garment.trim()) return;
    addOrder({ customer: customer.trim(), garment: garment.trim(), status: "pending" });
    setCustomer("");
    setGarment("");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>

      <form onSubmit={create} className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 ring-1 ring-[var(--border)]">
        <input
          className="rounded-lg border px-3 py-2 text-sm"
          placeholder="Customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <input
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
          placeholder="Garment description"
          value={garment}
          onChange={(e) => setGarment(e.target.value)}
        />
        <button type="submit" className="rounded-lg bg-[var(--text)] px-4 py-2 text-sm text-white">
          Create order
        </button>
      </form>

      <ul className="space-y-3">
        {state.orders.map((o) => (
          <li
            key={o.id}
            className="flex flex-col gap-3 rounded-2xl bg-white p-5 ring-1 ring-[var(--border)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-xs text-[var(--text-tertiary)]">{o.id}</p>
              <p className="font-medium">{o.customer}</p>
              <p className="text-sm text-[var(--text-secondary)]">{o.garment}</p>
              <p className="mt-2 text-sm">
                Fabric used: <strong>{(o.fabricUsedCm / 100).toFixed(2)} m</strong> · Waste: {o.wastePercent}% ·
                Waste cost: Rs. {o.wasteCostLkr.toLocaleString()}
              </p>
            </div>
            <select
              className="rounded-lg border px-3 py-2 text-sm capitalize"
              value={o.status}
              onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
            >
              <option value="pending">pending</option>
              <option value="cutting">cutting</option>
              <option value="complete">complete</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
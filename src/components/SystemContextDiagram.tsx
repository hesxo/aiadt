"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { coreSystemLabel, systemActors, type SystemActor } from "@/data/system-context";

const nodeLayout: Record<SystemActor["position"], string> = {
  "top-left": "col-start-1 row-start-1 justify-self-end self-end",
  "top-right": "col-start-3 row-start-1 justify-self-start self-end",
  center: "col-start-2 row-start-2 justify-self-center self-center",
  bottom: "col-start-2 row-start-3 justify-self-center self-start",
};

function FlowList({ label, items, tone }: { label: string; items: string[]; tone: "in" | "out" }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
        {label}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={`flex gap-2 text-sm leading-snug ${
              tone === "in" ? "text-[var(--text)]" : "text-[var(--text-secondary)]"
            }`}
          >
            <span className="shrink-0 text-[var(--accent)]" aria-hidden>
              {tone === "in" ? "↓" : "↑"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SystemContextDiagram() {
  const [active, setActive] = useState<SystemActor["id"]>("tailor");
  const [paused, setPaused] = useState(false);

  const activeActor = systemActors.find((a) => a.id === active) ?? systemActors[0];

  const cycle = useCallback(() => {
    setActive((current) => {
      const idx = systemActors.findIndex((a) => a.id === current);
      return systemActors[(idx + 1) % systemActors.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(cycle, 5200);
    return () => window.clearInterval(id);
  }, [cycle, paused]);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-[var(--bg-gray)] p-4 ring-1 ring-[var(--border)] sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg viewBox="0 0 1000 680" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2997ff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#2997ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#30d158" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {[
            "M 220 160 Q 360 220 500 320",
            "M 780 160 Q 640 220 500 320",
            "M 500 420 Q 500 500 500 560",
          ].map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#flowGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.2, delay: i * 0.2, ease: "easeInOut" }}
              />
              <circle r="5" fill="#2997ff">
                <animateMotion dur="3.5s" repeatCount="indefinite" path={d} begin={`${i * 0.6}s`} />
              </circle>
            </g>
          ))}
        </svg>
      </div>

      <div className="relative grid min-h-[420px] grid-cols-3 grid-rows-[1fr_auto_1fr] gap-4 sm:min-h-[480px] sm:gap-6">
        {systemActors.map((actor) => (
          <motion.button
            key={actor.id}
            type="button"
            onClick={() => setActive(actor.id)}
            className={`${nodeLayout[actor.position]} max-w-[240px] rounded-2xl border bg-white/90 p-4 text-left shadow-sm backdrop-blur transition ${
              active === actor.id
                ? "border-[var(--accent)] shadow-[0_12px_40px_rgba(41,151,255,0.18)]"
                : "border-[var(--border)] hover:border-black/15"
            } ${actor.position === "bottom" ? "sm:max-w-[280px]" : ""}`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            animate={
              active === actor.id
                ? { scale: 1.02, boxShadow: "0 16px 48px rgba(41,151,255,0.2)" }
                : { scale: 1 }
            }
          >
            <span className="text-2xl" aria-hidden>
              {actor.icon}
            </span>
            <p className="mt-2 text-sm font-semibold tracking-tight">{actor.title}</p>
            <p className="text-xs text-[var(--text-secondary)]">{actor.subtitle}</p>
          </motion.button>
        ))}

        <motion.div
          className="col-start-2 row-start-2 flex max-w-xs flex-col items-center justify-center rounded-3xl bg-[var(--text)] px-6 py-8 text-center text-white shadow-xl"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Core</p>
          <p className="mt-2 text-base font-semibold leading-snug sm:text-lg">{coreSystemLabel}</p>
          <div className="mt-4 flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: dot * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeActor.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="relative mt-6 grid gap-6 rounded-2xl border border-[var(--border)] bg-white/80 p-6 backdrop-blur-sm sm:grid-cols-2"
        >
          <FlowList label="Into the system" items={activeActor.outbound} tone="out" />
          <FlowList label="Back to actor" items={activeActor.inbound} tone="in" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
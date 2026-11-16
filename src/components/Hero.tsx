"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const heroStats = [
  { value: "10–20%", label: "Less fabric waste" },
  { value: "< 3s", label: "Layout suggestions" },
  { value: "50+", label: "Concurrent users" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] overflow-hidden pt-[calc(var(--nav-height)+3rem)]"
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <Image
          src="/images/image-1002-1.png"
          alt=""
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfd]/92 via-[#fbfbfd]/88 to-[#fbfbfd]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_20%,rgba(41,151,255,0.15),transparent)]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div style={{ opacity }}>
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Assisted Digital Transformation
          </motion.p>
          <motion.h1
            className="text-[clamp(2.75rem,6.5vw,4.75rem)] font-semibold leading-[1.02] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Waste Material
            <br />
            <span className="gradient-text">Optimization System</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-lg text-xl leading-relaxed text-[var(--text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            A digital platform for small-scale tailors—optimized cutting layouts, scrap reuse, and
            inventory clarity in one calm, mobile-first workspace.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <Link
              href="/"
              className="inline-flex rounded-full bg-[var(--text)] px-7 py-3.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Open app
            </Link>
            <Link
              href="/presentation#architecture"
              className="inline-flex rounded-full border border-black/10 bg-white/80 px-7 py-3.5 text-sm font-medium text-[var(--text)] backdrop-blur transition hover:bg-white"
            >
              See data flows
            </Link>
          </motion.div>
          <motion.p
            className="mt-10 text-xs text-[var(--text-tertiary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            BSc. (Hons) Business Computing · Level 5 · Semester 01 · 2026
          </motion.p>
        </motion.div>

        <motion.div style={{ y: yCard }} className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[var(--bg-gray)] shadow-[0_40px_100px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1620799140408-edc46dcb2d63?auto=format&fit=crop&w=1200&q=80"
              alt="Tailor measuring fabric on a workbench"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 520px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-4 left-4 right-4 overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-3 shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <Image
                src="/images/image-1-1.png"
                alt="Optimized pattern layout preview"
                width={600}
                height={400}
                className="h-auto w-full rounded-xl object-contain"
              />
              <p className="mt-2 text-center text-xs font-medium text-[var(--text-secondary)]">
                Pattern layout engine — minimize offcuts before you cut
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -right-2 top-8 hidden rounded-2xl border border-[var(--border)] bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              Live insight
            </p>
            <p className="text-sm font-semibold">Scrap matched to order #1842</p>
          </motion.div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl bg-white/80 px-3 py-4 text-center ring-1 ring-[var(--border)] backdrop-blur-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <p className="text-lg font-semibold tracking-tight sm:text-xl">{stat.value}</p>
                <p className="mt-1 text-[10px] leading-tight text-[var(--text-secondary)] sm:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="section-pad relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(41,151,255,0.12),transparent)]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3">AI Assisted Digital Transformation</p>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
            Waste Material
            <br />
            <span className="gradient-text">Optimization System</span>
          </h1>
          <p className="mt-5 max-w-md text-xl font-medium leading-snug text-[var(--text-secondary)]">
            For small-scale tailors. Cut less waste. Reuse every scrap. Run your shop with clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#features"
              className="inline-flex rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Explore the system
            </Link>
            <Link
              href="#architecture"
              className="inline-flex rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--bg-gray)]"
            >
              See how it works
            </Link>
          </div>
          <p className="mt-8 text-xs text-[var(--text-tertiary)]">
            BSc. (Hons) Business Computing · Level 5 · Semester 01 · 2026
          </p>
        </Reveal>

        <Reveal className="relative flex justify-center lg:justify-end">
          <div
            className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.15),transparent_70%)]"
            aria-hidden
          />
          <Image
            src="/images/image-1-1.png"
            alt="Fabric pattern layout visualization"
            width={640}
            height={480}
            priority
            className="relative max-h-[420px] w-auto rounded-2xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
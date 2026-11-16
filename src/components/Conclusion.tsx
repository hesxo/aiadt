import Link from "next/link";
import { Reveal } from "./Reveal";

export function Conclusion() {
  return (
    <section id="conclusion" className="section-pad bg-[var(--bg-dark)] text-center text-white">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold tracking-tight">
            Less waste. More craft.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#a1a1a6]">
            Target <strong className="text-white">10–20% less fabric waste</strong>, sharper cost tracking, and
            decisions backed by data—a simple, affordable, mobile-friendly system built for tailors, not generic
            enterprise software.
          </p>
          <p className="mt-4 text-base text-[#86868b]">Thank you.</p>
          <Link
            href="#top"
            className="mt-10 inline-flex rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-medium text-white transition hover:brightness-110"
          >
            Back to top
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
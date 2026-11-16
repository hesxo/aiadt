import Image from "next/image";
import { Reveal } from "./Reveal";

const affected = [
  "Independent tailors & small workshops",
  "Customers facing higher prices",
  "Local industry competitiveness",
  "Environmental impact of discarded textiles",
];

export function Problem() {
  return (
    <section id="problem" className="section-pad bg-[var(--bg-dark)] text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow eyebrow-light">Problem identification</p>
            <h2 className="mt-2 text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight">
              Manual cutting wastes fabric—and margin.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#a1a1a6]">
              Tailors cut by eye and habit. Scraps pile up or go in the bin. Customers pay more; the
              environment carries textile waste; small businesses lose ground to larger operators.
            </p>
            <ul className="mt-8 space-y-3">
              {affected.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#d2d2d7]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-[#d2d2d7]">
              Fabric is the highest input cost. Even a{" "}
              <strong className="font-semibold text-white">10% waste reduction</strong> meaningfully improves
              sustainability and profitability.
            </p>
          </Reveal>

          <Reveal className="relative">
            <p className="absolute -top-6 left-0 text-[#f5f5f7] opacity-60 sm:hidden">
              Who is affected
            </p>
            <Image
              src="/images/image-1002-1.png"
              alt="Tailoring workshop context"
              width={720}
              height={540}
              className="w-full rounded-2xl object-cover shadow-[0_32px_80px_rgba(0,0,0,0.45)]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
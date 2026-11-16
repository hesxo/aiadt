import { Reveal } from "./Reveal";

const bento = [
  {
    title: "Optimized pattern cutting",
    desc: "Smart layout suggestions minimize offcuts before you touch the shears.",
    large: true,
  },
  {
    title: "Scrap reuse",
    desc: "Log leftovers automatically and match them to future orders.",
  },
  {
    title: "Cost & waste reports",
    desc: "See savings in rupees and kilograms—export to PDF or CSV.",
  },
  {
    title: "Inventory control",
    desc: "Types, colours, dimensions, and unit cost in one place—with low-stock alerts.",
  },
];

const stats = [
  { value: "15–20%", label: "Typical fabric waste without optimization" },
  { value: "10%", label: "Waste cut that materially improves profit" },
  { value: "0", label: "Enterprise complexity—built for small shops" },
];

export function Introduction() {
  return (
    <section id="introduction" className="section-pad bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="eyebrow">Introduction</p>
            <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Digital tools built for the tailor&apos;s bench.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
              A platform that helps independent tailors reduce fabric waste through optimized pattern cutting,
              track and reuse leftover scraps, and manage inventory with reports that actually matter.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bento.map((card) => (
            <Reveal
              key={card.title}
              className={card.large ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <article className="h-full rounded-3xl bg-[var(--bg-gray)] p-8 transition hover:bg-[#eeeef0]">
                <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
                <p className="mt-2 text-[var(--text-secondary)]">{card.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="grid divide-y divide-[var(--border)] rounded-3xl border border-[var(--border)] bg-[var(--bg)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-8 py-10 text-center">
                <span className="block text-4xl font-semibold tracking-tight text-[var(--text)]">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm text-[var(--text-secondary)]">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-[800px] text-center text-base leading-relaxed text-[var(--text-secondary)]">
            Small-scale tailoring anchors the local apparel economy, yet most workshops still run without
            digital tools. AI-assisted optimization and tracking change how materials move through your shop.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
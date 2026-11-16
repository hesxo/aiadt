import Image from "next/image";
import { Reveal } from "./Reveal";

const layers = [
  {
    num: "01",
    title: "Frontend / UI",
    desc: "Web & mobile browser · Pattern UI · Orders · Reports · Inventory",
  },
  {
    num: "02",
    title: "Backend / API",
    desc: "Layout engine · Scrap matcher · Auth · REST API",
  },
  {
    num: "03",
    title: "Database",
    desc: "MySQL / PostgreSQL · Encrypted at rest · Traceability from order to fabric",
  },
];

const flow = ["Tailor", "Web App", "REST API", "Database", "Reports & layouts"];

export function Architecture() {
  return (
    <section id="architecture" className="section-pad bg-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="eyebrow">Proposed solution</p>
            <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Agile delivery. Clear architecture.
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Short sprints, working software, and feedback from real tailors—features ordered by value.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-4">
          {layers.map((layer) => (
            <Reveal key={layer.num}>
              <article className="flex flex-col gap-4 rounded-3xl bg-[var(--bg-gray)] p-8 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--text)] text-lg font-semibold text-white">
                  {layer.num}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{layer.title}</h3>
                  <p className="mt-1 text-[var(--text-secondary)]">{layer.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <Image
            src="/images/image-8-1.jpeg"
            alt="System context and data flow diagram"
            width={1100}
            height={620}
            className="mx-auto w-full max-w-4xl rounded-2xl object-contain shadow-lg ring-1 ring-[var(--border)]"
          />
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-8"
            aria-label="System data flow overview"
          >
            {flow.map((node, i) => (
              <span key={node} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-[var(--text-tertiary)]" aria-hidden>
                    {i === flow.length - 1 ? "↺" : "→"}
                  </span>
                )}
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    node === "Web App" || node === "Reports & layouts"
                      ? "bg-[var(--accent)] text-white"
                      : "bg-white ring-1 ring-[var(--border)]"
                  }`}
                >
                  {node}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
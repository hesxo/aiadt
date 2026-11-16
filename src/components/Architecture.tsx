import { Reveal } from "./Reveal";
import { SystemContextDiagram } from "./SystemContextDiagram";

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

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {layers.map((layer) => (
            <Reveal key={layer.num}>
              <article className="flex h-full flex-col rounded-3xl bg-[var(--bg-gray)] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--text)] text-sm font-semibold text-white">
                  {layer.num}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{layer.title}</h3>
                <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)]">{layer.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="mb-6 text-center">
            <p className="eyebrow">System context & data flow</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              How tailors, admins, and cloud storage connect
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
              Tap a role to highlight flows. The diagram auto-cycles—hover to pause.
            </p>
          </div>
          <SystemContextDiagram />
        </Reveal>
      </div>
    </section>
  );
}
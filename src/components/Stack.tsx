import { Reveal } from "./Reveal";

const cards = [
  {
    title: "Frontend",
    tech: "HTML5 · CSS3 · React.js",
    desc: "Responsive, component-based UI—no native install required.",
  },
  {
    title: "Backend",
    tech: "Python · Flask / Django REST",
    desc: "Fast iteration and strong libraries for optimization logic.",
  },
  {
    title: "Database",
    tech: "MySQL / PostgreSQL",
    desc: "Relational model for inventory and order-to-material trails.",
  },
  {
    title: "DevOps",
    tech: "GitHub · REST · Cloud",
    desc: "Version control, CI/CD, scalable hosting without heavy ops.",
  },
];

export function Stack() {
  return (
    <section id="stack" className="section-pad bg-[var(--bg-gray)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="eyebrow">Technology stack</p>
            <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Modern. Maintainable. Right-sized.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <Reveal key={c.title}>
              <article className="h-full rounded-3xl bg-white p-8 ring-1 ring-[var(--border)] transition hover:shadow-lg">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 font-mono text-sm text-[var(--accent)]">{c.tech}</p>
                <p className="mt-4 text-[var(--text-secondary)]">{c.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
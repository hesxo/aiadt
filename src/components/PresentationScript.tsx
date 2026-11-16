import Link from "next/link";
import {
  demoCheatSheet,
  scriptMeta,
  scriptSections,
} from "@/data/presentation-script";

const speakerColors: Record<string, string> = {
  "Speaker 1": "bg-[#e8f4ff] text-[#0066cc]",
  "Speaker 2": "bg-[#f0f0f5] text-[#424245]",
  "Speaker 3": "bg-[#e8faf0] text-[#248a3d]",
};

export function PresentationScript() {
  return (
    <article className="presentation-script">
      <header className="section-pad border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-[var(--max-width)] px-4 sm:px-6">
          <p className="eyebrow">Presentation script</p>
          <h1 className="mt-2 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight">
            {scriptMeta.project}{" "}
            <span className="text-[var(--text-secondary)]">· {scriptMeta.subtitle}</span>
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Three-speaker demo narration ({scriptMeta.totalDuration}). Replace{" "}
            <strong className="font-medium text-[var(--text)]">{scriptMeta.teamPlaceholder}</strong>{" "}
            with your team name.
          </p>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to speaker">
            <a
              href="#speaker-1"
              className="rounded-full bg-[#e8f4ff] px-4 py-1.5 text-xs font-medium text-[#0066cc]"
            >
              Speaker 1
            </a>
            <a
              href="#speaker-2"
              className="rounded-full bg-[#f0f0f5] px-4 py-1.5 text-xs font-medium text-[#424245]"
            >
              Speaker 2
            </a>
            <a
              href="#speaker-3"
              className="rounded-full bg-[#e8faf0] px-4 py-1.5 text-xs font-medium text-[#248a3d]"
            >
              Speaker 3
            </a>
            <a
              href="#demo-cheatsheet"
              className="rounded-full ring-1 ring-[var(--border)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
            >
              Demo steps
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[var(--max-width)] px-4 py-12 sm:px-6 sm:py-16">
        {scriptSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-14 scroll-mt-20 border-b border-[var(--border)] pb-14 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${speakerColors[section.speaker] ?? "bg-[var(--bg-gray)]"}`}
              >
                {section.speaker}
              </span>
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              {section.duration ? (
                <span className="text-sm text-[var(--text-tertiary)]">{section.duration}</span>
              ) : null}
            </div>

            <div className="mt-6 space-y-4 text-[17px] leading-[1.65] text-[var(--text)]">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="script-line">
                  {p}
                </p>
              ))}
            </div>

            {section.bullets ? (
              <ul className="mt-6 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-[var(--text-secondary)]">
                {section.bullets.map((b) => (
                  <li key={b.slice(0, 40)}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section
          id="demo-cheatsheet"
          className="scroll-mt-20 rounded-3xl bg-[var(--bg-gray)] p-8 ring-1 ring-[var(--border)]"
        >
          <h2 className="text-lg font-semibold">Demo cheat sheet</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Match these steps to the live app during Speaker 3.
          </p>
          <table className="mt-6 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-tertiary)]">
                <th className="pb-2 pr-4 font-medium">Step</th>
                <th className="pb-2 font-medium">What to do / say</th>
              </tr>
            </thead>
            <tbody>
              {demoCheatSheet.map((row) => (
                <tr key={row.step} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 pr-4 font-medium text-[var(--text)]">{row.step}</td>
                  <td className="py-3 text-[var(--text-secondary)]">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            Also see the course deck at{" "}
            <Link href="/presentation" className="font-medium text-[var(--accent)] hover:underline">
              /presentation
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
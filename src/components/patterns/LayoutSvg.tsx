import type { LayoutPlan, Scrap } from "@/lib/types";

const COLORS = ["#2997ff", "#30d158", "#ff9f0a", "#bf5af2", "#ff453a", "#64d2ff"];

export function LayoutSvg({
  plan,
  scraps,
  height = 360,
}: {
  plan: LayoutPlan;
  scraps: Scrap[];
  height?: number;
}) {
  const padding = 12;
  const rollPlaced = plan.placed.filter((p) => p.source === "roll");
  const maxY = Math.max(plan.fabricLengthCm, ...rollPlaced.map((p) => p.y + p.height), 40);
  const viewW = plan.rollWidth + 60;
  const viewH = maxY + 20;
  const scale = (height - padding * 2) / viewH;
  const w = viewW * scale + padding * 2;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${w} ${height}`}
      className="rounded-xl bg-[var(--bg-gray)]"
      role="img"
      aria-label="Layout preview"
    >
      <rect
        x={padding}
        y={padding}
        width={plan.rollWidth * scale}
        height={Math.max(plan.fabricLengthCm, 20) * scale}
        fill="#fff"
        stroke="#d2d2d7"
      />
      <text x={padding + 4} y={padding + 14} className="fill-[#86868b] text-[10px]">
        Roll {plan.rollWidth}cm × {plan.fabricLengthCm || 0}cm
      </text>
      {plan.scrapIdsUsed.map((sid, i) => {
        const sc = scraps.find((s) => s.id === sid);
        if (!sc) return null;
        const ox = padding + plan.rollWidth * scale + 8;
        const oy = padding + i * (sc.lengthCm * scale + 8);
        const scrapPieces = plan.placed.filter((p) => p.scrapId === sid);
        return (
          <g key={sid}>
            <rect
              x={ox}
              y={oy}
              width={sc.widthCm * scale}
              height={sc.lengthCm * scale}
              fill="#e8f4ff"
              stroke="#2997ff"
              strokeDasharray="4 2"
            />
            <text x={ox + 2} y={oy + 12} className="fill-[#2997ff] text-[9px]">
              Scrap
            </text>
            {scrapPieces.map((p, j) => (
              <rect
                key={`${p.name}-${j}`}
                x={ox + p.x * scale}
                y={oy + p.y * scale}
                width={p.width * scale}
                height={p.height * scale}
                fill={COLORS[j % COLORS.length]}
                fillOpacity={0.4}
                stroke={COLORS[j % COLORS.length]}
              />
            ))}
          </g>
        );
      })}
      {rollPlaced.map((p, i) => (
        <g key={`${p.name}-${i}`}>
          <rect
            x={padding + p.x * scale}
            y={padding + p.y * scale}
            width={p.width * scale}
            height={p.height * scale}
            fill={COLORS[i % COLORS.length]}
            fillOpacity={0.35}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={1}
          />
          <text
            x={padding + p.x * scale + 3}
            y={padding + p.y * scale + 11}
            className="fill-[#1d1d1f] text-[8px]"
          >
            {p.name.length > 14 ? `${p.name.slice(0, 12)}…` : p.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
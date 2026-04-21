"use client";

import { skillGroups } from "@/app/portfolio-data";

const toneColors: Record<string, { accent: string; glow: string }> = {
  violet: { accent: "#937aff", glow: "rgba(147,122,255,0.1)" },
  teal:   { accent: "#2dd4a8", glow: "rgba(45,212,168,0.1)" },
  coral:  { accent: "#ff8b7a", glow: "rgba(255,139,122,0.1)" },
  amber:  { accent: "#ffb75e", glow: "rgba(255,183,94,0.1)" },
};

export default function SkillsApp() {
  return (
    <div className="space-y-3">
      {skillGroups.map((g) => {
        const tone = toneColors[g.tone] || toneColors.violet;
        return (
          <div
            key={g.title}
            className="rounded-xl p-4 transition-all hover:-translate-y-px"
            style={{
              background: `linear-gradient(135deg, ${tone.glow}, transparent)`,
              border: `1px solid rgba(255,255,255,0.06)`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.accent, boxShadow: `0 0 6px ${tone.glow}` }} />
              <h3 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.14em]" style={{ color: tone.accent }}>
                {g.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-[11px] text-text-muted hover:text-text-main cursor-default transition-all hover:-translate-y-px"
                  style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

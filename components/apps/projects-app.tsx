"use client";

import { projects } from "@/app/portfolio-data";
import { Separator } from "@/components/ui/separator";

const badgeStyle: Record<string, { bg: string; text: string; border: string }> = {
  Production: { bg: "rgba(45,212,168,0.12)", text: "#2dd4a8", border: "rgba(45,212,168,0.25)" },
  "Hackathon Winner": { bg: "rgba(255,183,94,0.12)", text: "#ffb75e", border: "rgba(255,183,94,0.25)" },
  Shipped: { bg: "rgba(147,122,255,0.12)", text: "#937aff", border: "rgba(147,122,255,0.25)" },
  WIP: { bg: "rgba(255,139,122,0.12)", text: "#ff8b7a", border: "rgba(255,139,122,0.25)" },
};

export default function ProjectsApp() {
  return (
    <div className="space-y-3">
      {projects.map((p) => {
        const badge = badgeStyle[p.status] || badgeStyle.WIP;
        return (
          <div
            key={p.name}
            className="rounded-xl p-4 space-y-3 transition-all hover:-translate-y-px group"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-[var(--font-display)] text-base font-bold tracking-tight">{p.name}</h3>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0"
                style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.border}` }}
              >
                {p.status}
              </span>
            </div>

            <p className="text-text-muted text-[13px] leading-relaxed">{p.summary}</p>

            <div className="flex flex-wrap gap-1">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md font-[var(--font-mono)] text-[10px] text-text-soft"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {p.href && (
              <>
                <Separator className="bg-glass-border" />
                <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                  View on GitHub <span className="text-[10px]">↗</span>
                </a>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

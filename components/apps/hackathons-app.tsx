"use client";

import { hackathons } from "@/app/portfolio-data";

export default function HackathonsApp() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {hackathons.map((h) => (
        <div
          key={h.index}
          className="rounded-xl p-4 space-y-2 transition-all hover:-translate-y-px"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span
            className="font-[var(--font-display)] text-2xl font-extrabold leading-none"
            style={{
              background: "linear-gradient(135deg, #ff8b7a, #ffb75e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(255,139,122,0.2))",
            }}
          >
            {h.index}
          </span>
          <h3 className="font-[var(--font-display)] text-sm font-bold tracking-tight">{h.name}</h3>
          <p
            className="font-[var(--font-mono)] text-[10px] font-medium"
            style={{ background: "linear-gradient(90deg, #937aff, #2dd4a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {h.project}
          </p>
          <p className="text-[10px] text-text-soft">{h.venue}</p>
          <p className="text-text-muted text-[12px] leading-relaxed">{h.detail}</p>
        </div>
      ))}
    </div>
  );
}

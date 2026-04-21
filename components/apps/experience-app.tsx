"use client";

import { timeline, certifications } from "@/app/portfolio-data";
import { Separator } from "@/components/ui/separator";

export default function ExperienceApp() {
  return (
    <div className="space-y-5">
      {/* Timeline */}
      <div className="relative pl-6 space-y-5">
        <div
          className="absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full"
          style={{ background: "linear-gradient(to bottom, #937aff, #2dd4a8, transparent)" }}
        />

        {timeline.map((item) => (
          <div key={item.title} className="relative">
            <div
              className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full z-10"
              style={{
                background: "linear-gradient(135deg, #937aff, #2dd4a8)",
                boxShadow: "0 0 0 4px rgba(147,122,255,0.1), 0 0 12px rgba(147,122,255,0.15)",
              }}
            />
            <p className="font-[var(--font-mono)] text-[10px] text-text-soft uppercase tracking-[0.12em] mb-1.5">{item.period}</p>
            <div
              className="rounded-xl p-4 transition-all hover:-translate-y-px"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h3 className="font-[var(--font-display)] text-sm font-bold tracking-tight">{item.title}</h3>
              <p
                className="font-[var(--font-mono)] text-[11px] font-medium my-1"
                style={{ background: "linear-gradient(90deg, #937aff, #2dd4a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {item.org}
              </p>
              <p className="text-text-muted text-[12px] leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-glass-border" />

      {/* Certiications */}
      <div>
        <h3 className="font-[var(--font-mono)] text-[10px] text-text-soft uppercase tracking-[0.12em] mb-2.5">Certifications</h3>
        <div className="space-y-1.5">
          {certifications.map((c) => (
            <div
              key={c}
              className="px-3 py-2 rounded-lg text-[12px] text-text-muted"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

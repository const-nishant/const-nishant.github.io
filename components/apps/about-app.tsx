"use client";

import { name, role, location, bio, email } from "@/app/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutApp() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-20 h-14 rounded-2xl grid place-items-center font-[var(--font-display)] text-sm font-extrabold text-bg shrink-0 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #937aff 0%, #2dd4a8 100%)" }}
        >
          CONST
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        <div className="space-y-0.5">
          <h2 className="font-[var(--font-display)] text-xl font-extrabold tracking-tight">{name}</h2>
          <p
            className="font-[var(--font-mono)] text-xs font-medium"
            style={{ background: "linear-gradient(90deg, #937aff, #2dd4a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {role}
          </p>
          <p className="text-text-soft text-xs">📍 {location}</p>
        </div>
      </div>

      <Separator className="bg-glass-border" />

      {/* Bio */}
      <p className="text-text-muted text-sm leading-relaxed">{bio}</p>

      {/* Status */}
      <div
        className="relative rounded-xl overflow-hidden p-3"
        style={{
          background: "linear-gradient(135deg, rgba(45,212,168,0.08), rgba(45,212,168,0.02))",
          border: "1px solid rgba(45,212,168,0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-teal animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
          <div>
            <p className="text-teal text-xs font-semibold">Available for hire</p>
            <p className="text-text-muted text-[11px]">Open to internships & part-time roles</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Projects", value: "8+", gradient: "from-accent to-accent-soft" },
          { label: "Hackathons", value: "5+", gradient: "from-teal to-[#1ab390]" },
          { label: "Stack", value: "30+", gradient: "from-coral to-[#ff6b5a]" },
          { label: "Platforms", value: "3", gradient: "from-amber to-[#ff9f35]" },
        ].map((s) => (
          <Card key={s.label} className="bg-surface/50 border-glass-border text-center hover:bg-surface-hover transition-colors">
            <CardContent className="p-3">
              <p
                className="font-[var(--font-display)] text-xl font-extrabold"
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <span className={`bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent`}>{s.value}</span>
              </p>
              <p className="font-[var(--font-mono)] text-[9px] text-text-soft uppercase tracking-wider mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: "GitHub", href: "https://github.com/const-nishant" },
          { label: "LinkedIn", href: "https://linkedin.com/in/const-nishant" },
          { label: "Email", href: `mailto:${email}` },
        ].map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-text-muted hover:text-text-main transition-all"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {l.label} <span className="text-accent text-[10px]">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

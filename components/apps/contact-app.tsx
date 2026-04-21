"use client";

import { contactLinks, email } from "@/app/portfolio-data";
import { Separator } from "@/components/ui/separator";

export default function ContactApp() {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <h2
          className="font-[var(--font-display)] text-xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(135deg, #eef0ff, #937aff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Let&apos;s build something
        </h2>
        <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
          Always open to conversations about product, engineering, and new opportunities.
        </p>
      </div>

      <Separator className="bg-glass-border" />

      <div className="space-y-2">
        {contactLinks.map((link) => (
          <a key={link.title} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
            <div
              className="flex items-center justify-between p-3.5 rounded-xl transition-all hover:-translate-y-px group cursor-pointer mb-2"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div>
                <p className="text-sm font-medium">{link.title}</p>
                <p className="font-[var(--font-mono)] text-[11px] text-text-soft">{link.value}</p>
              </div>
              <span className="text-accent text-sm group-hover:translate-x-1 transition-transform">↗</span>
            </div>
          </a>
        ))}
      </div>

      <p className="text-center font-[var(--font-mono)] text-[11px] text-text-soft">
        Or drop me a line at{" "}
        <a href={`mailto:${email}`} className="text-accent hover:underline">{email}</a>
      </p>
    </div>
  );
}

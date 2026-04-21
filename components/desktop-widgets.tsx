"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, ExternalLink, Link, Mail, ArrowUpRight } from "lucide-react";
import { location, email, githubHref, linkedinHref } from "@/app/portfolio-data";

/* ── Small clock widget ── */
function ClockWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");

  return (
    <div className="glass-panel border border-glass-border rounded-2xl p-5 flex flex-col items-center gap-1 w-52">
      <div
        className="text-4xl font-[var(--font-display)] font-extrabold tracking-tight tabular-nums"
        style={{
          background: "linear-gradient(135deg, #937aff, #2dd4a8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {h}:{m}
      </div>
      <span className="text-[13px] text-accent font-[var(--font-mono)] tabular-nums">{s}s</span>
      <span className="text-[11px] text-text-soft mt-1">
        {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </span>
    </div>
  );
}

/* ── Greeting + status widget ── */
function GreetingWidget() {
  const [now] = useState(new Date());
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="glass-panel border border-glass-border rounded-2xl p-5 w-64">
      <p className="text-[11px] text-text-soft uppercase tracking-wider mb-1.5">Welcome</p>
      <h2
        className="text-lg font-[var(--font-display)] font-extrabold mb-1"
        style={{
          background: "linear-gradient(135deg, #937aff, #2dd4a8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {greeting}!
      </h2>
      <p className="text-[12px] text-text-main leading-relaxed">
        I&apos;m Nishant — building polished software across web, desktop &amp; mobile.
      </p>
      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-text-soft">
        <MapPin size={11} className="text-accent" />
        <span>{location}</span>
        <span className="mx-1 text-glass-border">•</span>
        <span className="w-[5px] h-[5px] rounded-full bg-teal animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
        <span className="text-teal">Available</span>
      </div>
    </div>
  );
}

/* ── Quick links widget ── */
function QuickLinksWidget() {
  const links = [
    { label: "GitHub", href: githubHref, icon: ExternalLink },
    { label: "LinkedIn", href: linkedinHref, icon: Link },
    { label: "Email", href: `mailto:${email}`, icon: Mail },
  ];

  return (
    <div className="glass-panel border border-glass-border rounded-2xl p-4 w-52">
      <p className="text-[10px] text-text-soft uppercase tracking-wider mb-2.5">Quick Links</p>
      <div className="flex flex-col gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[12px] text-text-main hover:text-accent transition-colors group px-2 py-1.5 rounded-lg hover:bg-white/[0.04]"
            >
              <Icon size={13} className="text-text-soft group-hover:text-accent transition-colors" />
              <span className="flex-1">{link.label}</span>
              <ArrowUpRight size={10} className="text-text-soft/50 group-hover:text-accent transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function DesktopWidgets() {
  return (
    <motion.div
      className="fixed z-[5] pointer-events-auto"
      style={{ top: 48, right: 24 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="flex flex-col gap-3 items-end">
        <ClockWidget />
        <GreetingWidget />
        <QuickLinksWidget />
      </div>
    </motion.div>
  );
}

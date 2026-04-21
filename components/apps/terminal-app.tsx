"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { terminalHelp, apps, type AppId } from "@/app/portfolio-data";

type Props = {
  onOpenApp: (id: AppId) => void;
};

/* ── Neofetch component — rendered as JSX, not text ── */
function NeofetchBlock() {
  const info = [
    { label: "OS", value: "NishantOS 2.0" },
    { label: "Host", value: "Next.js 16.2" },
    { label: "Shell", value: "nishant.sh" },
    { label: "Theme", value: "Deep Space" },
    { label: "WM", value: "framer-motion" },
    { label: "Term", value: "shadcn/ui" },
    { label: "Uptime", value: "always on" },
  ];

  const colors = ["#937aff", "#2dd4a8", "#ff8b7a", "#ffb75e", "#60a5fa", "#f472b6", "#a78bfa"];

  return (
    <div className="flex gap-6 py-2 items-start">
      {/* Left: Logo */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <div
          className="text-2xl font-[var(--font-display)] font-extrabold tracking-widest px-4 py-2 rounded-lg border border-teal/30"
          style={{
            background: "linear-gradient(135deg, #937aff, #2dd4a8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
            filter: "drop-shadow(0 0 8px rgba(147,122,255,0.3))",
          }}
        >
          CONST
        </div>
        {/* Color palette */}
        <div className="flex gap-1 mt-1">
          {colors.map((c) => (
            <span key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* Right: System info */}
      <div className="flex flex-col gap-0.5 text-[12px] min-w-0">
        <span className="text-accent font-bold">nishant@portfolio</span>
        <span className="text-text-soft">─────────────────</span>
        {info.map((item) => (
          <div key={item.label} className="flex gap-2">
            <span className="text-accent font-semibold w-14 shrink-0">{item.label}</span>
            <span className="text-text-main">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Line = { text: string; tone: string } | { type: "neofetch" };

export default function TerminalApp({ onOpenApp }: Props) {
  const [lines, setLines] = useState<Line[]>([
    { text: "NishantOS v2.0 — type 'help' for available commands", tone: "muted" },
    { text: "", tone: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines]);

  const push = (text: string, tone = "") =>
    setLines((prev) => [...prev, { text, tone }]);

  const run = () => {
    const raw = input.trim();
    const cmd = raw.toLowerCase();
    push(`❯ ${raw}`, "prompt");
    if (raw) { setHistory((h) => [...h, raw]); setHistIdx(-1); }
    setInput("");
    if (!cmd) return;

    switch (cmd) {
      case "help":
        push("", "");
        terminalHelp.forEach((l) => push(`  ${l}`, "muted"));
        push("", "");
        break;
      case "whoami":
        push("Nishant Patil — Full-Stack Cross-Platform Developer", "accent");
        push("Building with React, Rust, Flutter & TypeScript", "muted");
        break;
      case "ls":
        push(apps.map((a) => a.label).join("   "), "accent");
        break;
      case "pwd":
        push("/home/nishant/desktop", "accent");
        break;
      case "uname -a":
        push("NishantOS 2.0 aarch64 — Next.js 16 + Tailwind + shadcn/ui + Framer Motion", "accent");
        break;
      case "clear":
        setLines([]);
        break;
      case "neofetch":
        // Push a special JSX block instead of text lines
        setLines((prev) => [...prev, { type: "neofetch" }]);
        break;
      default:
        if (cmd.startsWith("open ")) {
          const target = cmd.slice(5).trim();
          const match = apps.find((a) => a.id === target || a.label.toLowerCase() === target);
          if (match) {
            push(`→ opening ${match.label}.app`, "accent");
            setTimeout(() => onOpenApp(match.id), 300);
          } else {
            push(`app not found: ${target}`, "warn");
          }
        } else {
          push(`command not found: ${cmd}`, "warn");
          push("type 'help' for available commands", "muted");
        }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx >= 0) {
        const idx = histIdx + 1;
        if (idx >= history.length) { setHistIdx(-1); setInput(""); }
        else { setHistIdx(idx); setInput(history[idx]); }
      }
    }
  };

  return (
    <div className="flex flex-col h-full -m-4">
      <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 font-[var(--font-mono)] text-[13px] leading-relaxed">
        {lines.map((line, i) => {
          // Special neofetch JSX block
          if ("type" in line && line.type === "neofetch") {
            return <NeofetchBlock key={i} />;
          }

          // Regular text line
          const { text, tone } = line as { text: string; tone: string };
          return (
            <div
              key={i}
              className={
                tone === "muted" ? "text-text-soft"
                : tone === "accent" ? "text-teal"
                : tone === "warn" ? "text-coral"
                : tone === "prompt" ? "text-accent"
                : "text-text-main"
              }
            >
              {text || "\u00A0"}
            </div>
          );
        })}
      </div>

      <div
        className="flex items-center gap-2.5 px-4 py-3 border-t border-glass-border/60"
        style={{ background: "linear-gradient(to right, rgba(45,212,168,0.03), transparent)" }}
      >
        <span className="text-teal font-[var(--font-mono)] text-sm font-bold">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-text-main font-[var(--font-mono)] text-[13px] caret-teal placeholder:text-text-soft/40"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

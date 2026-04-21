"use client";

import { useState, useEffect, useRef } from "react";
import type { AppId } from "@/app/portfolio-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MenuBarProps = {
  onOpen: (id: AppId) => void;
};

/* ── Mini Calendar Component ── */
function MiniCalendar({ now }: { now: Date }) {
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const isCurrentMonth = now.getMonth() === month && now.getFullYear() === year;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setViewDate(new Date(year, month - 1, 1));
  const next = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className="w-64">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={prev} className="p-1 rounded hover:bg-white/10 transition-colors text-text-soft hover:text-text-main">
          <ChevronLeft size={14} />
        </button>
        <span className="text-[12px] font-semibold text-text-main">{monthName}</span>
        <button onClick={next} className="p-1 rounded hover:bg-white/10 transition-colors text-text-soft hover:text-text-main">
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="text-center text-[10px] text-text-soft font-medium py-0.5">{d}</span>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <span
            key={i}
            className={`text-center text-[11px] py-1 rounded-md transition-colors ${
              day === null
                ? ""
                : isCurrentMonth && day === today
                  ? "bg-accent text-bg font-bold"
                  : "text-text-main hover:bg-white/[0.06]"
            }`}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MenuBar({ onOpen }: MenuBarProps) {
  const [now, setNow] = useState(new Date());
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Close panel on outside click
  useEffect(() => {
    if (!showPanel) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPanel]);

  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const fullTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  const navItems: { label: string; appId: AppId }[] = [
    { label: "About", appId: "about" },
    { label: "Projects", appId: "projects" },
    { label: "Skills", appId: "skills" },
    { label: "Contact", appId: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-7 flex items-center justify-between px-4 menubar-glass text-[11px]">
      {/* Left */}
      <div className="flex items-center gap-5">
        <span
          className="font-[var(--font-display)] text-xs font-extrabold tracking-tight cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #937aff, #2dd4a8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          onClick={() => onOpen("about")}
        >
          CONST
        </span>
        <nav className="flex items-center gap-4 text-text-muted">
          {navItems.map((item) => (
            <button
              key={item.appId}
              onClick={() => onOpen(item.appId)}
              className="hover:text-text-main transition-colors cursor-pointer bg-transparent border-none outline-none"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right — clickable date/time with dropdown */}
      <div className="relative" ref={panelRef}>
        <button
          onClick={() => setShowPanel((v) => !v)}
          className="flex items-center gap-3 text-text-soft bg-transparent border-none outline-none hover:text-text-main transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-[5px] h-[5px] rounded-full bg-teal animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
            <span className="text-teal/80 hidden sm:inline">Available</span>
          </span>
          <span className="hidden sm:inline">{date}</span>
          <span className="font-[var(--font-mono)] text-text-muted">{time}</span>
        </button>

        {/* Dropdown panel */}
        {showPanel && (
          <div
            className="absolute right-0 top-full mt-1.5 glass-panel-strong border border-glass-border rounded-xl p-4 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
            style={{ minWidth: 280 }}
          >
            {/* Large clock */}
            <div className="text-center mb-4 pb-3 border-b border-glass-border/50">
              <div
                className="text-3xl font-[var(--font-display)] font-extrabold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #937aff, #2dd4a8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {fullTime}
              </div>
              <div className="text-[12px] text-text-soft mt-1">
                {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>

            {/* Calendar */}
            <MiniCalendar now={now} />
          </div>
        )}
      </div>
    </header>
  );
}

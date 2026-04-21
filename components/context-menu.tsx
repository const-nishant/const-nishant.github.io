"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId } from "@/app/portfolio-data";
import {
  User,
  FolderKanban,
  Sparkles,
  Terminal,
  Mail,
  Info,
  RefreshCw,
  Maximize2,
} from "lucide-react";

type ContextMenuProps = {
  onOpenApp: (id: AppId) => void;
};

type MenuPos = { x: number; y: number } | null;

const menuItems = [
  { type: "group" as const, label: "Open App" },
  { type: "item" as const, label: "About", appId: "about" as AppId, icon: User },
  { type: "item" as const, label: "Projects", appId: "projects" as AppId, icon: FolderKanban },
  { type: "item" as const, label: "Skills", appId: "skills" as AppId, icon: Sparkles },
  { type: "item" as const, label: "Terminal", appId: "terminal" as AppId, icon: Terminal },
  { type: "item" as const, label: "Contact", appId: "contact" as AppId, icon: Mail },
  { type: "separator" as const },
  { type: "action" as const, label: "Refresh", icon: RefreshCw, action: () => window.location.reload() },
  { type: "action" as const, label: "Fullscreen", icon: Maximize2, action: () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }},
  { type: "separator" as const },
  { type: "info" as const, label: "NishantOS v2.0", icon: Info },
];

export default function ContextMenu({ onOpenApp }: ContextMenuProps) {
  const [pos, setPos] = useState<MenuPos>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    // Don't override context menu on inputs/textareas
    const target = e.target as HTMLElement;
    if (target.closest("input") || target.closest("textarea")) return;

    e.preventDefault();

    // Ensure menu stays in viewport
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 360);
    setPos({ x, y });
  }, []);

  const handleClick = useCallback(() => setPos(null), []);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setPos(null);
  }, []);

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleContextMenu, handleClick, handleKeyDown]);

  return (
    <AnimatePresence>
      {pos && (
        <motion.div
          ref={menuRef}
          className="fixed z-[1000] glass-panel-strong border border-glass-border rounded-xl py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)] min-w-[180px]"
          style={{ left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0.92, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.12 } }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="my-1 mx-2 h-px bg-glass-border/50" />;
            }

            if (item.type === "group") {
              return (
                <div key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider text-text-soft font-semibold">
                  {item.label}
                </div>
              );
            }

            if (item.type === "info") {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-text-soft">
                  <Icon size={13} className="text-text-soft/60" />
                  <span>{item.label}</span>
                </div>
              );
            }

            if (item.type === "item") {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => { onOpenApp(item.appId!); setPos(null); }}
                  className="flex items-center gap-2.5 w-full px-3 py-1.5 text-[12px] text-text-main hover:bg-accent/15 hover:text-accent transition-colors rounded-md mx-0 outline-none bg-transparent border-none cursor-pointer text-left"
                >
                  <Icon size={13} className="text-text-soft" />
                  <span>{item.label}</span>
                </button>
              );
            }

            if (item.type === "action") {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => { item.action?.(); setPos(null); }}
                  className="flex items-center gap-2.5 w-full px-3 py-1.5 text-[12px] text-text-main hover:bg-accent/15 hover:text-accent transition-colors rounded-md mx-0 outline-none bg-transparent border-none cursor-pointer text-left"
                >
                  <Icon size={13} className="text-text-soft" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return null;
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

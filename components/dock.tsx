"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { apps, type AppId } from "@/app/portfolio-data";
import {
  User,
  FolderKanban,
  Sparkles,
  Briefcase,
  Trophy,
  Terminal,
  Mail,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  User,
  FolderKanban,
  Sparkles,
  Briefcase,
  Trophy,
  Terminal,
  Mail,
};

const iconGradient: Record<string, { from: string; to: string }> = {
  User:         { from: "#937aff", to: "#7c5dff" },
  FolderKanban: { from: "#ffb75e", to: "#ff9f35" },
  Sparkles:     { from: "#2dd4a8", to: "#1ab390" },
  Briefcase:    { from: "#ff8b7a", to: "#ff6b5a" },
  Trophy:       { from: "#ffb75e", to: "#ff8b7a" },
  Terminal:     { from: "#2dd4a8", to: "#937aff" },
  Mail:         { from: "#937aff", to: "#2dd4a8" },
};

type DockProps = {
  openApps: AppId[];
  onOpen: (id: AppId) => void;
};

export default function Dock({ openApps, onOpen }: DockProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <motion.div
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-end gap-1.5 px-3 py-2 rounded-2xl dock-glass border border-glass-border"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 22 }}
      >
        {apps.map((app) => {
          const isOpen = openApps.includes(app.id);
          const Icon = iconMap[app.icon];
          const grad = iconGradient[app.icon];

          return (
            <Tooltip key={app.id}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => onOpen(app.id)}
                  className="relative flex flex-col items-center group outline-none"
                  whileHover={{ y: -8, scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                >
                  <span
                    className="relative grid place-items-center w-11 h-11 rounded-[13px] transition-shadow duration-200 overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${grad.from}22, ${grad.to}11)`,
                      border: `1px solid ${grad.from}30`,
                      boxShadow: isOpen ? `0 0 16px ${grad.from}20` : "none",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className="relative z-10 transition-colors duration-200"
                      style={{ color: grad.from }}
                    />
                    {/* Top reflection */}
                    <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
                  </span>

                  {/* Open indicator */}
                  <span
                    className={`absolute -bottom-1.5 w-[4px] h-[4px] rounded-full transition-all duration-300 ${
                      isOpen
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    style={{
                      background: grad.from,
                      boxShadow: `0 0 6px ${grad.from}60`,
                    }}
                  />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={10}
                className="glass-panel-strong border-glass-border text-text-main text-[11px] font-[var(--font-mono)] px-2.5 py-1 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
              >
                {app.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </motion.div>
    </TooltipProvider>
  );
}

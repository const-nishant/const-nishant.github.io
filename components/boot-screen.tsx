"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ASCII_LOGO = `
  ██████╗ ██████╗ ███╗   ██╗███████╗████████╗
 ██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝
 ██║     ██║   ██║██╔██╗ ██║███████╗   ██║   
 ██║     ██║   ██║██║╚██╗██║╚════██║   ██║   
 ╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   
`;

const BOOT_LINES = [
  "loading kernel modules...",
  "mounting filesystem...",
  "starting display server...",
  "initializing portfolio.app...",
  "ready.",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 1.5;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIdx((i) => Math.min(i + 1, BOOT_LINES.length - 1));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
      style={{ background: "radial-gradient(ellipse 60% 50% at 50% 45%, #0c0a2e, #030014)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scanline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-px bg-accent/20 animate-[scanline_4s_linear_infinite]"
          style={{ boxShadow: "0 0 20px 4px rgba(147,122,255,0.1)" }}
        />
      </div>

      {/* ASCII logo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <pre
          className="font-[var(--font-mono)] text-[8px] sm:text-xs md:text-sm leading-tight select-none"
          style={{
            background: "linear-gradient(135deg, #937aff, #2dd4a8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 24px rgba(147,122,255,0.35))",
          }}
        >
          {ASCII_LOGO}
        </pre>
      </motion.div>

      {/* Loading bar */}
      <div className="w-72 space-y-3">
        <div className="h-1 rounded-full overflow-hidden bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #937aff, #2dd4a8, #937aff)",
              backgroundSize: "200% 100%",
              animation: "gradient-shift 2s ease infinite",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <motion.p
          key={lineIdx}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-[var(--font-mono)] text-[11px] text-text-soft text-center"
        >
          <span className="text-accent mr-1.5">▸</span>
          {BOOT_LINES[lineIdx]}
        </motion.p>
      </div>

      <p className="font-[var(--font-mono)] text-[10px] text-text-soft/50 absolute bottom-6">
        NishantOS v2.0 · Next.js 16
      </p>
    </motion.div>
  );
}

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apps, type AppId } from "@/app/portfolio-data";
import dynamic from "next/dynamic";
import BootScreen from "@/components/boot-screen";
import MenuBar from "@/components/menu-bar";
import Dock from "@/components/dock";
import AppWindow from "@/components/app-window";
import CustomCursor from "@/components/custom-cursor";
import ContextMenu from "@/components/context-menu";
import DesktopWidgets from "@/components/desktop-widgets";

// Lazy-load applications (Code-splitting) to massively boost initial load performance
const AboutApp = dynamic(() => import("@/components/apps/about-app"), { ssr: false });
const ProjectsApp = dynamic(() => import("@/components/apps/projects-app"), { ssr: false });
const SkillsApp = dynamic(() => import("@/components/apps/skills-app"), { ssr: false });
const ExperienceApp = dynamic(() => import("@/components/apps/experience-app"), { ssr: false });
const HackathonsApp = dynamic(() => import("@/components/apps/hackathons-app"), { ssr: false });
const TerminalApp = dynamic(() => import("@/components/apps/terminal-app"), { ssr: false });
const ContactApp = dynamic(() => import("@/components/apps/contact-app"), { ssr: false });

type WindowState = {
  id: AppId;
  x: number;
  y: number;
  zIndex: number;
  minimized: boolean;
};

function getAppContent(id: AppId, onOpenApp: (id: AppId) => void) {
  switch (id) {
    case "about":       return <AboutApp />;
    case "projects":    return <ProjectsApp />;
    case "skills":      return <SkillsApp />;
    case "experience":  return <ExperienceApp />;
    case "hackathons":  return <HackathonsApp />;
    case "terminal":    return <TerminalApp onOpenApp={onOpenApp} />;
    case "contact":     return <ContactApp />;
  }
}

/* ── Starfield + particles canvas ── */
function useWallpaperCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      base: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.003 + 0.001,
    }));

    // Particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 1.6 + 0.4,
      hue: Math.random() > 0.5 ? 258 : 160, // violet or teal
      alpha: Math.random() * 0.35 + 0.1,
    }));

    let raf = 0;
    let t = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * ratio);
      canvas.height = Math.floor(canvas.clientHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      t++;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Stars — twinkle
      for (const s of stars) {
        const opacity = s.base + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(220, 220, 255, ${Math.max(0, opacity)})`;
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles — drift
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const gradient = ctx.createRadialGradient(
          p.x * w, p.y * h, 0,
          p.x * w, p.y * h, p.r * 3
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x * w, p.y * h, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, active]);
}

export default function DesktopShell() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const nextZ = useRef(10);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useWallpaperCanvas(canvasRef, booted);

  /* ── Window management ── */
  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        nextZ.current += 1;
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZ.current, minimized: false } : w
        );
      }
      const cascade = prev.length * 32;
      const appDef = apps.find((a) => a.id === id)!;
      const maxX = Math.max(60, window.innerWidth - appDef.defaultW - 60);
      const maxY = Math.max(50, window.innerHeight - appDef.defaultH - 100);
      nextZ.current += 1;
      return [
        ...prev,
        {
          id,
          x: Math.min(80 + cascade, maxX),
          y: Math.min(60 + cascade, maxY),
          zIndex: nextZ.current,
          minimized: false,
        },
      ];
    });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) =>
      w.id === id ? { ...w, minimized: true } : w
    ));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    nextZ.current += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZ.current } : w
      )
    );
  }, []);

  const handleBootDone = useCallback(() => {
    setBooted(true);
    setTimeout(() => openApp("about"), 300);
  }, [openApp]);

  const topZ = windows.reduce((max, w) => Math.max(max, w.zIndex), 0);

  return (
    <>
      {/* Boot screen with exit animation */}
      <AnimatePresence>
        {!booted && <BootScreen onDone={handleBootDone} />}
      </AnimatePresence>

      {/* ── WALLPAPER — always visible ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "radial-gradient(ellipse 120% 80% at 50% 20%, #0c0a2e 0%, #030014 60%)" }}>
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[160px] opacity-40 animate-[orb-drift_25s_ease-in-out_infinite]"
          style={{ top: "-15%", left: "-8%", background: "radial-gradient(circle, rgba(147,122,255,0.5), transparent 70%)" }}
        />
        <div
          className="absolute w-[550px] h-[550px] rounded-full blur-[140px] opacity-30 animate-[orb-drift_22s_ease-in-out_infinite_-8s]"
          style={{ top: "25%", right: "-10%", background: "radial-gradient(circle, rgba(45,212,168,0.4), transparent 70%)" }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 animate-[orb-drift_28s_ease-in-out_infinite_-15s]"
          style={{ bottom: "-10%", left: "30%", background: "radial-gradient(circle, rgba(255,139,122,0.35), transparent 70%)" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 animate-[orb-drift_20s_ease-in-out_infinite_-4s]"
          style={{ top: "50%", left: "10%", background: "radial-gradient(circle, rgba(255,183,94,0.3), transparent 70%)" }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(3,0,20,0.6) 100%)" }} />
      </div>

      {/* ── OS CHROME — fixed full-screen ── */}
      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-10"
        >
          <MenuBar onOpen={openApp} />
          <DesktopWidgets />

          <AnimatePresence>
            {windows.filter((w) => !w.minimized).map((w) => {
              const appDef = apps.find((a) => a.id === w.id)!;
              return (
                <AppWindow
                  key={w.id}
                  id={w.id}
                  title={appDef.label}
                  icon={appDef.icon}
                  isActive={w.zIndex === topZ}
                  zIndex={w.zIndex}
                  defaultX={w.x}
                  defaultY={w.y}
                  defaultW={appDef.defaultW}
                  defaultH={appDef.defaultH}
                  onFocus={() => focusApp(w.id)}
                  onClose={() => closeApp(w.id)}
                  onMinimize={() => minimizeApp(w.id)}
                >
                  {getAppContent(w.id, openApp)}
                </AppWindow>
              );
            })}
          </AnimatePresence>

          <Dock openApps={windows.map((w) => w.id)} onOpen={openApp} />
          <ContextMenu onOpenApp={openApp} />
        </motion.div>
      )}

      {/* Custom cursor — always visible */}
      <CustomCursor />
    </>
  );
}

"use client";

import { useRef, type ReactNode, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";

type WindowProps = {
  id: string;
  title: string;
  icon: string;
  isActive: boolean;
  zIndex: number;
  defaultX: number;
  defaultY: number;
  defaultW: number;
  defaultH: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
};

const MIN_W = 360;
const MIN_H = 250;

export default function AppWindow(props: WindowProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <Sheet open onOpenChange={(open) => { if (!open) props.onClose(); }}>
        <SheetContent
          side="bottom"
          className="h-[88vh] rounded-t-3xl glass-panel p-0 flex flex-col"
        >
          <SheetHeader className="flex-row items-center gap-2.5 px-4 pt-4 pb-3 border-b border-glass-border shrink-0">
            <SheetTitle className="font-[var(--font-display)] text-sm font-bold text-text-main">
              {props.title}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">{props.children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return <DesktopWindow {...props} />;
}

/* ── Resize handle component ── */
type Edge = "e" | "w" | "s" | "se" | "sw";

function ResizeHandle({
  edge,
  onResizeStart,
}: {
  edge: Edge;
  onResizeStart: (edge: Edge, e: React.PointerEvent) => void;
}) {
  const styles: Record<Edge, string> = {
    e: "absolute top-2 right-0 w-1.5 bottom-2 cursor-e-resize",
    w: "absolute top-2 left-0 w-1.5 bottom-2 cursor-w-resize",
    s: "absolute left-2 right-2 bottom-0 h-1.5 cursor-s-resize",
    se: "absolute right-0 bottom-0 w-4 h-4 cursor-se-resize",
    sw: "absolute left-0 bottom-0 w-4 h-4 cursor-sw-resize",
  };

  return (
    <div
      className={`${styles[edge]} z-10 hover:bg-accent/10 transition-colors rounded-sm`}
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onResizeStart(edge, e);
      }}
    />
  );
}

function DesktopWindow({
  title,
  isActive,
  zIndex,
  defaultX,
  defaultY,
  defaultW,
  defaultH,
  onFocus,
  onClose,
  onMinimize,
  children,
}: WindowProps) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({ w: defaultW, h: defaultH });
  const [isMaximized, setIsMaximized] = useState(false);
  const [savedState, setSavedState] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  // Drag state
  const isDragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, x: 0, y: 0 });

  // Resize state
  const isResizing = useRef(false);
  const resizeEdge = useRef<Edge>("se");
  const resizeStart = useRef({ mx: 0, my: 0, x: 0, y: 0, w: 0, h: 0 });

  /* ── Drag handlers (title bar) ── */
  const onDragStart = (e: React.PointerEvent) => {
    if (isMaximized) return;
    isDragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setPos({
      x: dragStart.current.x + (e.clientX - dragStart.current.mx),
      y: Math.max(28, dragStart.current.y + (e.clientY - dragStart.current.my)),
    });
  };

  const onDragEnd = () => { isDragging.current = false; };

  /* ── Resize handlers ── */
  const onResizeStart = useCallback((edge: Edge, e: React.PointerEvent) => {
    if (isMaximized) return;
    isResizing.current = true;
    resizeEdge.current = edge;
    resizeStart.current = { mx: e.clientX, my: e.clientY, x: pos.x, y: pos.y, w: size.w, h: size.h };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isMaximized, pos, size]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!isResizing.current) return;
      const dx = e.clientX - resizeStart.current.mx;
      const dy = e.clientY - resizeStart.current.my;
      const edge = resizeEdge.current;

      let newW = resizeStart.current.w;
      let newH = resizeStart.current.h;
      let newX = resizeStart.current.x;

      if (edge.includes("e")) newW = Math.max(MIN_W, resizeStart.current.w + dx);
      if (edge.includes("w")) {
        newW = Math.max(MIN_W, resizeStart.current.w - dx);
        if (newW > MIN_W) newX = resizeStart.current.x + dx;
      }
      if (edge.includes("s")) newH = Math.max(MIN_H, resizeStart.current.h + dy);

      setSize({ w: newW, h: newH });
      setPos((prev) => ({ x: edge.includes("w") ? newX : prev.x, y: prev.y }));
    };

    const up = () => { isResizing.current = false; };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  /* ── Maximize / Minimize / Close ── */
  const toggleMaximize = useCallback(() => {
    if (isMaximized) {
      if (savedState) {
        setPos({ x: savedState.x, y: savedState.y });
        setSize({ w: savedState.w, h: savedState.h });
      }
      setIsMaximized(false);
    } else {
      setSavedState({ x: pos.x, y: pos.y, w: size.w, h: size.h });
      setIsMaximized(true);
    }
  }, [isMaximized, pos, size, savedState]);

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMaximize();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  /* ── Computed styles ── */
  const wStyle: React.CSSProperties = isMaximized
    ? { position: "fixed", top: 28, left: 0, width: "100vw", height: "calc(100vh - 84px)", zIndex }
    : { position: "fixed", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex };

  return (
    <motion.div
      className={`flex flex-col overflow-hidden glass-panel-strong transition-shadow duration-200 ${
        isActive ? "window-glow" : "window-shadow"
      } ${isMaximized ? "" : "rounded-[var(--radius-window)]"}`}
      style={wStyle}
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      onPointerDown={onFocus}
    >
      {/* ── Title bar ── */}
      <div
        className="flex items-center h-10 px-3.5 border-b border-glass-border/60 shrink-0 select-none relative"
        style={{ cursor: isMaximized ? "default" : "grab" }}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onDoubleClick={toggleMaximize}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Traffic lights */}
        <div className="flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={handleClose} className="w-[15px] h-[15px] rounded-full bg-dot-red transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(255,95,87,0.5)] relative group/btn" aria-label="Close">
            <X size={9} className="absolute inset-0 m-auto text-black/0 group-hover/btn:text-black/80 transition-colors" strokeWidth={3} />
          </button>
          <button onClick={handleMinimize} className="w-[15px] h-[15px] rounded-full bg-dot-yellow transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(254,189,46,0.5)] relative group/btn" aria-label="Minimize">
            <Minus size={9} className="absolute inset-0 m-auto text-black/0 group-hover/btn:text-black/80 transition-colors" strokeWidth={3} />
          </button>
          <button onClick={handleMaximize} className="w-[15px] h-[15px] rounded-full bg-dot-green transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(40,200,64,0.5)] relative group/btn" aria-label="Maximize">
            {isMaximized
              ? <Minimize2 size={7} className="absolute inset-0 m-auto text-black/0 group-hover/btn:text-black/80 transition-colors" strokeWidth={3} />
              : <Maximize2 size={7} className="absolute inset-0 m-auto text-black/0 group-hover/btn:text-black/80 transition-colors" strokeWidth={3} />
            }
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 text-center font-[var(--font-mono)] text-[11px] text-text-soft/70 truncate pointer-events-none">
          {title}
        </div>
        <div className="w-[52px]" />
      </div>

      {/* ── Content ── */}
      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto p-4" style={{ background: "rgba(6,6,26,0.85)" }}>
        {children}
      </div>

      {/* ── Resize handles (only when not maximized) ── */}
      {!isMaximized && (
        <>
          <ResizeHandle edge="e" onResizeStart={onResizeStart} />
          <ResizeHandle edge="w" onResizeStart={onResizeStart} />
          <ResizeHandle edge="s" onResizeStart={onResizeStart} />
          <ResizeHandle edge="se" onResizeStart={onResizeStart} />
          <ResizeHandle edge="sw" onResizeStart={onResizeStart} />
        </>
      )}
    </motion.div>
  );
}

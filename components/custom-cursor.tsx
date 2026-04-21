"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        window.getComputedStyle(target).cursor === "pointer";
      setHovering(!!isClickable);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          borderColor: hovering ? "rgba(45,212,168,0.5)" : "rgba(147,122,255,0.4)",
          backgroundColor: clicked ? "rgba(147,122,255,0.08)" : "transparent",
        }}
        animate={{
          x: pos.x - (hovering ? 20 : 14),
          y: pos.y - (hovering ? 20 : 14),
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.3 }}
      />
      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{ backgroundColor: hovering ? "#2dd4a8" : "#937aff" }}
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          width: 6,
          height: 6,
          scale: clicked ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 28, mass: 0.2 }}
      />
    </div>
  );
}

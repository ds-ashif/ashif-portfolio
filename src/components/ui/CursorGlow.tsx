"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { stiffness: 60, damping: 15, mass: 1 });
  const trailY = useSpring(cursorY, { stiffness: 60, damping: 15, mass: 1 });

  const isVisible = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      isVisible.current = true;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-6 h-6 rounded-full bg-white/80 blur-[2px]" />
      </motion.div>

      {/* Outer aura */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-48 h-48 rounded-full blur-3xl opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, #8b5cf6 0%, #3b82f6 40%, transparent 70%)",
          }}
        />
      </motion.div>
    </>
  );
}

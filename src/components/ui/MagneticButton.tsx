"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "glow";
  disabled?: boolean;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  disabled = false,
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-30, 30], [5, -5]);
  const rotateY = useTransform(springX, [-30, 30], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-900/30",
    secondary:
      "glass border border-white/10 text-white hover:border-purple-500/50 hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5",
    glow: "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white animate-shimmer shadow-[0_0_30px_rgba(139,92,246,0.5)]",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm cursor-pointer select-none transition-all duration-300",
        "perspective-[800px]",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Animated border trace for primary */}
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{
            background: `conic-gradient(from ${hovered ? "180deg" : "0deg"}, transparent 270deg, rgba(167,139,250,0.6) 360deg)`,
          }}
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      )}

      {/* Glow effect on hover */}
      {hovered && (
        <motion.span
          className="absolute inset-0 rounded-xl blur-xl opacity-40"
          style={{
            background:
              variant === "primary"
                ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                : "rgba(139,92,246,0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          aria-hidden
        />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} download={download}>
        {content}
      </a>
    );
  }

  return content;
}

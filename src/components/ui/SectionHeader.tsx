"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  highlight,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label && (
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-500" />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-purple-400">
            {label}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-purple-500" />
        </div>
      )}

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {title}{" "}
        {highlight && (
          <span className="text-gradient">{highlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

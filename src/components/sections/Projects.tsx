"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitFork, ArrowRight, Star, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/lib/data";

const EMOJIS: Record<number, string> = {
  1: "🤖", 2: "🛍️", 3: "👥", 4: "📊", 5: "💎", 6: "✅",
};

const SEPARATOR = {
  background:
    "linear-gradient(to right, transparent, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent)",
};

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.09 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setSpotPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      style={{ height: "100%" }}
    >
      <motion.div
        animate={{
          y: hovered ? -5 : 0,
          boxShadow: hovered
            ? `0 22px 55px ${project.color}28, 0 0 0 1px ${project.color}22`
            : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.35 }}
        style={{
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(16px)",
          position: "relative",
        }}
      >
        {/* Spotlight */}
        {hovered && (
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
              background: `radial-gradient(260px at ${spotPos.x}% ${spotPos.y}%, ${project.color}1A, transparent 75%)`,
            }}
          />
        )}

        {/* Preview */}
        <div
          style={{
            height: 176, flexShrink: 0, overflow: "hidden", position: "relative",
            background: `linear-gradient(135deg, ${project.color}20, rgba(0,0,0,0.75))`,
          }}
        >
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 56, height: 56, borderRadius: 14, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 28,
                background: `${project.color}28`, border: `1px solid ${project.color}38`,
              }}
            >
              {EMOJIS[project.id] ?? "🚀"}
            </motion.div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 500 }}>
              {project.subtitle}
            </p>
          </div>

          {project.featured && (
            <div style={{
              position: "absolute", top: 12, left: 12,
              display: "flex", alignItems: "center", gap: 4,
              padding: "3px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600,
              background: "rgba(234,179,8,0.15)", border: "1px solid rgba(234,179,8,0.25)",
              color: "#fde047",
            }}>
              <Star size={9} fill="currentColor" />
              Featured
            </div>
          )}

          <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} style={{
                padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 500,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>
              {project.title}
            </h3>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 28, height: 28, borderRadius: 8, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                }}
                aria-label={`GitHub — ${project.title}`}
              >
                <GitFork size={12} />
              </a>
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 28, height: 28, borderRadius: 8, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                }}
                aria-label={`Live — ${project.title}`}
              >
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
            {project.description}
          </p>

          {/* Metrics */}
          <div style={{
            display: "flex", gap: 20, padding: "12px 0",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 12,
          }}>
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: project.color }}>{val}</span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>
                  {key}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 20 }}>
            <AnimatePresence>
              {hovered && (
                <motion.a
                  href={project.live} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#a78bfa" }}
                >
                  <Zap size={11} />
                  View Live Project
                  <ArrowRight size={11} />
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const filtered = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <section
      id="projects"
      aria-label="Projects"
      style={{ marginTop: 80, paddingTop: 80, paddingBottom: 80, position: "relative", overflow: "hidden" }}
    >
      {/* Top separator */}
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, ...SEPARATOR }} aria-hidden />

      {/* Ambient */}
      <div
        aria-hidden
        style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)", top: 60,
          width: 700, height: 350, borderRadius: "50%",
          filter: "blur(80px)", opacity: 0.04, pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(139,92,246,1), transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader
          label="My Work"
          title="Cosmic"
          highlight="Showcase"
          subtitle="Production-grade applications crafted with obsessive attention to detail."
          align="center"
        />

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 12 }}
        >
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 20px", borderRadius: 999, fontSize: 14, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s",
                ...(filter === f
                  ? { background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none" }
                  : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }),
              }}
            >
              {f === "all" ? "All Projects" : "⭐ Featured"}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20, alignItems: "start" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: 56, display: "flex", justifyContent: "center" }}
        >
          <a
            href="https://github.com/ds-ashif"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 500,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)", transition: "all 0.2s",
            }}
          >
            <GitFork size={16} />
            More on GitHub
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

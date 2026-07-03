"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { skills } from "@/lib/data";

const CATEGORIES = ["All", "Frontend", "Backend", "Language", "Database", "DevOps", "Cloud", "AI"];

const SEPARATOR: React.CSSProperties = {
  position: "absolute", left: 0, right: 0, top: 0, height: 1,
  background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent)",
  pointerEvents: "none",
};

const SECTION: React.CSSProperties = {
  position: "relative",
  marginTop: 80,
  paddingTop: 80,
  paddingBottom: 96,
  overflow: "hidden",
};

const CONTAINER: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const PILL_ACTIVE: React.CSSProperties = {
  padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 500,
  cursor: "pointer", border: "none",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  color: "#fff",
  boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
};

const PILL_INACTIVE: React.CSSProperties = {
  padding: "6px 18px", borderRadius: 999, fontSize: 13, fontWeight: 500,
  cursor: "pointer",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.5)",
  transition: "all 0.2s",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" style={SECTION} aria-label="Skills">
      {/* Separator */}
      <div style={SEPARATOR} aria-hidden />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", left: -80, top: "50%", transform: "translateY(-50%)",
          width: 280, height: 280, borderRadius: "50%",
          filter: "blur(70px)", opacity: 0.07, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(139,92,246,0.7), transparent 70%)",
        }}
      />

      <div style={CONTAINER}>
        {/* Header */}
        <SectionHeader
          label="Tech Stack"
          title="Skill"
          highlight="Galaxy"
          subtitle="Every technology mastered through real-world production systems."
          align="center"
        />

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat ? PILL_ACTIVE : PILL_INACTIVE}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          style={{
            marginTop: 40,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.32, delay: i * 0.035 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    padding: "20px 20px 16px",
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "default",
                    backdropFilter: "blur(12px)",
                    background: hoveredSkill === skill.name
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${hoveredSkill === skill.name ? `${skill.color}55` : "rgba(255,255,255,0.09)"}`,
                    boxShadow: hoveredSkill === skill.name
                      ? `0 0 28px 4px ${skill.color}18`
                      : "none",
                    transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                  }}
                >
                  {/* Radial glow overlay */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      transition: "opacity 0.3s",
                      background: `radial-gradient(circle at 50% 30%, ${skill.color}18, transparent 65%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      fontSize: 28, marginBottom: 12, lineHeight: 1,
                      transition: "transform 0.3s",
                      transform: hoveredSkill === skill.name ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {skill.icon}
                  </div>

                  {/* Name */}
                  <p
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 13, fontWeight: 600,
                      marginBottom: 10,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}
                  >
                    {skill.name}
                  </p>

                  {/* Progress bar track */}
                  <div
                    style={{
                      width: "100%", height: 3, borderRadius: 99,
                      background: "rgba(255,255,255,0.08)", overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{ height: "100%", borderRadius: 99, background: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.04, ease: "easeOut" }}
                    />
                  </div>

                  {/* Hover: category + level */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          marginTop: 10,
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1 }}>
                          {skill.category}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: skill.color }}>
                          {skill.level}%
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ marginTop: 56, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}
        >
          {skills.slice(0, 8).map((s, i) => (
            <motion.div
              key={s.name}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.6, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
              title={s.name}
              style={{
                width: 44, height: 44, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, cursor: "default",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {s.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

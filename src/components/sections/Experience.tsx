"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronDown, CheckCircle2, Rocket } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import { experiences } from "@/lib/data";

const SEPARATOR = {
  background:
    "linear-gradient(to right, transparent, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent)",
};

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section
      id="experience"
      aria-label="Experience"
      style={{ marginTop: "clamp(32px,6vw,80px)", paddingTop: "clamp(40px,7vw,80px)", paddingBottom: "clamp(48px,8vw,80px)", position: "relative", overflow: "hidden" }}
    >
      {/* Top separator */}
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, ...SEPARATOR }} aria-hidden />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", right: -60, top: "25%",
          width: 320, height: 320, borderRadius: "50%",
          filter: "blur(80px)", opacity: 0.07, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(59,130,246,0.6), transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 clamp(14px,4vw,24px)" }}>
        <SectionHeader
          label="Career"
          title="Space"
          highlight="Timeline"
          subtitle="Every role, a mission. Every project, a voyage deeper into the unknown."
          align="center"
        />

        <div style={{ marginTop: 64, position: "relative" }}>
          {/* Vertical line */}
          <div
            aria-hidden
            style={{
              position: "absolute", left: 20, top: 20, bottom: 20, width: 1,
              background: "linear-gradient(to bottom, rgba(139,92,246,0.7), rgba(59,130,246,0.2), transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                style={{ position: "relative", paddingLeft: 64 }}
              >
                {/* Node */}
                <div style={{ position: "absolute", left: 0, top: 20 }}>
                  <motion.div
                    animate={{
                      boxShadow: expanded === exp.id
                        ? "0 0 18px 4px rgba(139,92,246,0.5)"
                        : "0 0 6px 2px rgba(139,92,246,0.2)",
                    }}
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Rocket size={16} color="white" />
                  </motion.div>
                </div>

                <GlowCard
                  tiltEnabled={false}
                  glowColor={expanded === exp.id ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.04)"}
                >
                  <button
                    onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                    className="w-full p-5 text-left"
                    aria-expanded={expanded === exp.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                              exp.type === "full-time"
                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                                : exp.type === "contract"
                                ? "bg-cyan-600/20 text-cyan-400 border border-cyan-500/20"
                                : "bg-purple-600/20 text-purple-400 border border-purple-500/20"
                            }`}
                          >
                            {exp.type === "full-time"
                              ? "Full-time"
                              : exp.type === "contract"
                              ? "Contract"
                              : "Internship"}
                          </span>
                        </div>
                        <h3 className="text-white text-lg font-bold leading-tight">{exp.role}</h3>
                        <p className="text-purple-400 font-medium text-sm mt-0.5">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-white/40 text-xs">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} /> {exp.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={11} /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1 w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40"
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded === exp.id && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-4 border-t border-white/8">
                          <p className="text-white/55 text-sm leading-relaxed mb-5">{exp.description}</p>
                          <p className="text-white/70 text-[11px] font-semibold uppercase tracking-wider mb-3">
                            Key Achievements
                          </p>
                          <ul className="flex flex-col gap-2 mb-5">
                            {exp.achievements.map((ach, ai) => (
                              <motion.li
                                key={ai}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ai * 0.07 }}
                                className="flex items-start gap-2 text-sm text-white/55"
                              >
                                <CheckCircle2 size={13} className="text-green-400 mt-0.5 flex-shrink-0" />
                                {ach}
                              </motion.li>
                            ))}
                          </ul>
                          <p className="text-white/70 text-[11px] font-semibold uppercase tracking-wider mb-3">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-lg glass border border-white/10 text-[11px] text-white/65 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

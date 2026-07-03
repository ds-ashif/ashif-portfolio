"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { achievements, stats } from "@/lib/data";

const SEPARATOR = {
  background:
    "linear-gradient(to right, transparent, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent)",
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Achievements"
      style={{ marginTop: 80, paddingTop: 80, paddingBottom: 80, position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, ...SEPARATOR }} aria-hidden />

      <div
        aria-hidden
        style={{
          position: "absolute", right: -60, bottom: "25%",
          width: 320, height: 320, borderRadius: "50%",
          filter: "blur(80px)", opacity: 0.07, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(6,182,212,0.6), transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader
          label="Milestones"
          title="Galactic"
          highlight="Achievements"
          subtitle="Certifications earned, battles won, and communities built along the way."
          align="center"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              style={{
                position: "relative", borderRadius: 16, overflow: "hidden",
                padding: "24px 16px", textAlign: "center",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginBottom: 8 }}
                className="text-gradient">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement cards */}
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="group"
              style={{
                padding: 24, borderRadius: 16, height: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              whileHover={{
                boxShadow: `0 0 28px ${ach.color}28`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, transition: "transform 0.3s",
                    background: `${ach.color}18`, border: `1px solid ${ach.color}28`,
                  }}
                >
                  {ach.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    display: "inline-block", padding: "2px 8px", borderRadius: 999,
                    fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2,
                    marginBottom: 8, background: `${ach.color}18`, color: ach.color,
                    border: `1px solid ${ach.color}28`,
                  }}>
                    {ach.type}
                  </span>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.3, marginBottom: 2 }}>
                    {ach.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 8 }}>
                    {ach.subtitle}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.6 }}>
                    {ach.description}
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: 16, paddingTop: 12,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{ach.year}</span>
                <div style={{ width: 20, height: 2, borderRadius: 1, background: ach.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

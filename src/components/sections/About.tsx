"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Zap, Target, Heart } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import { personalInfo } from "@/lib/data";

const cards = [
  {
    icon: User,  title: "Who I Am",
    body: "A passionate Full Stack Developer and AI Engineer who loves turning complex problems into elegant digital solutions. I craft code that not only works but inspires.",
    color: "rgba(139,92,246,0.3)",  gradient: "from-purple-600/20 to-transparent",
  },
  {
    icon: Zap,   title: "My Approach",
    body: "I combine technical precision with creative thinking. Every project is an opportunity to push boundaries — building systems that are fast, scalable, and beautiful.",
    color: "rgba(59,130,246,0.3)",  gradient: "from-blue-600/20 to-transparent",
  },
  {
    icon: Target, title: "My Mission",
    body: "To bridge the gap between human intent and machine intelligence. I build experiences that feel magical — where great engineering meets thoughtful design.",
    color: "rgba(6,182,212,0.3)",   gradient: "from-cyan-600/20 to-transparent",
  },
  {
    icon: Heart, title: "My Passion",
    body: "AI, open source, and developer tools. I constantly explore new technologies, contribute to the community, and believe that the best code empowers people.",
    color: "rgba(236,72,153,0.3)",  gradient: "from-pink-600/20 to-transparent",
  },
];

const orbitTechs = ["React", "Node", "AI", "TypeScript", "MongoDB", "AWS"];

function OrbitRing({ radius, duration, reverse, items }: {
  radius: number; duration: number; reverse?: boolean; items: string[];
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-white/10"
      style={{
        width:  radius * 2,
        height: radius * 2,
        top:    "50%",
        left:   "50%",
        marginTop:  -radius,
        marginLeft: -radius,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {items.map((tech, i) => {
        const angle = (i / items.length) * 360;
        const rad   = (angle * Math.PI) / 180;
        return (
          <div
            key={tech}
            className="absolute w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/70"
            style={{
              left: radius + Math.cos(rad) * radius - 20,
              top:  radius + Math.sin(rad) * radius - 20,
            }}
          >
            {tech.slice(0, 2)}
          </div>
        );
      })}
    </motion.div>
  );
}

function OrbitingVisual() {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto", flexShrink: 0 }}>
      {/* Ambient glow behind avatar */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          filter: "blur(40px)", opacity: 0.25, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(139,92,246,0.8), transparent 70%)",
        }}
      />

      {/* Orbit rings — client only */}
      {mounted && (
        <>
          <OrbitRing radius={130} duration={18} reverse items={orbitTechs.slice(3)} />
          <OrbitRing radius={95}  duration={12} items={orbitTechs.slice(0, 3)} />
        </>
      )}

      {/* Centre avatar — large, circular photo */}
      <div
        style={{
          position: "absolute",
          width: 155, height: 155,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 10,
          border: "3px solid rgba(139,92,246,0.6)",
          // boxShadow: "0 0 32px rgba(139,92,246,0.4), 0 0 0 6px rgba(139,92,246,0.08)",
          background: "linear-gradient(135deg,#7c3aed,#2563eb)",
        }}
      >
        {!imgError ? (
          <Image
            src={personalInfo.avatar}
            alt={personalInfo.fullName}
            width={120}
            height={120}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          /* Fallback: gradient + initial */
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg,#7c3aed,#2563eb)",
            fontSize: 42, fontWeight: 900, color: "#fff",
          }}>
            {personalInfo.name[0]}
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden" aria-label="About">
      {/* Background glow */}
      <div
        className="absolute right-[-8%] top-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent 70%)" }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          label="About Me"
          title="Crafting Digital"
          highlight="Experiences"
          subtitle="From lines of code to living, breathing applications — I build things that matter."
        />

        <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
            className="flex flex-col items-center gap-8"
          >
            <OrbitingVisual />

            <div className="glass rounded-2xl p-6 border border-white/8 w-full max-w-md">
              <p className="text-white/60 text-sm leading-relaxed">
                Based in{" "}
                <span className="text-white/90 font-medium">{personalInfo.location}</span>, I&apos;ve
                been building full-stack applications and AI-powered tools.
                My work focuses on
                performance, developer experience, and creating interfaces that feel extraordinary.
              </p>
              <div className="mt-10 flex flex-wrap gap-2">
                {["Open to work", "Remote friendly", "Full-time"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs glass border border-white/10 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: cards ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <GlowCard glowColor={card.color} className="h-full p-6 group">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={17} className="text-white/80" />
                    </div>
                    <h3 className="text-white font-semibold mb-2 text-sm">{card.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{card.body}</p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

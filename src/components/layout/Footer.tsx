"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GitFork, Link, Mail, ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data";

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
    }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath(); ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - dist / 80) * 0.15})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      stars.forEach((s) => {
        s.twinkle += 0.018;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.25 + Math.sin(s.twinkle) * 0.25})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden />;
}

const socials = [
  { icon: GitFork, href: personalInfo.github,              label: "GitHub"   },
  { icon: Link,    href: personalInfo.linkedin,            label: "LinkedIn" },
  { icon: Mail,    href: `mailto:${personalInfo.email}`,   label: "Email"    },
];

const navLinks = [
  { label: "Home",       href: "#hero"       },
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

export default function Footer() {
  return (
    <footer style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 80 }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ConstellationCanvas />
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: "25%",
          width: 320, height: 160, borderRadius: "50%",
          filter: "blur(60px)", opacity: 0.1,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.7), transparent 70%)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, marginBottom: 48 }}
          className="footer-grid">
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg,#3b82f6,#7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 15,
              }}>A</div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>
                ASHIF<span style={{ color: "#a78bfa" }}>.</span>
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>
              Building digital experiences that push the boundaries of what&apos;s possible on the web.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label} href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.4)", transition: "all 0.2s",
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
              Navigation
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" })}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 14, padding: 0, transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
              Status
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { dot: "#4ade80", label: "Available for work",     pulse: true  },
                { dot: "#60a5fa", label: "Open to collaboration",  pulse: false },
                { dot: "#a78bfa", label: "Remote friendly",        pulse: false },
              ].map(({ dot, label, pulse }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0,
                    ...(pulse ? { animation: "pulse 2s ease-in-out infinite" } : {}),
                  }} />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
            © {new Date().getFullYear()} Ashif. Crafted with obsession in the cosmos.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
              borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", transition: "all 0.2s",
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={13} /> Back to top
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>
    </footer>
  );
}

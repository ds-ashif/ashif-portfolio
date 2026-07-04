"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, GitFork, Link, Mail, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { personalInfo } from "@/lib/data";

const SEPARATOR = {
  background:
    "linear-gradient(to right, transparent, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent)",
};

function RadarAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 200; canvas.height = 200;
    let angle = 0, animId: number;
    const dots = Array.from({ length: 8 }, () => ({
      x: 80 + (Math.random() - 0.5) * 120,
      y: 80 + (Math.random() - 0.5) * 120,
      opacity: 0,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, 200, 200);
      const cx = 100, cy = 100, r = 90;
      [30, 55, 75, 90].forEach((radius) => {
        ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139,92,246,0.2)"; ctx.lineWidth = 1; ctx.stroke();
      });
      ctx.strokeStyle = "rgba(139,92,246,0.15)";
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, "rgba(139,92,246,0.6)");
      grad.addColorStop(1, "rgba(139,92,246,0)");
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, -0.3, 0.3); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill(); ctx.restore();
      dots.forEach((dot) => {
        const da = Math.atan2(dot.y - cy, dot.x - cx);
        const diff = ((angle - da) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (diff < 0.4) dot.opacity = 1;
        else dot.opacity = Math.max(0, dot.opacity - 0.015);
        if (dot.opacity > 0) {
          ctx.beginPath(); ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6,182,212,${dot.opacity})`;
          ctx.shadowColor = "#06b6d4"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
        }
      });
      angle = (angle + 0.025) % (Math.PI * 2);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} style={{ width: "100%", maxWidth: 200, margin: "0 auto", display: "block", opacity: 0.85 }} />;
}

const socials = [
  { icon: GitFork, label: "GitHub",   href: personalInfo.github,                color: "rgba(255,255,255,0.3)" },
  { icon: Link,    label: "LinkedIn", href: personalInfo.linkedin,              color: "rgba(59,130,246,0.4)"  },
  { icon: Mail,    label: "Email",    href: `mailto:${personalInfo.email}`,     color: "rgba(139,92,246,0.4)"  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: 12,
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff", fontSize: 14, outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Contact API error:", data.error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 4000);
    } catch (err) {
      console.error("Contact fetch error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{ marginTop: "clamp(32px,6vw,80px)", paddingTop: "clamp(40px,7vw,80px)", paddingBottom: "clamp(48px,8vw,80px)", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, ...SEPARATOR }} aria-hidden />
      <div
        aria-hidden
        style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 0,
          width: 600, height: 400, borderRadius: "50%",
          filter: "blur(80px)", opacity: 0.07, pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.6), transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(14px,4vw,24px)" }}>
        <SectionHeader
          label="Contact"
          title="Mission"
          highlight="Control"
          subtitle="Ready to launch your next project? Let's connect and build something extraordinary."
          align="center"
        />

        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40, alignItems: "start" }}
          className="lg-contact-grid">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Radar card */}
            <div style={{
              padding: 24, borderRadius: 16, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "#a78bfa" }}>
                Signal Active
              </p>
              <RadarAnimation />
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
                Scanning for new connections...
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                    borderRadius: 12, background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 18px ${color}`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
                >
                  <Icon size={15} color="rgba(255,255,255,0.5)" />
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{label}</span>
                </motion.a>
              ))}
            </div>

            {/* Info */}
            <div style={{
              padding: 20, borderRadius: 16,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
                Transmission Info
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[`📍 ${personalInfo.location}`, `📧 ${personalInfo.email}`, "⏱ Response within 24 hours"].map((line) => (
                  <p key={line} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{line}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div style={{
              padding: 32, borderRadius: 16,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }}>
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
                Send Transmission
              </h3>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="contact-name-email-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { id: "name",  label: "Your Name",      type: "text",  placeholder: "Sam" },
                    { id: "email", label: "Email Address",  type: "email", placeholder: "you@example.com" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                        {field.label}
                      </label>
                      <input
                        id={field.id} name={field.id} type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.id as keyof typeof form]}
                        onChange={handleChange}
                        required
                        style={INPUT_STYLE}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Subject
                  </label>
                  <input
                    id="subject" name="subject" type="text"
                    placeholder="Project inquiry / Collaboration / Job opportunity"
                    value={form.subject} onChange={handleChange} required
                    style={INPUT_STYLE}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    Message
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    value={form.message} onChange={handleChange} required
                    style={{ ...INPUT_STYLE, resize: "none" }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "14px 28px", borderRadius: 12, border: "none",
                    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                    color: "#fff", fontWeight: 600, fontSize: 15,
                    cursor: status === "sending" || status === "success" ? "not-allowed" : "pointer",
                    opacity: status === "sending" || status === "success" ? 0.7 : 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Send size={16} /> Launch Message
                      </motion.span>
                    )}
                    {status === "sending" && (
                      <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} />
                        Transmitting...
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8, color: "#4ade80" }}>
                        <CheckCircle size={16} /> Message Sent!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: "flex", alignItems: "center", gap: 8, color: "#f87171" }}>
                        <AlertCircle size={16} /> Message is too short or Invalid Email Address. Try Again!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-name-email-grid { grid-template-columns: 1fr !important; }
          .lg-contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .lg-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

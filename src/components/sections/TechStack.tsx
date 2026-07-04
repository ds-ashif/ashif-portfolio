"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { techStack } from "@/lib/data";

const TECH_ICONS: Record<string, string> = {
  React: "⚛", "Next.js": "▲", Angular: "An", TypeScript: "TS",
  JavaScript: "JS", "Node.js": "N", "ASP.NET": "AS", "C#": "C#",
  Java: "Jv", "C/C++": "C/", MongoDB: "M", MySQL: "My",
  "SQL Server": "SQ", Python: "Py", Bootstrap: "BS",
  TailwindCSS: "TW", Linux: "🐧", Git: "Git",
};

const SEPARATOR: React.CSSProperties = {
  position: "absolute", left: 0, right: 0, top: 0, height: 1,
  background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent)",
  pointerEvents: "none",
};

const SECTION: React.CSSProperties = {
  position: "relative",
  marginTop: "clamp(32px,6vw,80px)",
  paddingTop: "clamp(40px,7vw,80px)",
  paddingBottom: "clamp(48px,8vw,96px)",
  overflow: "hidden",
};

function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(139,92,246,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

interface FloatingNode {
  id: number; name: string; color: string; icon: string;
  x: number; y: number; vx: number; vy: number; radius: number;
}

export default function TechStack() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const nodesRef      = useRef<FloatingNode[]>([]);
  const animRef       = useRef<number>(0);
  const hoveredRef    = useRef<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const mouseRef      = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas pixel dimensions from wrapper size
    const setSize = () => {
      const w = wrapper.offsetWidth;
      const h = wrapper.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      // keep nodes in bounds after resize
      nodesRef.current.forEach((n) => {
        n.x = Math.max(n.radius, Math.min(w - n.radius, n.x));
        n.y = Math.max(n.radius, Math.min(h - n.radius, n.y));
      });
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(wrapper);

    // Initialise nodes spread across canvas
    nodesRef.current = techStack.map((tech, i) => ({
      id: i,
      name: tech.name,
      color: tech.color,
      icon: TECH_ICONS[tech.name] ?? tech.name.slice(0, 2),
      x: 80 + Math.random() * Math.max(1, canvas.width  - 160),
      y: 50 + Math.random() * Math.max(1, canvas.height - 100),
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      radius: 38,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const nodes   = nodesRef.current;
      const hovered = hoveredRef.current;

      // ── connection lines ──────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - dist / 220) * 0.2})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── nodes ─────────────────────────────────────────────
      nodes.forEach((node) => {
        const isHov = hovered === node.name;
        const r     = node.radius + (isHov ? 12 : 0);

        // gradient fill
        const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
        g.addColorStop(0, hexToRgba(node.color, isHov ? 0.28 : 0.16));
        g.addColorStop(1, hexToRgba(node.color, 0.02));

        ctx.shadowColor = node.color;
        ctx.shadowBlur  = isHov ? 32 : 12;

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // border ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(node.color, isHov ? 0.75 : 0.38);
        ctx.lineWidth   = isHov ? 2 : 1.2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // icon text
        const isLong = node.icon.length > 2;
        ctx.font          = `${isLong ? 15 : 13}px system-ui,sans-serif`;
        ctx.textAlign     = "center";
        ctx.textBaseline  = "middle";
        ctx.fillStyle     = isHov ? "#ffffff" : "rgba(255,255,255,0.78)";
        ctx.fillText(node.icon, node.x, node.y - 9);

        // name label
        ctx.font          = "bold 9px system-ui,sans-serif";
        ctx.fillStyle     = isHov ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)";
        const label = node.name.length > 8 ? node.name.slice(0, 8) : node.name;
        ctx.fillText(label, node.x, node.y + 14);
      });

      // ── physics ───────────────────────────────────────────
      nodes.forEach((node) => {
        const mdx   = node.x - mouseRef.current.x;
        const mdy   = node.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 100 && mDist > 0) {
          node.vx += (mdx / mDist) * 0.8;
          node.vy += (mdy / mDist) * 0.8;
        }

        node.vx *= 0.984;
        node.vy *= 0.984;
        node.vx  = Math.max(-1.6, Math.min(1.6, node.vx));
        node.vy  = Math.max(-1.6, Math.min(1.6, node.vy));
        node.x  += node.vx;
        node.y  += node.vy;

        if (node.x < node.radius)        { node.x = node.radius;        node.vx =  Math.abs(node.vx); }
        if (node.x > W - node.radius)    { node.x = W - node.radius;    node.vx = -Math.abs(node.vx); }
        if (node.y < node.radius)        { node.y = node.radius;        node.vy =  Math.abs(node.vy); }
        if (node.y > H - node.radius)    { node.y = H - node.radius;    node.vy = -Math.abs(node.vy); }
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    // ── mouse events ──────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };

      let found: string | null = null;
      for (const n of nodesRef.current) {
        const dx = n.x - mx, dy = n.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 10) { found = n.name; break; }
      }
      if (found !== hoveredRef.current) {
        hoveredRef.current = found;
        setHoveredNode(found);
      }
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      hoveredRef.current = null;
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="techstack" style={SECTION} aria-label="Floating Tech Universe">
      <div style={SEPARATOR} aria-hidden />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", right: -40, top: "30%",
          width: 300, height: 300, borderRadius: "50%",
          filter: "blur(80px)", opacity: 0.06, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(59,130,246,0.7), transparent 70%)",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(14px,4vw,24px)" }}>
        <SectionHeader
          label="Technologies"
          title="Floating Tech"
          highlight="Universe"
          subtitle="Hover the nodes — they react to your cursor in real time."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          style={{ marginTop: 48 }}
        >
          {/* Canvas wrapper — responsive height */}
          <div
            ref={wrapperRef}
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(280px, 50vw, 440px)",
              borderRadius: 20,
              overflow: "hidden",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(14px)",
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                cursor: hoveredNode ? "default" : "crosshair",
                display: "block",
              }}
              aria-label="Interactive floating tech stack visualization"
            />

            {/* Hover tooltip */}
            {hoveredNode && (
              <motion.div
                key={hoveredNode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "8px 22px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  pointerEvents: "none",
                  zIndex: 10,
                  background: "rgba(139,92,246,0.18)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  backdropFilter: "blur(12px)",
                  whiteSpace: "nowrap",
                }}
              >
                {hoveredNode}
              </motion.div>
            )}
          </div>

          {/* Legend pills */}
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {techStack.map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 12px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12, color: "rgba(255,255,255,0.55)",
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                    background: tech.color,
                    boxShadow: `0 0 6px ${tech.color}`,
                  }}
                />
                {tech.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Download, ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";
import { personalInfo } from "@/lib/data";

const FloatingGlobe = dynamic(() => import("@/components/three/FloatingGlobe"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const ROLES = personalInfo.taglines;

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText,  setDisplayText]  = useState("");
  const [isDeleting,   setIsDeleting]   = useState(false);
  const [charIndex,    setCharIndex]    = useState(0);

  useEffect(() => {
    const current = ROLES[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 75);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 38);
    } else {
      setIsDeleting(false);
      setCurrentIndex((i) => (i + 1) % ROLES.length);
    }
    setDisplayText(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <span className="text-gradient font-semibold">
      {displayText}
      <span className="inline-block w-[2px] h-6 bg-purple-400 ml-0.5 animate-pulse align-middle rounded-full" />
    </span>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    type P = { x:number;y:number;vx:number;vy:number;r:number;op:number;col:string };
    const cols = ["rgba(139,92,246,","rgba(59,130,246,","rgba(6,182,212,"];
    const pts: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx:(Math.random()-.5)*.28, vy:(Math.random()-.5)*.28,
      r:Math.random()*1.3+.4, op:Math.random()*.3+.08,
      col:cols[Math.floor(Math.random()*cols.length)],
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach((p,i)=>{
        pts.slice(i+1).forEach(q=>{
          const d=Math.hypot(p.x-q.x,p.y-q.y);
          if(d<110){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=`rgba(139,92,246,${(1-d/110)*.08})`;ctx.lineWidth=.5;ctx.stroke();}
        });
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>canvas.width)p.vx*=-1;
        if(p.y<0||p.y>canvas.height)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`${p.col}${p.op})`;ctx.fill();
      });
      id=requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize",resize);
    return ()=>{cancelAnimationFrame(id);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden />;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start","end start"] });
  const opacity  = useTransform(scrollYProgress, [0,.7], [1,0]);
  const scrollYv = useTransform(scrollYProgress, [0,1],  [0,130]);
  const scale    = useTransform(scrollYProgress, [0,.5], [1,.94]);

  const nameX  = useTransform(springX, v => v * -14);
  const nameY  = useTransform(springY, v => v * -7);
  const globeX = useTransform(springX, v => v * 18);
  const globeY = useTransform(springY, v => v * 9);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth/2)  / (window.innerWidth/2));
      mouseY.set((e.clientY - window.innerHeight/2) / (window.innerHeight/2));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const container = { hidden:{}, visible:{ transition:{ staggerChildren:.13, delayChildren:.25 }}};
  const item = {
    hidden: { opacity:0, y:36, filter:"blur(8px)" },
    visible:{ opacity:1, y:0,  filter:"blur(0px)", transition:{ duration:.75, ease:"easeOut" as const }},
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <ParticleField />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background:"radial-gradient(ellipse 80% 55% at 50% -5%, rgba(139,92,246,0.1) 0%, transparent 65%)" }}
        aria-hidden />

      <motion.div
        style={{ opacity, y: scrollYv, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10
                   pt-24 sm:pt-28 pb-20 sm:pb-24
                   flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8"
      >
        {/* ── Left: text ─────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col gap-5 sm:gap-6 max-w-xl w-full"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass border border-purple-500/25 text-xs font-medium text-purple-300 select-none">
              <Sparkles size={11} className="text-purple-400" />
              Available for opportunities
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={item}>
            <p className="text-white/40 text-xs sm:text-sm font-light tracking-[0.25em] uppercase">
              Hello, I&apos;m
            </p>
          </motion.div>

          {/* Name — responsive font size */}
          <motion.div variants={item}>
            <motion.h1
              className="font-black tracking-tighter leading-none select-none
                         text-[clamp(2.8rem,12vw,7rem)]"
              style={{ x: nameX, y: nameY }}
            >
              <span className="text-white" style={{ textShadow:"0 0 60px rgba(139,92,246,0.25)" }}>
                {personalInfo.name}
              </span>
            </motion.h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item} className="h-9 flex items-center">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80">
              <TypewriterText />
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} className="text-white/50 text-sm sm:text-base leading-relaxed max-w-lg">
            {personalInfo.bio}
          </motion.p>

          {/* Stats strip — wraps on mobile */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 sm:py-5 border-y border-white/[0.07]"
          >
            {[
              { n:"15+",  l:"Technologies"     },
              { n:"170+", l:"Contributions"    },
              { n:"10+",  l:"Projects Shipped" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl font-bold text-gradient leading-none">{s.n}</span>
                <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest">{s.l}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="primary"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}
            >
              <span>Explore Journey</span>
              <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton variant="secondary" href={personalInfo.resume} download="Ashif_Ahamad_Resume.pdf">
              <Download size={15} />
              <span>Resume</span>
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── Right: Globe — hidden on small mobile, visible sm+ ── */}
        <motion.div
          initial={{ opacity:0, scale:.65, rotateY:-25 }}
          animate={{ opacity:1, scale:1,   rotateY:0 }}
          transition={{ duration:1.2, delay:.45, ease:[.25,.46,.45,.94] }}
          style={{ x: globeX, y: globeY }}
          className="flex-shrink-0 relative
                     hidden sm:block
                     w-[260px] h-[260px]
                     md:w-[360px] md:h-[360px]
                     lg:w-[440px] lg:h-[440px]"
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background:"radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(59,130,246,0.4) 50%, transparent 70%)" }}
            aria-hidden
          />
          <FloatingGlobe />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:2.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut" }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background:"linear-gradient(to top, #000, transparent)" }} aria-hidden />
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

export default function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <>
      <style>{`
        @keyframes aurora1 {
          0% { transform: translate(0,0) scale(1) rotate(0deg); }
          100% { transform: translate(5%,8%) scale(1.1) rotate(15deg); }
        }
        @keyframes aurora2 {
          0% { transform: translate(0,0) scale(1) rotate(0deg); }
          100% { transform: translate(-8%,5%) scale(1.15) rotate(-10deg); }
        }
        @keyframes aurora3 {
          0% { transform: translate(0,0) scale(1) rotate(0deg); }
          100% { transform: translate(6%,-5%) scale(1.05) rotate(8deg); }
        }
      `}</style>

      <div
        className={cn(
          "fixed inset-0 pointer-events-none z-0 overflow-hidden",
          className
        )}
        aria-hidden
      >
        <div
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[60%] opacity-20 blur-3xl rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
            animation: "aurora1 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] opacity-15 blur-3xl rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)",
            animation: "aurora2 15s ease-in-out infinite alternate-reverse",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] opacity-10 blur-3xl rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)",
            animation: "aurora3 18s ease-in-out infinite alternate",
          }}
        />
      </div>
    </>
  );
}

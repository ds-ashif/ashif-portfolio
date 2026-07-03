"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShootingStarsProps {
  className?: string;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  starWidth?: number;
  starColor?: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

export default function ShootingStars({
  className,
  minDelay = 1000,
  maxDelay = 3000,
  minDuration = 1000,
  maxDuration = 3000,
  starWidth = 120,
  starColor = "#a78bfa",
}: ShootingStarsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const nextSpawnRef = useRef<number>(0);

  useEffect(() => {
    let idCounter = 0;

    const getRandomStar = (): Star => {
      const angle = -45 + (Math.random() - 0.5) * 20;
      return {
        id: idCounter++,
        x: Math.random() * (window.innerWidth + 400) - 200,
        y: Math.random() * (window.innerHeight * 0.5),
        angle,
        scale: 0.5 + Math.random() * 1,
        speed: minDuration + Math.random() * (maxDuration - minDuration),
        distance: 300 + Math.random() * 400,
      };
    };

    const animate = (timestamp: number) => {
      if (!svgRef.current) return;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // spawn new star
      if (timestamp > nextSpawnRef.current) {
        starsRef.current.push(getRandomStar());
        nextSpawnRef.current = timestamp + minDelay + Math.random() * (maxDelay - minDelay);
      }

      // remove old elements
      Array.from(svgRef.current.querySelectorAll("[data-star]")).forEach((el) => {
        const created = Number(el.getAttribute("data-created"));
        const dur = Number(el.getAttribute("data-dur"));
        if (timestamp - created > dur) {
          el.remove();
          starsRef.current = starsRef.current.filter(
            (s) => s.id !== Number(el.getAttribute("data-id"))
          );
        }
      });

      // add new elements
      starsRef.current.forEach((star) => {
        if (svgRef.current?.querySelector(`[data-id="${star.id}"]`)) return;

        const rad = (star.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * star.distance;
        const dy = Math.sin(rad) * star.distance;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(star.x));
        line.setAttribute("y1", String(star.y));
        line.setAttribute("x2", String(star.x));
        line.setAttribute("y2", String(star.y));
        line.setAttribute("stroke", starColor);
        line.setAttribute("stroke-width", String(star.scale * 1.5));
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("data-star", "1");
        line.setAttribute("data-id", String(star.id));
        line.setAttribute("data-created", String(timestamp));
        line.setAttribute("data-dur", String(star.speed));

        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim.setAttribute("attributeName", "x2");
        anim.setAttribute("from", String(star.x));
        anim.setAttribute("to", String(star.x + dx));
        anim.setAttribute("dur", `${star.speed}ms`);
        anim.setAttribute("fill", "freeze");
        line.appendChild(anim);

        const anim2 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim2.setAttribute("attributeName", "y2");
        anim2.setAttribute("from", String(star.y));
        anim2.setAttribute("to", String(star.y + dy));
        anim2.setAttribute("dur", `${star.speed}ms`);
        anim2.setAttribute("fill", "freeze");
        line.appendChild(anim2);

        const animOp = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animOp.setAttribute("attributeName", "stroke-opacity");
        animOp.setAttribute("values", "0;1;0.8;0");
        animOp.setAttribute("dur", `${star.speed}ms`);
        animOp.setAttribute("fill", "freeze");
        line.appendChild(animOp);

        svgRef.current?.appendChild(line);
      });

      animFrameRef.current = requestAnimationFrame(animate);
      void delta;
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [minDelay, maxDelay, minDuration, maxDuration, starWidth, starColor]);

  return (
    <svg
      ref={svgRef}
      className={cn("fixed inset-0 w-full h-full pointer-events-none z-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}

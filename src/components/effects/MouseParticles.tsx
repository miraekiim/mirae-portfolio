"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  opacity: number;
}

const COLORS = ["#334155", "#6366f1", "#94a3b8", "#818cf8", "#475569"];
const PARTICLE_COUNT = 90;
const CONNECT_DIST = 130;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const LINE_OPACITY = 0.2;
const MOUSE_RADIUS = 180;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MOUSE_LINE_OPACITY = 0.4;
const LINE_COLOR = "51,65,85";
const BASE_SPEED = 0.5;

export function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const container = canvas.parentElement;
    if (!container) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let prevMouseX = -9999;
    let prevMouseY = -9999;
    let isInside = false;
    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(rect.width, rect.height);
    };

    const initParticles = (w: number, h: number) => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_SPEED * 2,
        r: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.4 + 0.3,
      }));
    };

    const draw = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Mouse speed for scatter effect
      let mouseSpeed = 0;
      if (isInside && prevMouseX > -9000) {
        const mdx = mouseX - prevMouseX;
        const mdy = mouseY - prevMouseY;
        mouseSpeed = Math.sqrt(mdx * mdx + mdy * mdy);
      }
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Update particle positions - just free floating, no attraction
      for (const p of particles) {
        // Only scatter on fast mouse movement
        if (isInside && mouseSpeed > 10) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * mouseSpeed * 0.05;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Dampen velocity back toward base speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > BASE_SPEED) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
        if (p.x > w) { p.x = w; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
        if (p.y > h) { p.y = h; p.vy = -Math.abs(p.vy); }
      }

      // Draw connection lines between nearby particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONNECT_DIST) * LINE_OPACITY;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${LINE_COLOR},${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw lines from mouse to nearby particles
      if (isInside) {
        ctx.lineWidth = 0.8;
        for (const p of particles) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / MOUSE_RADIUS) * MOUSE_LINE_OPACITY;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw particle dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.round(p.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
        mouseX = x;
        mouseY = y;
        isInside = true;
      } else {
        isInside = false;
      }
    };

    const onMouseLeave = () => { isInside = false; };

    resize();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden
    />
  );
}

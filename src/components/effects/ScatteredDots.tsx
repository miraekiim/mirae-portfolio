"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const COLORS = ["#0d9488", "#7c3aed", "#f59e0b", "#ef4444", "#3b82f6"];

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

interface ScatteredDotsProps {
  count?: number;
  className?: string;
}

export function ScatteredDots({ count = 18, className = "" }: ScatteredDotsProps) {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.25 + 0.15,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
      }))
    );
  }, [count]);

  if (dots.length === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            opacity: dot.opacity,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

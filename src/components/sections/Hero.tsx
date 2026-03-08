"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/profile";
import { MouseParticles } from "@/components/effects/MouseParticles";

const nameChars = "Mirae Kim".split("");

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <MouseParticles />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Name */}
        <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-8xl">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="max-w-lg text-lg tracking-wide text-slate-500 md:text-xl"
        >
          {profile.title}{" "}
          <span className="mx-2 text-slate-300">&#x2022;</span>{" "}
          {profile.tagline}
        </motion.p>

        {/* Affiliation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-sm tracking-widest text-slate-400 uppercase"
        >
          {profile.affiliation}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-slate-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}

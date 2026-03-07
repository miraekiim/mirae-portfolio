"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid gap-8 md:grid-cols-[280px_1fr] md:gap-16">
        {/* Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative">
            <div className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full bg-gradient-to-br from-[#0d9488]/20 to-[#7c3aed]/20 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#111118]">
                <span className="bg-gradient-to-br from-[#0d9488] to-[#7c3aed] bg-clip-text font-serif text-4xl md:text-5xl font-bold text-transparent">
                  MK
                </span>
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-br from-[#0d9488]/10 to-[#7c3aed]/10 blur-xl" />
          </div>
        </motion.div>

        {/* Bio content */}
        <div className="space-y-6">
          <SectionHeading>About</SectionHeading>

          <div className="h-px w-16 bg-gradient-to-r from-[#0d9488] to-[#7c3aed]" />

          <div className="space-y-4 text-base leading-relaxed text-white/60">
            {profile.bio.split("\n\n").map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Research interests */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3 pt-2"
          >
            <p className="text-xs font-medium tracking-widest text-white/30 uppercase">
              Research Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.researchInterests.map((interest, i) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/50 transition-colors hover:border-[#0d9488]/30 hover:text-white/70"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

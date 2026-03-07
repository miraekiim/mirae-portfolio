"use client";

import { motion } from "motion/react";
import { skillCategories } from "@/data/skills";
import {
  SectionWrapper,
  SectionHeading,
} from "@/components/ui/SectionWrapper";

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading>Skills</SectionHeading>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#0d9488] to-[#7c3aed]" />

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-medium tracking-widest text-white/30 uppercase">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, j) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 + j * 0.04 }}
                  className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-white/60 transition-all duration-300 hover:border-[#0d9488]/30 hover:bg-[#0d9488]/5 hover:text-white/80"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

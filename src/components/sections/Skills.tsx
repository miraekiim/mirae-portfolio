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
      <div className="mt-4 h-px w-16 bg-slate-200" />

      <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-xs font-medium tracking-widest text-slate-400 uppercase">
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
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
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

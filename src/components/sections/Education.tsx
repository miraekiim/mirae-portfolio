"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import {
  SectionWrapper,
  SectionHeading,
} from "@/components/ui/SectionWrapper";

export function Education() {
  return (
    <SectionWrapper id="education">
      <SectionHeading>Education</SectionHeading>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#0d9488] to-[#7c3aed]" />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
          >
            {/* Subtle corner accent */}
            <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-[#7c3aed]/5 to-transparent" />

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0d9488]/15 to-[#7c3aed]/15">
                <GraduationCap className="h-5 w-5 text-[#0d9488]/70" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-white/90">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm text-[#0d9488]/70">{edu.field}</p>
                <p className="mt-1 text-sm text-white/50">{edu.institution}</p>
                <p className="mt-1 text-xs text-white/25">
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

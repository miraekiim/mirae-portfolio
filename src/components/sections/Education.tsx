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
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 sm:p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
          >
            {/* Subtle corner accent */}
            <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-violet-100 to-transparent" />

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-violet-50">
                <GraduationCap className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-slate-900">
                  {edu.degree}
                </h3>
                <p className="mt-0.5 text-sm text-teal-600">{edu.field}</p>
                <p className="mt-1 text-sm text-slate-600">{edu.institution}</p>
                <p className="mt-1 text-xs text-slate-400">
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

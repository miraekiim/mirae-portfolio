"use client";

import { motion } from "motion/react";
import { experiences } from "@/data/experience";
import {
  SectionWrapper,
  SectionHeading,
} from "@/components/ui/SectionWrapper";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#0d9488] to-[#7c3aed]" />

      <div className="relative mt-12">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-300 via-violet-200 to-transparent md:left-1/2 md:-translate-x-px" />

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative grid gap-4 md:grid-cols-2 md:gap-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-teal-400 bg-white md:left-1/2 md:-translate-x-1/2" />

              {/* Date - left side on desktop */}
              <div
                className={`pl-7 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left md:pl-8"}`}
              >
                <p className="text-sm text-slate-400">
                  {exp.startDate} — {exp.endDate}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{exp.location}</p>
              </div>

              {/* Content - right side on desktop */}
              <div
                className={`group ml-7 rounded-xl border border-slate-200 bg-white p-4 md:p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-sm md:ml-0 ${i % 2 === 0 ? "md:pl-8" : "md:order-1 md:pr-8 md:text-right"}`}
              >
                <h3 className="font-heading text-lg font-semibold text-slate-900">
                  {exp.role}
                </h3>
                <p className="mt-1 text-sm text-teal-600">
                  {exp.organization}
                </p>
                <ul
                  className={`mt-3 space-y-1.5 text-sm text-slate-500 ${i % 2 !== 0 ? "md:ml-auto" : ""}`}
                >
                  {exp.description.map((desc, j) => (
                    <li key={j} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
                {exp.skills && (
                  <div
                    className={`mt-3 flex flex-wrap gap-1.5 ${i % 2 !== 0 ? "md:justify-end" : ""}`}
                  >
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] tracking-wide text-slate-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

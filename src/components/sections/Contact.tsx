"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const links = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
    detail: profile.email,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: Linkedin,
    detail: "mirae-kim",
  },
];

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl font-bold md:text-4xl"
        >
          Let&apos;s{" "}
          <span className="bg-gradient-to-r from-[#0d9488] to-[#7c3aed] bg-clip-text text-transparent">
            Connect
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-white/40"
        >
          Interested in collaboration or have questions about my research? Feel
          free to reach out.
        </motion.p>

        {/* Gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-[#0d9488] to-[#7c3aed]"
        />

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <link.icon className="h-5 w-5 text-white/40 transition-colors group-hover:text-[#0d9488]" />
              <div className="text-left">
                <p className="text-sm font-medium text-white/80">
                  {link.label}
                </p>
                <p className="text-xs text-white/30">{link.detail}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/15 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/30" />
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

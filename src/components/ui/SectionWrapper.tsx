"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SectionWrapper({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:py-32", className)}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl font-bold tracking-tight md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

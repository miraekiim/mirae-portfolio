"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/publications";
import {
  SectionWrapper,
  SectionHeading,
} from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

type Filter = "all" | "conference" | "journal";

function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-md",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "before:bg-[radial-gradient(600px_circle_at_var(--glow-x)_var(--glow-y),rgba(13,148,136,0.08),transparent_40%)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function AuthorList({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-slate-400">
      {authors.map((author, i) => (
        <span key={i}>
          {author === "Mirae Kim" ? (
            <span className="font-semibold text-indigo-500">
              {author}
            </span>
          ) : (
            author
          )}
          {i < authors.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

export function Publications() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = publications.filter(
    (p) => filter === "all" || p.venueType === filter
  );

  const conferenceCount = publications.filter(
    (p) => p.venueType === "conference"
  ).length;
  const journalCount = publications.filter(
    (p) => p.venueType === "journal"
  ).length;

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: publications.length },
    { key: "conference", label: "Conference", count: conferenceCount },
    { key: "journal", label: "Journal", count: journalCount },
  ];

  return (
    <SectionWrapper id="publications">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionHeading>Publications</SectionHeading>
          <div className="mt-4 h-px w-16 bg-slate-200" />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                filter === key ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {filter === key && (
                <motion.div
                  layoutId="pub-filter"
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {label}{" "}
                <span className="text-slate-400">{count}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Publication cards */}
      <div className="mt-10 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((pub, i) => (
            <motion.div
              key={pub.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlowCard>
                <div className="flex gap-5 p-5 md:p-6">
                  {/* Year badge */}
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="rounded-lg bg-teal-50 px-3 py-1.5 font-heading text-sm font-bold text-teal-700">
                      {pub.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading text-base leading-snug font-semibold text-slate-900 md:text-lg">
                        {pub.title}
                      </h3>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-slate-300 transition-colors hover:text-teal-500"
                          aria-label={`Open ${pub.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <AuthorList authors={pub.authors} />

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-slate-500">
                        {pub.venue}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                          pub.venueType === "conference"
                            ? "bg-teal-50 text-teal-600"
                            : "bg-violet-50 text-violet-600"
                        )}
                      >
                        {pub.venueType}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

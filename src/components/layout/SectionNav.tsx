"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navItems } from "@/data/profile";
import { cn } from "@/lib/utils";

export function SectionNav() {
  const [activeSection, setActiveSection] = useState("");
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map(({ href }) => href.replace("#", ""));

    const findActive = () => {
      const midY = window.innerHeight / 2;
      let closest = "";
      let closestDist = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // distance from section top to viewport center
        const dist = Math.abs(rect.top - midY);
        // also check if viewport center is inside the section
        if (rect.top <= midY && rect.bottom >= midY) {
          closest = id;
          break;
        }
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      }

      if (closest) setActiveSection(closest);
    };

    window.addEventListener("scroll", findActive, { passive: true });
    findActive();
    return () => window.removeEventListener("scroll", findActive);
  }, []);

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex"
        >
          <nav className="flex flex-col items-end gap-3">
            {navItems.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={href}
                  onClick={() => handleClick(href)}
                  className="group flex items-center gap-2.5"
                >
                  <span
                    className={cn(
                      "text-[11px] tracking-wide transition-all duration-300",
                      isActive
                        ? "text-slate-700 font-medium"
                        : "text-slate-300 group-hover:text-slate-400"
                    )}
                  >
                    {label}
                  </span>
                  <span className="relative flex items-center justify-center">
                    <span
                      className={cn(
                        "block rounded-full transition-all duration-300",
                        isActive
                          ? "h-2.5 w-2.5 bg-indigo-500"
                          : "h-1.5 w-1.5 bg-slate-300 group-hover:bg-slate-400"
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

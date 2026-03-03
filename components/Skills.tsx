"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import SectionLabel from "@/components/SectionLabel";

const skills = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React",
  "Next.js", "Tailwind CSS", "Node.js", "Git", "Figma",
  "REST APIs", "MongoDB",
];

function MarqueeRow({ reverse = false, isDark }: { reverse?: boolean; isDark: boolean }) {
  return (
    <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div className="flex gap-4 py-3 animate-marquee whitespace-nowrap" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {[...skills, ...skills].map((skill, i) => (
          <span key={`${skill}-${i}`} className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all cursor-default shrink-0 ${isDark ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-cyan-500/40" : "border-zinc-200 bg-white text-zinc-600 hover:text-amber-600 hover:border-amber-500/50 shadow-sm"}`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="skills" className={`py-28 px-6 ${isDark ? "" : "bg-white"}`} ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel inView={inView} index={3}>{"Skills & Tools"}</SectionLabel>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-12">
          Technologies I{" "}
          <span className={`bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-cyan-400 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-rose-500"}`}>love using</span>
        </motion.h2>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4">
        <MarqueeRow isDark={isDark} />
        <MarqueeRow reverse isDark={isDark} />
      </motion.div>
    </section>
  );
}

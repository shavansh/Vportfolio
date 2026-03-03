"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

type Props = { title: string; description: string; tech: string[]; github: string; live: string; index: number };

export default function ProjectCard({ title, description, tech, github, live, index }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const card = isDark
    ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-cyan-500/10"
    : "bg-white border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-lg hover:shadow-amber-500/5";
  const linkHover = isDark ? "hover:text-cyan-500" : "hover:text-amber-600";

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" as const }}
      className={`group border rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${card}`}
    >
      <span className={`font-mono text-[10px] tracking-widest uppercase mb-4 ${isDark ? "text-cyan-500" : "text-amber-600"}`}>
        project {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className={`text-xl font-bold mb-2 text-zinc-900 dark:text-white transition-colors ${isDark ? "group-hover:text-cyan-500" : "group-hover:text-amber-600"}`}>{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${isDark ? "bg-zinc-800 border-zinc-700 text-zinc-400" : "bg-gray-50 border-zinc-200 text-zinc-600"}`}>
            {t}
          </span>
        ))}
      </div>

      <div className={`h-px my-5 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} />

      <div className="flex gap-5">
        <a href={github} target="_blank" rel="noopener noreferrer" className={`group/l flex items-center gap-1.5 text-sm text-zinc-500 transition-colors ${linkHover}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          Code
          <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover/l:opacity-100 group-hover/l:translate-x-0 transition-all" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
        <a href={live} target="_blank" rel="noopener noreferrer" className={`group/l flex items-center gap-1.5 text-sm text-zinc-500 transition-colors ${linkHover}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          Live
          <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover/l:opacity-100 group-hover/l:translate-x-0 transition-all" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>
      </div>
    </motion.div>
  );
}

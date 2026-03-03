"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import SectionLabel from "@/components/SectionLabel";

const stats = [
  { value: "2+", label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "8+", label: "Technologies" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const accent = isDark ? "text-cyan-500" : "text-amber-600";
  const card = isDark
    ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-black/20"
    : "bg-white border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md hover:shadow-amber-500/5";

  return (
    <section id="about" className={`py-16 md:py-28 px-4 sm:px-6 ${isDark ? "" : "bg-zinc-50/80"}`} ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel inView={inView} index={2}>About Me</SectionLabel>

        <div className="grid md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className={`md:col-span-2 border rounded-2xl p-7 transition-all duration-300 ${card}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              A developer who cares about{" "}
              <span className={`bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-cyan-400 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-rose-500"}`}>every pixel</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              I&apos;m a passionate web developer focused on building clean, modern, and user-friendly web applications. I enjoy turning ideas into real products using technologies like Next.js, Tailwind CSS, and TypeScript.
            </p>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              My goal is to create fast, responsive websites that not only look great but also solve real problems.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            className={`border rounded-2xl p-5 sm:p-7 transition-all duration-300 ${card}`}>
            <p className={`text-xs uppercase tracking-widest font-bold mb-4 ${isDark ? "text-cyan-500" : "text-amber-500"}`}>Quick Stats</p>
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-4 sm:gap-6">
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={`sm:pb-6 ${i < stats.length - 1 ? `sm:border-b ${isDark ? "sm:border-zinc-800" : "sm:border-zinc-100"}` : ""}`}
                >
                  <div className={`text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-cyan-400 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-rose-500"}`}>
                    {s.value}
                  </div>
                  <div className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
            className={`border rounded-2xl p-7 transition-all duration-300 ${card}`}>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Philosophy</p>
            <p className="text-zinc-700 dark:text-zinc-400 leading-relaxed italic text-lg">
              &ldquo;Write code that humans can read, build products that humans want to use.&rdquo;
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}
            className={`md:col-span-2 border rounded-2xl p-7 transition-all duration-300 ${card}`}>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">What I work with</p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Git", "Figma", "Vercel"].map((tech) => (
                <span key={tech} className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors cursor-default ${isDark ? "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:border-cyan-500/30" : "bg-gray-50 border-zinc-200 text-zinc-700 hover:text-amber-600 hover:border-amber-500/40"}`}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

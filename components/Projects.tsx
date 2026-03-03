"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/project";
import { useTheme } from "@/components/ThemeProvider";
import SectionLabel from "@/components/SectionLabel";

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id="projects" className={`py-16 md:py-28 px-4 sm:px-6 ${isDark ? "" : "bg-zinc-50/80"}`} ref={ref}>
            <div className="max-w-6xl mx-auto">
                <SectionLabel inView={inView} index={4}>Selected Work</SectionLabel>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-8 sm:mb-12">
                    Things I&apos;ve{" "}
                    <span className={`bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-cyan-400 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-rose-500"}`}>built</span>
                </motion.h2>
                <div className="grid gap-5 sm:grid-cols-2">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.title} title={p.title} description={p.description} tech={p.tech} github={p.github} live={p.live} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StarField from "@/components/StarField";

import TextRotator from "@/components/TextRotator";
import SectionLabel from "@/components/SectionLabel";
import { useTheme } from "@/components/ThemeProvider";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative min-h-screen flex items-end sm:items-center pb-16 sm:pb-0 px-4 sm:px-6 overflow-hidden">
      {isDark && <StarField />}


      {/* Background glows */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            {/* Cyan orb — top right, slow drift */}
            <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[130px] bg-cyan-500/15 animate-[floatA_12s_ease-in-out_infinite]" />
            {/* Purple orb — top left */}
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] bg-purple-600/15 animate-[floatB_15s_ease-in-out_infinite]" />
            {/* Emerald orb — bottom right */}
            <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] bg-emerald-500/12 animate-[floatC_18s_ease-in-out_infinite]" />
            {/* Violet orb — bottom left */}
            <div className="absolute -bottom-20 -left-32 w-[550px] h-[550px] rounded-full blur-[120px] bg-violet-600/12 animate-[floatA_20s_ease-in-out_infinite_reverse]" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] bg-amber-300/30" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] bg-rose-300/25" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] bg-orange-200/30" />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-24 sm:pt-0 flex flex-col-reverse gap-10 sm:gap-12 sm:grid sm:grid-cols-[1fr_auto] items-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-6">
            <SectionLabel animate={false} index={1}>Hello World</SectionLabel>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-zinc-900 dark:text-zinc-100">
            I build<br />
            <TextRotator words={["websites", "products", "experiences", "ideas"]} /><br />
            that matter<span className={isDark ? "text-cyan-500" : "text-amber-500"}>.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-zinc-600 dark:text-zinc-400 text-lg max-w-lg leading-relaxed">
            Full-stack developer crafting performant, accessible digital experiences with clean code and creative design.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className={`group flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-lg hover:scale-105 active:scale-95 ${isDark ? "bg-cyan-500 hover:bg-cyan-400 text-zinc-950 hover:shadow-cyan-500/25" : "bg-amber-500 hover:bg-amber-600 text-white hover:shadow-amber-500/30"}`}>
              See my work
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a href="#contact" className={`px-6 py-3 rounded-full border-2 font-semibold text-sm transition-all hover:scale-105 active:scale-95 ${isDark ? "border-zinc-700 text-zinc-400 hover:border-cyan-500 hover:text-white" : "border-zinc-300 text-zinc-700 hover:border-amber-500 hover:text-amber-600"}`}>
              Get in touch
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Available for hire
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span>Based in India 🇮🇳</span>
          </motion.div>
        </motion.div>

        {/* Profile photo */}
        <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex justify-center relative">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className={`absolute -inset-4 rounded-full blur-2xl ${isDark ? "bg-gradient-to-br from-cyan-500/20 to-emerald-500/20" : "bg-gradient-to-br from-amber-400/30 to-rose-400/25"}`} />
            <div className={`relative w-full h-full rounded-full overflow-hidden border-2 ${isDark ? "border-zinc-800" : "border-zinc-200 shadow-xl shadow-amber-500/5"}`}>
              <Image src="/myPhoto.png" alt="Vansh" fill className="object-cover object-top" priority />
            </div>
            <div className={`absolute -bottom-3 -left-3 px-4 py-2 rounded-xl border text-sm font-semibold shadow-lg ${isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-zinc-200 text-zinc-700"}`}>
              <span className={isDark ? "text-cyan-500" : "text-amber-500"}>&lt;</span> Developer <span className={isDark ? "text-cyan-500" : "text-amber-500"}>/&gt;</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className={`w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 ${isDark ? "border-zinc-700" : "border-zinc-300"}`}>
          <div className={`w-1 h-1.5 rounded-full ${isDark ? "bg-cyan-500" : "bg-amber-500"}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const links = ["about", "skills", "projects", "contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          className={`mt-4 flex h-16 items-center justify-between rounded-full px-8 transition-all duration-500 border
            ${scrolled
              ? "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 shadow-lg shadow-zinc-200/60 dark:shadow-black/40"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700/70 shadow-md shadow-zinc-200/40 dark:shadow-black/30"
            }`}
        >
          <a href="#" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            V<span className={isDark ? "text-cyan-500" : "text-amber-500"}>.</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((item, i) => (
              <motion.li key={item} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i + 0.2 }}>
                <a href={`#${item}`} className={`px-5 py-2.5 text-[17px] font-medium capitalize rounded-full transition-all ${isDark ? "text-zinc-400 hover:text-white hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`}>
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="md:hidden w-6 h-5 flex flex-col justify-between" aria-label="Menu">
              <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-full h-[1.5px] bg-zinc-900 dark:bg-white rounded-full origin-left" />
              <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-full h-[1.5px] bg-zinc-900 dark:bg-white rounded-full" />
              <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-full h-[1.5px] bg-zinc-900 dark:bg-white rounded-full origin-left" />
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl bg-white dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-2">
              {links.map((item, i) => (
                <motion.a key={item} href={`#${item}`} onClick={() => setOpen(false)}
                  initial={{ x: -15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}
                  className="block px-5 py-3.5 text-base capitalize text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "@/components/ThemeProvider";
import SectionLabel from "@/components/SectionLabel";

// ─── Replace these with your EmailJS credentials ──────────────────────────────
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────────────────────

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const accent = isDark ? "text-cyan-500" : "text-amber-600";
  const hoverAccent = isDark ? "hover:text-cyan-500" : "hover:text-amber-600";
  const borderAccent = isDark ? "group-hover:border-cyan-500/30" : "group-hover:border-amber-500/40";
  const focusRing = isDark ? "focus:border-cyan-500 focus:ring-cyan-500/20" : "focus:border-amber-500 focus:ring-amber-500/20";
  const btnStyle = isDark ? "bg-cyan-500 hover:bg-cyan-400 text-zinc-950 hover:shadow-cyan-500/25" : "bg-amber-500 hover:bg-amber-600 text-white hover:shadow-amber-500/30";
  const card = isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm";
  const input = isDark ? "bg-zinc-800/50 border-zinc-700 placeholder-zinc-600 text-white" : "bg-gray-50 border-zinc-200 placeholder-zinc-400 text-zinc-900";

  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`py-28 px-6 ${isDark ? "" : "bg-white"}`} ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel inView={inView} index={5}>{"Let's Connect"}</SectionLabel>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          {/* Left — heading + social links */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Got an idea?{" "}
              <span className={`bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-cyan-400 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-rose-500"}`}>Let&apos;s talk</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              {[
                { label: "Instagram", href: "https://www.instagram.com/t.vansh_sharma/", svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg> },
                { label: "GitHub", href: "https://github.com", svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> },
                { label: "LinkedIn", href: "https://linkedin.com", svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
              ].map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-zinc-600 dark:text-zinc-400 transition-colors group ${hoverAccent}`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"} ${borderAccent}`}>
                    {item.svg}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`border rounded-2xl p-7 space-y-5 transition-all duration-300 ${card}`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-600 dark:text-zinc-400">Name</label>
                <input name="name" type="text" required placeholder="John Doe"
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 transition-all ${input} ${focusRing}`} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-600 dark:text-zinc-400">Email</label>
                <input name="email" type="email" required placeholder="john@example.com"
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 transition-all ${input} ${focusRing}`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-600 dark:text-zinc-400">Subject</label>
              <input name="title" type="text" required placeholder="Project inquiry"
                className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 transition-all ${input} ${focusRing}`} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-600 dark:text-zinc-400">Message</label>
              <textarea name="message" rows={4} required placeholder="Tell me about your project..."
                className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-none ${input} ${focusRing}`} />
            </div>

            {/* Status feedback */}
            {status === "success" && (
              <p className="text-emerald-500 font-semibold text-sm flex items-center gap-2">
                ✅ Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 font-semibold text-sm flex items-center gap-2">
                ❌ Something went wrong. Please try again.
              </p>
            )}

            <button type="submit" disabled={status === "sending"}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${btnStyle}`}>
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTheme } from "@/components/ThemeProvider";

const links = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/t.vansh_sharma/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        href: "https://github.com/shavansh",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/shavansh/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "Twitter",
        href: "https://x.com/shavansh3651",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.636 5.905-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <footer className={`relative border-t ${isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-zinc-200"}`}>
            {/* Top gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" : "bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"}`} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-6">

                {/* Mobile/Tablet layout */}
                <div className="flex flex-col items-center gap-6 sm:hidden">
                    {/* Brand */}
                    <div className="text-center">
                        <p className={`text-xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                            Vansh<span className={isDark ? "text-cyan-500" : "text-amber-500"}>.</span>
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">Full-stack Developer · India 🇮🇳</p>
                    </div>

                    {/* Social icons grid */}
                    <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
                        {links.map(({ name, href, icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={name}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all hover:scale-105 active:scale-95
                  ${isDark
                                        ? "border-zinc-800 bg-zinc-800/50 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40"
                                        : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-amber-500 hover:border-amber-400/50 shadow-sm"
                                    }`}
                            >
                                {icon}
                                <span className="text-[10px] font-semibold">{name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-zinc-500 text-center">
                        © {new Date().getFullYear()} Vansh Sharma. Crafted with care.
                    </p>
                </div>

                {/* Desktop layout (sm+) */}
                <div className="hidden sm:flex items-center justify-between">
                    <div>
                        <p className={`text-base font-extrabold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                            Vansh<span className={isDark ? "text-cyan-500" : "text-amber-500"}>.</span>
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">© {new Date().getFullYear()} · Full-stack Developer · India 🇮🇳</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {links.map(({ name, href, icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={name}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold transition-all hover:scale-105 active:scale-95
                  ${isDark
                                        ? "border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40"
                                        : "border-zinc-200 text-zinc-500 hover:text-amber-600 hover:border-amber-400/50"
                                    }`}
                            >
                                {icon}
                                {name}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}

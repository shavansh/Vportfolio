"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const accent = isDark ? "text-cyan-500" : "text-amber-500";
    const linkHover = isDark ? "hover:text-cyan-400" : "hover:text-amber-600";

    const links = [
        { name: "Instagram", href: "https://www.instagram.com/t.vansh_sharma/" },
        { name: "GitHub", href: "https://github.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "Twitter", href: "https://twitter.com" },
    ];

    return (
        <footer className={`py-6 px-6 border-t ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-100 border-zinc-200"}`}>
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-base text-zinc-500">
                <p>
                    © {new Date().getFullYear()} Vansh<span className={accent}>.</span>{" "}
                    Crafted with care.
                </p>
                <div className="flex items-center gap-6">
                    {links.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-semibold transition-colors ${linkHover}`}
                        >
                            {name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

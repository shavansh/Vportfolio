"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function TextRotator({ words, className = "" }: { words: string[]; className?: string }) {
    const [index, setIndex] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        const id = setInterval(() => setIndex((p) => (p + 1) % words.length), 2500);
        return () => clearInterval(id);
    }, [words.length]);

    return (
        <span className={`inline-block relative ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ y: 30, opacity: 0, rotateX: -40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -30, opacity: 0, rotateX: 40 }}
                    transition={{ duration: 0.4, ease: "easeOut" as const }}
                    className={`inline-block bg-clip-text text-transparent ${theme === "dark"
                            ? "bg-gradient-to-r from-cyan-400 to-emerald-400"
                            : "bg-gradient-to-r from-amber-500 to-rose-500"
                        }`}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

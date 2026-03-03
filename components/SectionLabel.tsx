"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function useScramble(text: string, trigger: boolean) {
    const [display, setDisplay] = useState(() => text.replace(/\S/g, "·"));
    const raf = useRef<number | null>(null);

    useEffect(() => {
        if (!trigger) {
            setDisplay(text.replace(/\S/g, "·"));
            return;
        }

        const total = text.length;
        let iteration = 0;
        const maxIter = total * 8; // each char gets ~8 cycles

        const step = () => {
            setDisplay(
                text
                    .split("")
                    .map((char, idx) => {
                        if (char === " ") return " ";
                        // Lock in chars progressively from left
                        if (idx < iteration / 8) return char;
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );
            iteration++;
            if (iteration <= maxIter) {
                raf.current = requestAnimationFrame(step);
            } else {
                setDisplay(text);
            }
        };

        raf.current = requestAnimationFrame(step);
        return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }, [trigger, text]);

    return display;
}

interface SectionLabelProps {
    children: string;
    animate?: boolean;
    inView?: boolean;
    index?: number;
}

export default function SectionLabel({
    children,
    animate = true,
    inView = true,
    index,
}: SectionLabelProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const triggered = animate ? inView : true;
    const display = useScramble(String(children), triggered);

    return (
        <div className="mb-8">
            <span
                className={`
                    font-mono text-2xl sm:text-3xl font-bold tracking-wide select-none
                    bg-clip-text text-transparent
                    ${isDark
                        ? "bg-gradient-to-r from-cyan-300 to-emerald-300"
                        : "bg-gradient-to-r from-amber-500 to-rose-500"}
                `}
            >
                {display}
            </span>
        </div>
    );
}

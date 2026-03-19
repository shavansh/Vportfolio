"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    brightness: number;
    twinkleSpeed: number;
    twinkleOffset: number;
    color: [number, number, number];
    vx: number;
    vy: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    color: [number, number, number];
    alpha: number;
    phase: number;
}

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const smoothMouseRef = useRef({ x: -1000, y: -1000 });
    const mouseInitRef = useRef(false);
    const starsRef = useRef<Star[]>([]);
    const nebulaeRef = useRef<Nebula[]>([]);
    const animRef = useRef<number>(0);

    const init = useCallback((w: number, h: number) => {
        // Mostly white stars with occasional color accents
        const colors: [number, number, number][] = [
            [255, 255, 255],  // pure white
            [255, 255, 255],  // pure white
            [255, 255, 255],  // pure white
            [255, 255, 255],  // pure white
            [255, 252, 248],  // warm white
            [248, 252, 255],  // cool white
            [255, 250, 240],  // cream white
            [240, 248, 255],  // ice white
            [200, 220, 255],  // pale blue
            [255, 200, 180],  // warm peach
            [180, 200, 255],  // soft blue
            [255, 180, 220],  // soft pink
        ];

        const isMobile = w < 640;
        const starCount = isMobile ? 200 : 600;
        const stars: Star[] = [];
        for (let i = 0; i < starCount; i++) {
            const z = Math.pow(Math.random(), 0.5);
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                z,
                size: 0.4 + z * (isMobile ? 1.2 : 1.6),
                brightness: 0.3 + z * 0.7,
                twinkleSpeed: 0.2 + Math.random() * 1.5,
                twinkleOffset: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 0.015,
                vy: -0.005 - Math.random() * 0.02,
            });
        }
        starsRef.current = stars;

        const nebulaColors: [number, number, number][] = [
            [60, 80, 180],
            [120, 50, 200],
            [200, 50, 120],
            [40, 140, 140],
        ];
        const nebulae: Nebula[] = [];
        for (let i = 0; i < 4; i++) {
            nebulae.push({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: isMobile ? 120 + Math.random() * 150 : 250 + Math.random() * 300,
                color: nebulaColors[i],
                alpha: 0.008 + Math.random() * 0.012,
                phase: Math.random() * Math.PI * 2,
            });
        }
        nebulaeRef.current = nebulae;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let dpr = window.devicePixelRatio || 1;
        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            const w = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
            const h = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            init(w, h);
        };
        resize();
        window.addEventListener("resize", resize);
        window.visualViewport?.addEventListener("resize", resize);

        const onPointerMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            mouseRef.current = { x: clientX, y: clientY };
            if (!mouseInitRef.current) {
                smoothMouseRef.current = { x: clientX, y: clientY };
                mouseInitRef.current = true;
            }
        };
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("touchmove", onPointerMove, { passive: true });

        let time = 0;
        const isMobileScreen = window.innerWidth < 640;

        const draw = () => {
            time += 0.003;
            const w = window.innerWidth;
            const h = window.innerHeight;

            const sm = smoothMouseRef.current;
            const tm = mouseRef.current;
            sm.x += (tm.x - sm.x) * 0.08;
            sm.y += (tm.y - sm.y) * 0.08;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);

            const mx = sm.x;
            const my = sm.y;
            const cx = w / 2;
            const cy = h / 2;
            const mxn = mx > 0 ? (mx - cx) / cx : 0;
            const myn = my > 0 ? (my - cy) / cy : 0;

            // Subtle nebula clouds (background only)
            for (const n of nebulaeRef.current) {
                const nx = n.x + Math.sin(time * 0.15 + n.phase) * 30 + mxn * 20;
                const ny = n.y + Math.cos(time * 0.1 + n.phase) * 20 + myn * 20;
                const [r, g, b] = n.color;
                const pulse = 0.8 + 0.2 * Math.sin(time * 0.5 + n.phase);
                const a = n.alpha * pulse;
                const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
                grad.addColorStop(0, `rgba(${r},${g},${b},${a.toFixed(4)})`);
                grad.addColorStop(0.4, `rgba(${r},${g},${b},${(a * 0.4).toFixed(4)})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            const stars = starsRef.current;

            for (const s of stars) {
                s.x += s.vx;
                s.y += s.vy;
                if (s.y < -5) { s.y = h + 5; s.x = Math.random() * w; }
                if (s.x < -5) s.x = w + 5;
                if (s.x > w + 5) s.x = -5;
            }

            // Constellation lines — skip on mobile
            if (!isMobileScreen) {
            ctx.lineWidth = 0.3;
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].z < 0.55) continue;
                const si = stars[i];
                const pxi = si.x + mxn * si.z * 40;
                const pyi = si.y + myn * si.z * 40;
                for (let j = i + 1; j < stars.length; j++) {
                    if (stars[j].z < 0.55) continue;
                    const sj = stars[j];
                    const pxj = sj.x + mxn * sj.z * 40;
                    const pyj = sj.y + myn * sj.z * 40;
                    const dx = pxi - pxj;
                    const dy = pyi - pyj;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 80) {
                        const a = (1 - dist / 80) * 0.08;
                        ctx.strokeStyle = `rgba(200,220,255,${a.toFixed(3)})`;
                        ctx.beginPath();
                        ctx.moveTo(pxi, pyi);
                        ctx.lineTo(pxj, pyj);
                        ctx.stroke();
                    }
                }
            }
            }

            // Draw crisp stars
            for (const s of stars) {
                const px = s.x + mxn * s.z * 40;
                const py = s.y + myn * s.z * 40;

                const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
                const alpha = s.brightness * (0.5 + 0.5 * twinkle);  // higher base alpha
                const r = s.size;
                const [cr, cg, cb] = s.color;

                // Tiny tight glow — not blurry, just a subtle aura for big stars only
                if (s.z > 0.7) {
                    const hr = r * 2.5;
                    const hg = ctx.createRadialGradient(px, py, r * 0.8, px, py, hr);
                    hg.addColorStop(0, `rgba(${cr},${cg},${cb},${(alpha * 0.12).toFixed(4)})`);
                    hg.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
                    ctx.fillStyle = hg;
                    ctx.beginPath();
                    ctx.arc(px, py, hr, 0, Math.PI * 2);
                    ctx.fill();
                }

                // CRISP star core — solid circle, full alpha
                ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, r, 0, Math.PI * 2);
                ctx.fill();

                // Bright white center dot for sharp look
                if (s.z > 0.4) {
                    const centerAlpha = Math.min(1, alpha * 1.2);
                    ctx.fillStyle = `rgba(255,255,255,${centerAlpha.toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(px, py, Math.max(0.3, r * 0.4), 0, Math.PI * 2);
                    ctx.fill();
                }

                // Sharp cross spikes for brightest stars
                if (s.z > 0.85 && twinkle > 0.55) {
                    const len = r * 4 * twinkle;
                    ctx.strokeStyle = `rgba(255,255,255,${(alpha * 0.35).toFixed(4)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(px - len, py); ctx.lineTo(px + len, py);
                    ctx.moveTo(px, py - len); ctx.lineTo(px, py + len);
                    ctx.stroke();
                }

                // Cursor proximity — stars light up bright white near cursor
                if (mouseInitRef.current) {
                    const dx = px - mx;
                    const dy = py - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const proxRadius = isMobileScreen ? 100 : 200;
                    if (dist < proxRadius) {
                        const inf = Math.pow(1 - dist / proxRadius, 1.5);
                        // Brighten the star core
                        const boostAlpha = inf * 0.8;
                        ctx.fillStyle = `rgba(255,255,255,${boostAlpha.toFixed(4)})`;
                        ctx.beginPath();
                        ctx.arc(px, py, r * 1.3, 0, Math.PI * 2);
                        ctx.fill();
                        // Small tight glow
                        const glowSize = r * 3;
                        const gr = ctx.createRadialGradient(px, py, r, px, py, glowSize);
                        gr.addColorStop(0, `rgba(200,220,255,${(inf * 0.3).toFixed(4)})`);
                        gr.addColorStop(1, `rgba(200,220,255,0)`);
                        ctx.fillStyle = gr;
                        ctx.beginPath();
                        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Cursor aura
            if (mouseInitRef.current) {
                const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
                cg.addColorStop(0, "rgba(180,200,255,0.04)");
                cg.addColorStop(0.4, "rgba(150,170,255,0.02)");
                cg.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = cg;
                ctx.beginPath();
                ctx.arc(mx, my, 250, 0, Math.PI * 2);
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.visualViewport?.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onPointerMove);
            window.removeEventListener("touchmove", onPointerMove);
        };
    }, [init]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full"
            style={{ pointerEvents: "none" }}
        />
    );
}

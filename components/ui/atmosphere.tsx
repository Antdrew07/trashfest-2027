"use client";

import { useEffect, useState } from "react";

/**
 * Slow drifting smoke. Two offset layers of the generated smoke SVG, screen
 * blended, so haze rolls across the section without a video file.
 */
export function SmokeOverlay({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ mixBlendMode: "screen", opacity }}
    >
      <div
        className="absolute -inset-[20%] bg-[url('/textures/smoke.svg')] bg-[length:900px_600px] bg-repeat"
        style={{ animation: "smoke-drift 48s ease-in-out infinite" }}
      />
      <div
        className="absolute -inset-[20%] bg-[url('/textures/smoke.svg')] bg-[length:1300px_900px] bg-repeat opacity-60"
        style={{ animation: "smoke-drift 72s ease-in-out infinite reverse" }}
      />
    </div>
  );
}

type Ember = { left: number; delay: number; duration: number; size: number; drift: number };

/**
 * Embers rising from the bottom edge (§4). Generated on the client after mount
 * so the random positions can't cause a hydration mismatch, and skipped
 * outright for visitors who asked for reduced motion.
 */
export function Embers({ count = 26, className = "" }: { count?: number; className?: string }) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEmbers(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 11 + Math.random() * 13,
        size: 2 + Math.random() * 4,
        drift: -60 + Math.random() * 120,
      })),
    );
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: i % 3 === 0 ? "var(--flame)" : "var(--ember)",
            boxShadow: `0 0 ${e.size * 3}px ${e.size}px rgba(255,90,31,0.45)`,
            animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Film grain so large dark fills never read as flat (§1, "no flat backgrounds"). */
export function GrainOverlay({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] bg-repeat"
      aria-hidden="true"
      style={{ opacity }}
    />
  );
}

/** Star-row divider — never a plain rule (§8). */
export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-linear-to-r from-transparent to-gold/60 sm:w-28" />
      <span className="text-gold/80 tracking-[0.5em] text-xs">★ ★ ★</span>
      <span className="h-px w-16 bg-linear-to-l from-transparent to-gold/60 sm:w-28" />
    </div>
  );
}

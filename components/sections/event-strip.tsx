"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/content/event";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingUntil(target: number): Remaining {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

/**
 * Sticky event bar with a live countdown (§6.2).
 *
 * The countdown only starts after mount — rendering a server-computed time
 * would hydrate against a different value and flash the wrong number.
 */
export function EventStrip() {
  const target = new Date(EVENT.startsAtIso).getTime();
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    setLeft(remainingUntil(target));
    const id = window.setInterval(() => setLeft(remainingUntil(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className="sticky top-0 z-40 border-y border-gold/25 bg-char/95 backdrop-blur-md">
      <div className="shell flex flex-col items-center gap-3 py-3 lg:flex-row lg:justify-between lg:gap-6 lg:py-2.5">
        {/* Where and when */}
        <p className="font-[family-name:var(--font-barlow)] flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[0.7rem] font-bold tracking-[0.1em] text-bone uppercase sm:text-xs lg:text-left">
          <span className="text-tx-red">{EVENT.dateLabel}</span>
          <span className="text-gold/50" aria-hidden="true">★</span>
          <span>{EVENT.venue.name}</span>
          <span className="text-gold/50" aria-hidden="true">★</span>
          <span className="text-muted">
            {EVENT.venue.street}, {EVENT.venue.city}, {EVENT.venue.state}
          </span>
        </p>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Countdown */}
          <div className="flex items-center gap-2 sm:gap-3" aria-live="off">
            {(
              [
                ["Days", left?.days],
                ["Hrs", left?.hours],
                ["Min", left?.minutes],
                ["Sec", left?.seconds],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center leading-none">
                <span
                  className="font-[family-name:var(--font-bungee)] text-base tabular-nums text-ember sm:text-xl"
                  style={{ textShadow: "0 0 16px rgba(255,90,31,0.55)" }}
                >
                  {value === undefined || value === null
                    ? "––"
                    : String(value).padStart(2, "0")}
                </span>
                <span className="mt-1 font-[family-name:var(--font-barlow)] text-[0.55rem] font-bold tracking-[0.18em] text-muted uppercase">
                  {label}
                </span>
              </div>
            ))}
            <span className="sr-only">
              {left
                ? `${left.days} days, ${left.hours} hours and ${left.minutes} minutes until Trash Fest 2027.`
                : "Loading countdown."}
            </span>
          </div>

          <a href="#tickets" className="btn btn-primary px-4 py-2.5 text-xs sm:px-6">
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
}

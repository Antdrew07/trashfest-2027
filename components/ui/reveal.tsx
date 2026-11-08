"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children in as they enter the viewport.
 *
 * Two rules it has to obey, or it does more harm than the polish is worth:
 *
 *  - Content must never be stuck invisible. If IntersectionObserver is
 *    missing, or the element is already on screen at mount, it reveals
 *    immediately. The CSS also resets .reveal to its finished state under
 *    prefers-reduced-motion, so the opacity:0 never applies there at all.
 *  - It reveals once and disconnects. Re-animating on every scroll-by is the
 *    thing that makes these feel cheap.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger, in ms. Keep it under ~250 or the page feels sluggish. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // `isIntersecting` alone is not enough. Observations are delivered on
        // a frame cadence, so a fast scroll — a flung phone, an anchor jump
        // from the nav — can carry an element from below the fold to above it
        // between two deliveries, and it would stay invisible for good. If it
        // is now above the viewport, the user has already passed it: show it.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

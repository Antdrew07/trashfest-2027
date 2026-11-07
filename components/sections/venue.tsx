"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EVENT } from "@/content/event";

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${EVENT.venue.name}, ${EVENT.venue.street}, ${EVENT.venue.city}, ${EVENT.venue.state}`,
)}`;

/**
 * Venue & Getting There (§6.8).
 *
 * A slow aerial plays behind the card. Two rules govern it:
 *
 *  - The still underneath is not a placeholder. It carries the section on
 *    first paint, under prefers-reduced-motion, and anywhere the video is
 *    blocked, so the video is only revealed once it is genuinely playing.
 *  - The clip is ~1.8 MB and this section sits well below the fold, so
 *    nothing is fetched until it is close to the viewport. Autoplaying a
 *    background video at page load would spend a mobile visitor's data on
 *    something they may never scroll to.
 */
export function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    // No IntersectionObserver (or no JS at all) still gets the still image.
    if (typeof IntersectionObserver === "undefined") {
      setArmed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  // Autoplay can be refused (low-power mode, data saver); the still stays up.
  useEffect(() => {
    if (!armed) return;
    videoRef.current?.play().catch(() => setPlaying(false));
  }, [armed]);

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="relative isolate flex min-h-[32rem] items-center overflow-hidden bg-char lg:min-h-[40rem]"
    >
      {/* Aerial plate */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/photo/aerial-poster.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
        {armed && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="/photo/aerial-poster.webp"
            onPlaying={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%] transition-opacity duration-1000"
            style={{ opacity: playing ? 1 : 0 }}
          >
            <source src="/video/aerial.mp4" type="video/mp4" />
          </video>
        )}

        {/* Readability scrim, weighted left where the card sits */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,9,8,0.78) 0%, rgba(11,9,8,0.52) 44%, rgba(11,9,8,0.14) 78%, rgba(11,9,8,0.4) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0B0908 0%, rgba(11,9,8,0.1) 18%, rgba(11,9,8,0.1) 76%, #0B0908 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] opacity-[0.05]" />
      </div>

      {/* Card */}
      <div className="shell section-y relative z-10 w-full">
        <article className="panel-charred rivets max-w-xl rounded-[4px] border border-gold/30 p-7 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-[3px] sm:p-10">
          <p className="eyebrow flex items-center gap-2">
            <span className="text-tx-red" aria-hidden="true">★</span>
            Right here in the {EVENT.cityTagline}
          </p>

          <h2 className="headline mt-5 text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.92]">
            <span className="block text-bone">Small town.</span>
            <span className="block text-gold-hi">Big Saturday.</span>
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            All roads lead to {EVENT.city}. Join us at {EVENT.venue.name} for
            championship barbecue and a night of live Texas music under the open
            sky.
          </p>

          <div className="mt-8 border-t border-gold/15 pt-6">
            <p className="flex items-start gap-2.5 font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.1em] text-bone uppercase">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 fill-tx-red" />
              <span>
                {EVENT.venue.name}
                <span className="mt-1 block font-semibold tracking-[0.06em] text-muted normal-case">
                  {EVENT.venue.street}, {EVENT.venue.city}, {EVENT.venue.state}
                </span>
              </span>
            </p>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7"
            >
              Get Directions
              <span aria-hidden="true">↗</span>
            </a>

            {/* Genuinely not confirmed yet (§7 "Still pending") */}
            <p className="mt-6 text-sm text-muted/70">
              Parking, RV and cook-site arrival details coming soon.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

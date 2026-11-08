"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Embers, GrainOverlay, SmokeOverlay } from "@/components/ui/atmosphere";
import { LogoLockup } from "@/components/ui/logo-lockup";
import { StageBackdrop } from "@/components/ui/stage-backdrop";
import { MUSIC } from "@/content/event";

const AUDIO_CHOICE_KEY = "tf27:audio-on";

function embedUrl(id: string, { muted, start }: { muted: boolean; start?: number }) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    cc_load_policy: "0",
    enablejsapi: "1",
  });
  if (start) params.set("start", String(start));
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

/**
 * Headliner hero (DESIGN.md §5).
 *
 * The background clip is a placeholder: the band is sending original files, and
 * §5.7 is explicit that we embed rather than rip from YouTube. Everything is
 * layered over StageBackdrop, which carries the section on its own when the
 * embed is slow, blocked, or suppressed for reduced motion.
 */
export function Hero() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const { video, name, credit } = MUSIC.headliner;

  /**
   * Reveal the clip only once the player confirms it is running. YouTube
   * answers a "listening" handshake with state events; no answer means the
   * embed is blocked, region-locked or removed, and we keep the CSS stage
   * backdrop instead of exposing YouTube's error card.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const onMessage = (e: MessageEvent) => {
      if (!e.origin.includes("youtube")) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

        // A player whose video is unavailable still fires onReady, so readiness
        // is judged strictly on PLAYING (state 1) — never on onReady alone.
        if (data?.event === "onError") {
          setVideoReady(false);
          return;
        }
        if (data?.info?.playerState === 1) setVideoReady(true);
      } catch {
        /* unrelated message */
      }
    };
    window.addEventListener("message", onMessage);
    const handshake = window.setInterval(() => {
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: "tf27-hero" }),
        "*",
      );
    }, 600);
    const giveUp = window.setTimeout(() => window.clearInterval(handshake), 8000);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(handshake);
      window.clearTimeout(giveUp);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Remember the sound choice for the session (§5.6).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUDIO_CHOICE_KEY) === "1") setAudioOn(true);
    } catch {
      /* private mode — fall back to muted */
    }
  }, []);

  /** Drive the embed over postMessage rather than loading the whole iframe API. */
  const command = useCallback((func: string) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioOn((on) => {
      const next = !on;
      command(next ? "unMute" : "mute");
      try {
        sessionStorage.setItem(AUDIO_CHOICE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [command]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      command(p ? "pauseVideo" : "playVideo");
      return !p;
    });
  }, [command]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-char">
      <StageBackdrop />

      {/* Full-bleed crowd plate — the actual hero image (§4 calls for this
          imagery; the CSS scene below it covers first paint and failure). */}
      <Image
        src="/photo/hero-crowd.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_42%]"
      />

      {/* Headliner clip. Scaled to cover without letterboxing. */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 overflow-hidden transition-opacity duration-1000"
          style={{ opacity: videoReady ? 0.55 : 0 }}
          aria-hidden="true"
        >
          <iframe
            ref={frameRef}
            title={`${name} — ${video.primaryTitle} (background clip, muted)`}
            src={embedUrl(video.primaryId, { muted: true, start: video.primaryStartSeconds })}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{ width: "max(100vw, 177.78svh)", height: "max(100svh, 56.25vw)" }}
          />
        </div>
      )}

      {/* Overlay stack, bottom → top (§5.3) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,8,0.82) 0%, rgba(11,9,8,0.45) 38%, rgba(11,9,8,0.88) 78%, #0B0908 100%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "var(--grad-fire)" }} />
      <SmokeOverlay opacity={0.22} />
      {!reducedMotion && <Embers count={30} />}
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-1 flex-col">
        <div className="shell flex flex-1 flex-col items-center justify-center pt-28 pb-6 sm:pt-24">
          <LogoLockup />

          <a href="/tickets" className="btn btn-primary mt-7 sm:mt-9">
            Get Tickets
          </a>

          {/*
            Video controls sit here, under the CTA, rather than pinned to the
            bottom corners. Parked down there on a phone they were below the
            fold, so nobody could tell a clip was playing at all, let alone
            that it had sound.

            Sound is deliberately NOT gated on videoReady. That flag depends
            on YouTube answering a postMessage handshake, and if it does not
            answer the control would never appear — a worse failure than a
            button that turns on sound for a clip which is already silent.
            Play/pause is gated, because it has nothing to drive without a
            player that has reported in.
          */}
          {!reducedMotion && (
            <div className="animate-fade-in mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAudio}
                aria-pressed={audioOn}
                className={`flex items-center gap-2 rounded-full border border-ember/60 bg-char/70 px-4 py-3 font-[family-name:var(--font-barlow)] text-[0.7rem] font-bold tracking-[0.12em] text-bone uppercase backdrop-blur transition hover:border-ember ${
                  audioOn ? "" : "animate-pulse-glow"
                }`}
              >
                <span aria-hidden="true">{audioOn ? "🔊" : "🔈"}</span>
                {audioOn ? "Sound On" : "Turn It Up"}
              </button>

              {videoReady && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause background video" : "Play background video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 bg-char/70 text-bone backdrop-blur transition hover:border-bone/70"
                >
                  <span aria-hidden="true" className="text-xs">
                    {playing ? "❚❚" : "▶"}
                  </span>
                </button>
              )}
            </div>
          )}

          <p className="eyebrow mt-5 max-w-[22rem] text-center leading-relaxed text-muted/80 sm:max-w-none">
            {credit} · {name}
          </p>
        </div>

        {/* Three distressed ticket CTAs at the fold (§5.7b) */}
        <div className="shell pb-10 sm:pb-14">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <CtaCard href="/tickets" label="Get Tickets" sub="GA $55 · VIP $175" accent="var(--tx-red)" />
            <CtaCard href="/cookoff" label="Enter the Cookoff" sub="$275 per team" accent="var(--gold)" />
            <CtaCard href="/sponsors" label="Become a Sponsor" sub="$1,000 – $15,000" accent="var(--tx-navy)" />
          </div>
        </div>
      </div>

    </section>
  );
}

function CtaCard({
  href,
  label,
  sub,
  accent,
}: {
  href: string;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      className="panel-charred rivets group relative flex items-center justify-between gap-3 rounded-[4px] border px-5 py-4 transition duration-200 hover:-translate-y-0.5"
      style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }}
    >
      {/* Ticket notches */}
      <span className="absolute top-1/2 -left-[7px] h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-char" />
      <span className="absolute top-1/2 -right-[7px] h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-char" />
      <span>
        <span className="font-[family-name:var(--font-barlow)] block text-base font-extrabold tracking-[0.1em] text-bone uppercase">
          {label}
        </span>
        <span className="mt-0.5 block text-xs text-muted">{sub}</span>
      </span>
      <span
        className="text-lg transition-transform duration-200 group-hover:translate-x-1"
        style={{ color: accent }}
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}

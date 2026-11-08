"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-play poster for a YouTube video.
 *
 * Replaces an always-mounted <iframe>. Three reasons that matters here:
 *
 *  - A live embed pulls YouTube's player — hundreds of KB of script, several
 *    requests and third-party cookies — on every page load, for a video most
 *    visitors never press play on.
 *  - The embed draws YouTube's own chrome over the art. The band's title
 *    lettering is part of this thumbnail, and the player's overlay sat on
 *    top of it.
 *  - The poster is the band's own artwork, served from YouTube's CDN rather
 *    than copied into this repo.
 *
 * It is an anchor, not a button: with JavaScript off, or before hydration, a
 * click still reaches the video on YouTube. Once hydrated the click is
 * intercepted and the player is mounted in place.
 */
export function VideoPoster({
  videoId,
  title,
  badge,
  label = "Watch the Performance",
  startSeconds,
}: {
  videoId: string;
  title: string;
  /** Small flag across the top-left corner. */
  badge?: string;
  label?: string;
  startSeconds?: number;
}) {
  const [playing, setPlaying] = useState(false);

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}${
    startSeconds ? `&t=${startSeconds}` : ""
  }`;

  if (playing) {
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    if (startSeconds) params.set("start", String(startSeconds));
    return (
      <div className="aspect-video w-full overflow-hidden rounded-[2px] bg-black">
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        // Leave modified clicks alone so "open in new tab" still works.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        setPlaying(true);
      }}
      aria-label={`${label} — ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-[2px] bg-black"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 1024px) 94vw, 46vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Legibility for the badge and the play row, without flattening the art */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,8,0.45) 0%, transparent 28%, transparent 52%, rgba(11,9,8,0.85) 100%)",
        }}
      />

      {badge && (
        <span className="absolute top-0 left-0 bg-tx-red px-4 py-2.5 font-[family-name:var(--font-barlow)] text-[0.7rem] font-extrabold tracking-[0.18em] text-bone uppercase sm:px-5 sm:text-xs">
          {badge}
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-bone/80 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-bone group-hover:bg-tx-red/80 sm:h-14 sm:w-14">
          <PlayIcon className="ml-0.5 h-5 w-5 fill-bone sm:h-6 sm:w-6" />
        </span>
        <span className="font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.1em] text-bone uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-base">
          {label}
        </span>
      </span>
    </a>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M8 5.14v13.72a.5.5 0 0 0 .76.43l11.1-6.86a.5.5 0 0 0 0-.86L8.76 4.71A.5.5 0 0 0 8 5.14z" />
    </svg>
  );
}

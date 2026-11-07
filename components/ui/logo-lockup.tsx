import Image from "next/image";
import { EVENT } from "@/content/event";

/**
 * The brand lockup.
 *
 * These are the flyer's own marks, cut from the key art per DESIGN.md §4
 * ("cut from the flyer or regenerated") rather than redrawn — the wordmark's
 * distressed filigree and the crowns' gold and ruby work are the brand, and
 * no webfont-and-SVG approximation comes close.
 *
 * Each cut is feathered to transparency at its edges so the flames behind it
 * melt into the hero's own fire glow instead of ending in a hard rectangle.
 */
export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      {/* TRASH ✚ FEST — the real wordmark */}
      <h1 className={compact ? "w-[260px]" : "w-full max-w-[min(94vw,980px)]"}>
        <Image
          src="/brand/logo-wordmark.webp"
          alt={`${EVENT.name} — ${EVENT.city}, ${EVENT.state}`}
          width={992}
          height={232}
          priority
          sizes="(max-width: 768px) 94vw, 980px"
          className="h-auto w-full drop-shadow-[0_14px_40px_rgba(0,0,0,0.85)]"
        />
      </h1>

      {!compact && (
        <>
          {/* Crowns straddling KING or QUEEN */}
          <div className="mt-2 flex w-full max-w-[min(94vw,820px)] items-center justify-center gap-0 sm:-mt-1">
            <Image
              src="/brand/crown-king.webp"
              alt=""
              aria-hidden="true"
              width={258}
              height={178}
              priority
              className="animate-crown-sway w-[26%] max-w-[230px] shrink-0"
            />

            <div className="shrink px-1">
              <p className="font-display text-[clamp(1.3rem,5.2vw,3.3rem)] leading-[1.02] whitespace-nowrap">
                <span className="text-gold-grad">KING</span>
                <span className="mx-1.5 text-[0.58em] text-bone/70 italic">or</span>
                <span className="text-ruby-grad">QUEEN</span>
              </p>
              <p className="font-display mt-0.5 text-[clamp(0.78rem,2.7vw,1.7rem)] whitespace-nowrap text-bone/90">
                of {EVENT.city}, {EVENT.stateAbbr}
              </p>
            </div>

            <Image
              src="/brand/crown-queen.webp"
              alt=""
              aria-hidden="true"
              width={280}
              height={188}
              priority
              className="animate-crown-sway w-[28%] max-w-[250px] shrink-0"
              style={{ animationDelay: "-2.5s" }}
            />
          </div>

          {/* Date ★ venue */}
          <p className="eyebrow mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-bone/90 sm:text-base">
            <span className="text-tx-red">{EVENT.dateLabel.toUpperCase()}</span>
            <span className="text-gold/60" aria-hidden="true">★</span>
            <span>{EVENT.venue.name.toUpperCase()}</span>
          </p>

          <p className="eyebrow mt-3 max-w-sm text-balance text-gold/90 sm:max-w-none">
            State Championship BBQ Cookoff · {EVENT.sanctioningBody} Sanctioned
          </p>
        </>
      )}
    </div>
  );
}

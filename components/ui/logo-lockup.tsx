import { CrownKing, CrownQueen, TexasFlagShape } from "@/components/ui/brand";
import { EVENT } from "@/content/event";

/**
 * The brand lockup.
 *
 * DESIGN.md §5.4 puts the Texas-flag state shape *behind* "TRASH FEST" rather
 * than between the words — which also avoids the words wrapping around an
 * inline glyph on narrow screens.
 */
export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* TRASH FEST over the Texas watermark */}
      <div className="relative">
        {!compact && (
          <TexasFlagShape
            id="lockup-tx"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[150%] w-auto -translate-x-1/2 -translate-y-[52%] opacity-[0.17] mix-blend-screen"
          />
        )}
        <h1
          className={`font-display distressed relative leading-[0.82] ${
            compact ? "text-4xl sm:text-5xl" : "text-[clamp(3.6rem,15vw,10rem)]"
          }`}
        >
          <span
            className="block text-bone"
            style={{ textShadow: "0 0 2px #bf0a30, 0 3px 0 #000, 0 12px 38px rgba(0,0,0,.8)" }}
          >
            TRASH
          </span>
          <span
            className="block text-tx-red"
            style={{ textShadow: "0 0 2px #f2e6d0, 0 3px 0 #000, 0 12px 38px rgba(0,0,0,.8)" }}
          >
            FEST
          </span>
        </h1>
      </div>

      {/* LOCKHART, TEXAS ★ MARCH 6, 2027 */}
      <p
        className={`eyebrow mt-4 flex flex-wrap items-center justify-center gap-x-3 text-bone/90 ${
          compact ? "text-[0.7rem]" : "text-[0.78rem] sm:text-base"
        }`}
      >
        <span>
          {EVENT.city}, {EVENT.state}
        </span>
        <span className="text-tx-red">★</span>
        <span>{EVENT.dateLabel.toUpperCase()}</span>
      </p>

      {!compact && (
        <>
          {/* Crowns straddling KING or QUEEN */}
          <div className="mt-6 flex items-end justify-center gap-1.5 sm:mt-8 sm:gap-4">
            <CrownKing
              id="hero-king"
              className="animate-crown-sway h-[clamp(3.4rem,10vw,6.5rem)] w-auto shrink-0 drop-shadow-[0_6px_20px_rgba(212,162,76,0.5)]"
            />
            <div className="pb-1">
              <p className="font-display text-[clamp(1.45rem,5vw,3.4rem)] leading-[1.05]">
                <span className="text-gold-grad">KING</span>
                <span className="mx-1.5 text-[0.6em] text-bone/70 italic sm:mx-2">or</span>
                <span className="text-ruby-grad">QUEEN</span>
              </p>
              <p className="font-display mt-1 text-[clamp(0.8rem,2.6vw,1.7rem)] text-bone/90">
                of {EVENT.city}, {EVENT.stateAbbr}
              </p>
            </div>
            <CrownQueen
              id="hero-queen"
              className="animate-crown-sway h-[clamp(3.4rem,10vw,6.5rem)] w-auto shrink-0 drop-shadow-[0_6px_20px_rgba(191,10,48,0.55)]"
              style={{ animationDelay: "-2.5s" }}
            />
          </div>

          <p className="eyebrow mt-5 max-w-sm text-balance text-gold/90 sm:max-w-none">
            State Championship BBQ Cookoff · {EVENT.sanctioningBody} Sanctioned
          </p>
        </>
      )}
    </div>
  );
}

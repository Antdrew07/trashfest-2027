import { GrainOverlay, StarDivider } from "@/components/ui/atmosphere";
import { PhotoTile, Stat } from "@/components/ui/editorial";
import { Reveal } from "@/components/ui/reveal";
import { COOKOFF, EVENT, TICKETS } from "@/content/event";

const TILES = [
  { src: "/photo/stage-moody.webp", title: "Live Music", sub: "Headliners through the night" },
  { src: "/photo/brisket.webp", title: "Great BBQ", sub: "Championship brisket, ribs & chicken" },
  { src: "/photo/drinks.webp", title: "Cold Drinks", sub: "BYOB · VIP bar included" },
  { src: "/photo/goodtimes.webp", title: "Good Times", sub: "All day, in the BBQ Capital of Texas" },
] as const;

/**
 * The Experience (§6.5) plus the headline numbers.
 *
 * The stat row follows Memphis in May, which leads with its big figures at
 * display size ("Over $200,000 In Prize Money!") rather than burying them in
 * a table — the numbers are the pitch.
 */
export function Experience() {
  return (
    <section id="experience" className="relative isolate overflow-hidden bg-char">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(180deg, #0b0908 0%, #170f0c 50%, #0b0908 100%)" }}
      />
      <GrainOverlay />

      <div className="shell section-y relative z-10">
        {/* Headline numbers */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          <Reveal delay={0}>
            <Stat
              value={`${COOKOFF.payoutPercent}%`}
              label="Payout"
              sub={`Est. $${COOKOFF.estimatedPotUsd.low.toLocaleString()}–$${COOKOFF.estimatedPotUsd.high.toLocaleString()} pot`}
              accent="var(--gold)"
              foil={{ lo: "#6b5422", base: "#d4a24c", hi: "#f7d88a" }}
            />
          </Reveal>
          <Reveal delay={90}>
            <Stat
              value={String(COOKOFF.teamCap)}
              label="Team Cap"
              sub={`$${COOKOFF.entryFeeUsd} per team`}
              accent="var(--ember)"
              foil={{ lo: "#6b2409", base: "#ff5a1f", hi: "#ffb23f" }}
            />
          </Reveal>
          <Reveal delay={180}>
            <Stat
              value={String(COOKOFF.categories.length)}
              label="IBCA Categories"
              sub={COOKOFF.categories.map((c) => c.name).join(" · ")}
              accent="var(--tx-red)"
              foil={{ lo: "#5e0a1a", base: "#d8324f", hi: "#ff9fae" }}
            />
          </Reveal>
          <Reveal delay={270}>
            <Stat
              value={`$${TICKETS.tiers[0].priceUsd}`}
              label="Gate Price"
              sub={`VIP from $${TICKETS.tiers[1].priceUsd} ${TICKETS.feesNote}`}
              accent="var(--flame)"
              foil={{ lo: "#6b4a12", base: "#ffb23f", hi: "#ffe3ad" }}
            />
          </Reveal>
        </div>

        <StarDivider className="my-16" />

        {/* The four pillars, as photography */}
        <Reveal className="text-center">
          <p className="eyebrow">One day, one field, one crown</p>
          <h2 className="headline mt-3 text-h2 text-bone">The Experience</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            {EVENT.pillars.join(" · ")} — from the first turn-in to the last
            encore at {EVENT.venue.name}.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 80} className="h-full">
              <PhotoTile src={t.src} title={t.title} sub={t.sub} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

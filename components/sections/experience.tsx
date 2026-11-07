import { GrainOverlay, StarDivider } from "@/components/ui/atmosphere";
import { PhotoTile, Stat } from "@/components/ui/editorial";
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
          <Stat
            value={`${COOKOFF.payoutPercent}%`}
            label="Payout"
            sub={`Est. $${COOKOFF.estimatedPotUsd.low.toLocaleString()}–$${COOKOFF.estimatedPotUsd.high.toLocaleString()} pot`}
            accent="var(--gold)"
          />
          <Stat
            value={String(COOKOFF.teamCap)}
            label="Team Cap"
            sub={`$${COOKOFF.entryFeeUsd} per team`}
            accent="var(--ember)"
          />
          <Stat
            value={String(COOKOFF.categories.length)}
            label="IBCA Categories"
            sub={COOKOFF.categories.map((c) => c.name).join(" · ")}
            accent="var(--tx-red)"
          />
          <Stat
            value={`$${TICKETS.tiers[0].priceUsd}`}
            label="Gate Price"
            sub={`VIP from $${TICKETS.tiers[1].priceUsd} ${TICKETS.feesNote}`}
            accent="var(--flame)"
          />
        </div>

        <StarDivider className="my-16" />

        {/* The four pillars, as photography */}
        <div className="text-center">
          <p className="eyebrow">One day, one field, one crown</p>
          <h2 className="headline mt-3 text-h2 text-bone">The Experience</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            {EVENT.pillars.join(" · ")} — from the first turn-in to the last
            encore at {EVENT.venue.name}.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TILES.map((t) => (
            <PhotoTile key={t.title} src={t.src} title={t.title} sub={t.sub} />
          ))}
        </div>
      </div>
    </section>
  );
}

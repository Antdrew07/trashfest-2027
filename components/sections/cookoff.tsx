import { StarIcon } from "@/components/ui/brand";
import { GrainOverlay, SmokeOverlay } from "@/components/ui/atmosphere";
import { PhotoStatCard } from "@/components/ui/editorial";
import { Reveal } from "@/components/ui/reveal";
import { COOKOFF, EVENT } from "@/content/event";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Category photography, replacing the flat 88px silhouettes. */
const CATEGORY_ART: Record<string, string> = {
  brisket: "/photo/card-brisket.webp",
  "pork-ribs": "/photo/card-ribs.webp",
  chicken: "/photo/card-chicken.webp",
};

/**
 * The cookoff, as it appears on the home page (§6.4).
 *
 * This is deliberately a teaser, not the whole thing. It used to carry the
 * full nine-row run of show, the head judge and the entry terms — all of
 * which /cookoff also carries in full. A reference schedule is documentation,
 * not a hook: nobody scrolling the home page is planning their Friday around
 * it, and duplicating it left the dedicated page with no reason to exist.
 *
 * What stays here is what sells the thing: the money, the three meats, and
 * one way through to the detail.
 */
export function Cookoff() {
  return (
    <section id="cookoff" className="relative isolate overflow-hidden bg-smoke">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(100% 60% at 50% 0%, rgba(255,90,31,0.14), transparent 60%)," +
            "linear-gradient(180deg, #1a1512 0%, #0b0908 100%)",
        }}
      />
      <SmokeOverlay opacity={0.1} />
      <GrainOverlay />

      <div className="shell section-y relative z-10">
        {/* Heading */}
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-char/60 px-4 py-1.5 backdrop-blur-sm">
              <StarIcon className="h-3 w-3 fill-gold" />
              <span className="font-[family-name:var(--font-barlow)] text-[0.7rem] font-extrabold tracking-[0.18em] text-gold uppercase">
                {EVENT.sanctioningNote}
              </span>
            </span>

            <h2
              className="font-display mt-6 text-[clamp(1.9rem,5.5vw,4rem)] leading-[1] text-bone"
              style={{ filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.9))" }}
            >
              <span className="text-gold-grad">King</span>
              <span className="mx-2 text-[0.6em] text-bone/70 italic">or</span>
              <span className="text-ruby-grad">Queen</span>
              <span className="mt-2 block text-[0.62em] text-bone">
                of {EVENT.city}, {EVENT.stateAbbr}
              </span>
            </h2>
            <p className="eyebrow mt-4 text-bone/80">State Championship BBQ Cookoff</p>
            <p className="script mt-6 text-2xl text-ember sm:text-3xl">{EVENT.tagline}</p>
          </div>
        </Reveal>

        {/* The money, as three headline figures */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              eyebrow: "Entry Fee",
              value: usd(COOKOFF.entryFeeUsd),
              label: "Per Team",
              sub: COOKOFF.entryFeeNote,
              edge: "#bf0a30",
              foil: { lo: "#5e0a1a", base: "#d8324f", hi: "#ff9fae" },
            },
            {
              eyebrow: "Payout",
              value: `${COOKOFF.payoutPercent}%`,
              label: "Of Entries",
              sub: `Est. ${usd(COOKOFF.estimatedPotUsd.low)}–${usd(COOKOFF.estimatedPotUsd.high)} pot, paying ${COOKOFF.paidPlaces.length} places`,
              edge: "var(--gold)",
              foil: { lo: "#6b5422", base: "#d4a24c", hi: "#f7d88a" },
            },
            {
              eyebrow: "Team Cap",
              value: String(COOKOFF.teamCap),
              label: "Spots Total",
              sub: "First paid, first in — once they're gone, they're gone",
              edge: "var(--ember)",
              foil: { lo: "#6b2409", base: "#ff5a1f", hi: "#ffb23f" },
            },
          ].map((f, i) => (
            <Reveal key={f.eyebrow} delay={i * 90} className="h-full">
              <div
                className="lux-card flex h-full flex-col items-center px-6 py-10 text-center"
                style={
                  {
                    "--edge": f.edge,
                    "--foil-lo": f.foil.lo,
                    "--foil-base": f.foil.base,
                    "--foil-hi": f.foil.hi,
                  } as React.CSSProperties
                }
              >
                <p className="eyebrow text-bone/70">{f.eyebrow}</p>
                <p className="font-[family-name:var(--font-bungee)] foil mt-4 text-[clamp(2.8rem,7vw,4.5rem)] leading-none">
                  {f.value}
                </p>
                <p className="eyebrow mt-3 text-bone">{f.label}</p>
                <p className="mt-2 text-sm text-muted">{f.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Judged categories — the hook, kept. Jackpots, paid places, the run
            of show and the rules all live on /cookoff. */}
        <div className="mt-20">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <p className="eyebrow text-gold">Judged Categories</p>
              <h3 className="headline mt-2 text-h3 text-bone">Three meats. One crown.</h3>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COOKOFF.categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 90} className="h-full">
                <PhotoStatCard
                  src={CATEGORY_ART[c.id]}
                  label={c.name}
                  value={c.turnIn}
                  sub="Turn-in time"
                  accent="var(--tx-red)"
                />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-center text-sm text-muted">
              Plus two Full Dress jackpots at {usd(COOKOFF.jackpots[0].feeUsd)} each
              and a Cook Site Showmanship award.
            </p>
          </Reveal>
        </div>

        {/* Entry CTA */}
        <Reveal>
          <div
            className="lux-card mt-16 p-8 text-center sm:p-12"
            style={{ "--edge": "var(--gold)" } as React.CSSProperties}
          >
            <h3 className="font-display text-[clamp(1.4rem,3.6vw,2.4rem)] text-bone">
              Think you&apos;ve got the best barbecue in Texas?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              {usd(COOKOFF.entryFeeUsd)} per team, paid in full upfront. Capped at{" "}
              {COOKOFF.teamCap} teams — once they&apos;re gone, they&apos;re gone.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/register" className="btn btn-primary">
                <StarIcon className="h-3.5 w-3.5 fill-current" /> Enter Your Team
              </a>
              <a href="/cookoff" className="btn btn-secondary">
                Rules, Schedule &amp; Payouts
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

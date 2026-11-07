import { StarIcon } from "@/components/ui/brand";
import { GrainOverlay, SmokeOverlay, StarDivider } from "@/components/ui/atmosphere";
import { PhotoStatCard } from "@/components/ui/editorial";
import { COOKOFF, EVENT } from "@/content/event";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Category photography, replacing the flat 88px silhouettes. */
const CATEGORY_ART: Record<string, string> = {
  brisket: "/photo/card-brisket.webp",
  "pork-ribs": "/photo/card-ribs.webp",
  chicken: "/photo/card-chicken.webp",
};

const JACKPOT_ART: Record<string, string> = {
  "bloody-mary": "/photo/card-bloodymary.webp",
  dessert: "/photo/card-dessert.webp",
};

/**
 * The cookoff (§6.4).
 *
 * Restructured so the numbers and the photography stop competing: two
 * headline figures carry the money, then the three judged categories and the
 * three jackpot/award classes are photographic cards. The earlier version
 * floated small thumbnails on wood panels, which can only ever read as small
 * thumbnails on wood panels.
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
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-char/60 px-4 py-1.5">
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

        {/* The money, as two headline figures */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <div className="panel-wood rivets flex flex-col items-center rounded-[4px] border border-tx-red/40 px-6 py-10 text-center">
            <p className="eyebrow text-bone/70">Entry Fee</p>
            <p className="font-[family-name:var(--font-bungee)] mt-4 text-[clamp(3.2rem,9vw,5.5rem)] leading-none text-tx-red">
              {usd(COOKOFF.entryFeeUsd)}
            </p>
            <p className="eyebrow mt-3 text-bone">Per Team</p>
            <p className="mt-2 text-sm text-muted">{COOKOFF.entryFeeNote}</p>
          </div>

          <div className="panel-wood rivets flex flex-col items-center rounded-[4px] border border-gold/40 px-6 py-10 text-center">
            <p className="eyebrow text-bone/70">Payout</p>
            <p className="font-[family-name:var(--font-bungee)] mt-4 text-[clamp(3.2rem,9vw,5.5rem)] leading-none text-gold-hi">
              {COOKOFF.payoutPercent}%
            </p>
            <p className="eyebrow mt-3 text-bone">Of Entries</p>
            <p className="mt-2 text-sm text-muted">
              Est. {usd(COOKOFF.estimatedPotUsd.low)}–{usd(COOKOFF.estimatedPotUsd.high)} pot,
              paying {COOKOFF.paidPlaces.length} places
            </p>
          </div>
        </div>

        {/* Judged categories */}
        <div className="mt-20">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow text-gold">Judged Categories</p>
            <h3 className="headline mt-2 text-h3 text-bone">Three meats. One crown.</h3>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COOKOFF.categories.map((c) => (
              <PhotoStatCard
                key={c.id}
                src={CATEGORY_ART[c.id]}
                label={c.name}
                value={c.turnIn}
                sub="Turn-in time"
                accent="var(--tx-red)"
              />
            ))}
          </div>
        </div>

        {/* Jackpots and the showmanship award */}
        <div className="mt-20">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow text-gold">Jackpots &amp; Awards</p>
            <h3 className="headline mt-2 text-h3 text-bone">Separate pots, separate glory.</h3>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COOKOFF.jackpots.map((j) => (
              <PhotoStatCard
                key={j.id}
                src={JACKPOT_ART[j.id]}
                label={j.name}
                value={usd(j.feeUsd)}
                sub={`Separate jackpot · ${j.judgedOn}`}
                accent="var(--ember)"
              />
            ))}
            <PhotoStatCard
              src="/photo/card-showmanship.webp"
              label={COOKOFF.showmanship.name}
              sub={`${COOKOFF.showmanship.note} — judged on how your cook site shows up and shows off.`}
              accent="var(--gold)"
            />
          </div>
        </div>

        <StarDivider className="my-20" />

        {/* Turn-in timeline */}
        <div>
          <h3 className="headline text-center text-h3 text-bone">Cookoff Schedule</h3>
          <p className="mt-2 text-center text-sm text-muted">
            Head judge: {COOKOFF.headJudge.firstName}
            {COOKOFF.headJudge.lastName ? ` ${COOKOFF.headJudge.lastName}` : ""}
          </p>

          <ol className="mx-auto mt-10 max-w-3xl">
            {COOKOFF.schedule.map((s, i) => {
              const newDay = i === 0 || COOKOFF.schedule[i - 1].day !== s.day;
              return (
                <li key={`${s.day}-${s.title}`}>
                  {newDay && (
                    <p className="eyebrow mt-8 mb-4 text-gold first:mt-0">{s.day}</p>
                  )}
                  <div className="relative grid grid-cols-[auto_1fr] gap-x-5 border-l border-gold/25 pb-6 pl-6">
                    <span
                      className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rotate-45 bg-ember"
                      aria-hidden="true"
                    />
                    <span className="col-span-2 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.12em] text-ember uppercase sm:col-span-1 sm:w-40">
                      {s.time}
                    </span>
                    <span className="col-span-2 sm:col-span-1">
                      <span className="block font-[family-name:var(--font-barlow)] text-base font-bold tracking-wide text-bone uppercase">
                        {s.title}
                      </span>
                      {s.detail && (
                        <span className="mt-1 block text-sm text-muted">{s.detail}</span>
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Entry CTA */}
        <div className="panel-wood rivets mt-16 rounded-[4px] border border-gold/30 p-8 text-center sm:p-12">
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
              Full Rules &amp; Payouts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

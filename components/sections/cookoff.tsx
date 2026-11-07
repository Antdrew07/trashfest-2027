import Image from "next/image";
import { StarIcon } from "@/components/ui/brand";
import { GrainOverlay, SmokeOverlay, StarDivider } from "@/components/ui/atmosphere";
import { COOKOFF, EVENT } from "@/content/event";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const JACKPOT_ART = {
  "bloody-mary": { src: "/brand/photo-bloodymary.webp", w: 126, h: 126 },
  dessert: { src: "/brand/photo-dessert.webp", w: 142, h: 112 },
} as const;

/**
 * The flyer marks the categories with livestock silhouettes - cow, pig,
 * chicken - not cuts of meat. These are keyed straight out of the key art
 * (flat red on wood separates cleanly on R-minus-G).
 */
const CATEGORY_ART = {
  brisket: { src: "/brand/sil-cow.webp", w: 88, h: 46 },
  "pork-ribs": { src: "/brand/sil-pig.webp", w: 88, h: 44 },
  chicken: { src: "/brand/sil-chicken.webp", w: 53, h: 50 },
} as const;

/**
 * The cookoff (§6.4). The wood-plank info grid mirrors the flyer's six boxes,
 * followed by the two-day turn-in timeline.
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
      <SmokeOverlay opacity={0.12} />
      <GrainOverlay />

      <div className="shell section-y relative z-10">
        {/* Heading + IBCA badge */}
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

        <StarDivider className="my-12" />

        {/* Flyer's six info boxes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PlankCard label="Entry Fee" accent="var(--tx-red)">
            <p className="font-[family-name:var(--font-bungee)] text-5xl text-tx-red">
              {usd(COOKOFF.entryFeeUsd)}
            </p>
            <p className="eyebrow mt-2 text-bone/80">Per Team</p>
            <p className="mt-2 text-sm text-muted">{COOKOFF.entryFeeNote}</p>
          </PlankCard>

          <PlankCard label="Payout" accent="var(--gold)">
            <p className="font-[family-name:var(--font-bungee)] text-5xl text-gold-hi">
              {COOKOFF.payoutPercent}%
            </p>
            <p className="eyebrow mt-2 text-bone/80">Of Entries</p>
            <p className="mt-2 text-sm text-muted">
              Estimated {usd(COOKOFF.estimatedPotUsd.low)}–{usd(COOKOFF.estimatedPotUsd.high)} pot,
              paying {COOKOFF.paidPlaces.length} places.
            </p>
          </PlankCard>

          <PlankCard label="BBQ Categories" accent="var(--tx-red)">
            <ul className="flex items-end justify-center gap-6">
              {COOKOFF.categories.map((c) => {
                const art = CATEGORY_ART[c.id];
                return (
                  <li key={c.id} className="flex flex-col items-center gap-2">
                    <span className="flex h-16 items-end">
                      <Image
                        src={art.src}
                        alt=""
                        aria-hidden="true"
                        width={art.w}
                        height={art.h}
                        className="max-h-14 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                      />
                    </span>
                    <span className="font-[family-name:var(--font-barlow)] text-[0.68rem] font-bold tracking-[0.1em] text-bone uppercase">
                      {c.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </PlankCard>

          {COOKOFF.jackpots.map((j) => (
            <PlankCard key={j.id} label={j.name} accent="var(--ember)">
              <Image
                src={JACKPOT_ART[j.id].src}
                alt=""
                aria-hidden="true"
                width={JACKPOT_ART[j.id].w}
                height={JACKPOT_ART[j.id].h}
                className="mb-1 h-20 w-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.7)]"
              />
              <p className="font-[family-name:var(--font-bungee)] text-5xl text-tx-red">
                {usd(j.feeUsd)}
              </p>
              <p className="eyebrow mt-1 text-bone/80">Each</p>
              <p className="mt-2 text-sm text-muted">Separate jackpot · {j.judgedOn}</p>
            </PlankCard>
          ))}

          <PlankCard label={COOKOFF.showmanship.name} accent="var(--tx-navy)">
            <Image
              src="/brand/icon-trophy.webp"
              alt=""
              aria-hidden="true"
              width={78}
              height={84}
              className="h-24 w-auto drop-shadow-[0_6px_18px_rgba(212,162,76,0.45)]"
            />
            <p className="eyebrow mt-3 text-bone/80">{COOKOFF.showmanship.note}</p>
            <p className="mt-2 text-sm text-muted">
              Judged on how your cook site shows up and shows off.
            </p>
          </PlankCard>
        </div>

        {/* Turn-in timeline */}
        <div className="mt-20">
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

function PlankCard({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="panel-wood rivets flex flex-col items-center rounded-[4px] border p-6 text-center"
      style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }}
    >
      <p className="eyebrow mb-4 text-bone/70">{label}</p>
      <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
    </div>
  );
}

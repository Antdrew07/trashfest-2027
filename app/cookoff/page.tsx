import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PendingNote } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { COOKOFF, EVENT } from "@/content/event";

export const metadata: Metadata = {
  title: "The Cookoff | Trash Fest 2027",
  description: `${EVENT.cookoffTitle}. $${COOKOFF.entryFeeUsd} per team, ${COOKOFF.teamCap}-team cap, ${COOKOFF.payoutPercent}% payout. ${EVENT.sanctioningNote}.`,
  alternates: { canonical: "/cookoff" },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function CookoffPage() {
  const judge = COOKOFF.headJudge.lastName
    ? `${COOKOFF.headJudge.firstName} ${COOKOFF.headJudge.lastName}`
    : COOKOFF.headJudge.firstName;

  // Group the schedule by day so Friday's set-up reads apart from Saturday.
  const days = COOKOFF.schedule.reduce<Record<string, typeof COOKOFF.schedule>>(
    (acc, row) => {
      (acc[row.day] ||= [] as unknown as typeof COOKOFF.schedule);
      (acc[row.day] as unknown as (typeof COOKOFF.schedule)[number][]).push(row);
      return acc;
    },
    {},
  );

  return (
    <main>
      <PageHeader
        eyebrow={EVENT.sanctioningNote}
        title="King or Queen"
        accent={`of ${EVENT.city}.`}
        lede={`${EVENT.cookoffTitle}. ${COOKOFF.teamCap} teams, three judged meats, two Full Dress jackpots and a showmanship award.`}
      >
        <Link href="/register" className="btn btn-primary">
          Enter Your Team
        </Link>
      </PageHeader>

      <section className="shell pt-14 pb-24 sm:pt-16 sm:pb-32">
        {/* Money */}
        <div className="grid gap-5 sm:grid-cols-3">
          <Figure value={usd(COOKOFF.entryFeeUsd)} label="Entry" sub={COOKOFF.entryFeeNote} />
          <Figure value={`${COOKOFF.payoutPercent}%`} label="Payout" sub="of entry fees, back to the cooks" accent="var(--gold)" />
          <Figure value={String(COOKOFF.teamCap)} label="Team cap" sub="first paid, first in" />
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted/80">
          Based on a full field, the organizer estimates a pot of roughly{" "}
          {usd(COOKOFF.estimatedPotUsd.low)}–{usd(COOKOFF.estimatedPotUsd.high)}.
          That is an estimate, not a guarantee — the actual pot is{" "}
          {COOKOFF.payoutPercent}% of whatever entries are actually paid.
        </p>

        {/* Categories */}
        <h2 className="mt-16 flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
          Judged categories
          <span className="h-px flex-1 bg-gold/20" />
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {COOKOFF.categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 40} className="h-full">
            <div className="lux-card h-full p-6" style={{ "--edge": "#bf0a30" } as React.CSSProperties}>
              <h3 className="headline text-2xl text-bone">{c.name}</h3>
              <p className="mt-3 font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.14em] text-tx-red uppercase">
                Turn-in {c.turnIn}
              </p>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Jackpots */}
        <h2 className="mt-14 flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
          Jackpots &amp; awards
          <span className="h-px flex-1 bg-gold/20" />
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {COOKOFF.jackpots.map((j) => (
            <div key={j.id} className="lux-card p-6" style={{ "--edge": "var(--gold)" } as React.CSSProperties}>
              <h3 className="headline text-xl text-gold-hi">{j.name}</h3>
              <p className="font-[family-name:var(--font-bungee)] mt-2.5 text-3xl text-bone tabular-nums">
                ${j.feeUsd}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{j.judgedOn}</p>
            </div>
          ))}
          <div className="lux-card p-6" style={{ "--edge": "var(--ember)" } as React.CSSProperties}>
            <h3 className="headline text-xl text-ember">{COOKOFF.showmanship.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {COOKOFF.showmanship.note}. Dress the site, not just the plate.
            </p>
          </div>
        </div>

        {/* Payouts */}
        <h2 className="mt-14 flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
          Paid places
          <span className="h-px flex-1 bg-gold/20" />
        </h2>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {COOKOFF.paidPlaces.map((place, i) => (
            <li
              key={place}
              className="lux-card flex items-center gap-3 px-4 py-3.5"
            >
              <span className="font-[family-name:var(--font-bungee)] text-xl text-gold/70 tabular-nums">
                {i + 1}
              </span>
              <span className="font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.04em] text-bone uppercase">
                {place}
              </span>
            </li>
          ))}
        </ol>

        {/* Schedule */}
        <h2 className="mt-16 flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
          Run of show
          <span className="h-px flex-1 bg-gold/20" />
        </h2>
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {Object.entries(days).map(([day, rows]) => (
            <div key={day}>
              <h3 className="headline text-xl text-gold-hi">{day}</h3>
              <ol className="mt-5 border-l border-gold/20">
                {rows.map((row) => (
                  <li key={row.title} className="relative pb-7 pl-7 last:pb-0">
                    <span className="absolute top-1.5 -left-[4.5px] h-2 w-2 rotate-45 bg-tx-red" />
                    <p className="font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.14em] text-ember uppercase">
                      {row.time}
                    </p>
                    <p className="mt-1.5 font-[family-name:var(--font-barlow)] text-base font-extrabold text-bone">
                      {row.title}
                    </p>
                    {row.detail && (
                      <p className="mt-1 text-sm leading-relaxed text-muted">{row.detail}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="lux-card mt-16 p-7 sm:p-9" style={{ "--edge": "#bf0a30" } as React.CSSProperties}>
          <h2 className="headline text-2xl text-bone">The one rule that gets people</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            <strong className="text-bone">No pre-seasoned meat.</strong> Every
            piece has to be inspected raw. {judge}, the head judge, drives the
            grounds after the Friday cooks meeting to check. Turn up with meat
            already rubbed and you will be sent to re-buy it.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            The Friday cooks meeting at 6:00 PM is mandatory for every team.
          </p>
          {!COOKOFF.headJudge.lastName && (
            <div className="mt-6 max-w-2xl">
              <PendingNote>
                Head judge&apos;s last name is still to come from the organizer.
              </PendingNote>
            </div>
          )}
        </div>

        <div className="mt-12">
          <Link href="/register" className="btn btn-primary">
            Enter Your Team — {usd(COOKOFF.entryFeeUsd)}
          </Link>
        </div>
      </section>
    </main>
  );
}

function Figure({
  value,
  label,
  sub,
  accent = "var(--tx-red)",
}: {
  value: string;
  label: string;
  sub: string;
  accent?: string;
}) {
  return (
    <div
      className="lux-card p-6"
      style={{ "--edge": accent } as React.CSSProperties}
    >
      <p className="font-[family-name:var(--font-bungee)] text-5xl tabular-nums" style={{ color: accent }}>
        {value}
      </p>
      <p className="mt-3 font-[family-name:var(--font-barlow)] text-xs font-extrabold tracking-[0.16em] text-bone uppercase">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-muted">{sub}</p>
    </div>
  );
}

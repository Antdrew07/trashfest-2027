import type { Metadata } from "next";
import { PageHeader, PendingNote } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { EVENT, TICKETS } from "@/content/event";

export const metadata: Metadata = {
  title: "Tickets | Trash Fest 2027",
  description: `General Admission $${TICKETS.tiers[0].priceUsd} and VIP $${TICKETS.tiers[1].priceUsd} for ${EVENT.name}, ${EVENT.dateLabel} at ${EVENT.venue.name}.`,
  alternates: { canonical: "/tickets" },
};

const GATE_RULES = [
  {
    title: "BYOB",
    detail: "Bring your own. Coolers are welcome and checked on the way in.",
  },
  {
    title: "$15 per cooler",
    detail: "Charged at the gate, per cooler, not per person.",
  },
  {
    title: "No glass. At all.",
    detail:
      "Glass is not permitted anywhere on the grounds. Cans and plastic only — pour it over before you arrive.",
  },
] as const;

export default function TicketsPage() {
  const [ga, vip] = TICKETS.tiers;

  return (
    <main>
      <PageHeader
        eyebrow={`${EVENT.dateLabel} · ${EVENT.venue.name}`}
        title="Get in."
        accent="Stay all day."
        lede={`One ticket covers the barbecue, the awards and the music. Gates open onto a full day of ${EVENT.sanctioningBody}-sanctioned cooking, and the bands take over at 6:00 PM.`}
      />

      <section className="shell pt-14 pb-24 sm:pt-16 sm:pb-32">
        <div className="grid gap-6 lg:grid-cols-2">
          {TICKETS.tiers.map((tier) => (
            <Reveal key={tier.id} delay={tier.highlight ? 90 : 0} className="h-full">
            <article
              className="lux-card flex h-full flex-col overflow-hidden p-7 sm:p-9"
              style={
                {
                  "--edge": tier.highlight ? "var(--gold)" : "#8a7f72",
                  "--foil-lo": tier.highlight ? "#6b5422" : "#4d555f",
                  "--foil-base": tier.highlight ? "#d4a24c" : "#c9cfd6",
                  "--foil-hi": tier.highlight ? "#f7d88a" : "#ffffff",
                } as React.CSSProperties
              }
            >
              {/* VIP lists two perks to GA's three, so without this the
                  card read as half-empty rather than as the better ticket. */}
              <div className="flex min-h-[1.65rem] items-start">
                {tier.highlight && (
                  <span className="inline-flex rounded-full border border-gold/45 bg-gold/10 px-3 py-1 font-[family-name:var(--font-barlow)] text-[0.62rem] font-extrabold tracking-[0.16em] text-gold-hi uppercase backdrop-blur-sm">
                    Best seat in the house
                  </span>
                )}
              </div>

              <h2 className="headline foil mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] leading-[0.95]">
                {tier.name}
              </h2>

              <p className="font-[family-name:var(--font-bungee)] mt-3 flex items-baseline gap-2 text-5xl text-bone tabular-nums">
                ${tier.priceUsd}
                <span className="font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.1em] text-muted uppercase">
                  {TICKETS.feesNote}
                </span>
              </p>

              <ul className="mt-7 flex-1 space-y-3">
                {tier.includes.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[1.05rem] leading-relaxed text-bone/90">
                    <span
                      className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45"
                      style={{ background: tier.highlight ? "var(--gold)" : "var(--tx-red)" }}
                    />
                    {inc}
                  </li>
                ))}
              </ul>

              {tier.rules.length > 0 && (
                <dl className="mt-7 space-y-2 border-t border-gold/15 pt-5">
                  {tier.rules.map((r) => (
                    <div key={r.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-muted">{r.label}</dt>
                      <dd className="font-[family-name:var(--font-barlow)] font-bold text-bone">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
            </Reveal>
          ))}
        </div>

        {/* Checkout */}
        <div id="buy" className="mt-14 scroll-mt-36">
          {TICKETS.eventbriteEventId ? (
            <div className="overflow-hidden rounded-[4px] border border-gold/25">
              <iframe
                title={`Buy tickets for ${EVENT.name}`}
                src={`https://www.eventbrite.com/checkout-external?eid=${TICKETS.eventbriteEventId}`}
                className="h-[640px] w-full border-0"
              />
            </div>
          ) : (
            /* No fake "Buy now" button. Until the listing exists there is
               nothing to buy, and a dead button costs more trust than a
               straight answer does. */
            <div className="panel-charred rounded-[4px] border border-gold/20 p-7 sm:p-9">
              <h2 className="headline text-2xl text-bone">Tickets aren&apos;t on sale yet.</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Sales run through {TICKETS.provider}. The listing is being set
                up — once it is live this page becomes the checkout, and the
                prices above are what you will pay, plus {TICKETS.provider}{" "}
                fees.
              </p>
              <a href={`mailto:${EVENT.contactEmail}`} className="btn btn-secondary mt-7">
                Email me when they drop
              </a>
            </div>
          )}
        </div>

        {/* Gate rules */}
        <div className="mt-16">
          <h2 className="flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
            At the gate
            <span className="h-px flex-1 bg-gold/20" />
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {GATE_RULES.map((r) => (
              <div key={r.title} className="lux-card p-6">
                <h3 className="font-[family-name:var(--font-barlow)] text-base font-extrabold tracking-[0.06em] text-gold-hi uppercase">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{r.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <PendingNote>
              The refund policy has not been set. It will be published here and
              on the {TICKETS.provider} listing before tickets go on sale.
            </PendingNote>
            <PendingNote>
              Kids and family policy is still being worked out with the venue.
            </PendingNote>
          </div>
        </div>
      </section>
    </main>
  );
}

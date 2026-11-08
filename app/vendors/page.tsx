import type { Metadata } from "next";
import { PageHeader, PendingNote } from "@/components/ui/page-header";
import { EVENT, VENDORS } from "@/content/event";

export const metadata: Metadata = {
  title: "Vendors | Trash Fest 2027",
  description: `Food vendor spots at ${EVENT.name} are $${VENDORS.food.priceUsd} — ${VENDORS.food.spotsLabel}. ${EVENT.dateLabel} at ${EVENT.venue.name}, ${EVENT.venue.city}, ${EVENT.venue.state}.`,
  alternates: { canonical: "/vendors" },
};

export default function VendorsPage() {
  const { food, merch } = VENDORS;

  const mailto = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(
    `${EVENT.name} — food vendor application`,
  )}&body=${encodeURIComponent(
    [
      `We'd like to apply for a food vendor spot at ${EVENT.name}.`,
      "",
      "Business name:",
      "Contact name:",
      "Phone:",
      "What you serve:",
      "Power / water needs:",
      "Footprint (trailer or tent size):",
      "",
    ].join("\n"),
  )}`;

  return (
    <main>
      <PageHeader
        eyebrow={`${EVENT.dateLabelLong} · ${EVENT.venue.name}`}
        title="Set up shop."
        accent="Feed the crowd."
        lede={`A full day of barbecue judging rolling into a night of live music, in the ${EVENT.cityTagline}. ${food.spotsLabel} for food vendors.`}
      />

      <section className="shell pt-14 pb-24 sm:pt-16 sm:pb-32">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="lux-card p-7 sm:p-9" style={{ "--edge": "var(--gold)" } as React.CSSProperties}>
            <h2 className="headline foil text-[clamp(1.7rem,3.5vw,2.4rem)]">
              {food.name}
            </h2>
            <p className="font-[family-name:var(--font-bungee)] mt-3 flex items-baseline gap-3 text-5xl text-bone tabular-nums">
              ${food.priceUsd}
              <span className="font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.1em] text-muted uppercase">
                per spot
              </span>
            </p>
            <p className="mt-5 inline-flex rounded-full border border-gold/45 px-3 py-1 font-[family-name:var(--font-barlow)] text-[0.65rem] font-extrabold tracking-[0.16em] text-gold-hi uppercase">
              {food.spotsLabel}
            </p>
            <p className="mt-6 leading-relaxed text-muted">{food.note}</p>
            <a href={mailto} className="btn btn-primary mt-8">
              Apply for a spot
            </a>
          </article>

          <div className="space-y-5">
            {/*
              Merch vendors stay behind VENDORS.merch.enabled. The organizer
              called the whole category tentative, and listing a $600 spot
              people could apply for would be selling something that may not
              exist.
            */}
            {merch.enabled ? (
              <article className="lux-card p-7 sm:p-9" style={{ "--edge": "#8a7f72" } as React.CSSProperties}>
                <h2 className="headline text-2xl text-bone">{merch.name}</h2>
                <p className="font-[family-name:var(--font-bungee)] mt-3 text-4xl text-bone tabular-nums">
                  ${merch.priceUsd}
                </p>
                <p className="mt-5 leading-relaxed text-muted">{merch.note}</p>
              </article>
            ) : (
              <div className="lux-card p-7 sm:p-9" style={{ "--edge": "#6f675f" } as React.CSSProperties}>
                <h2 className="headline text-2xl text-bone">{merch.name}</h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Merch and retail vending is still being decided and is not
                  open for applications. If you want to be told the moment it
                  is, email us and we will put you on the list.
                </p>
                <div className="mt-6">
                  <PendingNote>
                    Not confirmed. No spots, pricing or approval process are
                    final.
                  </PendingNote>
                </div>
              </div>
            )}

            {VENDORS.officialMerchOnSite && (
              <div className="lux-card p-7 sm:p-9" style={{ "--edge": "#bf0a30" } as React.CSSProperties}>
                <h2 className="headline text-xl text-tx-red">Official merch</h2>
                <p className="mt-3.5 leading-relaxed text-muted">
                  {EVENT.name} merchandise will be sold on site.
                </p>
              </div>
            )}

            <PendingNote>
              Load-in times, power, water and vehicle access are still being
              worked out with the venue. They will be sent to every approved
              vendor before the event.
            </PendingNote>
          </div>
        </div>

        <p className="mt-12 text-sm text-muted">
          Questions about vending?{" "}
          <a
            href={`mailto:${EVENT.contactEmail}`}
            className="-my-3.5 inline-block py-3.5 text-gold-hi underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
          >
            {EVENT.contactEmail}
          </a>
        </p>
      </section>
    </main>
  );
}

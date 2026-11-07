import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PendingNote } from "@/components/ui/page-header";
import { COOKOFF, EVENT } from "@/content/event";

export const metadata: Metadata = {
  title: "Enter Your Team | Trash Fest 2027",
  description: `$${COOKOFF.entryFeeUsd} per team, ${COOKOFF.entryFeeNote}. Entry capped at ${COOKOFF.teamCap} teams for ${EVENT.cookoffTitle}.`,
  alternates: { canonical: "/register" },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const WHAT_YOU_GET = [
  `A cook site for the ${EVENT.sanctioningBody}-sanctioned championship`,
  "Entry into all three judged meat categories — Brisket, Pork Ribs and Chicken",
  "Eligibility for the Cook Site Showmanship award",
  `A share of the ${COOKOFF.payoutPercent}% payout across five paid places`,
] as const;

const BRING = [
  "Your own pit, fuel, tables and shade",
  "Raw, unseasoned meat — inspection is at the Friday cooks meeting",
  "One team representative at the 6:00 PM Friday cooks meeting (mandatory)",
] as const;

export default function RegisterPage() {
  const subject = `${EVENT.name} — team entry (${usd(COOKOFF.entryFeeUsd)})`;
  const body = [
    `We'd like to enter a team in the ${EVENT.cookoffTitle}.`,
    "",
    "Team name:",
    "Head cook:",
    "Phone:",
    "Email:",
    "Entering Bloody Mary Full Dress (+$25)?  yes / no",
    "Entering Dessert Full Dress (+$25)?  yes / no",
    "",
  ].join("\n");
  const entryMailto = `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <main>
      <PageHeader
        eyebrow={`${EVENT.dateLabelLong} · ${EVENT.venue.name}`}
        title="Enter your team."
        accent={`${usd(COOKOFF.entryFeeUsd)} flat.`}
        lede={`${COOKOFF.entryFeeNote[0].toUpperCase()}${COOKOFF.entryFeeNote.slice(1)}. Entry is capped at ${COOKOFF.teamCap} teams and ${COOKOFF.payoutPercent}% of every dollar taken in goes straight back out as prize money.`}
      />

      <section className="shell pt-14 pb-24 sm:pt-16 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* How to enter */}
          <div>
            <div className="lux-card p-7 sm:p-9" style={{ "--edge": "#bf0a30" } as React.CSSProperties}>
              <p className="font-[family-name:var(--font-bungee)] flex items-baseline gap-3 text-5xl text-bone tabular-nums">
                {usd(COOKOFF.entryFeeUsd)}
                <span className="font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.1em] text-muted uppercase">
                  per team
                </span>
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Paid in full upfront. Both Full Dress jackpots — Bloody Mary and
                Dessert — are {usd(COOKOFF.jackpots[0].feeUsd)} each on top, and
                entirely optional.
              </p>

              {/*
                No card form and no "127 spots left" counter.
                Taking $275 needs Stripe wired to a real account, and a live
                counter needs a database recording who has actually paid.
                Neither exists yet, and inventing either would be taking money
                — or making a promise about availability — that nothing backs.
              */}
              <a href={entryMailto} className="btn btn-primary mt-8">
                Email your team entry
              </a>

              <p className="mt-5 text-sm leading-relaxed text-muted/80">
                Online checkout is being set up. Until it is live, email your
                team details and the organizer will hold your place against the{" "}
                {COOKOFF.teamCap}-team cap and arrange payment directly.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <PendingNote>
                The official entry form is coming from the organizer. Once it
                lands, this page becomes the form plus card checkout.
              </PendingNote>
              <PendingNote>
                Spots remaining are not shown live yet — that needs the paid
                entries recorded somewhere this site can read. Email to confirm
                availability.
              </PendingNote>
            </div>
          </div>

          {/* What it covers */}
          <div>
            <h2 className="flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
              What the entry covers
              <span className="h-px flex-1 bg-gold/20" />
            </h2>
            <ul className="mt-6 space-y-3.5">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
              What you bring
              <span className="h-px flex-1 bg-gold/20" />
            </h2>
            <ul className="mt-6 space-y-3.5">
              {BRING.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-tx-red" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <PendingNote>
                Cook-site size, vehicle and RV access are still being confirmed
                with the venue.
              </PendingNote>
            </div>

            <p className="mt-10 text-sm text-muted">
              Full rules, turn-in times and the run of show are on the{" "}
              <Link
                href="/cookoff"
                className="text-gold-hi underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
              >
                cookoff page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

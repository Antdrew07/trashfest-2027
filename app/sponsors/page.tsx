import type { Metadata } from "next";
import { Sponsors } from "@/components/sections/sponsors";
import { PageHeader } from "@/components/ui/page-header";
import { EVENT, FESTIVAL_SPONSOR_TIERS } from "@/content/event";

const top = FESTIVAL_SPONSOR_TIERS[0].priceUsd.toLocaleString("en-US");
const floor =
  FESTIVAL_SPONSOR_TIERS[FESTIVAL_SPONSOR_TIERS.length - 1].priceUsd.toLocaleString("en-US");

export const metadata: Metadata = {
  title: "Sponsorship | Trash Fest 2027",
  description: `Festival and cookoff sponsorship for ${EVENT.name}, $${floor} to $${top}. ${EVENT.dateLabel} in ${EVENT.venue.city}, ${EVENT.venue.state}.`,
  alternates: { canonical: "/sponsors" },
};

/**
 * A prospect sent this link should land on the packages, not on the homepage
 * hero, so the route renders the same section behind its own masthead rather
 * than bouncing to the anchor.
 */
export default function SponsorsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Partner with us"
        title="Get loud."
        accent="Get noticed."
        lede={`A full day of barbecue and a night of live music in the ${EVENT.cityTagline}. Two programs, from main-stage naming rights down to your name on the banner.`}
      >
        <a href={`mailto:${EVENT.contactEmail}`} className="btn btn-primary">
          Talk to us
        </a>
      </PageHeader>
      <Sponsors headless />
    </main>
  );
}

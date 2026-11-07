import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq";
import { PageHeader } from "@/components/ui/page-header";
import { EVENT } from "@/content/event";

export const metadata: Metadata = {
  title: "FAQ | Trash Fest 2027",
  description: `Tickets, coolers, parking, cookoff entry and turn-in times for ${EVENT.name} — ${EVENT.dateLabel} at ${EVENT.venue.name}, ${EVENT.venue.city}, ${EVENT.venue.state}.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Questions"
        title="Before you"
        accent="roll in."
        lede="Everything we can answer today. Anything marked TBC genuinely has not been confirmed yet — we would rather say so than guess."
      />
      <Faq headless />
    </main>
  );
}

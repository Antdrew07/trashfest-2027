import { Cookoff } from "@/components/sections/cookoff";
import { EventStrip } from "@/components/sections/event-strip";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Experience } from "@/components/sections/experience";
import { Headliner } from "@/components/sections/headliner";
import { Hero } from "@/components/sections/hero";
import { Sponsors } from "@/components/sections/sponsors";
import { SiteNav } from "@/components/sections/site-nav";
import { Venue } from "@/components/sections/venue";
import { BandStatement, PhotoBand } from "@/components/ui/editorial";
import { COOKOFF, EVENT } from "@/content/event";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Hero />
        <EventStrip />

        <PhotoBand src="/photo/band-crowd.webp" scrim="left" height="clamp(340px,60vh,640px)" position="50% 45%">
          <BandStatement eyebrow={`${EVENT.dateLabel} · ${EVENT.venue.name}`}>
            One field. A hundred pits.
            <br />
            <span className="text-ember">One crown.</span>
          </BandStatement>
        </PhotoBand>

        <Headliner />

        <PhotoBand src="/photo/smokers.webp" scrim="left" height="clamp(340px,58vh,600px)" position="50% 55%">
          <BandStatement
            eyebrow={EVENT.sanctioningNote}
            cta={{ href: "/register", label: "Enter Your Team" }}
          >
            {COOKOFF.payoutPercent}% payout. {COOKOFF.teamCap} teams.
            <br />
            <span className="text-ember">{EVENT.tagline}</span>
          </BandStatement>
        </PhotoBand>

        <Cookoff />
        <Experience />
        <Venue />
        <Sponsors />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

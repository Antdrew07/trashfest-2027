import { Cookoff } from "@/components/sections/cookoff";
import { EventStrip } from "@/components/sections/event-strip";
import { Experience } from "@/components/sections/experience";
import { Headliner } from "@/components/sections/headliner";
import { Hero } from "@/components/sections/hero";
import { BandStatement, PhotoBand } from "@/components/ui/editorial";
import { COOKOFF, EVENT } from "@/content/event";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <EventStrip />

      {/* Full-bleed bands break the contained sections apart — the rhythm
          Windy City Smokeout, ACL and Bonnaroo all use. */}
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

      <PhotoBand src="/photo/smokers-wide.webp" scrim="bottom" height="clamp(300px,46vh,520px)" position="50% 50%" />
    </main>
  );
}

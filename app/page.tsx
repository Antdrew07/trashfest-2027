import { Cookoff } from "@/components/sections/cookoff";
import { EventStrip } from "@/components/sections/event-strip";
import { Headliner } from "@/components/sections/headliner";
import { Hero } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <EventStrip />
      <Headliner />
      <Cookoff />
    </main>
  );
}

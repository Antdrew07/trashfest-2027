import { Embers, GrainOverlay, SmokeOverlay, StarDivider } from "@/components/ui/atmosphere";
import { MUSIC } from "@/content/event";

/**
 * Headliner (§6.3). Split layout: performance clip left, band detail right,
 * over a dark stage with spotlight cones.
 *
 * Copy is deliberately thin. The brief supplies the band name, the America's
 * Got Talent credit and nothing else, so there is no bio here to write without
 * inventing one — §0 says ask before inventing any fact.
 */
export function Headliner() {
  const { headliner, tbaSlots } = MUSIC;
  const { video } = headliner;

  return (
    <section id="headliner" className="relative isolate overflow-hidden bg-char">
      {/* Stage with spotlight cones */}
      <div className="absolute inset-0" aria-hidden="true">
        <div style={{ background: "var(--grad-dusk)" }} className="absolute inset-0" />
        <div className="absolute inset-0 mix-blend-screen">
          <div
            className="absolute -top-[20%] left-[18%] h-[140%] w-[26%] opacity-20 blur-3xl"
            style={{
              background: "linear-gradient(190deg, #ffb23f 0%, transparent 65%)",
              clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div
            className="absolute -top-[20%] right-[16%] h-[140%] w-[26%] opacity-20 blur-3xl"
            style={{
              background: "linear-gradient(170deg, #ff5a1f 0%, transparent 65%)",
              clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </div>
      <SmokeOverlay opacity={0.14} />
      <Embers count={14} />
      <GrainOverlay />

      <div className="shell section-y relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Performance clip, framed like a stage monitor */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[6px] opacity-60 blur-2xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(255,90,31,0.45), transparent 70%)",
              }}
            />
            <div className="panel-charred rivets relative overflow-hidden rounded-[4px] border border-gold/30 p-2">
              <div className="aspect-video w-full overflow-hidden rounded-[2px] bg-black">
                <iframe
                  title={`${headliner.name} — ${video.primaryTitle}`}
                  src={`https://www.youtube-nocookie.com/embed/${video.primaryId}?rel=0&modestbranding=1&playsinline=1&start=${video.primaryStartSeconds}`}
                  allow="encrypted-media; fullscreen"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted/70">
              {video.primaryTitle} · official video
            </p>
          </div>

          {/* Band detail */}
          <div>
            <p className="eyebrow">{headliner.credit}</p>

            <h2
              className="font-display mt-3 text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] text-bone"
              style={{ filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.9))" }}
            >
              {headliner.name}
            </h2>

            <StarDivider className="my-7 justify-start" />

            <p className="max-w-prose text-lg text-muted">
              Jesse Joe &amp; the 96ers headline Trash Fest 2027 — the band that took a
              honky-tonk set all the way to <em className="text-bone/90">America&apos;s Got Talent</em>,
              closing out a full day of championship barbecue in the BBQ Capital of Texas.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-gold/20 pt-6">
              <div>
                <dt className="eyebrow text-muted">Set Time</dt>
                <dd className="mt-1 font-[family-name:var(--font-barlow)] text-lg font-bold tracking-wide text-bone uppercase">
                  {headliner.setTime ?? "To be announced"}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Music Starts</dt>
                <dd className="mt-1 font-[family-name:var(--font-barlow)] text-lg font-bold tracking-wide text-bone uppercase">
                  6:00 – 6:30 PM
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#tickets" className="btn btn-primary">
                Get Tickets
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${video.primaryId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span aria-hidden="true">▶</span> Watch the Performance
              </a>
            </div>
          </div>
        </div>

        {/* Rest of the line-up — genuinely not announced yet (§7) */}
        <div className="mt-20">
          <div className="flex items-center justify-center">
            <p className="eyebrow text-center text-gold">More Bands To Be Announced</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: tbaSlots }, (_, i) => (
              <div
                key={i}
                className="panel-charred flex h-32 flex-col items-center justify-center gap-2 rounded-[4px] border border-dashed border-gold/25"
              >
                <span
                  className="font-[family-name:var(--font-bungee)] text-2xl text-bone/25"
                  aria-hidden="true"
                >
                  TBA
                </span>
                <span className="text-xs tracking-[0.2em] text-muted/50 uppercase">
                  Artist {i + 2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

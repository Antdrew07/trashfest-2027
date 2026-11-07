import Image from "next/image";

/**
 * Editorial primitives.
 *
 * Pulled from how the real festival sites are actually built (Windy City
 * Smokeout, Stagecoach, ACL, Bonnaroo, Memphis in May):
 *
 *  - They break contained content with FULL-BLEED PHOTO BANDS rather than
 *    running one centered column the whole way down. Windy City drops a BBQ
 *    tray, a crowd shot and a ribs-in-smoker shot between every content block.
 *  - Big numbers are STAT CALLOUTS, not table rows. Memphis in May leads with
 *    "Over $200,000 In Prize Money!" at display size.
 *  - Statements sit OVER photography with a gradient scrim, not on flat color.
 */

type Scrim = "bottom" | "full" | "left";

const SCRIMS: Record<Scrim, string> = {
  bottom:
    "linear-gradient(180deg, rgba(11,9,8,0.55) 0%, rgba(11,9,8,0.1) 35%, rgba(11,9,8,0.92) 100%)",
  full: "linear-gradient(180deg, rgba(11,9,8,0.78) 0%, rgba(11,9,8,0.62) 50%, rgba(11,9,8,0.9) 100%)",
  left: "linear-gradient(90deg, rgba(11,9,8,0.94) 0%, rgba(11,9,8,0.7) 45%, rgba(11,9,8,0.25) 100%)",
};

/**
 * Full-bleed photographic band. Breaks the page out of its container so the
 * image runs edge to edge regardless of the parent's max-width.
 */
export function PhotoBand({
  src,
  alt = "",
  height = "clamp(320px, 56vh, 620px)",
  scrim = "bottom",
  priority = false,
  position = "center",
  children,
}: {
  src: string;
  alt?: string;
  height?: string;
  scrim?: Scrim;
  priority?: boolean;
  position?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="relative isolate w-full overflow-hidden"
      style={{ height }}
      aria-hidden={alt === "" && !children ? true : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0" style={{ background: SCRIMS[scrim] }} />
      {/* Keeps the band tied to the fire palette rather than reading as a stock photo. */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-35"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,90,31,0.35) 0%, transparent 45%, rgba(0,40,104,0.3) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] opacity-[0.04]" />
      {children ? (
        <div className="relative z-10 flex h-full items-end">
          <div className="shell w-full pb-10 sm:pb-14">{children}</div>
        </div>
      ) : null}
    </section>
  );
}

/** A big number with a small label under it. */
export function Stat({
  value,
  label,
  sub,
  accent = "var(--ember)",
}: {
  value: string;
  label: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="text-center">
      <p
        className="font-[family-name:var(--font-bungee)] text-[clamp(2.4rem,6vw,4.5rem)] leading-none tabular-nums"
        style={{ color: accent, textShadow: `0 0 36px ${accent}55` }}
      >
        {value}
      </p>
      <p className="eyebrow mt-3 text-bone">{label}</p>
      {sub ? <p className="mt-1.5 text-sm text-muted">{sub}</p> : null}
    </div>
  );
}

/** A statement set over a photo band (ACL's stacked-claims pattern). */
export function BandStatement({
  eyebrow,
  children,
  cta,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <p className="headline text-[clamp(1.6rem,4.4vw,3.4rem)] text-bone drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
        {children}
      </p>
      {cta ? (
        <a href={cta.href} className="btn btn-primary mt-7">
          {cta.label}
        </a>
      ) : null}
    </div>
  );
}

/** Contained photo tile with the label reversed out at the lower left. */
export function PhotoTile({
  src,
  title,
  sub,
  ratio = "4 / 5",
}: {
  src: string;
  title: string;
  sub?: string;
  ratio?: string;
}) {
  return (
    <figure
      className="group relative overflow-hidden rounded-[4px] border border-gold/20"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 35%, rgba(11,9,8,0.55) 65%, rgba(11,9,8,0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 70px rgba(255,90,31,0.45)" }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-[family-name:var(--font-barlow)] text-lg font-extrabold tracking-[0.08em] text-bone uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {title}
        </p>
        {sub ? <p className="mt-0.5 text-xs text-muted">{sub}</p> : null}
      </figcaption>
    </figure>
  );
}

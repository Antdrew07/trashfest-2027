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
  foil,
}: {
  value: string;
  label: string;
  sub?: string;
  accent?: string;
  /** Metal stops for the numeral. Without them it falls back to flat accent. */
  foil?: { lo: string; base: string; hi: string };
}) {
  return (
    <div
      className="text-center"
      style={
        foil
          ? ({
              "--foil-lo": foil.lo,
              "--foil-base": foil.base,
              "--foil-hi": foil.hi,
            } as React.CSSProperties)
          : undefined
      }
    >
      <p
        className={`font-[family-name:var(--font-bungee)] text-[clamp(2.4rem,6vw,4.5rem)] leading-none tabular-nums ${
          foil ? "foil" : ""
        }`}
        style={
          foil
            ? { filter: `drop-shadow(0 0 28px ${accent}44)` }
            : { color: accent, textShadow: `0 0 36px ${accent}55` }
        }
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
      className="lux-card group relative overflow-hidden"
      style={{ aspectRatio: ratio, "--edge": "var(--gold)" } as React.CSSProperties}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-400 group-hover:scale-105"
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

/**
 * Photo-led stat card: the image IS the card, with the number reversed out
 * over a scrim. Replaces the pattern of floating a small thumbnail on a
 * panel, which can never look like anything but a thumbnail on a panel.
 */
export function PhotoStatCard({
  src,
  label,
  value,
  sub,
  accent = "var(--tx-red)",
  ratio = "4 / 5",
  priority = false,
}: {
  src: string;
  label: string;
  value?: string;
  sub?: string;
  accent?: string;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className="lux-card group relative overflow-hidden"
      style={{ aspectRatio: ratio, "--edge": accent } as React.CSSProperties}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.06]"
      />

      {/* Scrim: readable type without flattening the photograph. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,8,0.55) 0%, rgba(11,9,8,0.08) 32%, rgba(11,9,8,0.82) 72%, rgba(11,9,8,0.97) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 90px color-mix(in srgb, ${accent} 55%, transparent)` }}
      />

      <figcaption className="absolute inset-x-0 top-0 p-4">
        <span
          className="font-[family-name:var(--font-barlow)] text-[0.68rem] font-extrabold tracking-[0.16em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
          style={{ color: accent === "var(--gold)" ? "var(--gold-hi)" : "var(--bone)" }}
        >
          {label}
        </span>
      </figcaption>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        {value ? (
          <p
            className="font-[family-name:var(--font-bungee)] text-[clamp(1.9rem,4.4vw,3rem)] leading-none drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]"
            style={{ color: accent }}
          >
            {value}
          </p>
        ) : null}
        {sub ? (
          <p className="mt-2 text-sm leading-snug text-bone/75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {sub}
          </p>
        ) : null}
      </div>
    </figure>
  );
}

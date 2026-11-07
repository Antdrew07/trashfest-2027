import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import {
  COOKOFF_SPONSOR_GA_UNCONFIRMED,
  COOKOFF_SPONSOR_TIERS,
  EVENT,
  FESTIVAL_SPONSOR_TIERS,
  type SponsorTier,
} from "@/content/event";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Presentation for each tier: its emblem and its foil stops.
 *
 * This lives here rather than in content/event.ts on purpose — event.ts holds
 * facts the organizer approved, and none of this is one.
 *
 * The emblems are a deliberate set: a gemstone for each of the three tiers
 * that include a band-signed guitar, a bullion bar for the three below them,
 * so the break in the hierarchy is visible before you read a single price.
 *
 * `edge` drives the lit border, the glow under the emblem and the hover halo.
 * Platinum is a cool white metal here rather than the amber it used to be:
 * amber put it in the same hue family as Gold, which read as the cheaper of
 * the two even though it costs twice as much.
 */
type TierArt = {
  emblem: string;
  alt: string;
  edge: string;
  foil: { lo: string; base: string; hi: string };
  /** Optional CSS filter, for tiers that reuse another tier's render. */
  tint?: string;
};

const ART: Record<string, TierArt> = {
  "stage-presenting": {
    emblem: "/brand/tier/ruby.webp",
    alt: "",
    edge: "#bf0a30",
    foil: { lo: "#5e0a1a", base: "#d8324f", hi: "#ff9fae" },
  },
  elite: {
    emblem: "/brand/tier/sapphire.webp",
    alt: "",
    edge: "#2f6bff",
    foil: { lo: "#0b2577", base: "#3d78ff", hi: "#b3cbff" },
  },
  diamond: {
    emblem: "/brand/tier/diamond.webp",
    alt: "",
    edge: "#bcd8f0",
    foil: { lo: "#55697e", base: "#cfe0f0", hi: "#ffffff" },
  },
  platinum: {
    emblem: "/brand/tier/platinum.webp",
    alt: "",
    edge: "#d9e0e8",
    foil: { lo: "#5f6974", base: "#d2dae3", hi: "#ffffff" },
  },
  gold: {
    emblem: "/brand/tier/gold.webp",
    alt: "",
    edge: "#d4a24c",
    foil: { lo: "#6b5422", base: "#d4a24c", hi: "#f7d88a" },
  },
  silver: {
    emblem: "/brand/tier/silver.webp",
    alt: "",
    edge: "#9aa3ae",
    foil: { lo: "#4d555f", base: "#9aa3ae", hi: "#e8edf3" },
  },
};

/** Cookoff tiers reuse the metal emblems; there are no gems down here. */
const COOKOFF_ART: Record<string, TierArt> = {
  "cookoff-gold": ART.gold,
  "cookoff-silver": ART.silver,
  // Bronze and Pit reuse the gold bar with a hue shift. A third metal render
  // would cost another $0.77 to say the same thing a filter says for free.
  "cookoff-bronze": {
    emblem: "/brand/tier/gold.webp",
    alt: "",
    edge: "#b06a3b",
    foil: { lo: "#4d2a13", base: "#b06a3b", hi: "#e3a877" },
    tint: "hue-rotate(-20deg) saturate(1.25) brightness(0.82)",
  },
  "cookoff-pit": {
    emblem: "/brand/tier/gold.webp",
    alt: "",
    edge: "#ff5a1f",
    foil: { lo: "#6b2409", base: "#ff5a1f", hi: "#ffb23f" },
    tint: "hue-rotate(-26deg) saturate(1.5) brightness(1.02)",
  },
};

function artFor(id: string): TierArt {
  return ART[id] ?? COOKOFF_ART[id] ?? ART.gold;
}

function foilVars(art: TierArt) {
  return {
    "--foil-lo": art.foil.lo,
    "--foil-base": art.foil.base,
    "--foil-hi": art.foil.hi,
    ...(art.tint ? { "--emblem-tint": art.tint } : {}),
  } as React.CSSProperties;
}

function mailto(tier: SponsorTier, program: string) {
  const subject = `${EVENT.name} — ${tier.name} (${program})`;
  const body = [
    `I'd like to sponsor ${EVENT.name} at the ${tier.name} level (${usd(tier.priceUsd)}).`,
    "",
    "Company:",
    "Contact name:",
    "Phone:",
    "",
  ].join("\n");
  return `mailto:${EVENT.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** "Only 1 available" reads as scarcity; "Limited to 3" reads as a fact. */
function limitLabel(tier: SponsorTier) {
  if (tier.exclusive || tier.limit === 1) return "Only 1 available";
  if (tier.limit) return `Limited to ${tier.limit}`;
  return null;
}

const PASS_STYLE: Record<SponsorTier["passes"][number]["kind"], string> = {
  backstage: "border-tx-red/55 text-tx-red",
  vip: "border-gold/55 text-gold-hi",
  ga: "border-bone/25 text-muted",
};

function Passes({ tier, unconfirmedGa }: { tier: SponsorTier; unconfirmedGa?: boolean }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tier.passes.map((p) => (
        <span
          key={p.label}
          className={`flex items-baseline gap-1.5 rounded-full border bg-black/30 px-3 py-1.5 font-[family-name:var(--font-barlow)] text-[0.68rem] font-bold tracking-[0.1em] uppercase backdrop-blur-sm ${PASS_STYLE[p.kind]}`}
        >
          <span className="font-[family-name:var(--font-bungee)] text-sm leading-none tabular-nums">
            {p.count}
          </span>
          {p.label}
        </span>
      ))}
      {unconfirmedGa && (
        <span className="flex items-center rounded-full border border-dashed border-bone/20 px-3 py-1.5 font-[family-name:var(--font-barlow)] text-[0.68rem] font-bold tracking-[0.1em] text-muted/70 uppercase">
          + GA tickets (count TBC)
        </span>
      )}
    </div>
  );
}

function SignedGuitar() {
  return (
    <p className="mt-5 flex items-center gap-2 font-[family-name:var(--font-barlow)] text-[0.7rem] font-bold tracking-[0.12em] text-gold-hi uppercase">
      <GuitarIcon className="h-4 w-4 shrink-0 fill-gold-hi" />
      Includes a band-signed guitar
    </p>
  );
}

function Emblem({ art, size }: { art: TierArt; size: "sm" | "md" | "lg" }) {
  const px = { sm: 112, md: 148, lg: 172 }[size];
  // No z-index on this wrapper. A stacking context here isolates the image's
  // mix-blend-mode:screen from the card behind it, so the emblem's black
  // backdrop stops dropping out and renders as a black square. The content
  // below sits above it anyway, by DOM order.
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        top: size === "lg" ? "-1.25rem" : "-1rem",
        // Bled further off the edge so it intrudes less on the copy beside it.
        right: size === "lg" ? "-2rem" : "-0.75rem",
        width: px,
        height: px,
      }}
      aria-hidden="true"
    >
      <div className="emblem-glow absolute inset-0 scale-125" />
      {/*
        Fixed-size image with no `sizes` prop, so next/image emits a plain
        1x/2x srcset against the real layout size. At DPR 2 that serves a
        384px file into the 172px slot.
      */}
      <Image
        src={art.emblem}
        alt=""
        width={px}
        height={px}
        className="emblem relative h-full w-full object-contain"
      />
    </div>
  );
}

/**
 * Sponsorship (DESIGN.md §7, both programs).
 *
 * The tiers are deliberately not a uniform grid. A $15,000 exclusive and a
 * $1,000 open tier carry very different weight, and rendering them as six
 * identical boxes would flatten that — the hierarchy here is the pitch.
 */
export function Sponsors({ headless = false }: { headless?: boolean } = {}) {
  const [stage, elite, diamond, ...rest] = FESTIVAL_SPONSOR_TIERS;

  return (
    <section id="sponsors" className="relative isolate overflow-hidden bg-char">
      <div className="absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] opacity-[0.05]" />
      <div
        className="absolute inset-x-0 top-0 h-[520px] opacity-60"
        style={{
          background:
            "radial-gradient(90% 100% at 50% 0%, rgba(212,162,76,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="rule-gold absolute inset-x-0 top-0" />

      <div className="shell section-y relative">
        {!headless && (
          <Reveal as="div" className="max-w-3xl">
            <p className="eyebrow flex items-center gap-2">
              <span className="text-tx-red" aria-hidden="true">★</span>
              Sponsorship
            </p>
            <h2 className="headline mt-5 text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.92]">
              <span className="block text-bone">{EVENT.flyerPunch.split(".")[0]}.</span>
              <span className="foil block">{EVENT.flyerPunch.split(".")[1]?.trim()}.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Two programs, two audiences. Put your name on the main stage in
              front of the whole festival, or on the pits where the cooking
              happens.
            </p>
          </Reveal>
        )}

        {/* ── Program 1: Festival ─────────────────────────────────────── */}
        <Reveal>
          <h3
            className={`${headless ? "mt-0" : "mt-16"} flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase`}
          >
            Festival &amp; Concert Sponsors
            <span className="rule-gold flex-1" />
          </h3>
        </Reveal>

        {/* The $15,000 exclusive gets the full width. It is the headline ask. */}
        <Reveal delay={60}>
          <FeatureTier tier={stage} program="Festival" className="mt-6" />
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {[elite, diamond].map((t, i) => (
            <Reveal key={t.id} delay={60 + i * 80} className="h-full">
              <TierCard tier={t} program="Festival" prominent />
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} className="h-full">
              <TierCard tier={t} program="Festival" />
            </Reveal>
          ))}
        </div>

        {/* ── Program 2: Cookoff ──────────────────────────────────────── */}
        <Reveal>
          <h3 className="mt-20 flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
            Cookoff Sponsors
            <span className="rule-gold flex-1" />
          </h3>
          <p className="mt-3 max-w-xl text-sm text-muted">
            A separate program from the festival tiers above — these support the{" "}
            {EVENT.sanctioningBody}-sanctioned cookoff itself.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {COOKOFF_SPONSOR_TIERS.map((t, i) => (
            <Reveal key={t.id} delay={i * 70} className="h-full">
              <TierCard
                tier={t}
                program="Cookoff"
                unconfirmedGa={COOKOFF_SPONSOR_GA_UNCONFIRMED.includes(t.id)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-start gap-4 border-t border-gold/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-muted">
              Want something that isn&apos;t listed, or need to talk it through?
              Email us and we&apos;ll build the package around you.
            </p>
            <a href={`mailto:${EVENT.contactEmail}`} className="btn btn-secondary shrink-0">
              {EVENT.contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The exclusive top tier — wide, two-column, perks fully visible. */
function FeatureTier({
  tier,
  program,
  className = "",
}: {
  tier: SponsorTier;
  program: string;
  className?: string;
}) {
  const limit = limitLabel(tier);
  const art = artFor(tier.id);

  return (
    <article
      className={`lux-card overflow-hidden p-7 sm:p-10 ${className}`}
      style={{ "--edge": art.edge, ...foilVars(art) } as React.CSSProperties}
    >
      <Emblem art={art} size="lg" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <div>
          {limit && <Ribbon accent={art.edge}>{limit}</Ribbon>}
          <h4 className="headline foil mt-4 text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[0.95]">
            {tier.name}
          </h4>
          <p className="font-[family-name:var(--font-bungee)] mt-3 text-4xl text-bone tabular-nums sm:text-5xl">
            {usd(tier.priceUsd)}
          </p>
          {tier.signedGuitar && <SignedGuitar />}
          <Passes tier={tier} />
          <a href={mailto(tier, program)} className="btn btn-primary mt-7">
            Claim this tier
          </a>
        </div>

        <ul className="space-y-3 lg:border-l lg:border-gold/15 lg:pl-12 lg:pr-36">
          {tier.perks.map((p) => (
            <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
              <span
                className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45"
                style={{ background: art.edge }}
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function TierCard({
  tier,
  program,
  prominent = false,
  unconfirmedGa = false,
}: {
  tier: SponsorTier;
  program: string;
  prominent?: boolean;
  unconfirmedGa?: boolean;
}) {
  const limit = limitLabel(tier);
  const art = artFor(tier.id);

  return (
    <article
      className="lux-card group flex h-full flex-col overflow-hidden p-6 sm:p-7"
      style={{ "--edge": art.edge, ...foilVars(art) } as React.CSSProperties}
    >
      <Emblem art={art} size={prominent ? "md" : "sm"} />

      {/* The slot is always reserved: an open tier has no limit ribbon, and
          without it that card's title would float above its neighbours'. */}
      <div className="relative flex min-h-[1.65rem] items-start">
        {limit && <Ribbon accent={art.edge}>{limit}</Ribbon>}
      </div>

      <h4
        className={`headline foil relative mt-3 max-w-[72%] leading-[0.98] ${
          prominent ? "text-[1.7rem] sm:text-[2.1rem]" : "min-h-[2.7rem] text-[1.35rem]"
        }`}
      >
        {tier.name}
      </h4>

      <p
        className={`font-[family-name:var(--font-bungee)] relative mt-2.5 text-bone tabular-nums ${
          prominent ? "text-4xl" : "text-3xl"
        }`}
      >
        {usd(tier.priceUsd)}
      </p>

      {tier.signedGuitar && <SignedGuitar />}

      {/* Always grows, so passes and the CTA pin to the bottom of every card
          in a row regardless of how many perks each tier lists. */}
      <ul className="relative mt-5 flex-1 space-y-2.5">
        {tier.perks.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <span
              className="mt-[0.4rem] h-1 w-1 shrink-0 rotate-45"
              style={{ background: art.edge }}
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div className="relative">
        <Passes tier={tier} unconfirmedGa={unconfirmedGa} />
      </div>

      <a
        href={mailto(tier, program)}
        className="relative mt-6 inline-flex items-center gap-2 self-start font-[family-name:var(--font-barlow)] text-xs font-extrabold tracking-[0.14em] uppercase transition-colors"
        style={{ color: art.edge }}
      >
        Claim this tier
        <span
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </a>
    </article>
  );
}

function Ribbon({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex self-start rounded-full border px-3 py-1 font-[family-name:var(--font-barlow)] text-[0.62rem] font-extrabold tracking-[0.16em] uppercase backdrop-blur-sm"
      style={{
        color: accent,
        borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
        background: `color-mix(in srgb, ${accent} 12%, rgba(0,0,0,0.4))`,
      }}
    >
      {children}
    </span>
  );
}

function GuitarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M20.7 2.3a1 1 0 0 0-1.4 0l-2.6 2.6a1 1 0 0 0-.3.8l.15 1.5-3.1 3.1a4.4 4.4 0 0 0-4.2.9l-.5.5a3.2 3.2 0 0 0-.7 3.5 2.6 2.6 0 0 0-1.4.73l-1.1 1.1a3 3 0 1 0 4.24 4.25l1.1-1.1a2.6 2.6 0 0 0 .73-1.4 3.2 3.2 0 0 0 3.5-.7l.5-.5a4.4 4.4 0 0 0 .9-4.2l3.1-3.1 1.5.15a1 1 0 0 0 .8-.3l2.6-2.6-1.4-1.4-2.2 2.2-1.6-.16-.16-1.6 2.2-2.2zM9.6 18.9l-1.1 1.1a1 1 0 1 1-1.42-1.42l1.1-1.1a1 1 0 0 1 1.42 1.42z" />
    </svg>
  );
}

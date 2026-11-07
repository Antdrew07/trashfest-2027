import Image from "next/image";
import { EVENT } from "@/content/event";

const NAV = [
  { href: "#headliner", label: "The Music" },
  { href: "#cookoff", label: "The Cookoff" },
  { href: "#experience", label: "The Experience" },
  { href: "#venue", label: "Venue" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
] as const;

/**
 * Footer.
 *
 * The social row is driven by EVENT.socials, which is all nulls until the
 * organizer creates the handles — dead icons linking to "#" would be worse
 * than none, so the row renders only once something is real.
 */
export function Footer() {
  const socials = Object.entries(EVENT.socials).filter(([, url]) => url);

  return (
    <footer className="relative isolate overflow-hidden border-t border-gold/20 bg-char">
      <div className="absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] opacity-[0.05]" />

      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Image
              src="/brand/logo-wordmark.webp"
              alt={EVENT.name}
              width={992}
              height={232}
              className="h-auto max-h-14 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              {EVENT.tagline} {EVENT.sanctioningNote}.
            </p>
            <p className="mt-5 font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.12em] text-bone uppercase">
              {EVENT.dateLabelLong}
            </p>
            <p className="mt-1.5 text-sm text-muted">
              {EVENT.venue.name} · {EVENT.venue.street}, {EVENT.venue.city},{" "}
              {EVENT.venue.state}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-[family-name:var(--font-barlow)] text-xs font-extrabold tracking-[0.18em] text-gold-hi uppercase">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-[family-name:var(--font-barlow)] text-xs font-extrabold tracking-[0.18em] text-gold-hi uppercase">
              Get in touch
            </h3>
            <a
              href={`mailto:${EVENT.contactEmail}`}
              className="mt-5 block text-sm break-all text-muted transition-colors hover:text-bone"
            >
              {EVENT.contactEmail}
            </a>

            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {socials.map(([network, url]) => (
                  <li key={network}>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.12em] text-muted uppercase transition-colors hover:text-gold-hi"
                    >
                      {network}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <a href="#tickets" className="btn btn-primary mt-7">
              Get Tickets
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gold/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted/70">
            {/* EVENT.name already ends in the year — a leading © {year}
                would print 2027 twice. */}
            © {EVENT.name} · {EVENT.city}, {EVENT.state}.
          </p>
          <p className="text-xs text-muted/70">{EVENT.domain}</p>
        </div>
      </div>
    </footer>
  );
}

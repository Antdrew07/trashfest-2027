"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EVENT } from "@/content/event";

const LINKS = [
  { hash: "#headliner", label: "The Music" },
  { href: "/cookoff", label: "The Cookoff" },
  { href: "/tickets", label: "Tickets" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/vendors", label: "Vendors" },
  { href: "/faq", label: "FAQ" },
] as const;

/**
 * Site navigation.
 *
 * Transparent over the hero so the lockup is never boxed in, then solidifies
 * on scroll. Without this the page has no way to reach any section except by
 * scrolling the whole thing.
 */
export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolledPast, setScrolledPast] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the home page has a hero for the bar to float over. Everywhere else
  // a transparent bar would sit on the page's own first heading.
  const scrolled = !onHome || scrolledPast;

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open mobile menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold/20 bg-char/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between gap-3 py-3 sm:gap-6">
        {/* At the top of the page the hero lockup sits directly below this
            bar, so showing the wordmark here too prints the brand twice. It
            fades in only once the hero has scrolled away.

            It collapses to zero width while hidden — opacity-0 alone still
            reserved ~154px of the bar, which on a phone shoved the menu
            button clean off the right edge. body has overflow-x:clip, so
            that was silently cropped rather than showing as page overflow. */}
        <Link
          href="/"
          aria-label={`${EVENT.name} home`}
          aria-hidden={!scrolled}
          tabIndex={scrolled ? 0 : -1}
          // Pads the logo's hit area out to 44px against each breakpoint's
          // wordmark height (28px on a phone, 36px above). The bar's height
          // is set by the taller ticket button, so nothing moves.
          className={`flex shrink-0 items-center py-2 transition-opacity duration-300 sm:py-1 ${
            scrolled
              ? "opacity-100"
              : "pointer-events-none w-0 overflow-hidden opacity-0"
          }`}
        >
          <Image
            src="/brand/logo-wordmark.webp"
            alt={EVENT.name}
            width={992}
            height={232}
            priority
            className="h-auto max-h-7 w-auto sm:max-h-9"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={linkHref(l, onHome)}
                aria-current={isCurrent(l, pathname) ? "page" : undefined}
                className={`font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.14em] uppercase transition-colors hover:text-gold ${
                  isCurrent(l, pathname) ? "text-gold-hi" : "text-bone/85"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* whitespace-nowrap, or "Get Tickets" breaks across two lines on a
              narrow phone and the button swells to half the bar. */}
          <Link
            href="/tickets"
            className="btn btn-primary px-3.5 py-2.5 text-[0.7rem] whitespace-nowrap sm:px-5 sm:text-xs"
          >
            Get Tickets
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-bone/25 text-bone lg:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-char/98 backdrop-blur-md lg:hidden">
          <ul className="shell flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={linkHref(l, onHome)}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(l, pathname) ? "page" : undefined}
                  className={`block border-b border-gold/10 py-4 font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.14em] uppercase ${
                    isCurrent(l, pathname) ? "text-gold-hi" : "text-bone"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/**
 * A hash-only link works on the home page but points at nothing from a
 * sub-route, so off-home it becomes a full path back to the section.
 */
function linkHref(l: (typeof LINKS)[number], onHome: boolean) {
  if ("href" in l) return l.href;
  return onHome ? l.hash : `/${l.hash}`;
}

/** Marks the link for the route you are actually on. */
function isCurrent(l: (typeof LINKS)[number], pathname: string) {
  return "href" in l && l.href === pathname;
}

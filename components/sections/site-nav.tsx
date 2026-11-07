"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { EVENT } from "@/content/event";

const LINKS = [
  { href: "#headliner", label: "The Music" },
  { href: "#cookoff", label: "The Cookoff" },
  { href: "#experience", label: "The Experience" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
] as const;

/**
 * Site navigation.
 *
 * Transparent over the hero so the lockup is never boxed in, then solidifies
 * on scroll. Without this the page has no way to reach any section except by
 * scrolling the whole thing.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <nav className="shell flex items-center justify-between gap-6 py-3">
        {/* At the top of the page the hero lockup sits directly below this
            bar, so showing the wordmark here too prints the brand twice. It
            fades in only once the hero has scrolled away. */}
        <a
          href="#top"
          aria-label={`${EVENT.name} home`}
          aria-hidden={!scrolled}
          tabIndex={scrolled ? 0 : -1}
          className={`flex shrink-0 items-center transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src="/brand/logo-wordmark.webp"
            alt={EVENT.name}
            width={992}
            height={232}
            priority
            className="h-auto max-h-9 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.14em] text-bone/85 uppercase transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#tickets" className="btn btn-primary px-5 py-2.5 text-xs">
            Get Tickets
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-bone/25 text-bone lg:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-char/98 backdrop-blur-md lg:hidden">
          <ul className="shell flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-gold/10 py-4 font-[family-name:var(--font-barlow)] text-sm font-bold tracking-[0.14em] text-bone uppercase"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

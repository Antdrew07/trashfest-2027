import Link from "next/link";

/**
 * Masthead for a sub-route.
 *
 * The top padding clears the fixed nav; without it every sub-page's first
 * heading would start underneath the bar.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Second line, set in gold. Optional — some titles are one line. */
  accent?: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-gold/15 bg-char">
      <div className="absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] opacity-[0.05]" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--grad-fire)", opacity: 0.5 }}
      />

      <div className="shell relative pt-28 pb-14 sm:pt-32 sm:pb-20">
        <nav aria-label="Breadcrumb" className="mb-7">
          <Link
            href="/"
            className="font-[family-name:var(--font-barlow)] text-xs font-bold tracking-[0.14em] text-muted uppercase transition-colors hover:text-gold-hi"
          >
            <span aria-hidden="true">←</span> Back to Trash Fest
          </Link>
        </nav>

        <p className="eyebrow flex items-center gap-2">
          <span className="text-tx-red" aria-hidden="true">★</span>
          {eyebrow}
        </p>

        <h1 className="headline mt-5 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9]">
          <span className="block text-bone">{title}</span>
          {accent && <span className="block text-gold-hi">{accent}</span>}
        </h1>

        {lede && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

/**
 * A fact the organizer has not confirmed. Used instead of omitting the item,
 * so nobody reads an absence as an answer.
 */
export function PendingNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-3 rounded-[4px] border border-dashed border-bone/25 bg-bone/[0.03] px-4 py-3.5 text-sm leading-relaxed text-muted/85">
      <span className="mt-0.5 shrink-0 rounded-full border border-dashed border-bone/30 px-2 py-0.5 font-[family-name:var(--font-barlow)] text-[0.55rem] font-extrabold tracking-[0.14em] text-muted/80 uppercase">
        TBC
      </span>
      <span>{children}</span>
    </p>
  );
}

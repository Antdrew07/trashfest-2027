import { EVENT, FAQ, type FaqItem } from "@/content/event";

/**
 * FAQ (§6).
 *
 * Native <details>, not a JS accordion: it works before hydration, Ctrl-F
 * finds text inside a closed answer in Chrome, and it needs no state.
 *
 * Unconfirmed answers are marked rather than hidden. Someone deciding whether
 * to drive in with an RV is better served by "not confirmed yet" than by a
 * missing question that makes them assume it is allowed.
 */
export function Faq({ headless = false }: { headless?: boolean } = {}) {
  const going = FAQ.filter((f) => f.group === "Going");
  const cooking = FAQ.filter((f) => f.group === "Cooking");

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-char">
      <div className="absolute inset-0 bg-[url('/textures/noise.svg')] bg-[length:200px_200px] opacity-[0.05]" />

      <div className="shell section-y relative">
        {!headless && (
        <header className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2">
            <span className="text-tx-red" aria-hidden="true">★</span>
            Questions
          </p>
          <h2 className="headline mt-5 text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.92] text-bone">
            Before you <span className="text-gold-hi">roll in.</span>
          </h2>
        </header>
        )}

        <div className={`${headless ? "mt-0" : "mt-12"} grid gap-x-14 gap-y-12 lg:grid-cols-2`}>
          <Column title="Coming to the festival" items={going} />
          <Column title="Entering the cookoff" items={cooking} />
        </div>

        <p className="mt-12 text-sm text-muted">
          Still stuck?{" "}
          <a
            href={`mailto:${EVENT.contactEmail}`}
            className="-my-3.5 inline-block py-3.5 text-gold-hi underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
          >
            {EVENT.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}

function Column({ title, items }: { title: string; items: readonly FaqItem[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-4 font-[family-name:var(--font-barlow)] text-sm font-extrabold tracking-[0.18em] text-bone uppercase">
        {title}
        <span className="h-px flex-1 bg-gold/20" />
      </h3>

      <div className="mt-5">
        {items.map((item) => (
          <details
            key={item.q}
            className="group border-b border-gold/12 transition-colors hover:border-gold/30 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="-mx-3 flex cursor-pointer list-none items-start gap-4 rounded-[3px] px-3 py-4 transition-colors hover:bg-gold/[0.04]">
              <span className="flex-1 font-[family-name:var(--font-barlow)] text-[1.02rem] font-bold text-bone group-hover:text-gold-hi">
                {item.q}
              </span>
              {item.pending && (
                <span className="mt-0.5 shrink-0 rounded-full border border-dashed border-bone/25 px-2.5 py-0.5 font-[family-name:var(--font-barlow)] text-[0.58rem] font-extrabold tracking-[0.14em] text-muted/80 uppercase">
                  TBC
                </span>
              )}
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-gold/60 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p
              className={`pb-5 pr-10 text-[0.95rem] leading-relaxed ${
                item.pending ? "text-muted/75 italic" : "text-muted"
              }`}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

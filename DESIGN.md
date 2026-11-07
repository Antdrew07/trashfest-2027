# TRASH FEST 2027 — Website Design System & Build Brief
> Drop this file in the project root as `DESIGN.md` (or paste into `CLAUDE.md`). Claude Code must follow it for every page, component and asset.

---

## 0. Kickoff prompt (paste into Claude Code)

```
Read DESIGN.md fully. Build the Trash Fest 2027 website exactly to this spec:
Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion, deploy-ready for Vercel.
Start with the hero video section, then build each section in the order of §6.
After each section, run the dev server, screenshot at 390px and 1440px with Playwright,
and fix anything that looks flat, cramped or off-brand before moving on.
Use the flyer images in /public/brand as the visual reference. Payments: Stripe Checkout
for team registration ($275), Eventbrite embedded checkout for tickets. Domain: trashfestlockhart.com. Ask me before inventing
any fact (prices, times, ticket links) not listed in §7.
```

---

## 1. Creative direction — "Lone Star Smoke Show"

The site should feel like the flyer came alive: **a Texas honky-tonk at dusk, smoke rolling off pits, stage lights cutting through the haze.** Premium festival-site energy (think Stagecoach / Texas Monthly BBQ Fest), not a church-bulletin event page.

Three words: **Loud. Smoky. Proud.**

- Dark, fire-lit canvas — charcoal black base with ember-orange glow bleeding from the edges.
- Distressed Texas-flag type: weathered bone-white letters, Texas red, navy, metallic gold.
- Real texture everywhere: grunge, wood plank, burnt paper edges, star field, smoke.
- Two crowns = the brand mark: **gold crown (King)** and **ruby crown (Queen)**.
- Music first, BBQ right behind it. The headliner video sells the ticket; the cookoff sells the community.

**Do NOT:** use flat white backgrounds, generic stock "BBQ clip art", rounded SaaS cards, pastel anything, or default Tailwind shadows.

---

## 2. Color tokens

| Token | Hex | Use |
|---|---|---|
| `--char` | `#0B0908` | Page background |
| `--smoke` | `#1A1512` | Section/panel background |
| `--plank` | `#2B1D14` | Wood-panel cards (cookoff info boxes) |
| `--bone` | `#F2E6D0` | Primary headline text (weathered white) |
| `--tx-red` | `#BF0A30` | Texas flag red — CTAs, "FEST", "QUEEN" |
| `--tx-navy` | `#002868` | Flag blue — accents, star bursts, Elite tier |
| `--ember` | `#FF5A1F` | Fire glow, hover states, countdown digits |
| `--flame` | `#FFB23F` | Highlight inside fire gradients |
| `--gold` | `#D4A24C` | "KING", crowns, Gold tier, dividers |
| `--gold-hi` | `#F7D88A` | Metallic gold highlight |
| `--muted` | `#A8998A` | Body copy on dark |

**Signature gradients**
```css
--grad-fire:  radial-gradient(120% 80% at 50% 110%, #FF5A1F55 0%, #BF0A3022 35%, transparent 70%);
--grad-gold:  linear-gradient(180deg, #F7D88A 0%, #D4A24C 45%, #8A5A1C 100%);   /* KING text */
--grad-ruby:  linear-gradient(180deg, #FF6B6B 0%, #BF0A30 50%, #6E0019 100%);   /* QUEEN text */
--grad-dusk:  linear-gradient(180deg, #2A0E08 0%, #0B0908 60%);                 /* section fades */
```

Sponsor tier accent colors (match the sponsorship flyer):
Stage Presenting `--tx-red` · Elite `#2F6BFF` · Diamond `#C9CED6` · Platinum `#E08A2E` · Gold `--gold` · Silver `#B8BEC6`

---

## 3. Typography (Google Fonts)

| Role | Font | Notes |
|---|---|---|
| Display / logo words | **Rye** | Western slab. Uppercase. Apply `.distressed` texture mask. |
| Big headlines | **Bungee** or **Anton** | Chunky, uppercase, tight tracking (-0.01em) |
| Labels / eyebrow / buttons | **Barlow Condensed** 600–800 | Uppercase, letter-spacing 0.12em |
| Body | **Inter** 400/500 | 17px base, line-height 1.6, `--muted` |
| Script tagline | **Permanent Marker** | Only for "Get Loud. Get Noticed." style punches |

**Scale (clamp):** H1 `clamp(3rem, 9vw, 8.5rem)` · H2 `clamp(2.25rem, 5vw, 4.5rem)` · H3 `clamp(1.5rem, 2.5vw, 2.25rem)` · Eyebrow `0.875rem`.

**Distressed text effect**
```css
.distressed {
  -webkit-mask-image: url('/textures/grunge-mask.png');
  mask-image: url('/textures/grunge-mask.png');
  mask-size: 600px; text-shadow: 0 2px 0 #000, 0 8px 30px rgba(0,0,0,.6);
}
.text-gold { background: var(--grad-gold); -webkit-background-clip: text; color: transparent; }
.text-ruby { background: var(--grad-ruby); -webkit-background-clip: text; color: transparent; }
```

---

## 4. Texture & imagery kit (`/public/textures`, `/public/images`)

- `grunge-mask.png` — transparent grunge for distressed letters
- `wood-plank.jpg` — dark weathered wood for cookoff info cards
- `smoke-loop.webm` — slow drifting smoke overlay (mix-blend: screen, 25% opacity)
- `embers.webm` or CSS/canvas particle embers rising from the bottom of hero + footer
- `stars-texas.svg` — five-point star (outline + filled) for bullets, dividers, sparkles
- `texas-flag-state.svg` — Texas silhouette filled with flag (logo lockup)
- `crown-king.png` / `crown-queen.png` — cut from the flyer or regenerated
- Photography/AI imagery: Lockhart water tower at sunset, Caldwell County courthouse, offset smoker pits, sliced brisket with bark, Luna Gardens stage with string lights and crowd, pecan pie, Bloody Mary bar. Warm, high-contrast, golden-hour lighting. Always graded orange/teal-shadow to match the flyer.

---

## 5. Signature component: Headliner hero video (Texas Monthly style)

Reference: texasmonthly.com/bbqfest — full-bleed, edge-to-edge video that autoplays silently on load and loops behind the logo lockup, with CTA cards below.

**Behavior**
1. `<video autoplay muted loop playsinline preload="metadata" poster="/images/hero-poster.jpg">` covering 100svh, `object-fit: cover`.
2. Source: a 15–30s highlight cut of **Jesse Joe & the 96ers** live (no audio needed), exported as `hero.webm` (VP9) + `hero.mp4` (H.264), 1920×1080, ≤ 6 MB; plus `hero-mobile.mp4` 720×1280 vertical crop ≤ 3 MB swapped in under 768px.
3. Overlays (bottom → top): video → dark gradient `linear-gradient(180deg, #0B0908AA 0%, #0B090855 40%, #0B0908 100%)` → `--grad-fire` → smoke loop → ember particles → content.
4. Centered logo lockup: Texas-flag state shape behind "TRASH FEST" (Rye, distressed, bone + red), "LOCKHART, TEXAS ★ MARCH 6, 2027" eyebrow, then "KING or QUEEN of LOCKHART, TX" with gold/ruby crowns.
5. **"▶ Watch the Performance"** button opens a full-screen lightbox with the full clip **with sound** (YouTube/Vimeo embed or self-hosted MP4 with controls).
6. **Music on open (organizer request):** the site should feel like it opens on Jesse's music. Browsers block autoplay *with sound*, so: video autoplays muted + a pulsing **"🔊 Turn It Up"** button (bottom-left, ember glow) that unmutes the hero and plays Jesse's track. After the first tap anywhere, remember the choice for the session and keep a small audio toggle in the nav so music continues while scrolling.
7. **Approved source footage (band's official channel):**
   - **Primary — "Jesse Joe & the 96'ers – Dancing With the Devil"** (youtube.com/watch?v=Npj1Wtng3lU): packed honky-tonk crowd, cowboy hats, fists up, Jesse on the mic. Best shots ~0:15–0:30 and ~3:20–3:40. Skip the dark/blurry stretches (~1:10–2:30).
   - **Secondary — "Jesse Joe Takes Nashville"** (youtube.com/watch?v=RVKafAE3NFQ): outdoor daytime acoustic set under a wooden pavilion (~2:50–3:30) for the opening shot of the promo.
   - Get the original files from the band — do not rip from YouTube. Until they arrive, use a muted YouTube embed (`?autoplay=1&mute=1&loop=1&controls=0&playlist=Npj1Wtng3lU&start=15`) as a placeholder, with captions turned off.
8. Hero clip = the **promo video**: Jesse performing → festival crowd → pit smoke & sliced brisket → logo slam + date. 20–30s.
9. Small pause/play toggle bottom-right (accessibility). Respect `prefers-reduced-motion`: show poster only.
7. Below the fold edge: three CTA cards in a row (stack on mobile), styled like distressed tickets: **GET TICKETS** · **ENTER THE COOKOFF** · **BECOME A SPONSOR**.

```tsx
<section className="relative h-[100svh] overflow-hidden bg-char">
  <video className="absolute inset-0 h-full w-full object-cover"
         autoPlay muted loop playsInline preload="metadata" poster="/images/hero-poster.jpg">
    <source src="/video/hero.webm" type="video/webm" />
    <source src="/video/hero.mp4"  type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B0908AA,#0B090855_40%,#0B0908)]" />
  <div className="absolute inset-0 [background:var(--grad-fire)]" />
  {/* SmokeOverlay, Embers, LogoLockup, WatchButton, CTA cards */}
</section>
```

---

## 6. Site map & sections

**Routes:** `/` (long home page) · `/tickets` (Eventbrite widget, GA vs VIP comparison, gate rules) · `/cookoff` (rules, schedule, payouts, judging) · `/register` (team entry form + Stripe Checkout $275, live spots-left counter, cap 100) · `/sponsors` (two tabs: Festival | Cookoff, inquiry form) · `/vendors` (food & merch application, $600, approval only) · `/faq`

**Signature line (use in hero subhead & ads):** "Lockhart's got beef. Settle it." — never name real local restaurants or families on the site.

**Home page order:**

1. **Hero video** (§5)
2. **Event strip** — sticky-on-scroll bar: `MARCH 6, 2027 · LUNA GARDENS · 500 FM 672, LOCKHART, TX` + live countdown (days/hrs/min in `--ember` Bungee digits) + "Get Tickets" button.
3. **Headliner: Jesse Joe & the 96ers** — split layout: large cutout band photo with stage-light glow left; right: eyebrow "AS SEEN ON AMERICA'S GOT TALENT", band name in Rye, short bio, set time, embedded performance clip, "Watch the Performance" + "Get Tickets". Background: dark stage with spotlight cones.
4. **The Cookoff — King or Queen of Lockhart, TX State Championship** — IBCA event badge. Wood-plank info grid mirroring the flyer: Entry Fee $275/team · 75% Payout · Categories (Brisket, Pork Ribs, Chicken — icon silhouettes in `--tx-red`) · Bloody Mary Full Dress $25 · Dessert Full Dress $25 · Cook Site Showmanship (payout & award). Timeline: Cooks check-in Mar 5, 4–6 PM → Cooks meeting 6 PM → Meat inspection following → Turn-ins & awards Mar 6. CTA "Enter Your Team" + QR code.
5. **The Experience** — 4 image tiles with hover zoom + ember glow: Live Music · Great BBQ · Cold Drinks · Good Times.
6. **Sponsorship packages** — 6 tier cards in the flyer's colors (Stage Presenting $15,000 exclusive → Silver $1,000), "Limited to X" ribbons, perk lists with star bullets, ticket/pass counts as icon chips, signed-guitar render on top 3 tiers. Headline: "GET LOUD. GET NOTICED." in Permanent Marker. CTA "Claim Your Package" → inquiry form.
7. **Sponsor wall** — logo marquee (placeholders until sponsors sign), grayscale → color on hover.
8. **Venue & Getting There** — dark-styled map (Mapbox dark or Google Maps night style) for Luna Gardens, parking, RV/cook-site info.
9. **FAQ** — accordion with star toggles.
10. **Contact / Footer** — trashfestlockhart@yahoo.com, socials, IBCA logo, Texas flag strip, embers rising, small "Lockhart, Texas — BBQ Capital of Texas" sign-off.

---

## 7. Approved facts (flyers + organizer call with Ken — do not invent others)

Keep all of this in `/content/event.ts` so copy changes happen in one file.

**Event basics**
- **TRASH FEST 2027** — King or Queen of Lockhart, TX State Championship BBQ Cookoff, **sanctioned by IBCA** + live music fest, same day
- Lockhart = "BBQ Capital of Texas" · Domain: **trashfestlockhart.com** (purchased)
- Venue: **Luna Gardens, 500 FM 672, Lockhart, TX**
- Contact email: new Gmail being created to replace the Yahoo address → use placeholder `CONTACT_EMAIL` until confirmed
- Socials: TikTok, Instagram, Facebook → handles TBD (placeholders)

**Cookoff schedule**
| When | What |
|---|---|
| Fri Mar 5, 4–6 PM | Team check-in: plates, registration, rule books |
| Fri Mar 5, 6 PM | Cooks meeting |
| Following | Meat inspection (head judge drives the grounds — no pre-seasoned meat) |
| Sat Mar 6, until 10 AM | Late check-in |
| Sat Mar 6, 11 AM–12 PM | Bloody Mary & Dessert turn-ins |
| 12 PM | Chicken turn-in |
| 1 PM | Pork Ribs turn-in |
| 2 PM | Brisket turn-in |
| ~6–6:30 PM | Bands start |

- Head judge: **Carrie [last name TBD]** — leave placeholder
- Entry: **$275/team, paid in full upfront** (Stripe — organizer's existing account) · Cap: **100 teams** → show "Spots remaining" counter and auto-close at 100
- Payout: **75% of entries — est. $5,000–$7,500 pot**, paying Grand Champion, Reserve Grand Champion, 3rd, 4th, 5th
- Bloody Mary Full Dress $25 & Dessert Full Dress $25 — separate **jackpots**, judged on taste, texture & showmanship
- Cook Site Showmanship — payout & award
- Team entry form: organizer is sending it → build form fields from it

**Music & tickets**
- Headliner: **Jesse Joe & the 96ers** (America's Got Talent). More bands: **TBA** (show 2–3 "TBA" silhouette slots)
- Jesse is touring college towns through early January — add a "Catch Jesse on Tour" strip (dates TBD)
- Tickets via **Eventbrite** (scannable barcode tickets; fees passed to buyer — show "+ fees")
  - **General Admission $55** — BYOB, **no glass**, coolers checked at gate, **$15 cooler charge**
  - **VIP $175** — **free beer & liquor**
- Use Eventbrite embedded checkout widget (modal) so buyers stay on our site; fallback link to the Eventbrite page

**Sponsorships — two separate programs (separate tabs/pages)**
1. **Festival / Concert sponsors** — the 6 tiers on the sponsorship flyer ($15,000 → $1,000), perks exactly as listed.
2. **Cookoff (BBQ) sponsors**
   - Gold — $3,500 · 3 VIP tickets + GA · name on all promotional banners
   - Silver — $2,500 · 2 VIP + GA · name on promotional banners
   - Bronze — $1,500 · 2 VIP + 2 GA · name on promotional banners
   - Pit Sponsor — $1,000 · 2 VIP
   - ⚠ GA counts for Gold/Silver were unclear on the call — mark `TODO confirm`. Tier names collide with festival Gold/Silver; label this program "Cookoff Gold / Silver / Bronze / Pit" everywhere.

**Vendors**
- Food vendors: **$600/spot, 6 spots** (none chosen yet — open application)
- Merch/retail vendors: **$600/spot, approval only** (tentative — build but keep behind a flag)
- Trash Fest official merch will be sold on site

**Still pending:** head judge full name, team entry form, Gmail address, social handles, Eventbrite links, confirmed GA counts, other bands, parking/RV, refund policy, kids/family policy.

---

## 8. Layout, motion & UI rules

- Max content width 1280px; section padding `py-24 md:py-36`; 16px mobile gutters, no horizontal scroll.
- Section dividers: torn-paper/burnt edge SVGs or a star row `★ ★ ★`, never plain `<hr>`.
- Cards: wood or charred-metal texture, 1px `--gold`/tier-color border at 40%, inner shadow, corner star rivets. Radius 4px max.
- Buttons: primary = `--tx-red` fill, bone Barlow Condensed uppercase, star icon, hover → ember glow `box-shadow: 0 0 30px #FF5A1F88` + 2px lift. Secondary = bone outline.
- Motion (Framer Motion): headlines slam in (scale 1.15 → 1, 0.5s, ease-out back), cards stagger up 24px, crowns gently sway, embers float continuously, smoke drifts. Parallax on water tower/courthouse layers. Nothing longer than 0.8s; all disabled under reduced motion.
- Mobile-first: hero logo stacks, CTA cards stack, sticky bottom "Get Tickets" bar on phones.

---

## 9. Quality bar & checks

- Lighthouse ≥ 90 performance on mobile (lazy-load everything below hero, `next/image`, compressed video).
- WCAG AA contrast for body text; video has pause control; all icons labeled.
- SEO: title "Trash Fest 2027 | King or Queen of Lockhart BBQ Cookoff & Live Music", Open Graph image from the flyer, Event schema.org JSON-LD (date, venue, performer, offers).
- Before every handoff: Playwright screenshots at 390 / 768 / 1440px, compare against the flyer — if it looks flatter or plainer than the flyer, it's not done.

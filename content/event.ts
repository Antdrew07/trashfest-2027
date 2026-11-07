/**
 * TRASH FEST 2027 — single source of truth for every published fact.
 *
 * DESIGN.md §7 is the only approved source. Nothing here may be invented:
 * anything the organizer has not confirmed is marked TODO and listed in
 * PENDING_ITEMS at the bottom of this file so it is impossible to lose track of.
 *
 * Copy changes happen here, never inline in a component.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Event basics
// ─────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  name: "Trash Fest 2027",
  nameStacked: ["TRASH", "FEST"] as const,
  year: 2027,
  cookoffTitle: "King or Queen of Lockhart, TX State Championship BBQ Cookoff",
  sanctioningBody: "IBCA",
  sanctioningNote: "An IBCA sanctioned event",

  /** Saturday 6 March 2027. Month is 0-indexed in the Date constructor. */
  date: new Date(2027, 2, 6),
  dateLabel: "March 6, 2027",
  dateLabelLong: "Saturday, March 6, 2027",
  /** Local (America/Chicago) start used by the countdown and schema.org. */
  startsAtIso: "2027-03-06T11:00:00-06:00",

  city: "Lockhart",
  state: "Texas",
  stateAbbr: "TX",
  cityTagline: "BBQ Capital of Texas",

  venue: {
    name: "Luna Gardens",
    street: "500 FM 672",
    city: "Lockhart",
    state: "TX",
    // TODO(organizer): confirm ZIP — not printed on either flyer.
    postalCode: "",
    full: "Luna Gardens · 500 FM 672, Lockhart, TX",
  },

  domain: "trashfestlockhart.com",

  /**
   * TODO(organizer): a new Gmail address is being created to replace this one.
   * The Yahoo address is what is printed on the public flyer, so it stays live
   * until the replacement is confirmed — swap this one constant when it lands.
   */
  contactEmail: "trashfestlockhart@yahoo.com",
  contactEmailIsPending: true,

  /** TODO(organizer): handles not yet created. Links stay hidden while null. */
  socials: {
    tiktok: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
  },

  /** DESIGN.md §6 — never name real local restaurants or families. */
  tagline: "Lockhart's got beef. Settle it.",
  flyerPunch: "Get Loud. Get Noticed.",
  pillars: ["Live Music", "Great BBQ", "Cold Drinks", "Good Times"] as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Cookoff
// ─────────────────────────────────────────────────────────────────────────────

export const COOKOFF = {
  entryFeeUsd: 275,
  entryFeeNote: "per team, paid in full upfront",
  teamCap: 100,
  payoutPercent: 75,
  /** Estimate given on the organizer call — presented as an estimate, never a promise. */
  estimatedPotUsd: { low: 5000, high: 7500 },
  paidPlaces: [
    "Grand Champion",
    "Reserve Grand Champion",
    "3rd Place",
    "4th Place",
    "5th Place",
  ] as const,

  /** The three IBCA-judged meat categories from the flyer. */
  categories: [
    { id: "brisket", name: "Brisket", turnIn: "2:00 PM" },
    { id: "pork-ribs", name: "Pork Ribs", turnIn: "1:00 PM" },
    { id: "chicken", name: "Chicken", turnIn: "12:00 PM" },
  ] as const,

  /**
   * Separate jackpots, judged on taste, texture and showmanship.
   * The printed flyer reads "DESERT FULL DRESS" — a typo for "Dessert",
   * corrected here and throughout the site.
   */
  jackpots: [
    {
      id: "bloody-mary",
      name: "Bloody Mary Full Dress",
      feeUsd: 25,
      judgedOn: "Taste, texture & showmanship",
    },
    {
      id: "dessert",
      name: "Dessert Full Dress",
      feeUsd: 25,
      judgedOn: "Taste, texture & showmanship",
    },
  ] as const,

  showmanship: {
    name: "Cook Site Showmanship",
    note: "Payout and award",
  },

  /** TODO(organizer): last name not yet given. */
  headJudge: { firstName: "Carrie", lastName: null as string | null },

  schedule: [
    {
      day: "Friday, March 5",
      time: "4:00 – 6:00 PM",
      title: "Team check-in",
      detail: "Plates, registration and rule books.",
    },
    {
      day: "Friday, March 5",
      time: "6:00 PM",
      title: "Cooks meeting",
      detail: "Mandatory for every team.",
    },
    {
      day: "Friday, March 5",
      time: "Following the meeting",
      title: "Meat inspection",
      detail:
        "The head judge drives the grounds. No pre-seasoned meat — all meat must be inspected raw.",
    },
    {
      day: "Saturday, March 6",
      time: "Until 10:00 AM",
      title: "Late check-in",
      detail: "Final window for teams arriving Saturday morning.",
    },
    {
      day: "Saturday, March 6",
      time: "11:00 AM – 12:00 PM",
      title: "Bloody Mary & Dessert turn-ins",
      detail: "Both Full Dress jackpots.",
    },
    {
      day: "Saturday, March 6",
      time: "12:00 PM",
      title: "Chicken turn-in",
      detail: null,
    },
    {
      day: "Saturday, March 6",
      time: "1:00 PM",
      title: "Pork Ribs turn-in",
      detail: null,
    },
    {
      day: "Saturday, March 6",
      time: "2:00 PM",
      title: "Brisket turn-in",
      detail: null,
    },
    {
      day: "Saturday, March 6",
      time: "6:00 – 6:30 PM",
      title: "Bands start",
      detail: "Awards wrap up and the music takes over.",
    },
  ] as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Music
// ─────────────────────────────────────────────────────────────────────────────

export const MUSIC = {
  headliner: {
    name: "Jesse Joe & the 96ers",
    credit: "As seen on America's Got Talent",
    /**
     * Approved reference footage on the band's official channel (DESIGN.md §5.7).
     * Do NOT rip these — the band is sending original files. Until they arrive
     * the hero uses a muted embed of the primary video.
     */
    video: {
      primaryId: "Npj1Wtng3lU",
      primaryTitle: "Dancing With the Devil",
      /** Best crowd shots; skip the dark stretch around 1:10–2:30. */
      primaryStartSeconds: 15,
      secondaryId: "RVKafAE3NFQ",
      secondaryTitle: "Jesse Joe Takes Nashville",
      secondaryStartSeconds: 170,
      awaitingOriginalFiles: true,
    },
    /** TODO(organizer): confirm set time. "Bands start 6:00–6:30 PM" is all we have. */
    setTime: null as string | null,
  },

  /** TODO(organizer): further acts not announced. Rendered as TBA silhouettes. */
  tbaSlots: 3,

  /** TODO(organizer): college-town tour dates through early January, not yet supplied. */
  tourDates: [] as Array<{ date: string; venue: string; city: string; url?: string }>,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Tickets — Eventbrite, fees passed to the buyer
// ─────────────────────────────────────────────────────────────────────────────

export const TICKETS = {
  provider: "Eventbrite",
  feesNote: "+ fees",
  /** TODO(organizer): Eventbrite event not yet created; embed stays disabled until set. */
  eventbriteEventId: process.env.NEXT_PUBLIC_EVENTBRITE_EVENT_ID ?? null,

  tiers: [
    {
      id: "ga",
      name: "General Admission",
      priceUsd: 55,
      highlight: false,
      includes: [
        "Full festival access",
        "BYOB — absolutely no glass",
        "Coolers checked at the gate",
      ],
      rules: [
        { label: "Cooler charge", value: "$15 per cooler" },
        { label: "Glass", value: "Not permitted" },
      ],
    },
    {
      id: "vip",
      name: "VIP",
      priceUsd: 175,
      highlight: true,
      includes: ["Full festival access", "Free beer & liquor"],
      rules: [],
    },
  ] as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Sponsorship — two separate programs (DESIGN.md §7)
// ─────────────────────────────────────────────────────────────────────────────

export type SponsorTier = {
  id: string;
  name: string;
  priceUsd: number;
  limit: number | null;
  exclusive?: boolean;
  accent: string;
  perks: readonly string[];
  signedGuitar?: boolean;
  passes: readonly { count: number; label: string; kind: "vip" | "backstage" | "ga" }[];
};

/** Program 1 — festival / concert sponsors, exactly as printed on the flyer. */
export const FESTIVAL_SPONSOR_TIERS: readonly SponsorTier[] = [
  {
    id: "stage-presenting",
    name: "Stage Presenting Sponsor",
    priceUsd: 15000,
    limit: 1,
    exclusive: true,
    accent: "var(--tx-red)",
    signedGuitar: true,
    perks: [
      "Official main-stage naming rights: TRASH FEST 2027 Main Stage Presented by [Company Name]",
      "Largest company logo prominently displayed on the main stage",
      "Exclusive main-stage presenting sponsor recognition",
      "Premium logo placement on all festival posters, banners & promotional materials",
      "Featured social media promotions",
      "Multiple onstage sponsor announcements",
      "Company logo displayed on VIP-area signage",
      "Opportunity for a company representative to receive onstage recognition",
    ],
    passes: [
      { count: 12, label: "VIP Access Tickets", kind: "vip" },
      { count: 6, label: "All Access Backstage Passes", kind: "backstage" },
      { count: 15, label: "General Admission Tickets", kind: "ga" },
    ],
  },
  {
    id: "elite",
    name: "Elite Sponsor",
    priceUsd: 10000,
    limit: 2,
    accent: "#2F6BFF",
    signedGuitar: true,
    perks: [
      "Official recognition as an Elite Sponsor of TRASH FEST 2027",
      "Largest company logos on festival banners and promotional materials",
      "Premium main-stage banner placement",
      "Featured social media promotions",
      "Onstage sponsor recognition",
    ],
    passes: [
      { count: 10, label: "VIP Access Tickets", kind: "vip" },
      { count: 4, label: "All Access Backstage Passes", kind: "backstage" },
      { count: 12, label: "General Admission Tickets", kind: "ga" },
    ],
  },
  {
    id: "diamond",
    name: "Diamond Sponsor",
    priceUsd: 7500,
    limit: 2,
    accent: "#C9CED6",
    signedGuitar: true,
    perks: [
      "Premier company logo placement on festival banners",
      "Large logo on festival posters and promotional materials",
      "Premium stage-side advertising banner",
      "Featured social media sponsor promotions",
      "Multiple onstage sponsor announcements",
      "Company recognition on VIP-area signage",
    ],
    passes: [
      { count: 8, label: "VIP Access Tickets", kind: "vip" },
      { count: 2, label: "All Access Passes", kind: "backstage" },
      { count: 8, label: "General Admission Tickets", kind: "ga" },
    ],
  },
  {
    id: "platinum",
    name: "Platinum Sponsor",
    priceUsd: 5000,
    limit: 3,
    accent: "#E08A2E",
    perks: [
      "Large company logo on festival banners",
      "Premium placement on promotional materials",
      "Stage-side advertising banner",
      "Social media recognition",
      "Onstage sponsor announcements",
    ],
    passes: [
      { count: 6, label: "VIP Access Tickets", kind: "vip" },
      { count: 8, label: "General Admission Tickets", kind: "ga" },
    ],
  },
  {
    id: "gold",
    name: "Gold Sponsor",
    priceUsd: 2500,
    limit: 5,
    accent: "var(--gold)",
    perks: [
      "Company logo on festival banners",
      "Logo on select promotional materials",
      "Social media recognition",
      "Onstage sponsor acknowledgment",
    ],
    passes: [
      { count: 2, label: "VIP Access Tickets", kind: "vip" },
      { count: 8, label: "General Admission Tickets", kind: "ga" },
    ],
  },
  {
    id: "silver",
    name: "Silver Sponsor",
    priceUsd: 1000,
    limit: null,
    accent: "#B8BEC6",
    perks: [
      "Company logo on sponsor banner",
      "Social media recognition",
      "Business name on festival sponsor board",
    ],
    passes: [{ count: 2, label: "VIP Access Tickets", kind: "vip" }],
  },
] as const;

/**
 * Program 2 — cookoff (BBQ) sponsors. Tier names deliberately prefixed
 * "Cookoff" everywhere because they collide with the festival Gold/Silver tiers.
 */
export const COOKOFF_SPONSOR_TIERS: readonly SponsorTier[] = [
  {
    id: "cookoff-gold",
    name: "Cookoff Gold",
    priceUsd: 3500,
    limit: null,
    accent: "var(--gold)",
    perks: ["Name on all promotional banners"],
    // TODO(organizer): GA count was unclear on the call — confirm before publishing.
    passes: [{ count: 3, label: "VIP Tickets", kind: "vip" }],
  },
  {
    id: "cookoff-silver",
    name: "Cookoff Silver",
    priceUsd: 2500,
    limit: null,
    accent: "#B8BEC6",
    perks: ["Name on promotional banners"],
    // TODO(organizer): GA count was unclear on the call — confirm before publishing.
    passes: [{ count: 2, label: "VIP Tickets", kind: "vip" }],
  },
  {
    id: "cookoff-bronze",
    name: "Cookoff Bronze",
    priceUsd: 1500,
    limit: null,
    accent: "#B06A3B",
    perks: ["Name on promotional banners"],
    passes: [
      { count: 2, label: "VIP Tickets", kind: "vip" },
      { count: 2, label: "General Admission Tickets", kind: "ga" },
    ],
  },
  {
    id: "cookoff-pit",
    name: "Cookoff Pit Sponsor",
    priceUsd: 1000,
    limit: null,
    accent: "var(--ember)",
    perks: ["Pit sponsor recognition"],
    passes: [{ count: 2, label: "VIP Tickets", kind: "vip" }],
  },
] as const;

/** Gold and Silver also include GA, count unconfirmed — surfaced in the UI. */
export const COOKOFF_SPONSOR_GA_UNCONFIRMED = ["cookoff-gold", "cookoff-silver"];

// ─────────────────────────────────────────────────────────────────────────────
// Vendors
// ─────────────────────────────────────────────────────────────────────────────

export const VENDORS = {
  food: {
    name: "Food Vendors",
    priceUsd: 600,
    spots: 6,
    spotsLabel: "6 spots",
    note: "Open application — no vendors selected yet.",
    enabled: true,
  },
  merch: {
    name: "Merch & Retail Vendors",
    priceUsd: 600,
    spots: null,
    spotsLabel: "Approval only",
    note: "Tentative.",
    /** Kept behind a flag per DESIGN.md §7 until the organizer confirms. */
    enabled: false,
  },
  officialMerchOnSite: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Every answer below is derived from a fact already in this file. Where the
 * organizer has not confirmed something the entry is marked `pending` and says
 * so plainly rather than guessing — a wrong answer about refunds, parking or
 * kids is worse than no answer, because people plan around it.
 */
export type FaqItem = {
  q: string;
  a: string;
  group: "Going" | "Cooking";
  pending?: boolean;
};

export const FAQ: readonly FaqItem[] = [
  {
    group: "Going",
    q: "When and where is it?",
    a: `${EVENT.dateLabelLong} at ${EVENT.venue.name}, ${EVENT.venue.street}, ${EVENT.venue.city}, ${EVENT.venue.state}. Barbecue turn-ins run through the afternoon and the bands start at 6:00–6:30 PM.`,
  },
  {
    group: "Going",
    q: "What does a ticket get me?",
    a: `General Admission is $${TICKETS.tiers[0].priceUsd} ${TICKETS.feesNote} and covers full festival access. VIP is $${TICKETS.tiers[1].priceUsd} ${TICKETS.feesNote} and adds free beer and liquor.`,
  },
  {
    group: "Going",
    q: "Can I bring my own drinks?",
    a: "Yes — it's BYOB. Coolers are checked at the gate and there is a $15 charge per cooler. Absolutely no glass.",
  },
  {
    group: "Going",
    q: "Who's playing?",
    a: `${MUSIC.headliner.name} headline. ${MUSIC.headliner.credit}. The rest of the line-up is still being booked and will be announced here.`,
  },
  {
    group: "Going",
    q: "Where do I park, and can I bring an RV?",
    a: "Parking, RV and cook-site arrival details are still being finalised with the venue. They will be posted here as soon as they are confirmed.",
    pending: true,
  },
  {
    group: "Going",
    q: "Are tickets refundable?",
    a: "The refund policy has not been set yet. It will be published here and on the ticket listing before tickets go on sale.",
    pending: true,
  },
  {
    group: "Going",
    q: "Is it family friendly — can I bring kids?",
    a: "The kids and family policy is still being worked out with the venue, so please check back before you plan around it.",
    pending: true,
  },
  {
    group: "Going",
    q: "Can I sell food at the festival?",
    a: `Food vendor spots are $${VENDORS.food.priceUsd} and there are ${VENDORS.food.spots}. ${VENDORS.food.note} Email us to apply.`,
  },
  {
    group: "Cooking",
    q: "What does it cost to enter the cookoff?",
    a: `$${COOKOFF.entryFeeUsd} ${COOKOFF.entryFeeNote}. Entry is capped at ${COOKOFF.teamCap} teams, and ${COOKOFF.payoutPercent}% of entry fees goes back out as prize money.`,
  },
  {
    group: "Cooking",
    q: "What gets judged?",
    a: `Three ${EVENT.sanctioningBody}-judged meat categories — ${COOKOFF.categories
      .map((c) => c.name)
      .join(", ")} — plus two Full Dress jackpots at $${COOKOFF.jackpots[0].feeUsd} each (Bloody Mary and Dessert) and a Cook Site Showmanship award.`,
  },
  {
    group: "Cooking",
    q: "When do teams check in?",
    a: "Friday, March 5 from 4:00 to 6:00 PM, with a mandatory cooks meeting at 6:00 PM and meat inspection straight after. Late check-in stays open until 10:00 AM Saturday.",
  },
  {
    group: "Cooking",
    q: "Can I season my meat before I arrive?",
    a: "No. All meat must be inspected raw — no pre-seasoned meat. The head judge drives the grounds for inspection after the Friday cooks meeting.",
  },
  {
    group: "Cooking",
    q: "What are the turn-in times?",
    a: `${COOKOFF.categories
      .map((c) => `${c.name} ${c.turnIn}`)
      .join(", ")}. Both Full Dress jackpots turn in between 11:00 AM and 12:00 PM.`,
  },
  {
    group: "Cooking",
    q: "How do I register a team?",
    a: `The organizer is finalising the entry form. Email us in the meantime and we'll hold your spot against the ${COOKOFF.teamCap}-team cap.`,
    pending: true,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Open questions — DESIGN.md §7 "Still pending"
// ─────────────────────────────────────────────────────────────────────────────

export const PENDING_ITEMS = [
  "Head judge's last name (Carrie …)",
  "Team entry form fields — organizer is sending the form",
  "New Gmail contact address to replace the Yahoo address",
  "TikTok / Instagram / Facebook handles",
  "Eventbrite event ID and ticket links",
  "Cookoff Gold & Silver general-admission ticket counts",
  "Remaining band line-up beyond the headliner",
  "Jesse Joe tour dates for the 'Catch Jesse on Tour' strip",
  "Parking and RV / cook-site details",
  "Refund policy",
  "Kids and family policy",
  "Venue ZIP code",
  "Jesse Joe & the 96ers original video files",
] as const;

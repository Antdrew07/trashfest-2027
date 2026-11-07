/**
 * Brand marks, drawn as inline SVG.
 *
 * The flyer's crowns and Texas lockup are raster art we don't have the source
 * for, so they're reconstructed as vectors: they stay crisp at hero size,
 * recolour from the design tokens, and add about 2KB instead of 400.
 */

type SvgProps = React.SVGProps<SVGSVGElement>;

/**
 * Texas outline. Traced from the real border: panhandle, the 103°W and 32°N
 * New Mexico steps, the Red River, the Gulf coast down to the southern tip,
 * and the Rio Grande back up through the Big Bend.
 */
export const TEXAS_PATH =
  "M55 250 L150 250 L150 35 L250 35 L250 140 " +
  "C272 146 292 161 312 158 C332 155 352 168 374 173 " +
  "L393 188 L399 248 L405 292 " +
  "C390 302 369 331 345 356 C320 381 291 420 273 449 L263 463 " +
  "C251 441 241 416 226 401 C212 387 197 369 180 377 " +
  "C166 384 150 357 136 332 C116 302 85 272 55 250 Z";

export function TexasShape({ title, ...props }: SvgProps & { title?: string }) {
  return (
    <svg viewBox="0 0 460 500" aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <path d={TEXAS_PATH} />
    </svg>
  );
}

/** Texas flag rendered inside the state silhouette — the logo lockup mark. */
export function TexasFlagShape({ id = "tx-flag", ...props }: SvgProps & { id?: string }) {
  return (
    <svg viewBox="0 0 460 500" aria-hidden="true" {...props}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={TEXAS_PATH} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width="460" height="500" fill="#f2e6d0" />
        <rect x="0" y="0" width="155" height="500" fill="#002868" />
        <rect x="155" y="250" width="305" height="250" fill="#bf0a30" />
        <path
          d="M77 190l17 52h55l-44 32 17 52-45-32-45 32 17-52-44-32h55z"
          fill="#f2e6d0"
        />
      </g>
      <path
        d={TEXAS_PATH}
        fill="none"
        stroke="#0b0908"
        strokeOpacity="0.5"
        strokeWidth="6"
      />
    </svg>
  );
}

export function StarIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 1.6l3.1 6.9 7.5.8-5.6 5 1.6 7.4-6.6-3.8-6.6 3.8 1.6-7.4-5.6-5 7.5-.8z" />
    </svg>
  );
}

/** Gold crown — the KING half of the brand mark. */
export function CrownKing({ id = "king", ...props }: SvgProps & { id?: string }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d88a" />
          <stop offset="45%" stopColor="#d4a24c" />
          <stop offset="100%" stopColor="#8a5a1c" />
        </linearGradient>
      </defs>
      {/* Band */}
      <rect x="34" y="112" width="132" height="24" rx="4" fill={`url(#${id}-g)`} />
      <rect
        x="34"
        y="112"
        width="132"
        height="24"
        rx="4"
        fill="none"
        stroke="#6e4512"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      {/* Five peaks */}
      <path
        d="M34 112 L46 44 L73 84 L100 30 L127 84 L154 44 L166 112 Z"
        fill={`url(#${id}-g)`}
        stroke="#6e4512"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Peak jewels */}
      <circle cx="46" cy="40" r="8" fill="#bf0a30" stroke="#6e0019" strokeWidth="1.5" />
      <circle cx="154" cy="40" r="8" fill="#bf0a30" stroke="#6e0019" strokeWidth="1.5" />
      <circle cx="100" cy="26" r="9" fill="#002868" stroke="#001334" strokeWidth="1.5" />
      {/* Lone star on the band */}
      <path
        d="M100 115l3.6 8h8.7l-7 5.1 2.7 8.3-8-5.2-8 5.2 2.7-8.3-7-5.1h8.7z"
        fill="#f2e6d0"
      />
    </svg>
  );
}

/**
 * Ruby tiara — the QUEEN half of the brand mark.
 *
 * Drawn as distinct rising points rather than a filled arch: a solid dome
 * reads as a mushroom at hero size, which is exactly what the first pass did.
 */
export function CrownQueen({ id = "queen", ...props }: SvgProps & { id?: string }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="50%" stopColor="#bf0a30" />
          <stop offset="100%" stopColor="#6e0019" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d88a" />
          <stop offset="100%" stopColor="#a9742c" />
        </linearGradient>
      </defs>

      {/* Five rising points: tall centre, flanked by two pairs. */}
      <path
        d="M30 116
           C40 100 46 78 52 56
           L68 86
           C76 62 88 38 100 16
           C112 38 124 62 132 86
           L148 56
           C154 78 160 100 170 116 Z"
        fill={`url(#${id}-g)`}
        stroke="#6e0019"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Openwork scrollwork inside the points */}
      <g fill="none" stroke="#f7d88a" strokeOpacity="0.8" strokeWidth="2.5">
        <path d="M74 112 C80 92 88 76 100 62 C112 76 120 92 126 112" />
        <path d="M52 112 C56 100 60 92 64 86" />
        <path d="M148 112 C144 100 140 92 136 86" />
      </g>

      {/* Band */}
      <rect x="28" y="114" width="144" height="22" rx="11" fill={`url(#${id}-band)`} />
      <rect
        x="28"
        y="114"
        width="144"
        height="22"
        rx="11"
        fill="none"
        stroke="#6e4512"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />

      {/* Gems: centre ruby crowning the tall point, pearls on the others */}
      <circle cx="100" cy="14" r="9" fill="#ff8585" stroke="#6e0019" strokeWidth="2" />
      <circle cx="52" cy="52" r="6" fill="#f7d88a" stroke="#8a5a1c" strokeWidth="1.5" />
      <circle cx="148" cy="52" r="6" fill="#f7d88a" stroke="#8a5a1c" strokeWidth="1.5" />
      <circle cx="68" cy="82" r="4.5" fill="#ffd0d0" />
      <circle cx="132" cy="82" r="4.5" fill="#ffd0d0" />
      <circle cx="100" cy="125" r="6" fill="#bf0a30" stroke="#6e0019" strokeWidth="1.5" />
    </svg>
  );
}

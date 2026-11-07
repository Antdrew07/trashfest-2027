/**
 * "Texas honky-tonk at dusk" — a pure-CSS stage scene.
 *
 * This is the hero's floor, not a fallback afterthought. It renders whenever
 * the headliner clip is still loading, blocked, or suppressed for reduced
 * motion, so the hero has to look finished without it. Dusk sky, stage-light
 * cones cutting through haze, an ember horizon and a crowd silhouette.
 */
export function StageBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Dusk sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0710 0%, #1d0f14 32%, #46170d 62%, #8a2f0f 84%, #c9561c 100%)",
        }}
      />

      {/* Star field, thinning toward the horizon */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 12% 18%, #f2e6d0aa, transparent)," +
            "radial-gradient(1px 1px at 27% 9%, #f2e6d088, transparent)," +
            "radial-gradient(1.5px 1.5px at 41% 24%, #f2e6d099, transparent)," +
            "radial-gradient(1px 1px at 58% 13%, #f2e6d077, transparent)," +
            "radial-gradient(1.5px 1.5px at 73% 21%, #f2e6d0aa, transparent)," +
            "radial-gradient(1px 1px at 86% 7%, #f2e6d088, transparent)," +
            "radial-gradient(1px 1px at 94% 28%, #f2e6d066, transparent)",
        }}
      />

      {/* Ember horizon behind the stage */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 108%, #ff7a2f88 0%, #bf0a3055 38%, transparent 72%)",
        }}
      />

      {/* Stage-light cones cutting through the haze */}
      <div className="absolute inset-0 mix-blend-screen">
        <div
          className="absolute -top-[10%] left-[14%] h-[130%] w-[22%] opacity-35 blur-2xl"
          style={{
            background: "linear-gradient(185deg, #ffb23fcc 0%, transparent 70%)",
            clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          className="absolute -top-[10%] left-[44%] h-[125%] w-[18%] opacity-30 blur-2xl"
          style={{
            background: "linear-gradient(178deg, #f2e6d0bb 0%, transparent 72%)",
            clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          className="absolute -top-[10%] right-[12%] h-[130%] w-[22%] opacity-30 blur-2xl"
          style={{
            background: "linear-gradient(172deg, #ff5a1fcc 0%, transparent 70%)",
            clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* String lights over the stage */}
      <div className="absolute inset-x-0 top-[34%] h-24 opacity-70">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path d="M0 10 Q300 76 600 26 T1200 42" fill="none" stroke="#2a1c14" strokeWidth="2" />
          {Array.from({ length: 22 }, (_, i) => {
            const t = i / 21;
            const x = t * 1200;
            const y = 10 + Math.sin(t * Math.PI * 2.1) * 30 + t * 26;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="8" fill="#ffb23f" opacity="0.18" />
                <circle cx={x} cy={y} r="2.6" fill="#ffd79a" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Crowd + stage silhouette */}
      <div
        className="absolute inset-x-0 bottom-0 h-[26%]"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #0b0908dd 42%, #0b0908 100%)",
        }}
      />
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[22%] w-full"
        aria-hidden="true"
      >
        <path
          d="M0 200 L0 150 Q40 128 70 150 Q100 120 140 148 Q180 116 220 146 Q260 124 300 150
             Q340 118 384 148 Q420 128 460 152 Q500 120 545 146 Q585 126 625 150
             Q665 118 706 148 Q746 130 786 152 Q826 122 868 148 Q908 128 948 150
             Q988 120 1030 148 Q1070 130 1110 150 Q1150 126 1200 148 L1200 200 Z"
          fill="#0b0908"
        />
      </svg>
    </div>
  );
}

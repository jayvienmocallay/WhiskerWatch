type CatSplashProps = {
  isVisible: boolean;
};

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CatSplash({ isVisible }: CatSplashProps) {
  const reducedMotion = prefersReducedMotion();
  const animationClass = reducedMotion ? "" : " splash-body";

  return (
    <div
      aria-hidden={!isVisible}
      inert={!isVisible}
      style={{
        alignItems: "center",
        background: "var(--milk-saucer, #F8FAF7)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        inset: 0,
        justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        position: "fixed",
        transition: "opacity 0.4s ease",
        zIndex: 2000,
      }}
    >
      <svg viewBox="0 0 120 120" width="120" height="120" focusable="false">
        <g className={animationClass.trim()}>
          <path
            className={reducedMotion ? "" : "splash-tail"}
            d="M82 86 C106 85 113 51 92 45 C83 42 79 52 86 57"
            fill="none"
            stroke="#C98B55"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="9"
            style={{ transformOrigin: "83px 84px" }}
          />
          <ellipse cx="60" cy="78" rx="28" ry="22" fill="#C98B55" />
          <ellipse cx="60" cy="86" rx="17" ry="12" fill="#E8B88A" opacity="0.5" />
          <circle cx="60" cy="50" r="24" fill="#C98B55" />
          <polygon points="42,34 35,13 54,28" fill="#C98B55" />
          <polygon points="78,34 85,13 66,28" fill="#C98B55" />
          <polygon points="44,32 39,18 52,29" fill="#E8B88A" />
          <polygon points="76,32 81,18 68,29" fill="#E8B88A" />
          <ellipse
            className={reducedMotion ? "" : "splash-eye-left"}
            cx="52"
            cy="46"
            rx="3"
            ry="4"
            fill="#1F2A24"
          />
          <ellipse
            className={reducedMotion ? "" : "splash-eye-right"}
            cx="68"
            cy="46"
            rx="3"
            ry="4"
            fill="#1F2A24"
          />
          <circle cx="50.9" cy="44.4" r="1" fill="#F8FAF7" />
          <circle cx="66.9" cy="44.4" r="1" fill="#F8FAF7" />
          <polygon points="60,55 56,59 64,59" fill="#E95F45" />
          <path
            d="M60 59 Q57 62.5 54 61 M60 59 Q63 62.5 66 61"
            fill="none"
            stroke="#1F2A24"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <g stroke="#1F2A24" strokeLinecap="round" strokeWidth="1.4" opacity="0.72">
            <line x1="54" y1="60" x2="34" y2="56" />
            <line x1="54" y1="63" x2="34" y2="63" />
            <line x1="66" y1="60" x2="86" y2="56" />
            <line x1="66" y1="63" x2="86" y2="63" />
          </g>
          <ellipse cx="48" cy="96" rx="8" ry="4" fill="#D4A574" />
          <ellipse cx="72" cy="96" rx="8" ry="4" fill="#D4A574" />
        </g>
      </svg>

      <svg viewBox="0 0 160 24" width="160" height="24" focusable="false">
        <clipPath id="fish-progress-clip">
          <rect
            className={reducedMotion ? "" : "fish-progress-fill"}
            x="0"
            y="0"
            width={reducedMotion ? "160" : "0"}
            height="24"
          />
        </clipPath>
        <g
          fill="none"
          stroke="#BFC9C2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        >
          <path d="M18 12H132" />
          <path d="M18 12 8 5M18 12 8 19M132 12l16-8M132 12l16 8" />
          <path d="M52 12 42 4M52 12 42 20M82 12 72 4M82 12 72 20M112 12 102 4M112 12 102 20" />
        </g>
        <g
          clipPath="url(#fish-progress-clip)"
          fill="none"
          stroke="#256F55"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        >
          <path d="M18 12H132" />
          <path d="M18 12 8 5M18 12 8 19M132 12l16-8M132 12l16 8" />
          <path d="M52 12 42 4M52 12 42 20M82 12 72 4M82 12 72 20M112 12 102 4M112 12 102 20" />
        </g>
      </svg>

      <p
        style={{
          color: "var(--night-whisker, #52655C)",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          margin: 0,
        }}
      >
        {reducedMotion ? "Loading..." : "Sniffing out stray cats..."}
      </p>
    </div>
  );
}

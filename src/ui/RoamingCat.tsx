import { useEffect, useRef, useState } from "react";

type CatState = "walking" | "sitting" | "sniffing";
type Direction = "right" | "left";

const SPEED = 1.2;
const MESSAGES = ["Meow!", "Purrrr...", "?!", "Feed me.", "*yawn*"];

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function CatSvg({ catState }: { catState: CatState }) {
  return (
    <svg
      className={`roaming-cat-${catState}`}
      viewBox="0 0 64 40"
      width="64"
      height="40"
      focusable="false"
    >
      <g>
        <ellipse cx="36" cy="26" rx="18" ry="11" fill="#C98B55" />
        <g fill="none" stroke="#9C6A38" strokeWidth="1.2">
          <path d="M28,17 Q30,26 28,35" />
          <path d="M36,16 Q38,26 36,36" />
          <path d="M44,18 Q46,26 44,34" />
        </g>
        <path d="M22,24 Q28,30 28,28 L27,22 Q24,21 22,24" fill="#C98B55" />
        <path
          className="cat-tail"
          d="M54,24 Q64,16 60,8 Q58,4 56,6"
          stroke="#C98B55"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        <g className="cat-head-group">
          <circle cx="16" cy="20" r="12" fill="#C98B55" />
          <path d="M12,10 Q16,14 20,10" stroke="#9C6A38" strokeWidth="1" fill="none" />
          <polygon points="8,12 4,2 14,9" fill="#C98B55" />
          <polygon points="9,11 6,4 13,9" fill="#E8B88A" />
          <polygon points="20,10 22,1 28,9" fill="#C98B55" />
          <polygon points="21,9 23,3 27,9" fill="#E8B88A" />
          <ellipse cx="12" cy="19" rx="3" ry="3.5" fill="#5DBB78" />
          <ellipse cx="12" cy="19" rx="1" ry="2.5" fill="#1F2A24" />
          <ellipse cx="20" cy="17" rx="3" ry="3.5" fill="#5DBB78" />
          <ellipse cx="20" cy="17" rx="1" ry="2.5" fill="#1F2A24" />
          <polygon points="16,22 14,25 18,25" fill="#E95F45" />
          <g stroke="#C98B55" strokeWidth="0.8" strokeLinecap="round">
            <line x1="14" y1="21" x2="2" y2="21" />
            <line x1="14" y1="23" x2="2" y2="23" />
            <line x1="14" y1="25" x2="2" y2="25" />
            <line x1="18" y1="20" x2="30" y2="20" />
            <line x1="18" y1="22" x2="30" y2="22" />
            <line x1="18" y1="24" x2="30" y2="24" />
          </g>
        </g>

        <g className="cat-front-legs">
          <rect x="18" y="33" width="5" height="8" rx="2" fill="#C98B55" />
          <rect x="24" y="33" width="5" height="8" rx="2" fill="#C98B55" />
          <circle cx="20.5" cy="40" r="2.5" fill="#D4A574" />
          <circle cx="26.5" cy="40" r="2.5" fill="#D4A574" />
        </g>
        <g className="cat-back-legs">
          <rect x="44" y="33" width="5" height="8" rx="2" fill="#C98B55" />
          <rect x="50" y="33" width="5" height="8" rx="2" fill="#C98B55" />
          <circle cx="46.5" cy="40" r="2.5" fill="#D4A574" />
          <circle cx="52.5" cy="40" r="2.5" fill="#D4A574" />
        </g>
      </g>
    </svg>
  );
}

export function RoamingCat() {
  const [x, setX] = useState(-80);
  const [direction, setDirection] = useState<Direction>("right");
  const [catState, setCatState] = useState<CatState>("walking");
  const [bubble, setBubble] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const frameRef = useRef<number>(0);
  const directionRef = useRef<Direction>("right");
  const stateRef = useRef<CatState>("walking");
  const flipTimerRef = useRef<number>(0);
  const sniffTimerRef = useRef<number>(0);
  const bubbleTimerRef = useRef<number>(0);
  const lastSniffXRef = useRef(-80);
  const flippingRef = useRef(false);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    stateRef.current = catState;
  }, [catState]);

  useEffect(() => {
    if (reducedMotion) return;

    function scheduleDirectionFlip() {
      if (flippingRef.current) return;
      flippingRef.current = true;
      setCatState("sitting");
      const delay = 2000 + Math.random() * 2000;
      flipTimerRef.current = window.setTimeout(() => {
        setDirection((current) => {
          const next = current === "right" ? "left" : "right";
          directionRef.current = next;
          return next;
        });
        setFlipped((current) => !current);
        setCatState("walking");
        flippingRef.current = false;
      }, delay);
    }

    function maybeSniff(nextX: number) {
      if (stateRef.current !== "walking" || Math.abs(nextX - lastSniffXRef.current) < 120) return;
      lastSniffXRef.current = nextX;
      if (Math.random() >= 0.08) return;
      setCatState("sniffing");
      sniffTimerRef.current = window.setTimeout(() => {
        if (!flippingRef.current) setCatState("walking");
      }, 1500);
    }

    function tick() {
      setX((current) => {
        const viewportWidth = window.innerWidth;
        if (directionRef.current === "right") {
          if (current > viewportWidth + 80) {
            scheduleDirectionFlip();
            return current;
          }
          const next = current + SPEED;
          maybeSniff(next);
          return next;
        }

        if (current < -80) {
          scheduleDirectionFlip();
          return current;
        }
        const next = current - SPEED;
        maybeSniff(next);
        return next;
      });
      frameRef.current = window.requestAnimationFrame(tick);
    }

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(flipTimerRef.current);
      window.clearTimeout(sniffTimerRef.current);
      window.clearTimeout(bubbleTimerRef.current);
    };
  }, [reducedMotion]);

  function handleClick() {
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setBubble(msg);
    window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => setBubble(null), 2000);
  }

  if (reducedMotion) {
    return (
      <div style={{ bottom: 8, pointerEvents: "none", position: "fixed", right: 24, zIndex: 40 }}>
        <button
          type="button"
          aria-label="Roaming cat mascot"
          onClick={handleClick}
          style={{
            background: "transparent",
            color: "inherit",
            minHeight: 0,
            padding: 0,
            pointerEvents: "auto",
          }}
        >
          <CatSvg catState="sitting" />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        bottom: 0,
        height: "56px",
        left: 0,
        overflow: "hidden",
        pointerEvents: "none",
        position: "fixed",
        width: "100vw",
        zIndex: 40,
      }}
    >
      <div
        aria-label="Roaming cat mascot"
        onClick={handleClick}
        role="img"
        style={{
          bottom: "8px",
          cursor: "pointer",
          left: `${x}px`,
          pointerEvents: "auto",
          position: "absolute",
          transform: flipped ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        {bubble ? (
          <div
            style={{
              animation: "bubble-fade 2s ease forwards",
              background: "var(--surface-container-lowest, #fff)",
              border: "1px solid var(--outline-variant, #BFC9C2)",
              borderRadius: "8px 8px 8px 2px",
              bottom: "48px",
              boxShadow: "0 2px 8px rgba(31,42,36,0.12)",
              color: "var(--coal-tabby, #1F2A24)",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              left: "50%",
              padding: "4px 10px",
              pointerEvents: "none",
              position: "absolute",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {bubble}
          </div>
        ) : null}
        <CatSvg catState={catState} />
      </div>
    </div>
  );
}

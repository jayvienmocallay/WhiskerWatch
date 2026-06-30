# WhiskerWatch — Part 3 of 5: Cat Cursor + Splash Loader

## A. `src/ui/CatCursor.tsx` — Custom Paw Cursor Hook

**Export:** `export function useCatCursor(): void`

Two SVG cursors, encoded as base64 data URIs for the CSS `cursor` property. Both 32×32 viewBox. Use explicit hex fills — CSS vars don't work in cursor data URIs.

### Default paw cursor (`--coal-tabby` fill `#1F2A24`)

- Central pad: ellipse `cx=16 cy=20 rx=5 ry=4 fill="#1F2A24"`
- Toe beans (4 small circles, arced above pad):
  - Left outer: `cx=8 cy=14 r=2.8 fill="#1F2A24"`
  - Left inner: `cx=12 cy=11 r=2.8 fill="#1F2A24"`
  - Right inner: `cx=20 cy=11 r=2.8 fill="#1F2A24"`
  - Right outer: `cx=24 cy=14 r=2.8 fill="#1F2A24"`

### Pointer paw cursor (`--moss-collar` fill `#256F55`) — same paw + claws

Same paw shapes but `fill="#256F55"`. Claws (3 thin lines above each toe, ~4px long, angled outward):
- Above left outer toe: three `<line>` elements, `stroke="#256F55"`, `stroke-width="1.2"`
- Above left inner: same
- Above right inner: same (mirrored)
- Above right outer: same (mirrored)

Claw lines fan out at roughly -30°, 0°, +30° angles from toe center.

### Implementation

```typescript
import { useEffect } from 'react';

const PAW_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <ellipse cx="16" cy="20" rx="5" ry="4" fill="#1F2A24"/>
  <circle cx="8" cy="14" r="2.8" fill="#1F2A24"/>
  <circle cx="12" cy="11" r="2.8" fill="#1F2A24"/>
  <circle cx="20" cy="11" r="2.8" fill="#1F2A24"/>
  <circle cx="24" cy="14" r="2.8" fill="#1F2A24"/>
</svg>`;

const PAW_POINTER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <ellipse cx="16" cy="20" rx="5" ry="4" fill="#256F55"/>
  <circle cx="8" cy="14" r="2.8" fill="#256F55"/>
  <circle cx="12" cy="11" r="2.8" fill="#256F55"/>
  <circle cx="20" cy="11" r="2.8" fill="#256F55"/>
  <circle cx="24" cy="14" r="2.8" fill="#256F55"/>
  <!-- Claws: 3 lines per toe, angled out, stroke="#256F55" -->
  <line x1="8" y1="11" x2="6" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="8" y1="11" x2="8" y2="6.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="8" y1="11" x2="10" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="12" y1="8" x2="10" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="12" y1="8" x2="12" y2="3.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="12" y1="8" x2="14" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="8" x2="18" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="8" x2="20" y2="3.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="8" x2="22" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="24" y1="11" x2="22" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="24" y1="11" x2="24" y2="6.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="24" y1="11" x2="26" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;

function svgToDataUri(svg: string): string {
  return `url("data:image/svg+xml;base64,${btoa(svg)}")`;
}

export function useCatCursor(): void {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return; // skip custom cursor entirely

    const defaultUri = svgToDataUri(PAW_DEFAULT_SVG);
    const pointerUri = svgToDataUri(PAW_POINTER_SVG);

    const style = document.createElement('style');
    style.id = 'cat-cursor-style';
    style.textContent = `
      * { cursor: ${defaultUri} 4 4, auto !important; }
      button, a, [role="button"], label,
      .nav-button, .patrol-row, .report-list-item,
      .segmented label, .filter-row label,
      input[type="checkbox"], input[type="radio"],
      select, .cat-tag-popup {
        cursor: ${pointerUri} 4 4, pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById('cat-cursor-style')?.remove();
    };
  }, []);
}
```

Call in `App.tsx` default function: `useCatCursor();`
Import: `import { useCatCursor } from '../ui/CatCursor';`

---

## B. `src/ui/CatSplash.tsx` — Splash Loader Overlay

**Props:** `{ isVisible: boolean }`
The overlay must use opacity transition to fade — never unmount abruptly.

### Full component spec

- Overlay: position fixed, full screen, z-index 1000
- Background: `var(--milk-saucer)` — matches existing body bg base color
- Transition: opacity 0.4s ease, pointer-events none when invisible
- Display: flex, align-items center, justify-content center, flex-direction column, gap 1.5rem

Center content:
1. Sitting cat SVG (described below)
2. Fish-bone progress bar SVG (described below)
3. Text: "Sniffing out stray cats..." 14px Inter 400 `--night-whisker`

### Sitting cat SVG (120×120, all fills use hardcoded hex matching tokens)

Canvas: `viewBox="0 0 120 120"`

| Part | Spec |
|---|---|
| Body oval | `ellipse cx=60 cy=78 rx=28 ry=22 fill="#C98B55"` (`--warm-cardboard`) |
| Head circle | `circle cx=60 cy=46 r=20 fill="#C98B55"` |
| Left ear | `polygon points="42,32 36,18 52,28" fill="#C98B55"` |
| Left inner ear | `polygon points="43,30 39,22 50,28" fill="#E8B88A"` (lighter) |
| Right ear | `polygon points="78,32 84,18 68,28" fill="#C98B55"` |
| Right inner | `polygon points="77,30 81,22 70,28" fill="#E8B88A"` |
| Left eye | `ellipse cx=52 cy=44 rx=4 ry=5 fill="#1F2A24"` (`--coal-tabby`) |
| Left pupil | `ellipse cx=52 cy=44 rx=1.2 ry=3.5 fill="#F8FAF7"` (slit) |
| Right eye | `ellipse cx=68 cy=44 rx=4 ry=5 fill="#1F2A24"` |
| Right pupil | `ellipse cx=68 cy=44 rx=1.2 ry=3.5 fill="#F8FAF7"` |
| Nose | `polygon points="60,53 57,57 63,57" fill="#E95F45"` (`--ginger-alert`) |
| Mouth left | `path d="M57,57 Q54,61 51,60" stroke="#1F2A24" stroke-width=1.5 fill=none` |
| Mouth right | `path d="M63,57 Q66,61 69,60" stroke="#1F2A24" stroke-width=1.5 fill=none` |
| Whiskers L1–3 | three `<line>` elements left of nose, `x1=48` → `28/30/28`, y values `54,57,60` |
| Whiskers R1–3 | mirrored right of nose, `x1=72` → `92/90/92` |
| Tail | `path d="M88,72 Q100,58 92,44 Q86,34 80,42" stroke="#C98B55" stroke-width=6 fill=none stroke-linecap=round` |
| Front legs | two ellipses below body: `cx=50/70, cy=96, rx=6 ry=4 fill="#C98B55"` |
| Paw pads | small circles `rx=1.5` on each leg center (3 toes per paw, tiny dots) |

### Animations (add to `cat-additions.css`)

```css
@keyframes tail-sway {
  0%   { transform: rotate(-12deg); transform-origin: 88px 72px; }
  100% { transform: rotate(12deg);  transform-origin: 88px 72px; }
}
@keyframes cat-breathe {
  0%, 100% { transform: scaleY(1); }
  50%       { transform: scaleY(1.02); transform-origin: center 78px; }
}
@keyframes cat-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95%            { transform: scaleY(0.1); }
}

.splash-tail     { animation: tail-sway 2s ease-in-out infinite alternate; }
.splash-body     { animation: cat-breathe 2s ease-in-out infinite; }
.splash-eye-left,
.splash-eye-right { animation: cat-blink 3s ease-in-out infinite; }
.splash-eye-right { animation-delay: 0.05s; } /* blink together */
```

Apply class names to the relevant SVG elements: `splash-tail` on tail path, `splash-body` on body ellipse group, `splash-eye-left`/`splash-eye-right` on eye ellipses.

### Fish-bone progress bar SVG (220×28)

`viewBox="0 0 220 28"`, all `stroke="#C98B55"`, `stroke-width=2`, `fill=none`

| Part | Spec |
|---|---|
| Spine | `<line x1="10" y1="14" x2="210" y2="14" />` (the backbone) |
| Ribs (4 pairs, evenly spaced at x=52, 92, 132, 172) | Each pair: left rib `(x,14)→(x-10,8)` and `(x,14)→(x-10,20)`; right rib `(x,14)→(x+10,8)` and `(x,14)→(x+10,20)` |
| Tail fin | path at `x=200`: `"M200,14 L210,6 L220,14 L210,22 Z"` `fill="#C98B55" fill-opacity=0.4` |
| Head circle | `circle cx=10 cy=14 r=5 fill="#C98B55" fill-opacity=0.6` |

Progress clip: wrap the entire SVG contents in a `<g>` with `clipPath`:

```xml
<defs>
  <clipPath id="fish-clip">
    <rect x="0" y="0" width="0" height="28">
      <animate attributeName="width" from="0" to="220"
        dur="1.4s" fill="freeze" begin="0s" />
    </rect>
  </clipPath>
</defs>
```

Duplicate the spine/ribs/fin inside a `<g clip-path="url(#fish-clip)">` with `stroke="var(--moss-collar, #256F55)"` — so the green fill sweeps over the cardboard outline, left to right.

### Splash wrapper component structure

```tsx
export function CatSplash({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      aria-hidden={!isVisible}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'var(--milk-saucer, #F8FAF7)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Sitting cat SVG — use className on individual elements */}
      {/* Fish-bone progress bar SVG */}
      <p style={{ fontSize: '14px', color: 'var(--night-whisker, #52655C)',
                  fontFamily: 'Inter, sans-serif', margin: 0 }}>
        Sniffing out stray cats...
      </p>
    </div>
  );
}
```

### Usage in `App.tsx`

```tsx
const [splashDone, setSplashDone] = useState(false);
useEffect(() => {
  const timer = setTimeout(() => setSplashDone(true), 1200);
  return () => clearTimeout(timer);
}, []);
const showSplash = !splashDone || loading;
// In JSX: <CatSplash isVisible={showSplash} />
// Mount above <main className="app-shell">
```

### `prefers-reduced-motion`

Inside `CatSplash`, check:

```tsx
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// If true: don't apply animation classNames on SVG elements
// Show static cat + static fish + "Loading..." text instead
```

---

**Proceed to Part 4 for the roaming cat mascot.**

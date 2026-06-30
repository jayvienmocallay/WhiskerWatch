# WhiskerWatch — Part 4 of 5: Roaming Cat Mascot

**File:** `src/ui/RoamingCat.tsx`
**CSS:** add keyframes + classes to `src/styles/cat-additions.css`

---

## Layout container

Fixed strip at bottom of viewport:

```css
position: fixed; bottom: 0; left: 0;
width: 100vw; height: 56px;
pointer-events: none;
z-index: 40;   /* below Leaflet (z-index 400+), below app header */
```

The cat SVG itself gets `pointer-events: auto` so clicks register.

---

## Cat SVG design (64×40, side-view orange tabby)

`viewBox="0 0 64 40"`, all measurements in this coordinate space. Use hardcoded hex values (no CSS vars — SVG in data context is safer).

### Color palette for the cat

| Part | Color |
|---|---|
| Body/head | `#C98B55` (`--warm-cardboard`) |
| Stripes | `#9C6A38` (darker tabby markings) |
| Inner ears | `#E8B88A` |
| Eyes | `#5DBB78` (`--tabby-green` — gives it characteristic green eyes) |
| Pupils | `#1F2A24` |
| Nose | `#E95F45` (`--ginger-alert`) |
| Paw pads | `#D4A574` |

### Body (facing RIGHT by default; CSS `scaleX(-1)` flips for leftward walk)

| Part | Spec |
|---|---|
| Body oval | `ellipse cx=36 cy=26 rx=18 ry=11 fill="#C98B55"` |
| Tabby stripes on body | 3 thin arcs (path, `stroke="#9C6A38" stroke-width=1.2 fill=none`): Stripe 1 `M28,17 Q30,26 28,35`; Stripe 2 `M36,16 Q38,26 36,36`; Stripe 3 `M44,18 Q46,26 44,34` |
| Head | `circle cx=16 cy=20 r=12 fill="#C98B55"` |
| Head stripe | `path d="M12,10 Q16,14 20,10" stroke="#9C6A38" stroke-width=1 fill=none` |
| Left ear | `polygon points="8,12 4,2 14,9" fill="#C98B55"` |
| Left inner ear | `polygon points="9,11 6,4 13,9" fill="#E8B88A"` |
| Right ear | `polygon points="20,10 22,1 28,9" fill="#C98B55"` |
| Right inner | `polygon points="21,9 23,3 27,9" fill="#E8B88A"` |
| Left eye | `ellipse cx=12 cy=19 rx=3 ry=3.5 fill="#5DBB78"` |
| Left pupil | `ellipse cx=12 cy=19 rx=1 ry=2.5 fill="#1F2A24"` |
| Right eye | `ellipse cx=20 cy=17 rx=3 ry=3.5 fill="#5DBB78"` |
| Right pupil | `ellipse cx=20 cy=17 rx=1 ry=2.5 fill="#1F2A24"` |
| Nose | `polygon points="16,22 14,25 18,25" fill="#E95F45"` |
| Whiskers L | lines from `x=14`: to `(2,21)`, `(2,23)`, `(2,25)` `stroke="#C98B55" sw=0.8` |
| Whiskers R | lines from `x=18`: to `(30,20)`, `(30,22)`, `(30,24)` `stroke="#C98B55" sw=0.8` |
| Neck connector | path from head circle to body oval (filled, same color): `M22,24 Q28,30 28,28` — a smooth bridge shape |

### Legs (4 legs, grouped for animation)

Front leg group (`id="front-legs"`):
- Front left: `rect x=18 y=33 width=5 height=8 rx=2 fill="#C98B55"`
- Front right: `rect x=24 y=33 width=5 height=8 rx=2 fill="#C98B55"`

Back leg group (`id="back-legs"`):
- Back left: `rect x=44 y=33 width=5 height=8 rx=2 fill="#C98B55"`
- Back right: `rect x=50 y=33 width=5 height=8 rx=2 fill="#C98B55"`

Paw pads (small circles at bottom of each leg, `y=40, r=2.5 fill="#D4A574"`)

### Tail

```
path id="roaming-tail"
d="M54,24 Q64,16 60,8 Q58,4 56,6"
stroke="#C98B55" stroke-width=5 fill=none stroke-linecap=round
```

Tail curves up and back from rump.

---

## CSS keyframes (in `cat-additions.css`)

```css
@keyframes cat-walk-front {
  0%   { transform: rotate(20deg);  }
  25%  { transform: rotate(0deg);   }
  50%  { transform: rotate(-20deg); }
  75%  { transform: rotate(0deg);   }
  100% { transform: rotate(20deg);  }
}
@keyframes cat-walk-back {
  0%   { transform: rotate(-20deg); }
  25%  { transform: rotate(0deg);   }
  50%  { transform: rotate(20deg);  }
  75%  { transform: rotate(0deg);   }
  100% { transform: rotate(-20deg); }
}
@keyframes cat-body-bob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-2px); }
}
@keyframes roaming-tail-sway {
  0%, 100% { transform: rotate(-8deg); transform-origin: 54px 24px; }
  50%       { transform: rotate(8deg);  transform-origin: 54px 24px; }
}
@keyframes sniff-head {
  0%, 100% { transform: rotate(0deg);    transform-origin: 16px 20px; }
  50%       { transform: rotate(18deg);  transform-origin: 16px 20px; }
}
@keyframes sniff-tail-up {
  0%, 100% { transform: rotate(0deg);   transform-origin: 54px 24px; }
  50%       { transform: rotate(-50deg); transform-origin: 54px 24px; }
}
@keyframes sit-tail-curl {
  0%   { transform: rotate(0deg);   transform-origin: 54px 24px; }
  100% { transform: rotate(80deg);  transform-origin: 54px 24px; }
}
```

### CSS state classes (apply to the cat SVG's container `<g>`)

```css
.roaming-cat-walking #front-legs { animation: cat-walk-front 0.5s linear infinite; transform-origin: 21px 33px; }
.roaming-cat-walking #back-legs  { animation: cat-walk-back  0.5s linear infinite; transform-origin: 47px 33px; }
.roaming-cat-walking             { animation: cat-body-bob 0.5s ease-in-out infinite; }
.roaming-cat-walking #roaming-tail { animation: roaming-tail-sway 0.8s ease-in-out infinite; }

.roaming-cat-sniffing .cat-head  { animation: sniff-head 1.5s ease-in-out 1; }
.roaming-cat-sniffing #roaming-tail { animation: sniff-tail-up 1.5s ease-in-out 1; }

.roaming-cat-sitting #front-legs { transform: scaleY(0.4) translateY(16px); transform-origin: 21px 33px; transition: transform 0.4s ease; }
.roaming-cat-sitting #back-legs  { transform: scaleY(0.4) translateY(16px); transform-origin: 47px 33px; transition: transform 0.4s ease; }
.roaming-cat-sitting #roaming-tail { animation: sit-tail-curl 0.5s ease forwards; }

@media (prefers-reduced-motion: reduce) {
  .roaming-cat-walking,
  .roaming-cat-walking #front-legs,
  .roaming-cat-walking #back-legs,
  .roaming-cat-walking #roaming-tail { animation: none !important; }
}
```

---

## React component logic (`RoamingCat.tsx`)

### State

- `x: number` — current x position in px (starts at -80)
- `direction: 'right'|'left'` — walking direction
- `state: 'walking'|'sitting'|'sniffing'`
- `bubble: string|null` — active speech bubble text
- `flipped: boolean` — true when walking left (apply `scaleX(-1)`)

The speech bubble messages array:

```js
["Meow!", "Purrrr...", "?!", "Feed me.", "*yawn*"]
```

### Movement logic (useEffect with requestAnimationFrame)

```js
const SPEED = 1.2;           // px per frame at 60fps
const VIEWPORT_W = () => window.innerWidth;

function tick() {
  setX(prev => {
    if (direction === 'right') {
      if (prev > VIEWPORT_W() + 80) {
        // reached right edge: sit, pause 2–4s, then go left
        scheduleDirectionFlip();
        return prev;
      }
      // 8% chance per 120px of travel to sniff (throttled)
      maybeSniff(prev);
      return prev + SPEED;
    } else {
      if (prev < -80) {
        scheduleDirectionFlip();
        return prev;
      }
      return prev - SPEED;
    }
  });
}
```

`scheduleDirectionFlip()`:
1. Set state to `'sitting'`
2. After 2000–4000ms (random): flip direction, set `flipped = !flipped`, set state to `'walking'`

`maybeSniff(x)`:
Throttle: only check every 120px of travel (use a ref to track last sniff x). If `Math.random() < 0.08` and `state === 'walking'`: set state to `'sniffing'`. After 1500ms, set state back to `'walking'`.

### `prefers-reduced-motion` check at mount

```tsx
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
  // Render cat statically at bottom right, no movement
  return (
    <div style={{ position: 'fixed', bottom: 8, right: 24,
                  zIndex: 40, pointerEvents: 'none' }}>
      <CatSvg catState="sitting" onClick={handleClick} />
    </div>
  );
}
```

### Speech bubble (renders above cat when `bubble !== null`)

```tsx
{bubble && (
  <div style={{
    position: 'absolute',
    bottom: '48px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--surface-container-lowest, #fff)',
    border: '1px solid var(--outline-variant, #BFC9C2)',
    borderRadius: '8px 8px 8px 2px',
    padding: '4px 10px',
    fontSize: '12px',
    fontFamily: 'Inter, sans-serif',
    color: 'var(--coal-tabby, #1F2A24)',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(31,42,36,0.12)',
    animation: 'bubble-fade 2s ease forwards',
    pointerEvents: 'none',
  }}>
    {bubble}
  </div>
)}
```

Add to `cat-additions.css`:

```css
@keyframes bubble-fade {
  0%   { opacity: 0; transform: translateX(-50%) translateY(4px); }
  15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
  75%  { opacity: 1; }
  100% { opacity: 0; }
}
```

### Click handler

```tsx
function handleClick() {
  const messages = ["Meow!", "Purrrr...", "?!", "Feed me.", "*yawn*"];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  setBubble(msg);
  setTimeout(() => setBubble(null), 2000);
}
```

### Full component shell

```tsx
export function RoamingCat() {
  // ... state and refs
  // check reducedMotion first (see above)
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0,
                  width: '100vw', height: '56px',
                  pointerEvents: 'none', zIndex: 40, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: `${x}px`,
        transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
        onClick={handleClick}
        role="img"
        aria-label="Roaming cat mascot"
      >
        {/* Speech bubble */}
        {/* Cat SVG with state class: roaming-cat-{state} */}
        <svg className={`roaming-cat-${catState}`} /* ... */>
          {/* Cat SVG paths from above */}
        </svg>
      </div>
    </div>
  );
}
```

---

**Proceed to Part 5 for final integration and the CSS file.**

# WhiskerWatch — Part 5 of 5: Integration & CSS File

## A. New CSS file: `src/styles/cat-additions.css`

Create this file with ALL new keyframes and classes for the three new components. Import it in `src/main.tsx` AFTER the existing imports:

```ts
import './styles/cat-additions.css'
```

Contents of `cat-additions.css` (consolidate all keyframes from Parts 3 & 4):

```css
/* ── SPLASH LOADER ───────────────────────────── */
@keyframes tail-sway {
  0%   { transform: rotate(-12deg); }
  100% { transform: rotate(12deg); }
}
@keyframes cat-breathe {
  0%, 100% { transform: scaleY(1); }
  50%       { transform: scaleY(1.02); }
}
@keyframes cat-blink {
  0%, 88%, 100% { transform: scaleY(1); }
  93%            { transform: scaleY(0.08); }
}
.splash-tail      { animation: tail-sway 2s ease-in-out infinite alternate; }
.splash-body      { animation: cat-breathe 2s ease-in-out infinite; }
.splash-eye-left  { animation: cat-blink 3.2s ease-in-out infinite; transform-origin: 52px 44px; }
.splash-eye-right { animation: cat-blink 3.2s ease-in-out infinite 0.05s; transform-origin: 68px 44px; }

/* ── ROAMING CAT ─────────────────────────────── */
@keyframes cat-walk-front {
  0%   { transform: rotate(20deg); }
  50%  { transform: rotate(-20deg); }
  100% { transform: rotate(20deg); }
}
@keyframes cat-walk-back {
  0%   { transform: rotate(-20deg); }
  50%  { transform: rotate(20deg); }
  100% { transform: rotate(-20deg); }
}
@keyframes cat-body-bob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-2px); }
}
@keyframes roaming-tail-sway {
  0%, 100% { transform: rotate(-8deg); }
  50%       { transform: rotate(8deg); }
}
@keyframes sniff-head-down {
  0%, 100% { transform: rotate(0deg); }
  40%, 60% { transform: rotate(20deg); }
}
@keyframes sniff-tail-up {
  0%, 100% { transform: rotate(0deg); }
  40%, 60% { transform: rotate(-55deg); }
}
@keyframes sit-tail-curl {
  to { transform: rotate(85deg); }
}
@keyframes bubble-fade {
  0%   { opacity: 0; transform: translateX(-50%) translateY(6px); }
  15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
  80%  { opacity: 1; }
  100% { opacity: 0; }
}

.roaming-cat-walking                  { animation: cat-body-bob 0.5s ease-in-out infinite; }
.roaming-cat-walking .cat-front-legs  { animation: cat-walk-front 0.5s linear infinite; transform-origin: 21px 33px; }
.roaming-cat-walking .cat-back-legs   { animation: cat-walk-back  0.5s linear infinite; transform-origin: 47px 33px; }
.roaming-cat-walking .cat-tail        { animation: roaming-tail-sway 0.8s ease-in-out infinite; transform-origin: 54px 24px; }
.roaming-cat-sniffing .cat-head-group { animation: sniff-head-down 1.5s ease-in-out 1 forwards; transform-origin: 16px 20px; }
.roaming-cat-sniffing .cat-tail       { animation: sniff-tail-up 1.5s ease-in-out 1 forwards; transform-origin: 54px 24px; }
.roaming-cat-sitting .cat-front-legs  { transform: scaleY(0.35) translateY(20px); transition: transform 0.4s ease; transform-origin: 21px 33px; }
.roaming-cat-sitting .cat-back-legs   { transform: scaleY(0.35) translateY(20px); transition: transform 0.4s ease; transform-origin: 47px 33px; }
.roaming-cat-sitting .cat-tail        { animation: sit-tail-curl 0.5s ease forwards; transform-origin: 54px 24px; }

/* ── REDUCED MOTION OVERRIDES ────────────────── */
@media (prefers-reduced-motion: reduce) {
  .splash-tail, .splash-body, .splash-eye-left, .splash-eye-right,
  .roaming-cat-walking, .roaming-cat-walking .cat-front-legs,
  .roaming-cat-walking .cat-back-legs, .roaming-cat-walking .cat-tail,
  .roaming-cat-sniffing .cat-head-group, .roaming-cat-sniffing .cat-tail,
  .roaming-cat-sitting .cat-tail {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## B. `App.tsx` integration diff

Add these imports at the top of `src/app/App.tsx`:

```tsx
import { useCatCursor } from '../ui/CatCursor';
import { CatSplash } from '../ui/CatSplash';
import { RoamingCat } from '../ui/RoamingCat';
```

Inside the `App()` function body, before the return:

```tsx
useCatCursor();
const [splashDone, setSplashDone] = useState(false);
useEffect(() => {
  const t = setTimeout(() => setSplashDone(true), 1200);
  return () => clearTimeout(t);
}, []);
const showSplash = !splashDone || loading;
```

In the JSX return, wrap the existing `<main>` and add components:

```tsx
return (
  <>
    <CatSplash isVisible={showSplash} />
    <main className="app-shell">
      {/* all existing content unchanged */}
    </main>
    <RoamingCat />
  </>
);
```

> **Critical:** Do NOT change anything inside `<main className="app-shell">`. The entire existing render tree stays identical. You are only adding wrapper siblings above and below.

---

## C. `src/main.tsx` import order

The import order in `main.tsx` must be:

```ts
import './styles.css'               // existing, do not touch
import './styles/design-system.css' // existing, do not touch
import './styles/responsive.css'    // existing, do not touch
import './styles/cat-additions.css' // ADD THIS LINE (new)
```

---

## D. Final validation checklist

Run these commands and confirm all pass before finishing:

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
```

Verify manually:

- [ ] Splash appears on first load, fades after ≥1.2s
- [ ] Cat tail swishes, eyes blink, fish-bone progress bar fills left→right
- [ ] Cursor shows paw (default) and clawed paw (hover on buttons/links)
- [ ] Roaming cat walks across the full viewport bottom
- [ ] Cat flips direction at each edge and pauses
- [ ] Clicking cat shows random speech bubble, fades after 2s
- [ ] Cat sniffs mid-walk (tail up, head down) ~8% of crossings
- [ ] `prefers-reduced-motion`: no splash animation, no cursor, cat is static
- [ ] All 3 surfaces (workbench, success, patrol) unchanged visually
- [ ] No z-index conflicts: cat strip (40) stays below Leaflet (400+) and app header; splash (1000) covers everything temporarily
- [ ] Mobile (≤820px): cat strip does not push up the page content (it is `position: fixed` so it floats — but add `padding-bottom: 56px` to `.app-shell` to prevent content being hidden under the cat strip)
- [ ] No new TypeScript errors in `icons.tsx` — `IconShell` wrapper unchanged
- [ ] `markerHtml()` returns a valid SVG string (not JSX, not template literals with unescaped quotes — use single quotes inside the SVG string)
- [ ] Stitch parity contract: workspace layout, header, nav, all panels, condition chips, status chips, copy strings — all unchanged

---

## E. Known constraints to respect

1. No new npm packages. Zero. Use only what's in `package.json`.
2. No new CSS variable names. Only `--coal-tabby`, `--moss-collar`, etc.
3. No Tailwind. Plain CSS modules or inline styles only for new files.
4. All SVG fills use hardcoded hex in cursor + marker contexts (where CSS vars cannot be resolved by Leaflet or data URIs). Use CSS vars only inside React component inline styles and `cat-additions.css` where the `design-system.css` `:root` is in scope.
5. The existing body background radial-gradient dot pattern already creates a subtle paw-trail texture. Do not add another background layer.
6. The `.ww-logo-mark` CSS ears (`::before`/`::after` pseudo-elements) already render cat ears on the logo badge. Your SVG face inside the mark must fit within the 44px (desktop) / 40px (mobile) badge circle and not interfere with the existing border-radius or box-shadow.
7. Leaflet map controls have z-index 1000 by default in some themes. The roaming cat strip is z-index 40 — well below Leaflet. `CatSplash` at z-index 1000 only renders for ≤2s; it must not trap focus — use `aria-hidden={!isVisible}` and `inert` when not visible.
8. The `patrol-dashboard` and `success-view` have `max-width: 1480px` and use `padding: 1rem`. The roaming cat strip sits outside this container.
9. TypeScript: `RoamingCat` uses `requestAnimationFrame` — type it as `number` for the ref (`useRef<number>(0)`) and call `cancelAnimationFrame` on cleanup.
10. Do not add a `<React.StrictMode>` wrapper if it isn't already there — double-invocation in dev mode will cause the cat to spawn twice.

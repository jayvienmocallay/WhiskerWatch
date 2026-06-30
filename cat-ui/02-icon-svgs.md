# WhiskerWatch UI Enhancement — Part 2 of 5: SVG Icon Upgrades

**File:** `src/ui/icons.tsx`
**Action:** Replace text-only stubs with inline SVGs. Keep all existing exports, component names, the `IconShell` wrapper, and the prop interface.

---

## SVG shell pattern (use for all icons below)

All SVGs must follow:

```
viewBox="0 0 20 20"
width="1em" height="1em"
fill="currentColor"
aria-hidden="true"
focusable="false"
```

The `IconShell` wrapper already sets `aria-hidden`/`aria-label` — do not add extra aria attributes on the SVG element itself.

---

## Icon designs (implement in exact SVG path terms)

### 1. `CollarTagIcon` — collar tag shape
A rounded rect body (`rx=3`) with two small rectangular prong notches cut from the top edge (simulate with a path or layered rects). A small circle near the bottom center (the ring hole). Proportions: tag body 14×10 centered, ring circle `r=1.5` at bottom.

### 2. `PawDropIcon` — map pin with paw
Teardrop/pin outline: a circle top + pointed bottom (like an inverted drop), stroke-based or path. Inside: a central pad oval + three toe beans arranged in an arc above it. All filled. Pin point at `y=18`, circle top center at `y=7`, radius ~5.

### 3. `WhiskerDivider` — three whisker lines
Three horizontal `<line>` elements, all centered:
- Top line: `x1=4 x2=16` (short)
- Middle line: `x1=2 x2=18` (long, slightly thicker stroke)
- Bottom line: `x1=4 x2=16` (short)

`stroke="currentColor"`, `stroke-width` 1–1.5, `stroke-linecap="round"`. Use `<line>` not `<path>`. No fill needed.

### 4. `AlertEarIcon` — alert triangle with cat ears
A triangle outline (equilateral, pointing up, centered). Two smaller filled triangles at the top two corners angled outward (left ear tilted left ~20°, right ear tilted right ~20°). Exclamation: short rect + circle dot inside the main triangle.

### 5. `FoodBowlIcon` — bowl with fish
Half-circle arc at bottom (a `<path>` semicircle, open top). Two short "rim" lines extending horizontally from the arc ends. Above the bowl: a small fish silhouette (oval body + triangular forked tail fin pointing left). Fish is centered above bowl.

### 6. `HelpedPawIcon` — open paw facing up
Central pad: large oval (`rx=3 ry=2.5`), centered slightly low. Four toe beans: four small circles (`r=1.8`) arranged in an arc above the central pad, slightly splayed. All filled, no outline needed.

### 7. `CatHeadMarkerIcon` — cat head silhouette
Circle head centered at `(10,11)`, radius ~7. Two pointed ear triangles above: left at roughly `(5,5)–(3,1)–(8,4)`, right at `(12,4)–(17,1)–(15,5)`. Fill same as circle. Two small dot eyes: circles `r=1` at `(7.5,9)` and `(12.5,9)`. Small triangle nose at `(10,12)`. This matches the existing `.cat-marker` clip-path aesthetic.

### 8. `WatchEyeIcon` — eye with whiskers
Almond eye: two arcs forming a pointed oval shape (or use `clip-path` ellipse), centered, ~12×7 outer dims. Inner iris: filled circle `r=2` centered. Three whisker lines each side: short horizontal strokes extending left from `(3,10)` and right from `(17,10)`, spaced 2px apart vertically.

### 9. `MoonTailIcon` — crescent moon + tail
Crescent: a circle with a slightly offset inner circle subtracted (use `fill-rule` or two overlapping circles with background fill). Moon positioned upper-center. Tail: an S-shaped `<path>` curving from lower-center downward and right, then back left, stroke-only (no fill), `stroke-width=1.5`, `stroke-linecap=round`.

### 10. `CameraCatEyeIcon` — camera with cat iris
Camera body: rounded rect (`rx=2`), ~14×10, centered. Lens circle: circle `r=3.5` centered in body. Inside lens: an ellipse with `rx=1 ry=2.5` (vertical slit pupil). Small viewfinder rect at top-right of body. All filled.

### 11. `TailSignalIcon` — upright S-curve cat tail
A single `<path>` stroke (no fill), `stroke-width=2`, `stroke-linecap=round`, `stroke-linejoin=round`. Starts at bottom-center `(10,18)`, curves up-left to `(6,12)`, then curves up-right to `(13,6)`, ending in a small curl right `(15,4)`. Resembles an upright confident cat tail.

---

## Also upgrade: `WhiskerWatchLogo` (`src/ui/icons.tsx`)

The existing logo uses a CSS-only mark ("WW" text in a styled span). The CSS already renders cat ears via `::before`/`::after`. Keep that CSS. But replace the "WW" text content of `.ww-logo-mark` with a small inline SVG cat face (24×24, white fill) so it reads as an icon, not text:

**SVG cat face for logo mark (white fill):**
- Circle head `r=9`, centered `(12,13)`
- Left ear: filled triangle `(5,7)→(3,1)→(10,6)`
- Right ear: filled triangle `(14,6)→(19,1)→(19,7)` (mirrored)
- Left eye: ellipse `rx=1.2 ry=1.5` at `(9,11)`
- Right eye: ellipse `rx=1.2 ry=1.5` at `(15,11)`
- Nose: small filled triangle at `(12,14)`
- Three whiskers each side: stroke lines, white, 0.8px, opacity 0.7

Fill all shapes white (`#FFFFFF`). The background moss-collar comes from CSS.

Keep `.ww-logo-wordmark` "WhiskerWatch" text unchanged.

---

## Marker HTML upgrade: `src/map/markers.ts`

Update `markerHtml(condition)` to return an SVG string (not JSX — this goes into Leaflet's `L.divIcon` `html` property, which takes a string).

The SVG (36×36, inline string, no JSX):

- `viewBox="0 0 36 36"`, `width="36"`, `height="36"`
- Background fill circle: `cx=18 cy=18 r=16`
  - Color per condition (hardcoded hex, not CSS var — Leaflet strips vars):
    - `healthy` → `fill="#5DBB78"`
    - `injured` → `fill="#E95F45"`
    - `needs_food` → `fill="#F2C14E"`
- Cat-head shape: same fill (slightly darker, achieved with opacity): two ear triangles + head circle + two dot eyes
- Condition symbol text at center bottom (for non-SVG fallback):
  ```xml
  <text x="18" y="32" text-anchor="middle" font-size="8"
    font-weight="900" fill="#1F2A24" font-family="Inter,sans-serif">
    {conditionVocabulary[condition].symbol shortened to 3 chars}
  </text>
  ```
- White border: the existing `.marker` CSS already adds `border: 3px solid white`
- Keep the `span.marker-ear` and `span.marker-symbol` wrappers removed; return just the SVG string directly.

Keep `markerClass()`, `markerAccessibleName()`, `markerSymbol()` unchanged. The `.cat-marker` clip-path polygon in `design-system.css` already cuts the SVG to a cat-head shape — the SVG just fills it.

---

**Proceed to Part 3 for the cursor and splash loader.**

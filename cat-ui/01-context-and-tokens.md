# WhiskerWatch UI Enhancement — Part 1 of 5: Context & Tokens

You are a senior UI engineer enhancing the WhiskerWatch codebase.

**Repo:** https://github.com/jayvienmocallay/WhiskerWatch
**Stack:** React 19.2 + TypeScript 5.9 + Vite + Leaflet 1.9.4 + Firebase

**Your goal:** Add a roaming cat mascot, cat-paw cursor, and cat splash loader to the existing app — without changing any existing component logic, copy strings, token names, test files, or the Stitch parity contract.

---

## Existing file structure (read-only reference)

```
src/
├── app/
│   ├── App.tsx              ← mount new components here only
│   └── routes.tsx           ← do not touch
├── features/reports/
│   ├── components/
│   │   ├── ReportDetail.tsx
│   │   ├── ReportFilters.tsx
│   │   ├── ReportForm.tsx
│   │   ├── ReportSuccess.tsx
│   │   └── PatrolLogs.tsx
│   ├── hooks/useReports.ts
│   ├── reportTypes.ts       ← do not touch
│   ├── reportValidation.ts  ← do not touch
│   └── reportService.ts     ← do not touch
├── map/
│   ├── CatMap.tsx
│   ├── markers.ts           ← upgrade markerHtml() only
│   ├── mapFilters.ts        ← do not touch
│   └── locationPrivacy.ts   ← do not touch
├── ui/
│   ├── copy.ts              ← do not touch
│   ├── designTokens.ts      ← do not touch
│   ├── icons.tsx            ← upgrade stubs to SVG
│   ├── states.tsx           ← do not touch
│   └── statusVocabulary.ts  ← do not touch
├── styles.css               ← do not touch
└── styles/
    ├── design-system.css    ← do not touch
    └── responsive.css       ← do not touch
```

**New files you will create:**

```
src/ui/CatCursor.tsx           ← custom paw cursor hook
src/ui/CatSplash.tsx           ← splash/loader overlay
src/ui/RoamingCat.tsx          ← ambient walking cat mascot
src/styles/cat-additions.css   ← all new CSS (keyframes, cursor, roaming)
```

---

## Design token reference (from design-system.css + designTokens.ts)

| CSS variable name | Hex value | Purpose in existing UI |
|---|---|---|
| `--coal-tabby` | `#1F2A24` | primary text, dark fills |
| `--moss-collar` | `#256F55` | primary action, CTA, submit |
| `--porch-leaf` | `#DDEADF` | calm surfaces, selected chips |
| `--milk-saucer` | `#F8FAF7` | app background |
| `--tuna-gold` | `#F2C14E` | focus ring, nav selected underline |
| `--ginger-alert` | `#E95F45` | injured/urgent markers & chips |
| `--tabby-green` | `#5DBB78` | healthy markers & chips |
| `--night-whisker` | `#52655C` | secondary text, muted labels |
| `--warm-cardboard` | `#C98B55` | header underline, dividers, eyebrow |
| `--soft-salmon` | `#F9D4CD` | injured surface backgrounds |
| `--surface` | `#F7FAF6` | base page surface |
| `--surface-container-lowest` | `#FFFFFF` | panel card background |
| `--surface-container-low` | `#F1F4F0` | patrol rows, secondary fills |
| `--surface-container` | `#ECEFEB` | — |
| `--surface-container-high` | `#E6E9E5` | — |
| `--outline` | `#6F7973` | borders |
| `--outline-variant` | `#BFC9C2` | soft borders |
| `--radius-base` | `8px` | all components use this |

### Typography (Inter only — no other font)

- `h1`: 32px / 700 / lh 40px (desktop), 28px mobile
- `h2`: 24px / 700 / lh 32px
- `.panel-title`: 20px / inherit / lh 28px
- body: 16px / 400 / lh 24px
- `.eyebrow`: 12px / 800 / uppercase / color `--warm-cardboard`
- `.hint`: 14px / 400 / color `--night-whisker`

### Layout breakpoints

- `>1180px`: 3-column workspace grid (320px | 1fr | 360px)
- `820–1180px`: 2-column + detail full-width
- `<820px`: single column, flex-direction column — `.map-stack` order:1, `.sidebar` order:2, `.detail-pane` order:3

### Existing keyframe (do not duplicate)

```css
@keyframes whisker-sweep — translateX(0→5px→0), 1.4s, used by .state-loading
```

### Focus ring (used everywhere, do not change)

```css
outline: 2px solid var(--tuna-gold, #f2c14e);
outline-offset: 2px;
```

### Existing body background (do not change)

```css
radial-gradient(circle at 12px 14px, rgb(201 139 85 / 9%) 0 2px, transparent 3px)
  0 0 / 72px 72px
+ linear-gradient(135deg, --milk-saucer, #eef6f0)
```

This creates a subtle paw-dot tile pattern — already present.

### Logo CSS (already has cat ears via `::before`/`::after`, do not change)

- `.ww-logo-mark` → moss-collar background, `border-radius: 999px 999px 999px 10px`
- `::before`/`::after` → rotated squares forming ear points, positioned top-left/right

---

## Existing copy strings (do not rephrase anything)

### `src/ui/copy.ts` — `formCopy`

| Key | Value |
|---|---|
| `missingLocation` | "Choose a map location before submitting this report." |
| `missingCondition` | "Choose the cat condition before submitting this report." |
| `invalidPhoto` | "Use a JPEG, PNG, or WebP image that is 5 MB or less." |
| `unsafeNotes` | "Keep notes focused on the cat and public location context. Remove contact details or unsafe rescue instructions." |
| `duplicatePending` | "This report is already being submitted." |
| `submitSuccess` | "Report submitted. Helpers can now see it on the map." |
| `networkFailure` | "The report could not be saved. Check your connection and try again." |
| `safetyGuidance` | "Do not include phone numbers, email addresses, exact home addresses, or unsafe rescue instructions." |

### `src/ui/copy.ts` — `pageCopy`

| Key | Value |
|---|---|
| `eyebrow` | "Community cat watch" |
| `dek` | "Report stray or lost cats so nearby helpers can notice urgent cases faster." |
| `logoLabel` | "WhiskerWatch neighborhood lookout" |
| `successTitle` | "Help Signal Sent" |
| `successMessage` | "Report submitted. Helpers can now see it on the map." |
| `createAnother` | "Create another report" |
| `continueMonitoring` | "Continue monitoring" |
| `noReports` | "No reports match this view." |
| `selectReport` | "Select a report marker to inspect details." |

### `src/app/routes.tsx` — nav labels

- `workbench` → "The Territory"
- `patrol` → "Patrol Logs"

---

## Stitch parity contract constraints

From `specs/003-stitch-parity-copy/contracts/ui-parity-contract.md`:

The 3 surfaces (workbench, success, patrol) must remain at 95% visual parity with the Stitch reference. Your new additions must:

- Never add new full-width panels or cards inside the 3-column workspace
- Never change `.workspace` grid-template-columns or `.app-header` layout
- Never alter z-index of `.app-header`, `.map-panel`, or Leaflet controls
- Never change panel titles, condition chip classes, or status chip classes
- All new elements must use `position: fixed` (for overlay/cursor) or be appended outside `.app-shell` (for roaming cat) to avoid layout reflow
- New z-index values: `CatSplash` = 1000, `CatCursor` overlay = none needed, `RoamingCat` strip = 40 (below Leaflet's z-index 400+)

---

**Proceed to Part 2 for the SVG icon specifications.**

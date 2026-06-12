# Implementation Plan: WhiskerWatch Cat Report Map

**Branch**: `001-cat-report-map` | **Date**: 2026-06-11 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-cat-report-map/spec.md`; visual direction from `/DESIGN.md`

## Summary

Build the WhiskerWatch MVP as a responsive web app where visitors can submit stray or lost cat reports by dropping a map pin, selecting a condition, optionally attaching one photo, and seeing submitted reports on an interactive map. The plan uses React for the client, Firebase for persistence and image storage, and Leaflet.js for map interaction. The interface must follow the catsy design system in `/DESIGN.md`: warm, alert, practical, cat-centered, and accessible without becoming childish.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.2

**Primary Dependencies**: React, Firebase modular JavaScript SDK, Leaflet 1.9.4 stable, React Leaflet, Vite, Vitest, Testing Library, Playwright

**Storage**: Firebase Firestore for cat report records; Firebase Storage for report photos

**Testing**: Vitest and Testing Library for unit/component tests; Playwright for end-to-end report/map flows; Firebase Emulator Suite for persistence and storage contract testing

**Target Platform**: Modern desktop and mobile web browsers

**Project Type**: Single-page web application

**Performance Goals**: Initial usable map view in under 3 seconds on a typical broadband connection; report submission feedback in under 2 seconds after network acceptance; smooth interaction with 100 visible reports; photo uploads constrained before transfer

**Constraints**: Open visitor reporting for MVP; no reporter contact details displayed; one optional photo per report; location precision must balance usefulness and safety; duplicate submissions disabled while pending; WCAG AA contrast and keyboard operability required; visual design must follow `/DESIGN.md` tokens, motifs, and responsive workbench behavior

**Scale/Scope**: MVP supports one public map experience, report creation, report detail inspection, condition/status filtering, and up to 100 visible reports without clustering as a hard requirement

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Community Safety and Data Integrity**: PASS. The data model will require location, condition, status, timestamp, and source context; photos and notes are optional and validated; no reporter contact details are collected or displayed.
- **Code Quality and Maintainability**: PASS. The app will use typed feature modules for reports, map display, upload handling, Firebase access, validation, and shared UI vocabulary.
- **Testing for Rescue-Critical Flows**: PASS. Tests will cover report creation, validation failures, map rendering, filtering, photo validation/upload paths, duplicate submission prevention, and Firebase emulator persistence contracts.
- **Consistent, Accessible UX**: PASS. The plan defines shared condition/status labels, marker semantics, loading/error/empty states, keyboard access, screen-reader labels, and responsive layouts.
- **Performance and Reliability**: PASS. The plan defines measurable load/map/submission/upload targets, bounded photo validation, limited query scope, pending states, and failure recovery.

## Visual Design Direction

The implemented experience MUST use `/DESIGN.md` as the visual design source of truth for the map, report form, filters, report detail, user states, and responsive layout.

### Catsy Design System Requirements

- **Brand feel**: warm neighborhood lookout, caring and cat-centered, with rescue-aware urgency. Cat motifs should be subtle and functional: ears, whisker dividers, paw marks, collar tags, food bowls, and windowsill cues.
- **Palette**: use the named design tokens from `DESIGN.md`: Coal Tabby, Moss Collar, Porch Leaf, Milk Saucer, Tuna Gold, Ginger Alert, Tabby Green, Night Whisker, Warm Cardboard, and Soft Salmon. Avoid an overly green or brown one-note interface.
- **Typography and density**: keep the app as a practical dispatch workbench. Use compact headings and readable labels inside panels; do not convert the map app into a marketing landing page.
- **Shape**: preserve 8px panel/input/button radius. Use cat-ear notches sparingly on selected condition badges or marker states, not on every container.
- **Iconography**: markers, chips, and controls should use familiar icons plus cat-specific symbols. Icon meanings must have accessible text equivalents and must not rely on color alone.
- **Motion**: use only small purposeful motion, such as a whisker sweep or paw-dot loading cue, and respect reduced-motion preferences.

### Feature-Level Visual Mapping

- **App shell**: keep the three-zone workbench. Add a windowsill-style header underline and subtle low-opacity paw trail or map texture background.
- **Map**: treat the center panel as "The Territory"; use cat-head report markers with condition-specific symbols, a paw/collar-ring selected-location cue, compact cat-tag popups, and collar-tag visible report list items.
- **Report form**: style as a "Rescue Note" with a whisker/clipboard accent, cat-signal segmented condition badges, clear note safety guidance, and a Moss Collar submit button with icon+text.
- **Filters**: condition filters follow "Scent Trail Filters"; status filters follow "Watch Stages". Chips must include label, icon/symbol, border/shape state, and color.
- **Report detail**: style as a "Cat Case Card" with condition/status chips, whisker divider rhythm, approximate-location collar-tag label, optional photo as a snapshot patch, and safe notes.
- **States**: loading uses a subtle whisker sweep or paw dots; empty states use a quiet windowsill/collar-tag motif; success uses helped-paw/collar-tag check; errors use Ginger Alert and alert-ear styling without playful copy.
- **Responsive layout**: desktop keeps left form/filter, center map/list, right detail. Mobile stacks map first, selected feedback, form, filters, then detail, with stable wrapping chips and useful map height.

### Visual Verification Gates

- Design review MUST verify every visual token in `DESIGN.md` is represented or intentionally deferred.
- Playwright or manual screenshots MUST cover desktop and mobile seeded states: no reports, 25 reports, selected report detail, validation error, success, and filter-empty state.
- Accessibility review MUST confirm marker/chip/icon meanings are available through text or accessible names, not color alone.
- Any deferred design opportunity from `DESIGN.md` MUST be captured in tasks or documented as out of scope.

## Project Structure

### Documentation (this feature)

```text
specs/001-cat-report-map/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- firestore-storage-contract.md
|   `-- ui-flow-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- App.tsx
|   `-- routes.tsx
|-- features/
|   `-- reports/
|       |-- components/
|       |-- hooks/
|       |-- reportTypes.ts
|       |-- reportValidation.ts
|       `-- reportService.ts
|-- map/
|   |-- CatMap.tsx
|   |-- markers.ts
|   `-- mapFilters.ts
|-- firebase/
|   |-- client.ts
|   |-- reportsRepository.ts
|   `-- storageRepository.ts
|-- ui/
|   |-- designTokens.ts
|   |-- icons.tsx
|   |-- statusVocabulary.ts
|   `-- states.tsx
|-- styles/
|   |-- design-system.css
|   `-- responsive.css
`-- test/
    |-- fixtures/
    `-- setup.ts

tests/
|-- contract/
|-- integration/
|-- unit/
`-- e2e/
```

**Structure Decision**: Use a single React web app with Firebase as the managed backend. Keep feature logic in `src/features/reports`, map-specific presentation in `src/map`, Firebase integration in `src/firebase`, cross-cutting UI vocabulary and catsy iconography in `src/ui`, and design-system CSS in `src/styles`.

## Complexity Tracking

No constitution violations are planned.

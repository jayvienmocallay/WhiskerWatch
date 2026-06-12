# Implementation Plan: Stitch Parity Copy

**Branch**: `003-stitch-parity-copy` | **Date**: 2026-06-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-stitch-parity-copy/spec.md`; authoritative design source is Stitch MCP project `WhiskerWatch Rescue Design System` (`projects/9176750856770961097`).

## Summary

Copy the WhiskerWatch Stitch reference as faithfully as possible across every meaningful screen, component, token, responsive state, and interaction state. This is stricter than the previous design-reference adoption: implementation must inventory the Stitch project, map every visible and hidden/alternate screen instance, extract concrete design details from Stitch HTML/screenshots, apply refinements in the existing React app, and document any accepted deviation. The current React/Firebase/Leaflet architecture remains in place; the work is a parity refinement over the existing workbench, success, and patrol log product surfaces.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19.2

**Primary Dependencies**: React, Firebase modular JavaScript SDK, Leaflet 1.9.4, React Leaflet, Vite, Vitest, Testing Library, Playwright, ESLint, Prettier

**Storage**: Existing Firebase Firestore and Firebase Storage repositories remain unchanged. This feature does not add new persistence; it reuses report data, seeded test reports, and in-memory fixtures for parity validation.

**Testing**: Vitest and Testing Library for token/component behavior; Playwright for desktop/mobile visual structure, route flow, accessibility, and 100-report performance checks. Manual or screenshot-based review is required for exact Stitch visual parity because the authoritative design is external to the app.

**Target Platform**: Modern desktop and mobile web browsers

**Project Type**: Single-page web application

**Performance Goals**: Workbench and patrol logs remain responsive with 100 visible reports; route/state changes do not reload persisted report context; map interaction and list scanning remain usable without visible blocking during normal browsing.

**Constraints**: Preserve privacy-safe approximate locations, safe notes validation, no reporter contact details, keyboard operability, WCAG AA contrast, non-color cues, and serious urgent/error tone. Copying Stitch details must not turn the product into a marketing page or reduce rescue-adjacent scan speed.

**Scale/Scope**: One public app with three product surfaces: workbench, report success, and patrol logs. Stitch desktop/mobile variants map to responsive states of those surfaces. Hidden and alternate Stitch screen instances must be inventoried and classified.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Community Safety and Data Integrity**: PASS. The feature preserves the existing report model, validation, approximate location behavior, optional photo handling, and safety guidance. No new personal data collection is planned.
- **Code Quality and Maintainability**: PASS. Changes stay within existing app, report components, map modules, shared UI tokens, styles, fixtures, and tests. New planning artifacts add traceability rather than new runtime architecture.
- **Testing for Rescue-Critical Flows**: PASS. The plan requires automated coverage for report creation, validation errors, map/report display, route navigation, accessibility, and large-list performance.
- **Consistent, Accessible UX**: PASS. Stitch parity is bounded by shared condition/status vocabulary, token consistency, responsive behavior, keyboard access, screen-reader labels, and WCAG AA contrast.
- **Performance and Reliability**: PASS. The plan includes 100-report validation, stable loading/error/empty states, and preservation of duplicate-submission safeguards.

## Phase 0: Research

See [research.md](./research.md).

Research decisions cover the parity workflow, screen inventory source, token ownership, component anatomy, visual verification strategy, hidden screen handling, and deviation policy.

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md), [screen-inventory.md](./screen-inventory.md), [quickstart.md](./quickstart.md), and [contracts/ui-parity-contract.md](./contracts/ui-parity-contract.md).

The design artifacts define parity entities, screen mappings, required component families, visual review expectations, and runnable validation scenarios.

## Project Structure

### Documentation (this feature)

```text
specs/003-stitch-parity-copy/
|-- plan.md
|-- spec.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- screen-inventory.md
|-- contracts/
|   `-- ui-parity-contract.md
|-- checklists/
|   `-- requirements.md
`-- tasks.md              # Created by /speckit-tasks, not by this plan
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
|       |   |-- ReportDetail.tsx
|       |   |-- ReportFilters.tsx
|       |   |-- ReportForm.tsx
|       |   |-- ReportSuccess.tsx
|       |   `-- PatrolLogs.tsx
|       |-- hooks/
|       |-- reportTypes.ts
|       |-- reportValidation.ts
|       `-- reportService.ts
|-- map/
|   |-- CatMap.tsx
|   |-- markers.ts
|   `-- mapFilters.ts
|-- ui/
|   |-- copy.ts
|   |-- designTokens.ts
|   |-- icons.tsx
|   |-- states.tsx
|   `-- statusVocabulary.ts
|-- styles.css
|-- styles/
|   |-- design-system.css
|   `-- responsive.css
`-- test/
    `-- fixtures/

tests/
|-- contract/
|-- e2e/
|-- integration/
`-- unit/
```

**Structure Decision**: Keep the single React app structure. The implementation should refine existing route/page state, shared UI tokens, report components, map marker rendering, CSS, fixtures, and tests. Do not add a router, design library, or rendering framework unless implementation proves the current structure cannot meet the parity contract.

## Post-Design Constitution Check

- **Community Safety and Data Integrity**: PASS. Data entities keep privacy, source context, validation, and safety guidance as invariants. Deviation records must justify any difference from Stitch when safety requires it.
- **Code Quality and Maintainability**: PASS. The data model and contract define traceable parity records and reusable component families without new persistence or architectural layers.
- **Testing for Rescue-Critical Flows**: PASS. Quickstart and contract require unit, integration, e2e, accessibility, performance, and documented visual review coverage.
- **Consistent, Accessible UX**: PASS. The contract requires non-color cues, focus visibility, screen-reader naming, responsive parity, and WCAG AA checks.
- **Performance and Reliability**: PASS. Validation includes 100-report workbench/patrol scenarios and stable loading/error/empty states.

## Complexity Tracking

No constitution violations are planned.

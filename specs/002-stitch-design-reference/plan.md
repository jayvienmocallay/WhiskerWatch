# Implementation Plan: Stitch Design Reference Adoption

**Branch**: `002-stitch-design-reference` | **Date**: 2026-06-11 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-stitch-design-reference/spec.md`; design source from Stitch MCP project `WhiskerWatch Rescue Design System`

## Summary

Adopt the Stitch MCP project "WhiskerWatch Rescue Design System" as the design reference for the WhiskerWatch app. The work aligns the existing cat report map MVP with the Stitch visual system, then adds the product surfaces represented by the Stitch screens: workbench dashboard, report success state, and patrol logs dashboard. The plan keeps the current React/Firebase/Leaflet architecture and treats this feature as a design-system and product-surface implementation over the existing rescue-critical reporting workflow.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.2

**Primary Dependencies**: React, Firebase modular JavaScript SDK, Leaflet 1.9.4, React Leaflet, Vite, Vitest, Testing Library, Playwright

**Storage**: Existing Firebase Firestore and Firebase Storage repositories remain unchanged; this feature reuses report data and does not add new persistence requirements.

**Testing**: Vitest and Testing Library for token/component behavior; Playwright for desktop/mobile workbench, success, patrol logs, accessibility, and 100-report performance validation.

**Target Platform**: Modern desktop and mobile web browsers

**Project Type**: Single-page web application

**Performance Goals**: Workbench and patrol logs remain usable with 100 visible reports; desktop and mobile routes load without visible blocking during normal browsing; page/state changes preserve map/report context without unnecessary reloads.

**Constraints**: Preserve privacy-safe approximate locations, safe notes validation, no reporter contact details, keyboard operability, WCAG AA contrast, and rescue-aware urgent/error tone. The app must remain a practical workbench, not a marketing landing page.

**Scale/Scope**: One public app with three product surfaces: workbench, report success, and patrol logs. Stitch desktop/mobile variants map to responsive states of those surfaces.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Community Safety and Data Integrity**: PASS. This feature preserves existing report data rules, approximate location display, safe notes, and validation. No new personal data collection is introduced.
- **Code Quality and Maintainability**: PASS. Changes stay within existing app, report component, map, shared UI, and style boundaries. New route/page concepts are documented and reusable.
- **Testing for Rescue-Critical Flows**: PASS. The tasks include automated tests for changed report display, validation styling, navigation, map/report interaction, accessibility, and performance.
- **Consistent, Accessible UX**: PASS. Shared tokens, vocabulary, state patterns, markers, focus treatment, and responsive layouts are part of the foundational work.
- **Performance and Reliability**: PASS. The plan keeps existing bounded report data usage and includes validation for 100 visible reports, stable loading/error states, and duplicate-submission preservation.

## Phase 0: Research

See [research.md](./research.md).

Research decisions cover route modeling, Stitch screen mapping, token ownership, icon strategy, responsive behavior, and verification scope.

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), and [contracts/ui-screen-contract.md](./contracts/ui-screen-contract.md).

The design artifacts define the design-reference entities, the screen-to-page contract, validation states, and runnable acceptance scenarios.

## Project Structure

### Documentation (this feature)

```text
specs/002-stitch-design-reference/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- screen-map.md
|-- design-verification.md
|-- implementation-notes.md
|-- contracts/
|   `-- ui-screen-contract.md
|-- checklists/
|   `-- requirements.md
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
|-- styles/
|   |-- design-system.css
|   `-- responsive.css
`-- test/
    `-- fixtures/

tests/
|-- e2e/
|-- integration/
`-- unit/
```

**Structure Decision**: Keep the single React app structure. Add only the missing report success and patrol log components, route/page metadata, design tokens, CSS, and tests required by the Stitch reference. Do not introduce a new router dependency unless implementation proves the current in-app page state cannot satisfy the contract.

## Post-Design Constitution Check

- **Community Safety and Data Integrity**: PASS. The data model explicitly keeps safety guidance and approximate location behavior as invariant component patterns.
- **Code Quality and Maintainability**: PASS. Contracts and data model define reusable design tokens, product pages, and component patterns without new architectural layers.
- **Testing for Rescue-Critical Flows**: PASS. Quickstart and tasks include report submission success, validation error, patrol scan, accessibility, and performance checks.
- **Consistent, Accessible UX**: PASS. UI contracts require non-color condition/status cues, accessible names, focus visibility, and responsive screen mappings.
- **Performance and Reliability**: PASS. Quickstart includes 100-report validation and stable state checks.

## Complexity Tracking

No constitution violations are planned.

---
description: "Task list for WhiskerWatch Cat Report Map implementation"
---

# Tasks: WhiskerWatch Cat Report Map

**Input**: Design documents from `/specs/001-cat-report-map/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Tests**: Required for rescue-critical report creation, display, filtering, upload, validation, and persistence flows by the project constitution.

**Organization**: Tasks are grouped by user story so each story can be implemented, tested, and demonstrated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and has no dependency on incomplete tasks
- **[Story]**: Which user story this task belongs to, used only in user story phases
- All tasks include concrete target paths

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the React/Firebase/Leaflet project and test tooling.

- [X] T001 Create Vite React TypeScript project scaffold in package.json, index.html, tsconfig.json, vite.config.ts, and src/main.tsx
- [X] T002 Install runtime dependencies for React, Firebase modular SDK, Leaflet, and React Leaflet in package.json
- [X] T003 Install development dependencies for Vitest, Testing Library, Playwright, Firebase tools, ESLint, Prettier, and TypeScript checks in package.json
- [X] T004 [P] Configure ESLint and Prettier in eslint.config.js and .prettierrc
- [X] T005 [P] Configure Vitest and Testing Library setup in vitest.config.ts and src/test/setup.ts
- [X] T006 [P] Configure Playwright browser tests in playwright.config.ts and tests/e2e/
- [X] T007 [P] Add npm scripts for dev, build, lint, typecheck, test, test:e2e, test:contract, and firebase:emulators in package.json
- [X] T008 [P] Create environment variable template for Firebase web config and emulator usage in .env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared types, Firebase access, map shell, UI vocabulary, validation, and fixtures required by every story.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T009 Create app shell and route container in src/app/App.tsx and src/app/routes.tsx
- [X] T010 [P] Define CatReport, Condition, ReportStatus, ReportPhoto, SourceContext, and MapFilter types in src/features/reports/reportTypes.ts
- [X] T011 [P] Define shared condition/status labels, marker semantics, and state copy in src/ui/statusVocabulary.ts and src/ui/states.tsx
- [X] T012 [P] Implement report validation helpers for location, condition, status, photo metadata, notes, and duplicate submission keys in src/features/reports/reportValidation.ts
- [X] T013 [P] Configure Firebase app initialization and emulator connection handling in src/firebase/client.ts
- [X] T014 Implement Firestore report repository read/create contracts in src/firebase/reportsRepository.ts
- [X] T015 Implement Firebase Storage photo upload contract and validation handoff in src/firebase/storageRepository.ts
- [X] T016 [P] Define Leaflet marker icons, accessible marker labels, and condition marker metadata in src/map/markers.ts
- [X] T017 [P] Define default map filter state, filter predicates, and approximate-location display helper in src/map/mapFilters.ts and src/map/locationPrivacy.ts
- [X] T018 [P] Create reusable test fixtures for reports, photos, map locations, and Firebase emulator data in src/test/fixtures/reports.ts
- [X] T019 [P] Add Firebase emulator configuration and baseline Firestore/Storage rules files in firebase.json, firestore.rules, firestore.indexes.json, and storage.rules

**Checkpoint**: Foundation ready; user story implementation can now begin.

---

## Phase 3: User Story 1 - Report a Cat Sighting (Priority: P1) MVP

**Goal**: A visitor can choose a cat location, select a condition, optionally attach one valid photo, submit the report, and see it appear on the map.

**Independent Test**: Open the app, select a map location, choose a condition, submit a report with and without a photo, and confirm the resulting marker and detail data are correct.

### Tests for User Story 1

- [X] T020 [P] [US1] Add contract tests for valid report creation, missing location, missing condition, unsupported condition, contact field rejection, valid photo upload, oversized photo rejection, and out-of-scope photo path rejection in tests/contract/reportCreation.contract.test.ts
- [X] T021 [P] [US1] Add unit tests for report validation, photo validation, note length, contact-pattern rejection, unsafe-note handling, and duplicate submission key behavior in tests/unit/reportValidation.test.ts
- [X] T022 [P] [US1] Add component tests for the report form required fields, photo errors, pending state, success state, and retryable failure state in tests/integration/reportForm.test.tsx
- [X] T023 [P] [US1] Add Playwright flow for selecting a map point, submitting a report, preventing duplicate clicks, and seeing the new marker in tests/e2e/report-sighting.spec.ts

### Implementation for User Story 1

- [X] T024 [P] [US1] Build report creation form with condition selector, optional photo input, non-personal notes field, note privacy guidance, validation messages, and submit states in src/features/reports/components/ReportForm.tsx
- [X] T025 [P] [US1] Build map pin selection behavior for creating a report in src/map/CatMap.tsx
- [X] T026 [US1] Implement report creation orchestration including photo upload, Firestore create, idempotency key, pending state, and rollback-safe errors in src/features/reports/reportService.ts
- [X] T027 [US1] Connect ReportForm and CatMap into the app shell so submitted reports appear immediately after creation in src/app/App.tsx
- [X] T028 [US1] Add user-readable loading, success, missing-field, upload failure, network failure, and duplicate-submission states in src/ui/states.tsx and src/features/reports/components/ReportForm.tsx
- [X] T029 [US1] Update Firestore and Storage rules to enforce public create/read constraints for US1 in firestore.rules and storage.rules

**Checkpoint**: User Story 1 is independently functional and demonstrable as the MVP.

---

## Phase 4: User Story 2 - Monitor Nearby Reports (Priority: P2)

**Goal**: A volunteer or shelter worker can view multiple reports on the map, distinguish urgent conditions, and inspect details for a selected report.

**Independent Test**: Load seeded reports, scan the map for condition-specific markers, open a marker detail, and verify the detail content.

### Tests for User Story 2

- [X] T030 [P] [US2] Add component tests for marker rendering, accessible marker labels, approximate location display, condition marker treatment, empty state, and report detail content in tests/integration/reportMap.test.tsx
- [X] T031 [P] [US2] Add repository tests for reading active reports and excluding closed reports by default in tests/contract/reportRead.contract.test.ts
- [X] T032 [P] [US2] Add Playwright monitoring flow for loading 25 mixed reports, identifying injured reports, and opening report details in tests/e2e/monitor-reports.spec.ts

### Implementation for User Story 2

- [X] T033 [US2] Implement active report subscription/query logic with bounded report loading in src/features/reports/hooks/useReports.ts
- [X] T034 [US2] Render active report markers with accessible condition/status labels in src/map/CatMap.tsx
- [X] T035 [P] [US2] Build report detail panel showing photo, condition, status, approximate location derived from privacy helper, submission time, and safe notes in src/features/reports/components/ReportDetail.tsx
- [X] T036 [US2] Add map/list empty and loading states for report monitoring in src/app/App.tsx and src/ui/states.tsx
- [X] T037 [US2] Add seeded report fixture loader for local and e2e monitoring scenarios in src/test/fixtures/seedReports.ts

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Find Relevant Reports Quickly (Priority: P3)

**Goal**: Users can filter visible reports by condition and status, including clear empty states and reset behavior.

**Independent Test**: Load reports with multiple conditions/statuses, apply condition/status filters, verify only matching reports remain visible, then reset filters.

### Tests for User Story 3

- [X] T038 [P] [US3] Add unit tests for condition/status filter predicates, active status defaults, and closed-report exclusion in tests/unit/mapFilters.test.ts
- [X] T039 [P] [US3] Add component tests for filter controls, no-match empty state, and reset behavior in tests/integration/reportFilters.test.tsx
- [X] T040 [P] [US3] Add Playwright flow for filtering injured reports, filtering to no results, and resetting filters in tests/e2e/filter-reports.spec.ts

### Implementation for User Story 3

- [X] T041 [P] [US3] Build condition and status filter controls using shared vocabulary in src/features/reports/components/ReportFilters.tsx
- [X] T042 [US3] Connect MapFilter state to report markers and any report list in src/app/App.tsx and src/map/mapFilters.ts
- [X] T043 [US3] Add no-match empty state and reset filter action in src/features/reports/components/ReportFilters.tsx and src/ui/states.tsx
- [X] T044 [US3] Ensure report marker and detail selection behavior stays stable when filters change in src/map/CatMap.tsx

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify quality, accessibility, performance, documentation, and release readiness across all stories.

- [X] T045 [P] Add responsive layout styling for mobile and desktop map/report workflows in src/app/App.css or src/styles.css
- [X] T046 [P] Add accessibility checks for keyboard navigation, focus states, control labels, error associations, and non-color-only marker meaning in tests/e2e/accessibility.spec.ts
- [X] T047 [P] Add performance smoke test for 100 visible reports, filter response, marker selection, and pre-upload photo validation in tests/e2e/performance.spec.ts
- [X] T048 [P] Document Firebase setup, emulator usage, environment variables, and manual smoke validation in README.md
- [X] T049 Run npm run lint and fix issues in affected source and test files
- [X] T050 Run npm run typecheck and fix type errors in affected source and test files
- [X] T051 Run npm run test and fix unit/component/contract failures in affected source and test files
- [X] T052 Run npm run test:e2e and fix browser-flow failures in affected source and test files
- [X] T053 Validate quickstart steps in specs/001-cat-report-map/quickstart.md against the implemented app and update only if commands changed

---

## Phase 7: Catsy Design System Alignment

**Purpose**: Bring the existing implemented map, report form, filters, report detail, states, and responsive layout into alignment with `/DESIGN.md`.

- [X] T054 [P] Create catsy CSS token variables for Coal Tabby, Moss Collar, Porch Leaf, Milk Saucer, Tuna Gold, Ginger Alert, Tabby Green, Night Whisker, Warm Cardboard, Soft Salmon, 8px radii, shadows, and reduced-motion defaults in src/styles/design-system.css
- [X] T055 [P] Create responsive layout rules for desktop three-zone workbench, tablet map-first layout, mobile stack order, stable chip wrapping, and useful mobile map height in src/styles/responsive.css
- [X] T056 Import src/styles/design-system.css and src/styles/responsive.css from src/main.tsx while preserving existing Leaflet and app styles
- [X] T057 [P] Implement reusable accessible catsy symbols for CollarTagIcon, PawDropIcon, WhiskerDivider, AlertEarIcon, FoodBowlIcon, HelpedPawIcon, CatHeadMarkerIcon, WatchEyeIcon, MoonTailIcon, and CameraCatEyeIcon in src/ui/icons.tsx
- [X] T058 [P] Export catsy design token names and condition/status visual metadata for icons, labels, tones, and non-color cues in src/ui/designTokens.ts and src/ui/statusVocabulary.ts
- [X] T059 Update app shell to the Neighborhood Lookout treatment with compact header, collar-tag eyebrow cue, windowsill underline, low-opacity paw-trail/map-texture background, and no landing-page hero behavior in src/app/App.tsx and src/styles/design-system.css
- [X] T060 Update shared state components to support Quiet Windowsill empty states, Whisker Sweep loading, Help Signal success, and Alert Ear error variants with accessible text in src/ui/states.tsx and src/styles/design-system.css
- [X] T061 Update selected-location display to Paw Drop treatment with approximate coordinate chip, paw/collar-ring cue, Tuna Gold focus styling, and no exact-address language in src/features/reports/components/ReportForm.tsx and src/styles/design-system.css
- [X] T062 Update map report marker creation to use CatHeadMarkerIcon-style HTML, condition-specific non-color symbols, selected whisker-ring state, and accessible condition/status names in src/map/markers.ts and src/map/CatMap.tsx
- [X] T063 Update map panel, Leaflet popup, selected marker behavior, and visible report list to Territory and Collar Tags styling with stable item height, hover/focus lift, and double-line selected collar-ring border in src/map/CatMap.tsx and src/styles/design-system.css
- [X] T064 Update ReportForm to Rescue Note styling with whisker/clipboard header accent, clean grouped inputs, camera/cat-eye file upload area, safe-paws notes guidance, Moss Collar submit button with icon+text, pending whisker sweep, helped-paw success, and Ginger Alert validation styling in src/features/reports/components/ReportForm.tsx and src/styles/design-system.css
- [X] T065 Update condition selection controls to Three Cat Signals with Healthy tail/calm cue, Injured alert-ear cue, Needs Food bowl cue, selected ear notch, stable sizing, and text labels in src/features/reports/components/ReportForm.tsx and src/styles/design-system.css
- [X] T066 Update ReportFilters to Scent Trail Filters and Watch Stages with condition trail marks, status icons, active non-color borders, stable chip sizing, and collar-tag secondary reset button in src/features/reports/components/ReportFilters.tsx and src/styles/design-system.css
- [X] T067 Update ReportDetail to Cat Case Card styling with condition/status chip header, whisker divider rhythm, snapshot photo treatment, collar-tag definition labels, approximate-location label, submitted-time label, and safe-notes treatment in src/features/reports/components/ReportDetail.tsx and src/styles/design-system.css
- [X] T068 [P] Update unit/component tests for catsy design metadata, marker symbols, accessible marker names, and approximate-location visual contract in tests/unit/mapFilters.test.ts and tests/integration/reportMap.test.tsx
- [X] T069 [P] Update report form component tests for Rescue Note structure, condition signal labels, safe-paws notes guidance, error styling text, pending state, and helped-paw success text in tests/integration/reportForm.test.tsx
- [X] T070 [P] Update filter component tests for scent trail condition filters, watch-stage status filters, non-color selected state labels, and collar-tag reset behavior in tests/integration/reportFilters.test.tsx
- [X] T071 [P] Add Playwright design-system coverage for seeded desktop map, selected report detail, validation error, submit success, filter-empty state, and mobile stack order in tests/e2e/design-system.spec.ts
- [X] T072 [P] Add Playwright reduced-motion and keyboard-focus checks for Tuna Gold focus outlines, visible chip focus, report list focus, and disabled/reduced catsy motion in tests/e2e/accessibility.spec.ts
- [X] T073 Run npm run lint and npm run typecheck after catsy design implementation and fix issues in affected source and test files
- [X] T074 Run npm run test, npm run test:e2e, and npm run build after catsy design implementation and fix regressions in affected source and test files
- [X] T075 Validate every Catsy Design System Check in specs/001-cat-report-map/quickstart.md against the local app and document any deferred DESIGN.md future opportunities in specs/001-cat-report-map/design-deferrals.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2 and is the MVP.
- **User Story 2 (Phase 4)**: Depends on Phase 2; can be built after or alongside US1 once shared report creation fixtures exist, but demo value is strongest after US1.
- **User Story 3 (Phase 5)**: Depends on Phase 2 and report loading from US2.
- **Polish (Phase 6)**: Depends on all desired user stories.
- **Catsy Design System Alignment (Phase 7)**: Depends on completed implementation and the visual direction in `/DESIGN.md`.

### User Story Dependencies

- **US1 - Report a Cat Sighting**: Independent MVP after foundational infrastructure.
- **US2 - Monitor Nearby Reports**: Can use seeded fixtures independently, but naturally complements US1-created reports.
- **US3 - Find Relevant Reports Quickly**: Depends on visible report data and marker/list rendering from US2.

### Within Each User Story

- Tests come before implementation.
- Types and validation precede service orchestration.
- Repository/storage contracts precede UI integration.
- A story is complete only when its independent test passes.

---

## Parallel Opportunities

- Setup tasks T004-T008 can run in parallel after T001-T003.
- Foundational tasks T010-T013 and T016-T019 can run in parallel after T009.
- US1 tests T020-T023 can run in parallel.
- US2 tests T030-T032 can run in parallel.
- US3 tests T038-T040 can run in parallel.
- Polish tasks T045-T048 can run in parallel.
- Design alignment tasks T054-T055, T057-T058, T068-T072 can run in parallel where file ownership does not overlap.

## Parallel Example: User Story 1

```bash
Task: "T020 [US1] Add contract tests in tests/contract/reportCreation.contract.test.ts"
Task: "T021 [US1] Add unit tests in tests/unit/reportValidation.test.ts"
Task: "T022 [US1] Add component tests in tests/integration/reportForm.test.tsx"
Task: "T023 [US1] Add Playwright flow in tests/e2e/report-sighting.spec.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T030 [US2] Add map/detail component tests in tests/integration/reportMap.test.tsx"
Task: "T031 [US2] Add read contract tests in tests/contract/reportRead.contract.test.ts"
Task: "T032 [US2] Add monitoring e2e flow in tests/e2e/monitor-reports.spec.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T038 [US3] Add filter unit tests in tests/unit/mapFilters.test.ts"
Task: "T039 [US3] Add filter component tests in tests/integration/reportFilters.test.tsx"
Task: "T040 [US3] Add filter e2e flow in tests/e2e/filter-reports.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundational infrastructure.
3. Complete Phase 3 for report creation.
4. Validate US1 independently with contract, component, and e2e tests.
5. Demo creating a cat report and seeing it appear on the map.

### Incremental Delivery

1. Deliver US1 for community reporting.
2. Add US2 so volunteers and shelters can monitor reports.
3. Add US3 so users can focus on relevant reports.
4. Complete polish checks before release.

### Quality Gates

- No story is complete until its automated tests pass.
- No implementation is ready until lint, typecheck, unit/component tests, contract tests, e2e tests, accessibility checks, and performance smoke checks pass.
- Catsy design alignment is complete only when `DESIGN.md` tokens, feature identities, responsive order, accessibility requirements, and state treatments are validated through tests or quickstart review.
- Any deviation from the constitution must be recorded in plan.md before implementation continues.

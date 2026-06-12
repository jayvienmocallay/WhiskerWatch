# Tasks: Stitch Design Reference Adoption

**Input**: Design documents from `/specs/002-stitch-design-reference/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, and `contracts/ui-screen-contract.md` are available for this feature.

**Tests**: Tests are REQUIRED because this feature changes rescue-critical report display, navigation, state, accessibility, and responsive behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase when file paths do not overlap
- **[Story]**: User story label from `spec.md`
- Every task includes an exact target file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the design-reference implementation baseline and make the active feature easy to verify.

- [X] T001 Verify the feature plan, research, data model, UI contract, and quickstart are mutually aligned in `specs/002-stitch-design-reference/implementation-notes.md`
- [X] T002 [P] Add the Stitch screen mapping and route inventory to `specs/002-stitch-design-reference/screen-map.md`
- [X] T003 [P] Add design verification notes for colors, typography, spacing, buttons, cards, inputs, navigation, and states in `specs/002-stitch-design-reference/design-verification.md`
- [X] T004 [P] Review and record the current app file ownership for design adoption in `specs/002-stitch-design-reference/implementation-notes.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared tokens, vocabulary, route model, and test scaffolding that MUST be complete before user story work.

**Critical**: No user story work should begin until this phase is complete.

- [X] T005 Normalize Stitch color, typography, radius, spacing, and focus tokens in `src/ui/designTokens.ts`
- [X] T006 Mirror the normalized Stitch tokens as CSS custom properties in `src/styles/design-system.css`
- [X] T007 Repair mojibake or ambiguous glyphs and add accessible icon primitives in `src/ui/icons.tsx`
- [X] T008 Update condition and status vocabulary to use Stitch labels, cues, and icon references in `src/ui/statusVocabulary.ts`
- [X] T009 Define app page IDs, navigation labels, and post-submit targets in `src/app/routes.tsx`
- [X] T010 Add shared state variants for loading, empty, success, and serious error treatments in `src/ui/states.tsx`
- [X] T011 [P] Add reusable seeded reports needed for workbench, success, patrol log, empty, and 100-report states in `src/test/fixtures/seedReports.ts`
- [X] T012 [P] Add design-system unit coverage for token and vocabulary integrity in `tests/unit/designTokens.test.ts`

**Checkpoint**: Foundation ready; user stories can now be implemented.

---

## Phase 3: User Story 1 - Apply the WhiskerWatch Visual System (Priority: P1) MVP

**Goal**: The existing reporting/map experience visibly matches the Stitch WhiskerWatch design system on desktop and mobile.

**Independent Test**: Open the main reporting experience on desktop and mobile; verify Stitch colors, Inter typography, 8px-radius controls, compact workbench density, component states, and responsive stacking.

### Tests for User Story 1

- [X] T013 [P] [US1] Add desktop visual-system assertions for app shell, cards, buttons, inputs, chips, markers, and states in `tests/e2e/design-system.spec.ts`
- [X] T014 [US1] Add mobile stacking and no-overflow assertions for map, selected feedback, form, filters, and detail in `tests/e2e/design-system.spec.ts`
- [X] T015 [P] [US1] Add component interaction coverage for form controls, condition signals, safety guidance, and validation styling in `tests/integration/reportForm.test.tsx`
- [X] T016 [P] [US1] Add component interaction coverage for filter chips, status chips, and reset styling in `tests/integration/reportFilters.test.tsx`
- [X] T017 [P] [US1] Add map marker and visible report list visual semantics coverage in `tests/integration/reportMap.test.tsx`

### Implementation for User Story 1

- [X] T018 [US1] Refactor the main app shell, header, workspace regions, and selected feedback placement in `src/app/App.tsx`
- [X] T019 [P] [US1] Apply Stitch workbench base styles, typography, buttons, cards, inputs, focus, and state styles in `src/styles.css`
- [X] T020 [P] [US1] Apply Stitch component styles for panels, condition signals, filters, markers, collar tags, and detail cards in `src/styles/design-system.css`
- [X] T021 [P] [US1] Apply Stitch desktop and mobile spacing rules, three-zone layout, and mobile map-first stacking in `src/styles/responsive.css`
- [X] T022 [P] [US1] Update the Rescue Note form markup and state placement in `src/features/reports/components/ReportForm.tsx`
- [X] T023 [P] [US1] Update Scent Trail and Watch Stage filter markup in `src/features/reports/components/ReportFilters.tsx`
- [X] T024 [P] [US1] Update Cat Case Card detail markup, chips, photo frame, and safe notes treatment in `src/features/reports/components/ReportDetail.tsx`
- [X] T025 [P] [US1] Update cat-head marker HTML, selected collar ring behavior, and accessible marker labels in `src/map/markers.ts`
- [X] T026 [US1] Update The Territory map panel, selected paw-drop marker, popup tag, and visible report list markup in `src/map/CatMap.tsx`

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Build the Stitch Screen Set as Product Pages (Priority: P2)

**Goal**: Users can navigate between the workbench, report success view, and patrol logs view represented by the Stitch project.

**Independent Test**: Navigate to each page or state, identify its purpose within 5 seconds, complete its primary action, and return to reporting or monitoring.

### Tests for User Story 2

- [X] T027 [P] [US2] Add route/navigation coverage for workbench, report success, and patrol logs in `tests/integration/appRoutes.test.tsx`
- [X] T028 [P] [US2] Add post-submit success flow coverage with create-another and monitor actions in `tests/e2e/report-sighting.spec.ts`
- [X] T029 [P] [US2] Add patrol logs dashboard coverage for report rows, empty state, and selected activity scanning in `tests/e2e/monitor-reports.spec.ts`
- [X] T030 [P] [US2] Add direct-success-route fallback coverage when no fresh report exists in `tests/integration/reportSuccess.test.tsx`

### Implementation for User Story 2

- [X] T031 [US2] Implement route state and compact navigation between workbench, success, and patrol logs in `src/app/App.tsx`
- [X] T032 [P] [US2] Add a report success view component with Help Signal Sent content and recovery actions in `src/features/reports/components/ReportSuccess.tsx`
- [X] T033 [P] [US2] Add a patrol logs dashboard component for volunteer-style report activity scanning in `src/features/reports/components/PatrolLogs.tsx`
- [X] T034 [P] [US2] Add route/page copy for navigation, success, and patrol logs in `src/ui/copy.ts`
- [X] T035 [US2] Connect successful report submission to the success view while preserving selected report context in `src/app/App.tsx`
- [X] T036 [US2] Style compact navigation, success confirmation, patrol log rows, and page-specific states in `src/styles/design-system.css`
- [X] T037 [US2] Add responsive success and patrol-log layout rules in `src/styles/responsive.css`

**Checkpoint**: User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Preserve Safety, Accessibility, and Scan Speed (Priority: P3)

**Goal**: Users can understand condition, status, urgency, focus, and safety guidance without relying on color alone or losing rescue-focused scan speed.

**Independent Test**: Use keyboard navigation and accessibility checks across all required pages to verify names, meanings, focus treatment, contrast, and serious safety/error tone.

### Tests for User Story 3

- [X] T038 [P] [US3] Add accessibility assertions for navigation, form controls, filters, report list buttons, detail actions, and success actions in `tests/e2e/accessibility.spec.ts`
- [X] T039 [P] [US3] Add validation and unsafe-note styling regression coverage in `tests/unit/reportValidation.test.ts`
- [X] T040 [US3] Add keyboard focus order coverage for workbench, success, and patrol logs in `tests/e2e/accessibility.spec.ts`
- [X] T041 [P] [US3] Add 100-report workbench and patrol logs responsiveness coverage in `tests/e2e/performance.spec.ts`

### Implementation for User Story 3

- [X] T042 [US3] Audit and update accessible names for icons, condition/status controls, report markers, and navigation actions in `src/ui/icons.tsx`
- [X] T043 [P] [US3] Ensure serious validation and safety-copy strings avoid playful error language in `src/ui/copy.ts`
- [X] T044 [P] [US3] Ensure form validation messages and safe-note guidance are linked to controls with accessible descriptions in `src/features/reports/components/ReportForm.tsx`
- [X] T045 [P] [US3] Ensure filter chips expose checked state, label, and non-color cue text in `src/features/reports/components/ReportFilters.tsx`
- [X] T046 [P] [US3] Ensure report detail chips, timestamp, approximate location, and photo text remain readable and screen-reader understandable in `src/features/reports/components/ReportDetail.tsx`
- [X] T047 [P] [US3] Ensure patrol logs support keyboard scanning and non-color urgency cues in `src/features/reports/components/PatrolLogs.tsx`
- [X] T048 [US3] Add focus, contrast, wrapping, and reduced-motion refinements in `src/styles/design-system.css`
- [X] T049 [US3] Add mobile and narrow-width text wrapping safeguards for chips, cards, buttons, and log rows in `src/styles/responsive.css`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verification, documentation, and final alignment across all stories.

- [X] T050 [P] Update design adoption documentation and deferred opportunities in `specs/002-stitch-design-reference/design-verification.md`
- [X] T051 [P] Update README feature notes and local verification commands in `README.md`
- [X] T052 Run unit and integration tests with `npm test` and record results in `specs/002-stitch-design-reference/implementation-notes.md`
- [X] T053 Run end-to-end tests with `npm run test:e2e` and record results in `specs/002-stitch-design-reference/implementation-notes.md`
- [X] T054 Run typecheck and lint with `npm run typecheck` and `npm run lint`, then record results in `specs/002-stitch-design-reference/implementation-notes.md`
- [X] T055 Perform desktop and mobile visual review against the Stitch screen list and record pass/fail notes in `specs/002-stitch-design-reference/design-verification.md`
- [X] T056 Run the validation scenarios in `specs/002-stitch-design-reference/quickstart.md` and record results in `specs/002-stitch-design-reference/implementation-notes.md`
- [X] T057 Update the managed Spec Kit context after plan/tasks changes in `AGENTS.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational; delivers MVP visual-system adoption.
- **User Story 2 (Phase 4)**: Depends on Foundational and should follow US1 for visual reuse, but can be partially developed in parallel after tokens and navigation are ready.
- **User Story 3 (Phase 5)**: Depends on Foundational and should validate US1/US2 surfaces.
- **Polish (Phase 6)**: Depends on all selected user stories.

### User Story Dependencies

- **US1 Apply Visual System**: MVP; no dependency on US2 or US3 after Foundational.
- **US2 Build Screen Set**: Can start after Foundational, but final styling depends on US1 token/component rules.
- **US3 Preserve Safety and Accessibility**: Can start after Foundational for audits, with final verification after US1 and US2.

### Parallel Opportunities

- T002-T004 can run in parallel.
- T011-T012 can run in parallel after T005-T010 are started.
- US1 tests T013-T017 can run in parallel before implementation.
- US1 component tasks T022-T025 can run in parallel after shared styles begin.
- US2 tests T027-T030 and components T032-T034 can run in parallel.
- US3 tests T038-T041 and audits T043-T047 can run in parallel.
- Polish documentation tasks T050-T051 can run in parallel before final verification.
- Quickstart validation T056 should run after automated checks and visual review tasks have completed.

---

## Parallel Example: User Story 1

```text
Task: "T013 [P] [US1] Add desktop visual-system assertions in tests/e2e/design-system.spec.ts"
Task: "T015 [P] [US1] Add component interaction coverage in tests/integration/reportForm.test.tsx"
Task: "T016 [P] [US1] Add filter chip coverage in tests/integration/reportFilters.test.tsx"
Task: "T017 [P] [US1] Add map marker semantics coverage in tests/integration/reportMap.test.tsx"
```

---

## Parallel Example: User Story 2

```text
Task: "T032 [P] [US2] Add ReportSuccess component in src/features/reports/components/ReportSuccess.tsx"
Task: "T033 [P] [US2] Add PatrolLogs component in src/features/reports/components/PatrolLogs.tsx"
Task: "T034 [P] [US2] Add route/page copy in src/ui/copy.ts"
```

---

## Parallel Example: User Story 3

```text
Task: "T043 [P] [US3] Ensure serious validation and safety-copy strings in src/ui/copy.ts"
Task: "T045 [P] [US3] Ensure filter chip accessible state in src/features/reports/components/ReportFilters.tsx"
Task: "T047 [P] [US3] Ensure patrol logs keyboard scanning in src/features/reports/components/PatrolLogs.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup documentation.
2. Complete Phase 2 foundational tokens, vocabulary, routes, and shared states.
3. Complete Phase 3 visual-system adoption.
4. Stop and validate desktop/mobile workbench independently.

### Incremental Delivery

1. Deliver US1 to align the existing product with Stitch.
2. Deliver US2 to add the success and patrol-log surfaces.
3. Deliver US3 to harden accessibility, safety, scan speed, wrapping, and performance.
4. Run Phase 6 verification and update documentation.

### Notes

- Tests listed before implementation should fail or expose missing behavior before the corresponding implementation task is complete.
- Keep tasks scoped to the listed paths unless a task reveals a direct dependency that must be documented in `specs/002-stitch-design-reference/implementation-notes.md`.
- The feature-specific `plan.md` is now present; keep it updated if implementation scope changes.

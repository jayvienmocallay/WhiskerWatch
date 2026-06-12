# Tasks: Stitch Parity Copy

**Input**: Design documents from `/specs/003-stitch-parity-copy/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `screen-inventory.md`, `quickstart.md`, and `contracts/ui-parity-contract.md` are available for this feature.

**Tests**: Tests are REQUIRED because this feature changes rescue-critical report display, navigation, state, accessibility, responsive behavior, and visual parity against the Stitch reference.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase when file paths do not overlap
- **[Story]**: User story label from `spec.md`
- Every task includes an exact target file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish strict Stitch parity tracking, including hidden screen inventory, precision review, logo consistency, and deviation controls.

- [X] T001 Refresh and classify the Stitch project visible and hidden screen inventory before implementation begins in `specs/003-stitch-parity-copy/screen-inventory.md`
- [X] T002 [P] Create the screen-by-screen 20-point visual parity checklist and 5-second reviewer matching template in `specs/003-stitch-parity-copy/visual-review.md`
- [X] T003 [P] Create the accepted deviation log template in `specs/003-stitch-parity-copy/deviation-log.md`
- [X] T004 Add logo consistency and precision-of-design requirements to `specs/003-stitch-parity-copy/contracts/ui-parity-contract.md`
- [X] T005 [P] Document current app ownership for parity refinements in `specs/003-stitch-parity-copy/implementation-notes.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared tokens, identity/logo primitives, route model, fixtures, and precision tests that MUST be complete before user story work.

**Critical**: No user story work should begin until this phase is complete.

- [X] T006 Normalize all Stitch token values and logo identity rules in `src/ui/designTokens.ts`
- [X] T007 Mirror Stitch token values, logo sizing, and precision spacing variables in `src/styles/design-system.css`
- [X] T008 Add accessible WhiskerWatch logo and cat-motif primitives in `src/ui/icons.tsx`
- [X] T009 Update page, navigation, logo alt text, and state copy for Stitch parity in `src/ui/copy.ts`
- [X] T010 Verify workbench, success, and patrol route/page metadata for parity review URLs in `src/app/routes.tsx`
- [X] T011 Add parity-ready loading, empty, success, warning, validation, and serious error state primitives in `src/ui/states.tsx`
- [X] T012 [P] Add seeded report fixtures for desktop, mobile, success, patrol, empty, validation, and 100-report review states in `src/test/fixtures/seedReports.ts`
- [X] T013 [P] Add token, vocabulary, and logo identity unit coverage in `tests/unit/designTokens.test.ts`

**Checkpoint**: Foundation ready; user stories can now be implemented.

---

## Phase 3: User Story 1 - Match Every Stitch Screen (Priority: P1) MVP

**Goal**: Every visible Stitch screen has a matching app route, state, or responsive view with documented precision review coverage.

**Independent Test**: Compare the app against Desktop Workbench, Mobile Workbench, Desktop Success, Mobile Success, and Patrol Logs references; confirm screen anatomy, responsive order, logo treatment, component density, and visual hierarchy match the Stitch source.

### Tests for User Story 1

- [X] T014 [P] [US1] Add desktop workbench parity assertions for layout regions, logo/header, map, report list, detail, and precision spacing in `tests/e2e/design-system.spec.ts`
- [X] T015 [US1] Add mobile workbench parity assertions for map-first order, logo/header consistency, selected feedback, form, filters, and no overflow in `tests/e2e/design-system.spec.ts`
- [X] T016 [P] [US1] Add success screen parity assertions for desktop/mobile fallback and submitted-report states in `tests/e2e/report-sighting.spec.ts`
- [X] T017 [P] [US1] Add patrol logs parity assertions for metrics, row density, logo/header consistency, empty state, and selected activity context in `tests/e2e/monitor-reports.spec.ts`
- [X] T018 [P] [US1] Add route and direct URL parity coverage for workbench, success, and patrol pages in `tests/integration/appRoutes.test.tsx`

### Implementation for User Story 1

- [X] T019 [US1] Refine app shell, page routing, header logo placement, active navigation, and post-submit state composition in `src/app/App.tsx`
- [X] T020 [US1] Apply desktop workbench screen parity for header, three-zone layout, map/list/detail structure, and visual precision in `src/styles.css`
- [X] T021 [US1] Apply component-level Stitch parity for app shell, logo mark, windowsill underline, success, patrol, map panel, and state surfaces in `src/styles/design-system.css`
- [X] T022 [US1] Apply mobile workbench and success parity for stack order, spacing, logo scale, and text wrapping in `src/styles/responsive.css`
- [X] T023 [P] [US1] Refine Help Signal Sent screen content and actions for desktop/mobile Stitch parity in `src/features/reports/components/ReportSuccess.tsx`
- [X] T024 [P] [US1] Refine Patrol Logs Dashboard structure, metrics, rows, and selected context for Stitch parity in `src/features/reports/components/PatrolLogs.tsx`
- [X] T025 [US1] Refine The Territory map panel, selected feedback, visible report list, and popup composition for Stitch parity in `src/map/CatMap.tsx`
- [X] T026 [US1] Record visible screen parity status, 20-point precision scores, 5-second reviewer matching results, and any remaining precision gaps in `specs/003-stitch-parity-copy/visual-review.md`

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Copy the Detailed Component System (Priority: P2)

**Goal**: Buttons, cards, inputs, chips, markers, navigation, logo usage, and states match the detailed Stitch component language across all app surfaces.

**Independent Test**: Component review confirms default, hover, focus, selected, disabled, empty, loading, success, validation, and error states use the copied Stitch anatomy with consistent logo and identity treatment.

### Tests for User Story 2

- [X] T027 [P] [US2] Add logo consistency and header identity assertions for workbench, success, patrol, desktop, and mobile views in `tests/e2e/design-system.spec.ts`
- [X] T028 [P] [US2] Add form component parity coverage for labels, inputs, safety guidance, validation, file upload, buttons, and condition controls in `tests/integration/reportForm.test.tsx`
- [X] T029 [P] [US2] Add filter chip and Watch Stage parity coverage for selected, inactive, icon, label, and non-color cue states in `tests/integration/reportFilters.test.tsx`
- [X] T030 [P] [US2] Add map marker, cat-head pin, selected ring, popup tag, and report list parity coverage in `tests/integration/reportMap.test.tsx`
- [X] T031 [P] [US2] Add success component parity coverage for logo/identity treatment, summary card, actions, and fallback state in `tests/integration/reportSuccess.test.tsx`
- [X] T032 [P] [US2] Add token precision coverage for button, card, input, chip, radius, spacing, and focus values in `tests/unit/designTokens.test.ts`

### Implementation for User Story 2

- [X] T033 [US2] Refine Rescue Note form markup for copied label hierarchy, input anatomy, button placement, condition chip precision, and safety guidance in `src/features/reports/components/ReportForm.tsx`
- [X] T034 [US2] Refine Scent Trail and Watch Stage filters for copied chip anatomy, selected state, icon cue, density, and reset treatment in `src/features/reports/components/ReportFilters.tsx`
- [X] T035 [US2] Refine Cat Case Card detail for copied chip placement, snapshot frame, dividers, note treatment, and typography hierarchy in `src/features/reports/components/ReportDetail.tsx`
- [X] T036 [US2] Refine cat-head marker HTML, selected collar ring, condition symbols, and marker label precision in `src/map/markers.ts`
- [X] T037 [US2] Refine WhiskerWatch logo primitive, symbol sizing, icon naming, and motif consistency in `src/ui/icons.tsx`
- [X] T038 [US2] Refine condition/status vocabulary symbols and accessible cue text for copied component behavior in `src/ui/statusVocabulary.ts`
- [X] T039 [US2] Refine reusable state treatments for copied loading, empty, success, warning, validation, and error anatomy in `src/ui/states.tsx`
- [X] T040 [US2] Tighten base button, card, input, chip, list, and map-frame precision rules in `src/styles.css`
- [X] T041 [US2] Tighten detailed component, logo, marker, condition, status, and state precision rules in `src/styles/design-system.css`
- [X] T042 [US2] Record component parity status, logo consistency status, and accepted precision tolerances in `specs/003-stitch-parity-copy/visual-review.md`

**Checkpoint**: User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Preserve Safety While Copying Personality (Priority: P3)

**Goal**: The copied Stitch personality remains safe, accessible, privacy-aware, and fast to scan under rescue-adjacent conditions.

**Independent Test**: Keyboard, screen-reader, contrast, validation, privacy, and large-list checks pass across every copied screen and component family.

### Tests for User Story 3

- [X] T043 [P] [US3] Add keyboard focus order coverage for copied workbench, success, patrol, logo/header, filters, map-adjacent controls, and actions in `tests/e2e/accessibility.spec.ts`
- [X] T044 [P] [US3] Add non-color cue and screen-reader naming coverage for conditions, statuses, markers, logo, and icon-led controls in `tests/e2e/accessibility.spec.ts`
- [X] T045 [P] [US3] Add privacy-safe validation and serious unsafe-note regression coverage in `tests/unit/reportValidation.test.ts`
- [X] T046 [P] [US3] Add 100-report workbench and patrol log responsiveness coverage for copied density and no visible blocking in `tests/e2e/performance.spec.ts`

### Implementation for User Story 3

- [X] T047 [US3] Ensure all logo, icon-only, condition, status, marker, and navigation controls have precise accessible names in `src/ui/icons.tsx`
- [X] T048 [US3] Ensure copied safety, validation, privacy, and urgent copy remains serious and recovery-oriented in `src/ui/copy.ts`
- [X] T049 [US3] Ensure form controls link helper, validation, safety, and file upload descriptions programmatically in `src/features/reports/components/ReportForm.tsx`
- [X] T050 [US3] Ensure filters expose checked state, labels, and non-color cues without changing copied visual precision in `src/features/reports/components/ReportFilters.tsx`
- [X] T051 [US3] Ensure report detail timestamp, location, photo, notes, condition, and status remain screen-reader understandable in `src/features/reports/components/ReportDetail.tsx`
- [X] T052 [US3] Ensure patrol rows support keyboard scanning, non-color urgency cues, and no exact personal-location exposure in `src/features/reports/components/PatrolLogs.tsx`
- [X] T053 [US3] Add contrast, focus, reduced-motion, long-text wrapping, and serious error refinements without breaking Stitch precision in `src/styles/design-system.css`
- [X] T054 [US3] Add narrow-width safeguards for logo, navigation, chips, buttons, cards, map controls, and patrol rows in `src/styles/responsive.css`
- [X] T055 [US3] Record any safety/accessibility-driven design deviations in `specs/003-stitch-parity-copy/deviation-log.md`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final precision review, documentation, and validation across all stories.

- [X] T056 [P] Reconfirm every hidden Stitch screen instance remains classified as duplicate, alternate, component/state reference, reference-only, or deviation after implementation in `specs/003-stitch-parity-copy/screen-inventory.md`
- [X] T057 [P] Update README review URLs, parity scope, and validation commands in `README.md`
- [X] T058 Run `npm test` and record unit/integration results in `specs/003-stitch-parity-copy/implementation-notes.md`
- [X] T059 Run `npm run typecheck` and `npm run lint`, then record results in `specs/003-stitch-parity-copy/implementation-notes.md`
- [X] T060 Run `npm run test:e2e` and record e2e results in `specs/003-stitch-parity-copy/implementation-notes.md`
- [X] T061 Perform desktop and mobile visual precision review against every visible Stitch screen and record 20-point scores, pass/fail notes, and 5-second reviewer matching evidence in `specs/003-stitch-parity-copy/visual-review.md`
- [X] T062 Verify logo consistency across workbench, success, patrol, desktop, mobile, empty, loading, and error states in `specs/003-stitch-parity-copy/visual-review.md`
- [X] T063 Verify the validation scenarios in `specs/003-stitch-parity-copy/quickstart.md` and record results in `specs/003-stitch-parity-copy/implementation-notes.md`
- [X] T064 Confirm all accepted deviations are documented with reason, impact, reviewer, and verification method in `specs/003-stitch-parity-copy/deviation-log.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational; delivers MVP screen parity.
- **User Story 2 (Phase 4)**: Depends on Foundational and should follow US1 for screen composition context.
- **User Story 3 (Phase 5)**: Depends on Foundational and should validate US1/US2 surfaces.
- **Polish (Phase 6)**: Depends on all desired user stories.

### User Story Dependencies

- **US1 Match Every Stitch Screen**: MVP; no dependency on US2 or US3 after Foundational.
- **US2 Copy Detailed Component System**: Can start after Foundational, but final precision depends on US1 screen layout decisions.
- **US3 Preserve Safety While Copying Personality**: Can start after Foundational, with final verification after US1 and US2.

### Parallel Opportunities

- T002, T003, and T005 can run in parallel after T001 captures the current Stitch inventory.
- T012 and T013 can run in parallel after T006-T011 begin.
- US1 tests T014, T016, T017, and T018 can run in parallel.
- US1 implementation tasks T023 and T024 can run in parallel after shared shell/style work begins.
- US2 tests T027-T032 can run in parallel.
- US3 tests T043-T046 can run in parallel.
- Polish documentation tasks T056 and T057 can run in parallel before final verification.

---

## Parallel Example: User Story 1

```text
Task: "T014 [P] [US1] Add desktop workbench parity assertions for layout regions, logo/header, map, report list, detail, and precision spacing in tests/e2e/design-system.spec.ts"
Task: "T016 [P] [US1] Add success screen parity assertions for desktop/mobile fallback and submitted-report states in tests/e2e/report-sighting.spec.ts"
Task: "T017 [P] [US1] Add patrol logs parity assertions for metrics, row density, logo/header consistency, empty state, and selected activity context in tests/e2e/monitor-reports.spec.ts"
Task: "T018 [P] [US1] Add route and direct URL parity coverage for workbench, success, and patrol pages in tests/integration/appRoutes.test.tsx"
```

---

## Parallel Example: User Story 2

```text
Task: "T028 [P] [US2] Add form component parity coverage for labels, inputs, safety guidance, validation, file upload, buttons, and condition controls in tests/integration/reportForm.test.tsx"
Task: "T029 [P] [US2] Add filter chip and Watch Stage parity coverage for selected, inactive, icon, label, and non-color cue states in tests/integration/reportFilters.test.tsx"
Task: "T030 [P] [US2] Add map marker, cat-head pin, selected ring, popup tag, and report list parity coverage in tests/integration/reportMap.test.tsx"
Task: "T031 [P] [US2] Add success component parity coverage for logo/identity treatment, summary card, actions, and fallback state in tests/integration/reportSuccess.test.tsx"
```

---

## Parallel Example: User Story 3

```text
Task: "T043 [P] [US3] Add keyboard focus order coverage for copied workbench, success, patrol, logo/header, filters, map-adjacent controls, and actions in tests/e2e/accessibility.spec.ts"
Task: "T044 [P] [US3] Add non-color cue and screen-reader naming coverage for conditions, statuses, markers, logo, and icon-led controls in tests/e2e/accessibility.spec.ts"
Task: "T045 [P] [US3] Add privacy-safe validation and serious unsafe-note regression coverage in tests/unit/reportValidation.test.ts"
Task: "T046 [P] [US3] Add 100-report workbench and patrol log responsiveness coverage for copied density and no visible blocking in tests/e2e/performance.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup documentation, hidden screen classification, reviewer matching template, and parity controls.
2. Complete Phase 2 foundational tokens, logo primitives, route metadata, state primitives, and fixtures.
3. Complete Phase 3 screen parity for workbench, success, and patrol logs.
4. Stop and validate visible Stitch screen parity independently.

### Incremental Delivery

1. Deliver US1 to match every visible Stitch screen at the route/page level.
2. Deliver US2 to tighten detailed component, logo, and precision-of-design parity.
3. Deliver US3 to preserve safety, accessibility, contrast, privacy, and scan speed.
4. Complete polish with hidden screen classification, visual review, deviation log, and full validation commands.

### Notes

- Write tests before implementation where test tasks are listed.
- Treat logo consistency as part of visual parity, not a decorative afterthought.
- Treat precision-of-design as reviewable layout, spacing, typography, shape, state, and component anatomy evidence.
- Record any difference from Stitch in `specs/003-stitch-parity-copy/deviation-log.md`.

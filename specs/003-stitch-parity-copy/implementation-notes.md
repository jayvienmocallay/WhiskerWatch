# Implementation Notes: Stitch Parity Copy

## Current App Ownership

| Area | Files | Parity Responsibility |
|------|-------|-----------------------|
| App shell and routes | `src/app/App.tsx`, `src/app/routes.tsx` | Workbench, success, patrol navigation, logo placement, active state, and direct review URLs. |
| Shared design system | `src/ui/designTokens.ts`, `src/ui/icons.tsx`, `src/ui/copy.ts`, `src/ui/states.tsx`, `src/ui/statusVocabulary.ts` | Stitch tokens, logo primitive, motifs, state vocabulary, condition/status cues, and safety copy. |
| Report surfaces | `src/features/reports/components/*.tsx` | Rescue Note, filters, Cat Case Card, Help Signal Sent, Patrol Logs, accessibility, and validation state anatomy. |
| Map | `src/map/CatMap.tsx`, `src/map/markers.ts` | The Territory panel, cat-head markers, selected collar ring, popup tag, and visible report list. |
| Styling | `src/styles.css`, `src/styles/design-system.css`, `src/styles/responsive.css` | Layout precision, responsive stack, logo scale, components, focus, contrast, and wrapping. |
| Tests | `tests/unit`, `tests/integration`, `tests/e2e` | Token, component, route, accessibility, performance, and visual-structure regression coverage. |

## Validation Log

- PASS: `npm test` completed 10 test files and 24 tests.
- PASS: `npm run typecheck`.
- PASS: `npm run lint`.
- PASS: `npm run test:e2e` completed 22 passed and 2 skipped viewport-specific checks.
- PASS: quickstart visual precision review recorded in `visual-review.md`.
- PASS: hidden Stitch screen instances classified in `screen-inventory.md`.
- PASS: no accepted deviations recorded in `deviation-log.md`.
- PASS: local Playwright smoke check confirmed workbench visibility, 25 patrol rows, patrol logo visibility, and mobile map-before-form order at `http://127.0.0.1:5173`.

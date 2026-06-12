# Quickstart: Stitch Design Reference Adoption

## Prerequisites

- Install dependencies with `npm install`.
- Use the active feature directory `specs/002-stitch-design-reference`.

## Local Run

```powershell
npm run dev
```

Open the local Vite URL shown in the terminal.

## Validation Scenarios

### 1. Workbench Visual System

1. Open the main app with seeded reports, for example `/?seed=25`.
2. Confirm the page shows the WhiskerWatch workbench: report form, filters, map, visible report list, and detail pane.
3. Confirm colors, typography, radius, spacing, buttons, cards, inputs, chips, markers, and state treatments match the Stitch design reference.
4. Select a report and confirm the Cat Case Card updates without losing map context.

### 2. Mobile Workbench

1. Open the app in a mobile viewport with seeded reports.
2. Confirm the order is map, selected feedback, form, filters, then detail.
3. Confirm chips, buttons, report list items, and long text wrap without horizontal overflow.

### 3. Report Success

1. Choose a map location.
2. Select a condition and submit a valid report.
3. Confirm the success state communicates that helpers can see the report.
4. Confirm there are clear actions to create another report and continue monitoring.
5. Open the success view without a freshly submitted report and confirm it provides a useful fallback.

### 4. Patrol Logs

1. Open the patrol logs surface with seeded reports.
2. Confirm volunteers can scan condition, status, approximate location, time, and notes.
3. Confirm empty and filtered-empty states remain consistent with the design system.
4. Confirm urgency uses text/icon/shape, not color alone.

### 5. Accessibility and Performance

1. Navigate workbench, success, and patrol logs with the keyboard.
2. Confirm focus is visible with the Tuna Gold treatment.
3. Confirm condition/status controls and markers have accessible names.
4. Load `/?seed=100` and confirm normal browsing remains responsive.

## Automated Checks

```powershell
npm test
npm run typecheck
npm run lint
npm run test:e2e
```

Expected outcome: all tests and checks pass after implementation.

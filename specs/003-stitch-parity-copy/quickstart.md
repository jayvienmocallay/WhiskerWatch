# Quickstart: Stitch Parity Copy

## Prerequisites

- Node dependencies installed with `npm install`.
- Stitch project access to `WhiskerWatch Rescue Design System`.
- Local app can run with `npm run dev`.

## Automated Validation

Run the full verification set:

```powershell
npm test
npm run typecheck
npm run lint
npm run test:e2e
```

Expected outcome:
- Token and vocabulary tests pass.
- Form, filters, map/list, success, patrol, and route tests pass.
- E2E flows cover report submission, workbench navigation, patrol logs, accessibility, mobile stack order, and 100-report responsiveness.

## Local Review URLs

Start the app:

```powershell
npm run dev
```

Review these URLs:

```text
http://127.0.0.1:5173/?seed=25
http://127.0.0.1:5173/?seed=25&page=patrol
http://127.0.0.1:5173/?page=success
```

## Screen-By-Screen Visual Review

1. Compare `/?seed=25` at a desktop viewport with Desktop Workbench Dashboard.
2. Compare `/?seed=25` at a mobile viewport with Mobile Workbench Dashboard.
3. Submit a valid report and compare the success state with Desktop Report Success State.
4. Open `/?page=success` at a mobile viewport and compare with Mobile Report Success State.
5. Open `/?seed=25&page=patrol` and compare with Patrol Logs Dashboard.
6. Score each visible screen against the 20-point visual precision checklist in `contracts/ui-parity-contract.md`.
7. Ask first-time reviewers to match each implemented app screen to its Stitch reference within 5 seconds and record the results or accepted review proxy.
8. Confirm the hidden screen inventory was classified before implementation and still matches the final app.
9. Record any intentional differences as Deviation Records.

## Acceptance Checklist

- Every Stitch screen and hidden/alternate instance is mapped or classified.
- Every visible screen has a 20-point visual precision score.
- At least 90% of first-time reviewers can match each implemented screen to its Stitch reference within 5 seconds, or an accepted proxy is documented.
- Colors, typography, spacing, radius, navigation, buttons, cards, inputs, chips, markers, and states match the Stitch reference.
- The workbench remains a functional report/map workflow, not a marketing page.
- Urgent, unsafe, and validation states remain serious and accessible.
- No condition or status relies on color alone.
- Long text wraps cleanly on desktop and mobile.
- Workbench and patrol logs remain usable with 100 visible reports.

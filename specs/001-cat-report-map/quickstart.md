# Quickstart: WhiskerWatch Cat Report Map

## Prerequisites

- Node.js 20 LTS or newer
- npm
- Firebase CLI installed and authenticated for local emulator use
- A Firebase project for manual smoke testing after local validation

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local` with the Firebase web app configuration for the target environment. Local automated tests should use the Firebase Emulator Suite where possible.

## Local Development

```bash
npm run dev
```

Expected outcome: the WhiskerWatch map loads in a local browser with report controls available.

## Automated Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

Expected outcome: all static checks, unit/component tests, integration tests, and end-to-end report flows pass.

## Firebase Contract Validation

```bash
npm run firebase:emulators
npm run test:contract
```

Expected outcomes:
- Valid report creation succeeds.
- Missing location or condition fails.
- Unsupported conditions fail.
- Contact fields are rejected.
- Valid photos under 5 MB upload successfully.
- Unsupported or oversized photos fail.

See [firestore-storage-contract.md](./contracts/firestore-storage-contract.md).

## Manual MVP Smoke Test

1. Open the local app.
2. Select a map location for a cat sighting.
3. Choose `Injured`.
4. Attach one valid cat photo.
5. Submit the report.
6. Confirm the submit button prevents a duplicate click while pending.
7. Confirm the new marker appears on the map.
8. Open the marker detail and verify condition, status, approximate location, submission time, and photo.
9. Filter by `Injured` and confirm the report remains visible.
10. Filter to a condition with no reports and confirm the empty state and reset control.

## Accessibility and Responsive Checks

- Complete report creation using only the keyboard.
- Confirm visible focus states on report, filter, and detail controls.
- Confirm marker/report list accessible names include condition and status.
- Check mobile and desktop layouts for overlapping text or hidden controls.
- Confirm condition markers do not rely on color alone.
- Confirm mobile layout order follows `DESIGN.md`: map, selected feedback, submit report, filters, report detail.
- Confirm desktop layout remains the three-zone workbench: report creation/filters, map/list, detail.

## Catsy Design System Checks

- Confirm the app shell uses the `DESIGN.md` palette and a subtle windowsill/paw-trail neighborhood lookout treatment.
- Confirm map markers use cat-head, cat-tag, or equivalent cat-specific silhouettes/symbols and do not rely on color alone.
- Confirm the selected location reads as a paw drop or collar-ring cue and displays approximate coordinates only.
- Confirm condition controls read as three cat signal badges with distinct healthy, injured, and needs-food treatments.
- Confirm condition filters read as scent trail filters and status filters read as watch-stage chips.
- Confirm the report form reads as a rescue note with visible safe-notes guidance and serious Ginger Alert errors.
- Confirm report detail reads as a cat case card with condition/status chips, whisker divider rhythm, optional snapshot-style photo, approximate location, submitted time, and safe notes.
- Confirm loading, empty, success, and error states use the appropriate Whisker Sweep, Quiet Windowsill, Help Signal, and Alert Ear treatments.
- Confirm any motion respects reduced-motion preferences.

## Performance Checks

- Seed or load 100 active reports.
- Confirm the initial map becomes usable in under 3 seconds on a normal broadband connection.
- Confirm filtering and marker selection do not visibly block interaction.
- Confirm oversized photo validation happens before upload transfer begins.

# WhiskerWatch

WhiskerWatch is a community-powered web app for reporting stray or lost cats on an interactive map. Visitors can drop a pin, tag the cat condition, optionally attach one photo, and help local volunteers or shelters spot urgent reports faster.

## Tech Stack

- React + TypeScript + Vite
- Firebase modular SDK
- Firestore for report records
- Firebase Storage for report photos
- Leaflet and React Leaflet for map interaction
- Vitest, Testing Library, and Playwright for validation

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local` with Firebase web app values for a hosted Firebase environment. If Firebase variables are absent, the app uses an in-memory repository so local UI development and tests still work.

## Development

```bash
npm run dev
```

Open the local URL shown by Vite. To load seeded reports for manual testing, open:

```text
http://127.0.0.1:5173/?seed=25
```

Stitch-aligned surfaces can also be opened directly:

```text
http://127.0.0.1:5173/?seed=25&page=patrol
http://127.0.0.1:5173/?page=success
```

Strict Stitch parity review for `specs/003-stitch-parity-copy` additionally checks the 20-point visual precision rubric, logo consistency across all surfaces, and hidden screen classification in the feature docs.

## Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
```

Contract tests run through Vitest:

```bash
npm run test:contract
```

Firebase emulator configuration is included for Firestore and Storage:

```bash
npm run firebase:emulators
```

## Manual Smoke Test

1. Start the dev server.
2. Click the map to choose a cat location.
3. Select a condition.
4. Optionally attach a JPEG, PNG, or WebP image up to 5 MB.
5. Submit the report.
6. Confirm the submit button enters a pending state and the new report appears on the map/list.
7. Confirm the Help Signal Sent success view appears with actions to create another report or continue monitoring.
8. Open the report detail and verify status, condition, approximate location, submission time, photo, and safe notes.
9. Open Patrol Logs and verify report activity remains scannable.
10. Filter by condition/status, verify empty states, and reset filters.

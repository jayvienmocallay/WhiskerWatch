# Research: WhiskerWatch Cat Report Map

## Decision: Use React 19.2 with TypeScript for the web client

**Rationale**: React is a good fit for a small but interactive reporting tool with reusable stateful UI: map panels, report forms, filters, and detail views. TypeScript supports the constitution's maintainability requirement by making report fields, condition values, and status transitions explicit.

**Alternatives considered**:
- Plain JavaScript: faster setup, but weaker protection around rescue-critical report fields.
- Server-rendered framework: useful later, but unnecessary for the MVP's public single-map workflow.

## Decision: Use Firebase Firestore and Storage as the managed backend

**Rationale**: Firebase keeps the MVP realistic for intermediate implementation while covering report persistence, real-time updates, file storage, local emulator testing, and security rules. The modular Firebase JavaScript SDK is preferred because official Firebase setup guidance describes it as optimized for module bundlers and tree-shaking.

**Alternatives considered**:
- Supabase: strong relational model and storage, but the suggested MVP benefits from Firebase's rapid client integration and emulator workflow.
- Custom backend: more control, but adds hosting, API, authentication, and file handling work that does not improve the first reporter/volunteer experience.

## Decision: Use Leaflet 1.9.4 stable with React Leaflet

**Rationale**: Leaflet is lightweight, mobile-friendly, and sufficient for pin dropping, marker display, popups, and viewport interaction. The official Leaflet download page lists 1.9.4 as the stable release and 2.0.0-alpha.1 as prerelease, so the plan uses stable 1.x for MVP predictability.

**Alternatives considered**:
- Google Maps: polished tiles and geocoding ecosystem, but API keys/billing add setup friction.
- Leaflet 2.0 alpha: modernized ESM direction, but prerelease status is unnecessary risk for a hackathon-style MVP.

## Decision: Use visitor submissions with no displayed personal contact data

**Rationale**: The spec prioritizes rapid community reporting and the constitution requires privacy-sensitive defaults. Open submissions reduce friction for people who spot a cat outdoors, while withholding contact details avoids exposing personal information.

**Alternatives considered**:
- Mandatory accounts: improves trust and moderation later, but slows first-report completion.
- Contact sharing: may help coordination, but needs consent, moderation, and safety design outside this feature.

## Decision: Validate photos before upload and store one optional image per report

**Rationale**: One optional photo supports identification without making reporting unsafe or slow. Client-side size/type checks reduce failed transfers and storage waste, while storage rules enforce the same contract server-side.

**Alternatives considered**:
- Required photo: excludes urgent reports where taking a photo is unsafe or impossible.
- Multiple photos: useful later, but increases upload complexity and moderation surface.

## Decision: Test with Vitest, Testing Library, Playwright, and Firebase Emulator Suite

**Rationale**: Unit and component tests cover validation, status vocabulary, filters, and UI states. Playwright covers the full reporting and monitoring journey in a browser. Firebase emulators verify Firestore/Storage contracts and security rules without touching production data.

**Alternatives considered**:
- Manual-only QA: violates the constitution's testing requirement for rescue-critical flows.
- End-to-end tests only: misses fast feedback for validation and state logic.

## Decision: Use bounded queries and client-side filtering for MVP scale

**Rationale**: The first release targets up to 100 visible reports. A bounded query for recent/open reports plus local condition/status filters is simple and meets success criteria without premature geospatial infrastructure.

**Alternatives considered**:
- Server-side geospatial indexing: better for large cities and dense report volumes, but unnecessary for the stated MVP scale.
- Marker clustering as a hard requirement: helpful later, but overlapping reports can be handled with detail selection and documented as a follow-up if density grows.

## Decision: Use DESIGN.md as the visual design source of truth

**Rationale**: `DESIGN.md` gives WhiskerWatch a coherent catsy but practical design system with named tokens, feature identities, responsive behavior, accessibility expectations, and state treatments. Treating it as a plan-level constraint keeps the existing map, report form, filters, report detail, states, and layout aligned around the same neighborhood lookout metaphor.

**Alternatives considered**:
- Keep the current generic workbench styling: functional, but misses the product-specific cat identity and feature-level visual language.
- Apply decorative cat motifs ad hoc: faster, but risks inconsistency, poor accessibility, and downplaying urgent rescue states.
- Use a cartoon-heavy theme: distinctive, but conflicts with the rescue-aware tone and practical decision-making needs.

## References

- React latest docs/version: https://react.dev/versions
- Firebase modular web setup: https://firebase.google.com/docs/web/setup
- Firebase modular API guidance: https://firebase.google.com/docs/web/modular-upgrade
- Leaflet stable/prerelease downloads: https://leafletjs.com/download.html
- WhiskerWatch visual direction: `/DESIGN.md`

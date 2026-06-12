# Research: Stitch Design Reference Adoption

## Decision: Keep the Existing Single-Page App Architecture

**Rationale**: The required Stitch pages are product surfaces within the current WhiskerWatch app: workbench, success, and patrol logs. They can be represented through existing app state and lightweight route metadata without adding a new dependency.

**Alternatives considered**: Add a routing library. Rejected for planning because the current scope can be satisfied with existing app structure and the project already has `src/app/routes.tsx` as a route metadata boundary.

## Decision: Treat Desktop/Mobile Stitch Screens as Responsive Variants

**Rationale**: The Stitch screen list includes desktop and mobile versions of the workbench and success states. The product should not duplicate pages; it should map both variants to responsive behavior for the same surface.

**Alternatives considered**: Build separate mobile-only pages. Rejected because it would risk divergent workflows and violate consistent UX.

## Decision: Centralize Design Tokens in `src/ui/designTokens.ts` and CSS Custom Properties

**Rationale**: TypeScript tokens support vocabulary, tests, and component decisions; CSS custom properties support styling and responsive behavior. Keeping both aligned gives implementation and verification a single named palette and spacing system.

**Alternatives considered**: Hard-code Stitch values in component CSS only. Rejected because it would make tests and future design review harder.

## Decision: Use Accessible Text plus Symbols for Cat-Specific Iconography

**Rationale**: Stitch requires cat-centered motifs, but urgency and status must not rely on color alone. The implementation should pair symbols/icons with visible labels and screen-reader cues.

**Alternatives considered**: Decorative-only icons. Rejected because condition/status meaning must remain accessible.

## Decision: Add Report Success and Patrol Logs as Report Feature Components

**Rationale**: Both screens use report data and user report workflows. Keeping them in `src/features/reports/components/` respects existing feature ownership.

**Alternatives considered**: Place all pages in `src/app/`. Rejected because it would concentrate report-specific presentation in the app shell.

## Decision: Verify by Story and by Stitch Screen

**Rationale**: The spec requires user-story independence and 100% mapping of Stitch screens. Verification must cover visual-system adoption, page navigation, safety/accessibility, desktop/mobile variants, and 100-report behavior.

**Alternatives considered**: Manual visual review only. Rejected by the constitution because report display and navigation are rescue-critical flows.

# Research: Stitch Parity Copy

## Decision: Use Stitch MCP as the parity source of truth

**Rationale**: The user explicitly asked to copy every detail from the Stitch reference. The Stitch project provides the authoritative design tokens, DESIGN.md guidance, screenshots, generated HTML references, and screen instances.

**Alternatives considered**: Reusing the prior implementation as the source of truth was rejected because it only adopted the design direction and may miss screen-level details. Recreating a new design system locally was rejected because it would drift from Stitch.

## Decision: Treat hidden and alternate screen instances as inventory items

**Rationale**: The project exposes 17 screen/design-system instances, including visible screens, hidden alternates, the DESIGN.md artifact, and a design-system instance. All instances must be listed so reviewers can confirm no reference surface was ignored.

**Alternatives considered**: Limiting scope to the six visible `list_screens` results was rejected because the spec requires every detailed design and hidden instances may contain meaningful states.

## Decision: Keep the existing React/Vite/Firebase/Leaflet architecture

**Rationale**: The current app already has workbench, success, patrol logs, report components, map integration, test fixtures, and e2e coverage. Parity can be delivered by refining tokens, markup, CSS, copy, state handling, and tests.

**Alternatives considered**: Adding a new routing framework or UI component library was rejected because it increases scope and risk without improving parity.

## Decision: Store parity rules as documentation and tests, not runtime data

**Rationale**: The parity map, screen inventory, and deviation records are review artifacts. Runtime code should stay focused on report workflows and shared UI primitives.

**Alternatives considered**: Shipping a runtime JSON manifest for Stitch screens was rejected because it does not add user value and could become stale unless externally synchronized.

## Decision: Combine automated checks with documented visual review

**Rationale**: Automated tests can validate routes, accessibility, token availability, component anatomy, responsive order, and performance. Exact visual parity to external Stitch screenshots also requires reviewer comparison and documented pass/fail notes.

**Alternatives considered**: Relying only on screenshots was rejected because accessibility, keyboard behavior, validation, and rescue-critical flows need automated regression coverage. Relying only on DOM tests was rejected because visual parity is the core requirement.

## Decision: Deviations require explicit records

**Rationale**: Faithful copying should be the default. If safety, accessibility, real data behavior, or viewport constraints require a difference from Stitch, reviewers need to know what changed and why.

**Alternatives considered**: Allowing informal judgment was rejected because it would recreate the ambiguity the user is trying to remove.

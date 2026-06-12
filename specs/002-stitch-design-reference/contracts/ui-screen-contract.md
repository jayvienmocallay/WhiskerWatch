# UI Screen Contract: Stitch Design Reference Adoption

## Required Product Surfaces

### Workbench

**Stitch Screens**

- Desktop Workbench Dashboard
- Mobile Workbench Dashboard

**Required Content**

- Compact WhiskerWatch app identity and navigation
- Report form as Rescue Note
- Scent Trail condition filters
- Watch Stage status filters
- The Territory map
- Visible collar-tag report list
- Cat Case Card selected report detail
- Loading, empty, validation, and error states

**Acceptance Contract**

- Desktop uses left controls, center map/list, right detail.
- Mobile stacks map first, then selected feedback, form, filters, and detail.
- Condition/status meaning is available through label, symbol/icon, shape, and accessible text.

### Report Success

**Stitch Screens**

- Desktop Report Success State
- Mobile Report Success State

**Required Content**

- Help Signal Sent or equivalent success message
- Confirmation that helpers can see the report
- Context for the newly submitted report when available
- Action to create another report
- Action to continue monitoring or return to workbench
- Safe guidance remains serious and visible

**Acceptance Contract**

- Direct access without a fresh report shows a useful fallback.
- Success state does not erase the user's ability to return to reporting.
- Mobile success keeps map/report context reachable.

### Patrol Logs

**Stitch Screens**

- Patrol Logs Dashboard

**Required Content**

- Volunteer-style report activity list
- Condition, status, approximate location, submitted time, and notes
- Empty and filtered-empty states
- Selected activity or detail affordance
- Compact workbench navigation

**Acceptance Contract**

- Rows remain scannable with many reports.
- Urgency does not rely on color alone.
- Keyboard users can scan and select activity.

## Design Reference Artifact

### DESIGN.md

**Stitch Screen**

- DESIGN.md

**Contract**

- Treat as design source, not a user-facing route.
- Preserve its token and component intent in implementation documentation and verification.

## Cross-Surface Requirements

- Use Stitch palette, Inter typography, 8px standard radius, compact spacing, and Tuna Gold focus.
- Do not use marketing landing-page composition for primary app entry.
- Avoid playful wording for errors, unsafe notes, or injured-cat urgency.
- Keep all text wrapped inside controls and cards on mobile and desktop.

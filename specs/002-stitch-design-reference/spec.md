# Feature Specification: Stitch Design Reference Adoption

**Feature Branch**: `002-stitch-design-reference`

**Created**: 2026-06-11

**Status**: Draft

**Input**: User description: "Use the Stitch MCP project 'WhiskerWatch Rescue Design System' as the design reference for this repo: colors, fonts, spacing, buttons, cards, inputs, navigation, screen list, and routes/pages to build."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Apply the WhiskerWatch Visual System (Priority: P1)

A visitor using WhiskerWatch sees a consistent rescue-aware interface that matches the Stitch project's colors, typography, spacing, buttons, cards, inputs, and state treatments across the existing report and map experience.

**Why this priority**: The existing app must feel like one trustworthy community tool before additional pages or workflows are useful.

**Independent Test**: A tester can open the main reporting experience on desktop and mobile, compare it with the Stitch reference, and confirm that the core visual system, controls, and states match the intended WhiskerWatch identity.

**Acceptance Scenarios**:

1. **Given** a user opens the main WhiskerWatch experience, **When** the interface loads, **Then** the page uses the Stitch color palette, Inter typography, 8px-radius controls, compact workbench density, and rescue-aware catsy motifs.
2. **Given** a user interacts with buttons, cards, inputs, filters, report markers, and state messages, **When** each component is focused, selected, disabled, empty, loading, successful, or in error, **Then** the treatment remains visually consistent and accessible.
3. **Given** a user views the app on mobile, **When** the layout stacks, **Then** the map remains first, selected feedback remains near the map, and form/filter/detail sections remain readable without horizontal overflow.

---

### User Story 2 - Build the Stitch Screen Set as Product Pages (Priority: P2)

A community member, volunteer, or shelter worker can navigate between the core WhiskerWatch pages represented in the Stitch project: the workbench dashboard, report success view, and patrol logs view.

**Why this priority**: The Stitch project defines the product surface beyond a single map view, including success confirmation and volunteer monitoring workflows.

**Independent Test**: A tester can navigate to each required page, identify the page purpose within 5 seconds, complete the page's primary action, and return to the main map workflow.

**Acceptance Scenarios**:

1. **Given** a user opens the main page, **When** they view the workbench dashboard, **Then** they see the report form, filters, map, visible reports, and selected report detail in the Stitch three-zone desktop layout or mobile stack.
2. **Given** a user submits a valid report, **When** the report is accepted, **Then** they see a report success view that confirms helpers can see the report and offers a clear path to create another report or continue monitoring.
3. **Given** a volunteer opens the patrol logs page, **When** reports are present, **Then** they can scan report activity, condition, status, location context, and urgency without leaving the WhiskerWatch visual system.

---

### User Story 3 - Preserve Safety, Accessibility, and Scan Speed (Priority: P3)

A reporter or volunteer can understand condition, status, urgency, and safety guidance without relying on color alone, while the app avoids decorative treatments that slow down rescue-adjacent workflows.

**Why this priority**: The design reference adds personality, but WhiskerWatch must still support fast and safe decisions.

**Independent Test**: A tester can use keyboard navigation and screen-reader inspection to verify component names, condition/status meanings, focus treatment, and safety guidance across all required pages.

**Acceptance Scenarios**:

1. **Given** the app shows condition or status information, **When** a user views or hears it, **Then** the meaning is available through text, icon shape, and accessible naming, not color alone.
2. **Given** a user enters unsafe personal information or omits required report details, **When** validation appears, **Then** the message uses serious error styling and clear recovery guidance.
3. **Given** a user navigates through the product with a keyboard, **When** focus moves across navigation, form controls, filters, map-adjacent report controls, and detail actions, **Then** focus remains visible with the Stitch Tuna Gold focus treatment.

### Edge Cases

- Stitch includes both desktop and mobile versions of the same workflow; the product must avoid duplicate content while still matching each viewport's intended layout.
- A success view may be reached directly without a freshly submitted report; the page must show a useful fallback and path back to reporting.
- Patrol logs may have no reports, only filtered-out reports, or many reports; each state must remain scannable and consistent.
- Map tiles, report data, or photos may load slowly or fail; loading and error states must reserve space and avoid layout jumps.
- Long report notes, labels, filenames, status names, or location text must wrap cleanly inside cards, chips, buttons, and list items.
- Cat-specific motifs must not reduce urgency for injured reports or make safety warnings feel playful.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use the Stitch MCP project "WhiskerWatch Rescue Design System" as the product design reference for visual and page behavior decisions.
- **FR-002**: System MUST represent the Stitch screen list as product surfaces: Desktop Workbench Dashboard, Mobile Workbench Dashboard, Desktop Report Success State, Mobile Report Success State, Patrol Logs Dashboard, and the DESIGN.md reference as the design source.
- **FR-003**: System MUST provide a main workbench page for reporting and monitoring cat sightings.
- **FR-004**: System MUST provide a report success page or success state after valid report submission.
- **FR-005**: System MUST provide a patrol logs page for volunteer-style activity scanning.
- **FR-006**: System MUST provide navigation that lets users reach the workbench, patrol logs, and relevant post-submit actions without losing the map/reporting context.
- **FR-007**: System MUST apply the Stitch color palette: Coal Tabby, Moss Collar, Porch Leaf, Milk Saucer, Tuna Gold, Ginger Alert, Tabby Green, Night Whisker, Warm Cardboard, Soft Salmon, and the related surface, outline, primary, secondary, tertiary, and error colors.
- **FR-008**: System MUST use Inter as the product font family with compact dashboard typography matching the Stitch scale for headline, body, and label text.
- **FR-009**: System MUST use Stitch spacing intent: a desktop three-zone workbench with approximately 320px left controls, a flexible map center, approximately 360px right detail area, 1rem gutters, 2rem desktop margins, and 1rem mobile margins.
- **FR-010**: System MUST use 8px radius for standard cards, panels, inputs, buttons, chips, map frames, and photo frames, with fully rounded shapes reserved for tags, badges, and compact chips.
- **FR-011**: System MUST style primary buttons with Moss Collar, secondary buttons with Porch Leaf or related calm surfaces, urgent/destructive feedback with Ginger Alert, and focus with a Tuna Gold visible outline.
- **FR-012**: System MUST style cards and panels as practical workbench surfaces, including the Rescue Note form, Scent Trail filters, The Territory map frame, visible collar-tag report list, Cat Case Card detail, success confirmation, and patrol log rows.
- **FR-013**: System MUST style inputs, file upload controls, text areas, and validation messages as high-contrast, readable report controls with visible labels, help text, and safety guidance.
- **FR-014**: System MUST style condition controls as Three Cat Signals with label, icon or symbol, non-color cue, selected state, and small ear-notch treatment.
- **FR-015**: System MUST style status controls as Watch Stage chips with label, icon or symbol, active/inactive distinction, and non-color cue.
- **FR-016**: System MUST style map markers as cat-head or cat-signal pins with condition-specific shape or symbol, selected collar/whisker ring, and accessible names.
- **FR-017**: System MUST include Stitch state treatments for loading, empty, success, and error states, including the Help Signal Sent success concept and serious Alert Ear error styling.
- **FR-018**: System MUST preserve privacy and safety messaging by warning users not to share exact home addresses, contact information, or unsafe rescue instructions.
- **FR-019**: System MUST keep navigation compact and workbench-oriented, avoiding marketing-style landing pages for the primary product experience.
- **FR-UX**: System MUST use the shared WhiskerWatch condition/status vocabulary, marker treatment, and loading/error/empty-state patterns for user-facing report workflows.
- **FR-A11Y**: System MUST keep interactive report and map controls keyboard reachable, screen-reader understandable, and WCAG AA contrast compliant.

### Key Entities *(include if feature involves data)*

- **Design Reference**: The Stitch project used as the approved source for visual tokens, screen intent, component treatments, and page coverage.
- **Product Page**: A navigable WhiskerWatch surface aligned to one or more Stitch screens, including workbench, report success, and patrol logs.
- **Design Token**: A named visual decision such as color, typography, spacing, radius, or focus treatment that must be reused consistently.
- **Component Pattern**: A reusable interaction style such as buttons, cards, inputs, chips, markers, report list items, success states, error states, and navigation controls.
- **Screen Mapping**: The relationship between a Stitch screen and the app page or state that fulfills it.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A design review confirms that 100% of required Stitch screens are mapped to a product page, state, or documented design reference.
- **SC-002**: A visual review confirms that the required Stitch colors, typography, spacing, button, card, input, navigation, and state treatments are represented on desktop and mobile.
- **SC-003**: At least 90% of first-time testers can identify the main workbench, report success, and patrol logs page purpose within 5 seconds per page.
- **SC-004**: At least 90% of testers can submit a report, understand the success confirmation, and return to reporting or monitoring without assistance.
- **SC-PERF**: Users can load and interact with the workbench and patrol logs views with 100 visible reports without visible blocking during normal browsing.
- **SC-QUALITY**: Automated or documented verification covers desktop workbench, mobile workbench, desktop success, mobile success, patrol logs, empty state, loading state, validation error, and keyboard focus behavior.

## Assumptions

- The Stitch project named "WhiskerWatch Rescue Design System" is the current approved design reference.
- The app remains a product/workbench experience, not a marketing landing page.
- Desktop and mobile Stitch screens describe responsive variants of the same product workflows unless their content clearly defines a separate page or state.
- The main route/page is the workbench dashboard; the success state may be a route, modal-like state, or in-flow state as long as users can revisit or recover from it.
- Patrol logs is a volunteer monitoring surface and can reuse report data already available to the product.
- The DESIGN.md Stitch screen is a reference artifact, not a user-facing app page.

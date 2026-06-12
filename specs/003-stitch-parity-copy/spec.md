# Feature Specification: Stitch Parity Copy

**Feature Branch**: `003-stitch-parity-copy`

**Created**: 2026-06-12

**Status**: Draft

**Input**: User description: "i want you to copy all the design in the stitch, every detailed design. copy the reference"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Match Every Stitch Screen (Priority: P1)

A reporter, volunteer, or reviewer can open WhiskerWatch and see product screens that match the Stitch project "WhiskerWatch Rescue Design System" as the approved visual source of truth, including every visible layout, content region, component treatment, and responsive state.

**Why this priority**: The user's request is not a loose design-system adoption. The product must replicate the Stitch reference closely enough that screen-by-screen review treats the app as the implemented version of the Stitch design.

**Independent Test**: A reviewer can compare the app against the Stitch project screens and confirm that each required screen has the same information architecture, visual hierarchy, component anatomy, spacing intent, color usage, typography, and responsive ordering.

**Acceptance Scenarios**:

1. **Given** a reviewer compares the app to the Desktop Workbench Dashboard, **When** they inspect the header, report controls, filters, map, visible report list, selected report detail, markers, chips, and states, **Then** each region matches the Stitch reference in layout, content priority, visual treatment, and component behavior.
2. **Given** a reviewer compares the app to the Mobile Workbench Dashboard, **When** they inspect the stacked layout, **Then** the map, selected feedback, form, filters, report list, and detail surfaces appear in the same mobile order and density as the Stitch reference without overflow.
3. **Given** a reviewer compares the app to the Patrol Logs Dashboard, **When** they scan summary metrics, activity rows, condition/status treatments, and selected activity context, **Then** the patrol surface copies the reference structure and detail level rather than presenting a simplified substitute.
4. **Given** a reviewer compares the app to Desktop and Mobile Report Success State, **When** a submitted report or direct success fallback is shown, **Then** the confirmation content, recovery actions, reassuring tone, and page composition match the Stitch reference.

---

### User Story 2 - Copy the Detailed Component System (Priority: P2)

A user interacting with buttons, cards, inputs, chips, navigation, markers, report details, and state messages experiences the same component language defined by the Stitch reference, not merely similar colors.

**Why this priority**: Faithful design copying depends on component-level details such as shape, spacing, label treatment, icon meaning, selected states, focus rings, dividers, and density.

**Independent Test**: A component review can inspect each repeated control or surface and verify that it follows the Stitch anatomy and state model across default, hover, focus, selected, disabled, empty, loading, success, validation, and error states.

**Acceptance Scenarios**:

1. **Given** a user interacts with primary and secondary actions, **When** buttons appear in navigation, forms, success actions, and patrol rows, **Then** color, radius, padding, typography, icon placement, focus treatment, and pressed/selected states match the Stitch design intent.
2. **Given** a user enters or reviews report details, **When** inputs, text areas, file controls, safety guidance, and validation messages appear, **Then** labels, helper copy, contrast, borders, spacing, and error recovery copy match the Stitch reference.
3. **Given** condition, status, and urgency are shown, **When** chips, markers, tags, or list rows render, **Then** each uses the Stitch non-color cue, icon/symbol, shape treatment, selected indication, and accessible label.
4. **Given** the app shows loading, empty, success, or serious error states, **When** those states appear on any screen, **Then** they reuse the Stitch state patterns and tone instead of generic browser or framework defaults.

---

### User Story 3 - Preserve Safety While Copying Personality (Priority: P3)

A stressed reporter or fast-scanning volunteer can still understand urgency, safety guidance, and report meaning while the app copies all cat-centered visual details from Stitch.

**Why this priority**: The Stitch reference includes warm cat motifs, but WhiskerWatch must remain clear, serious, accessible, and useful for rescue-adjacent situations.

**Independent Test**: A tester can use keyboard navigation, screen-reader inspection, and visual contrast review across every copied screen and confirm that personality never hides urgency, privacy guidance, or recovery paths.

**Acceptance Scenarios**:

1. **Given** the app copies cat-centered motifs such as ears, whiskers, collars, paw pads, bowls, and cat-head markers, **When** injured, unsafe, or error content is shown, **Then** the urgency remains unmistakable through text, iconography, color, and layout priority.
2. **Given** a keyboard user navigates every copied screen, **When** focus moves through navigation, forms, filters, map-adjacent controls, success actions, and patrol rows, **Then** focus is visible and ordered consistently with the Stitch layout.
3. **Given** a screen-reader user reviews reports and actions, **When** condition/status icons or marker treatments appear, **Then** their meaning is available through names and text, not color alone.

### Edge Cases

- The Stitch project includes both desktop and mobile variants of the same workflow; the product must copy each responsive variant without duplicating user-facing content unnecessarily.
- The Stitch project may include hidden screen instances, alternate generated versions, or a DESIGN.md artifact; all must be inventoried, and any unique visual or content detail must be either implemented or explicitly documented as a reference-only duplicate.
- A direct report success route may not have a fresh report; the fallback must still match the Stitch success composition and recovery paths.
- Patrol logs may contain no reports, filtered-out reports, or many reports; every state must copy the Stitch density, row anatomy, and scannability.
- Map tiles, uploaded photos, or report data may be slow, unavailable, or failed; reserved space and state treatment must match the Stitch visual system.
- Long report labels, notes, locations, timestamps, filenames, and status names must wrap inside the copied card, chip, button, and row geometry without overlap.
- Design parity must not introduce unsafe privacy behavior, such as displaying exact home addresses, personal contact information, or unsafe rescue instructions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST treat the Stitch MCP project "WhiskerWatch Rescue Design System" (`projects/9176750856770961097`) as the authoritative design source for this feature.
- **FR-002**: System MUST inventory every Stitch screen and design artifact before implementation, including DESIGN.md, Desktop Workbench Dashboard, Mobile Workbench Dashboard, Desktop Report Success State, Mobile Report Success State, Patrol Logs Dashboard, and any hidden or alternate screen instances exposed by the project.
- **FR-003**: System MUST provide a screen-by-screen parity map that states which app page, route, state, or responsive variant fulfills each Stitch screen and artifact.
- **FR-004**: System MUST copy the Stitch color system, including Coal Tabby, Moss Collar, Porch Leaf, Milk Saucer, Tuna Gold, Ginger Alert, Tabby Green, Night Whisker, Warm Cardboard, Soft Salmon, and the related surface, outline, primary, secondary, tertiary, and error colors.
- **FR-005**: System MUST copy the Stitch typography system using Inter and the reference heading, body, label, line-height, weight, and compact dashboard hierarchy.
- **FR-006**: System MUST copy the Stitch spacing and layout system, including the desktop three-zone workbench, mobile stack order, 320px left controls intent, flexible map center, 360px right detail intent, 1rem gutters, 2rem desktop margins, and 1rem mobile margins.
- **FR-007**: System MUST copy the Stitch shape system, using 8px radius for standard cards, panels, inputs, buttons, chips, map frames, and photo frames, with fully rounded shapes only where the reference uses badge-like forms.
- **FR-008**: System MUST copy the Stitch button system for primary, secondary, urgent, selected, disabled, hover, pressed, and focused states.
- **FR-009**: System MUST copy the Stitch card and panel system for the app shell, Rescue Note form, Scent Trail filters, The Territory map, visible report list, Cat Case Card, success confirmation, patrol metrics, patrol rows, and empty/error surfaces.
- **FR-010**: System MUST copy the Stitch input system for labels, helper text, textarea layout, file upload treatment, validation messages, safety guidance, borders, padding, focus, and disabled states.
- **FR-011**: System MUST copy the Stitch navigation system, including compact WhiskerWatch identity, workbench-oriented top navigation, windowsill underline treatment, active page indication, and post-submit actions.
- **FR-012**: System MUST copy Three Cat Signals condition controls with icon/symbol, label, non-color cue, selected state, border, spacing, and ear-notch treatment.
- **FR-013**: System MUST copy Watch Stage status controls with collar-tag, eye, paw, check, or quiet/closed cues, active/inactive distinction, and accessible text.
- **FR-014**: System MUST copy The Territory map treatment, including cat-head pins, condition-specific marker cues, selected collar or whisker ring, map frame treatment, popup tag, and visible report list integration.
- **FR-015**: System MUST copy Cat Case Card detail treatment, including condition/status chips, section hierarchy, timestamp/location/photo treatment, whisker dividers, and safety-aware notes.
- **FR-016**: System MUST copy Help Signal Sent success treatment on desktop and mobile, including confirmation hierarchy, report summary, and actions to create another report or continue monitoring.
- **FR-017**: System MUST copy Patrol Logs Dashboard treatment, including summary metrics, scan-friendly activity rows, urgency cues, selected activity context, empty state, and large-list density.
- **FR-018**: System MUST copy loading, empty, success, warning, validation, and serious error state treatments from the Stitch reference across every relevant page.
- **FR-019**: System MUST preserve non-color meaning for every condition, status, urgency, marker, and state copied from Stitch.
- **FR-020**: System MUST preserve privacy and safety guidance while copying design details, including warnings against exact home addresses, personal contact information, and unsafe rescue instructions.
- **FR-021**: System MUST provide a documented visual review checklist with screen captures or reviewer notes showing parity status for every Stitch screen and major component category.
- **FR-022**: System MUST document any intentional deviation from the Stitch reference with the affected screen, affected component, reason, user impact, and accepted reviewer.
- **FR-UX**: System MUST use the shared WhiskerWatch condition/status vocabulary, marker treatment, and loading/error/empty-state patterns for user-facing report workflows.
- **FR-A11Y**: System MUST keep interactive report and map controls keyboard reachable, screen-reader understandable, and WCAG AA contrast compliant.

### Key Entities *(include if feature involves data)*

- **Stitch Design Reference**: The authoritative project containing design tokens, generated screens, screenshots, source artifacts, and DESIGN.md guidance.
- **Stitch Screen**: A desktop, mobile, hidden, or alternate reference screen that must be inventoried and either implemented or classified as duplicate/reference-only.
- **Parity Map**: The traceability record connecting each Stitch screen or artifact to an app page, route, responsive state, component, or documented deviation.
- **Design Detail**: A specific visual or interaction decision from Stitch, such as color, typography, spacing, shape, iconography, copy hierarchy, state treatment, component anatomy, or responsive order.
- **Deviation Record**: A documented exception where the app intentionally differs from Stitch for safety, accessibility, feasibility, or product correctness.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Stitch screens and design artifacts are listed in the parity map with an app destination or documented reference-only/deviation status.
- **SC-002**: Design review confirms every required product screen reaches at least 95% visual parity with its Stitch reference for layout, component anatomy, color, typography, spacing, and state treatment.
- **SC-003**: 100% of Stitch token categories are represented in the app design system: colors, typography, spacing, radius, buttons, cards, inputs, navigation, markers, chips, and states.
- **SC-004**: At least 90% of first-time reviewers can match each implemented app screen to its Stitch reference screen within 5 seconds.
- **SC-005**: At least 90% of testers can submit a report, understand the copied success confirmation, navigate to patrol logs, and return to the workbench without assistance.
- **SC-PERF**: Users can load and interact with the copied workbench and patrol logs views with 100 visible reports without visible blocking during normal browsing.
- **SC-QUALITY**: Automated or documented verification covers desktop workbench, mobile workbench, desktop success, mobile success, patrol logs, hidden/alternate screen inventory, empty state, loading state, validation error, keyboard focus behavior, and non-color cue behavior.

## Assumptions

- The Stitch project named "WhiskerWatch Rescue Design System" is the current approved reference and supersedes previous looser interpretation of the design.
- "Copy all the design" means faithful product implementation of the user's own Stitch reference, including every meaningful layout, component, token, responsive, copy hierarchy, and state detail.
- Exact implementation may adapt only where required for safety, accessibility, real data behavior, or viewport constraints, and every such deviation must be documented.
- Hidden or alternate Stitch screen instances may include duplicate generated variants; they still require inventory, but duplicate-only details do not require separate user-facing routes.
- The app remains a functional reporting and monitoring product, not a marketing landing page.
- The DESIGN.md artifact is a design reference and source of token/component rules, not a standalone user-facing app route.

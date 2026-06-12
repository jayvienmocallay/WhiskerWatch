# Feature Specification: WhiskerWatch Cat Report Map

**Feature Branch**: `001-cat-report-map`

**Created**: 2026-06-11

**Status**: Draft

**Input**: User description: "WhiskerWatch is a community-powered web app that lets users pin and report stray or lost cats on an interactive map. Anyone can drop a pin, upload a photo, and tag the cat's condition (healthy, injured, needs food). Local volunteers and shelters can monitor the map and respond. It helps stray cats get noticed and rescued faster, turning everyday people into part of the solution."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Report a Cat Sighting (Priority: P1)

A community member who sees a stray or lost cat can mark the cat's location on a map, add a photo when available, choose the cat's condition, and submit the report so nearby helpers can see it.

**Why this priority**: Without a reliable report submission flow, the app cannot collect the information volunteers and shelters need to respond.

**Independent Test**: A tester can open the reporting experience, choose a location, enter required report details, submit the report, and confirm the report appears with the correct location and condition.

**Acceptance Scenarios**:

1. **Given** a reporter is viewing the map, **When** they choose a location, add a condition, and submit the report, **Then** the report is saved and shown on the map with the selected condition.
2. **Given** a reporter has a photo of the cat, **When** they attach the photo and submit a valid report, **Then** the report detail includes the photo.
3. **Given** a reporter tries to submit without a location or condition, **When** they submit the form, **Then** the app explains what is missing and does not create an incomplete report.

---

### User Story 2 - Monitor Nearby Reports (Priority: P2)

A local volunteer or shelter worker can view cat reports on the map, identify urgent cases, and inspect report details to decide whether and how to respond.

**Why this priority**: The collected reports only create impact if responders can quickly find cats that need help.

**Independent Test**: A tester can load the map with multiple reports, distinguish conditions at a glance, open report details, and identify which reports need urgent attention.

**Acceptance Scenarios**:

1. **Given** multiple reports exist in the same area, **When** a volunteer views the map, **Then** each report is represented with a clear marker that communicates condition.
2. **Given** a volunteer selects a report marker, **When** the report detail opens, **Then** it shows the photo if available, condition, status, approximate location, and submission time.
3. **Given** reports include healthy, injured, and needs-food conditions, **When** a volunteer scans the map, **Then** injured and needs-food reports are visually distinguishable from healthy reports.

---

### User Story 3 - Find Relevant Reports Quickly (Priority: P3)

A community member, volunteer, or shelter worker can narrow visible reports by condition and status so they can focus on reports that match their ability to help.

**Why this priority**: Filtering makes the map usable as report volume grows and helps responders prioritize urgent needs.

**Independent Test**: A tester can create or load reports with different conditions and statuses, apply filters, and confirm only matching reports remain visible.

**Acceptance Scenarios**:

1. **Given** reports with multiple conditions are visible, **When** a user filters for injured cats, **Then** only injured cat reports remain visible on the map and in any report list.
2. **Given** no reports match a selected filter, **When** the user applies that filter, **Then** the app shows a clear empty state and offers a way to reset filters.

---

### Edge Cases

- A user denies or cannot provide current location access.
- A user selects a location outside the currently visible map area.
- A user attempts to submit the same report multiple times while the first submission is still pending.
- A photo is too large, unsupported, missing, or fails to upload.
- The map or report list cannot load because of a network problem.
- A submitted report has an urgent condition but no photo.
- Multiple reports are close together or overlap on the map.
- A user enters unsafe or personally identifying information in optional notes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow any visitor to create a cat report with a map location and condition.
- **FR-002**: System MUST support the condition options healthy, injured, and needs food.
- **FR-003**: System MUST allow a reporter to attach one cat photo to a report when a valid photo is available.
- **FR-004**: System MUST validate that every submitted report has a location and condition before it can be created.
- **FR-005**: System MUST show submitted cat reports as markers on an interactive map.
- **FR-006**: System MUST provide a report detail view that includes condition, status, submission time, approximate location, and photo when available.
- **FR-007**: System MUST visually distinguish report markers by condition.
- **FR-008**: System MUST let users filter visible reports by condition.
- **FR-009**: System MUST let users filter visible reports by status.
- **FR-010**: System MUST prevent duplicate submissions while a report submission is pending.
- **FR-011**: System MUST show clear loading, success, empty, and failure states for report creation and map monitoring.
- **FR-012**: System MUST reject unsupported or oversized photos with a user-readable explanation.
- **FR-013**: System MUST avoid displaying reporter contact details or other personal information unless a later feature explicitly adds consent-based sharing.
- **FR-014**: System MUST mark newly created reports with an initial status that indicates they have been reported but not yet resolved.
- **FR-015**: System MUST limit optional notes to non-personal cat/location context, reject or hide phone numbers, email addresses, social handles, exact home addresses, and instructions that encourage unsafe rescue behavior, and explain the issue in user-readable language.
- **FR-016**: System MUST display public report locations approximately while preserving enough area context for volunteers to find the reported cat.
- **FR-UX**: System MUST use the shared WhiskerWatch condition/status vocabulary, marker treatment, and loading/error/empty-state patterns for user-facing report workflows.
- **FR-A11Y**: System MUST keep interactive report and map controls keyboard reachable, screen-reader understandable, and WCAG AA contrast compliant.
- **FR-DESIGN-001**: System MUST apply the visual design direction from `/DESIGN.md` to the map, report form, condition/status filters, visible report list, report detail, loading/empty/success/error states, and responsive layout.
- **FR-DESIGN-002**: System MUST preserve rescue-aware usability while applying catsy motifs by ensuring cat-specific symbols, chips, markers, motion, and decorative treatments have accessible text equivalents and do not reduce urgency, contrast, readability, or task speed.

### Key Entities

- **Cat Report**: A community-submitted sighting or need report for a stray or lost cat. Key information includes location, condition, status, photo reference when present, submission time, and optional non-personal notes.
- **Condition**: The observed state of the cat, limited for this feature to healthy, injured, or needs food.
- **Report Status**: The response lifecycle for a report, starting as reported and available for future updates such as being monitored, helped, resolved, or closed.
- **Report Photo**: A reporter-provided image associated with a single cat report, subject to validation for safety, size, and supported format.
- **Map Filter**: User-selected criteria that determine which reports are visible on the map and any accompanying report list.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of first-time reporters can submit a valid cat report in under 2 minutes during usability testing.
- **SC-002**: At least 95% of valid submitted reports appear on the map with the correct location and condition after submission.
- **SC-003**: Volunteers can identify all injured reports in a mixed set of at least 25 visible reports in under 30 seconds.
- **SC-004**: Users can recover from missing required fields, failed photo validation, and network failure without losing already entered report details.
- **SC-PERF**: Users can load and interact with a map containing 100 reports without visible blocking during normal browsing.
- **SC-QUALITY**: Automated validation covers all rescue-critical acceptance scenarios for creating, displaying, filtering, and failure handling of reports.
- **SC-DESIGN**: Desktop and mobile design review confirms all required `DESIGN.md` feature identities are represented or explicitly documented as deferred.

## Assumptions

- Report submission is open to visitors for the MVP; identity and moderation controls can be added in later features.
- A report's displayed location may be approximate enough to protect safety while still allowing volunteers to locate the area.
- The initial status for new reports is reported.
- Photo upload is optional because reporters may not be able to safely take a photo.
- Optional notes, if added during implementation, are non-personal and can be validated or hidden if unsafe.
- Volunteer or shelter response coordination beyond monitoring and inspecting reports is outside this feature's initial scope.

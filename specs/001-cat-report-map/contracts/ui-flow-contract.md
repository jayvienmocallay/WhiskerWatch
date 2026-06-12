# Contract: User Interface Flows

## Flow: Create Cat Report

### Entry State

- User is on the public map.
- Report creation control is visible and keyboard reachable.
- The report form is styled as the `DESIGN.md` "Rescue Note": compact workbench panel, whisker/clipboard accent, Moss Collar primary submit button, and visible note safety guidance.

### Required Inputs

- Location selected on the map or from current location.
- Condition selected from healthy, injured, or needs food.

### Optional Inputs

- One valid cat photo.
- Non-personal notes.

### Success Outcome

- Submit control enters a pending state and prevents duplicate submission.
- A valid report is created with initial status `reported`.
- The new report appears on the map with the correct condition marker.
- A success state confirms the report is visible to helpers.
- Success styling uses Tabby Green with a helped-paw or collar-tag check motif and remains perceivable by screen-reader users.

### Failure Outcomes

- Missing location or condition shows field-specific guidance and keeps entered data.
- Invalid photo shows a clear explanation and allows replacement or removal.
- Network failure shows retry guidance and keeps entered data.
- Error styling uses Ginger Alert and an alert-ear motif without playful copy.

## Flow: Monitor Reports

### Entry State

- User is on the public map with active reports available.

### Success Outcome

- Active reports appear as markers.
- Marker treatment communicates condition without relying on color alone.
- Selecting a marker opens report details with condition, status, approximate location, submission time, notes when safe, and photo when available.
- The map uses `DESIGN.md` "Territory" styling: cat-head or cat-tag markers, selected-state whisker/collar-ring treatment, compact cat-tag popups, and collar-tag visible report list items.

### Empty State

- If no active reports are available, the UI explains that no reports match the current view or filters.
- Empty states use quiet windowsill, paw-trail, or collar-tag motifs without competing with the map.

## Flow: Filter Reports

### Entry State

- User is viewing reports on the public map.

### Controls

- Condition filter with healthy, injured, and needs food.
- Status filter with active statuses.
- Reset filters control.
- Condition filters use "Scent Trail Filters"; status filters use "Watch Stages". Each chip includes label plus icon/symbol, border/shape state, and color.

### Success Outcome

- Visible markers and any report list update to match selected filters.
- Empty results show a clear empty state and reset option.

## Accessibility Requirements

- All controls are keyboard reachable.
- Map markers or matching report list items expose accessible names including condition and status.
- Marker condition differences use text, icon, or shape in addition to color.
- Error messages are programmatically associated with the affected inputs.
- Interactive elements meet WCAG AA contrast expectations.
- Icon-only motifs are decorative unless they have an accessible text equivalent.
- Tuna Gold focus outlines are visible on map controls, chips, inputs, buttons, and report list items.

## Performance Requirements

- Map remains responsive with 100 visible reports.
- Filtering 100 visible reports updates without visible blocking.
- Report submission displays pending feedback immediately.
- Photo validation happens before upload begins.
- Catsy textures, icons, marker treatments, and motion remain lightweight and do not delay the initial usable map view.

## Visual Design Requirements

- App shell follows the `DESIGN.md` "Neighborhood Lookout" with a practical three-zone workbench and windowsill header cue.
- Desktop layout keeps left report creation/filters, center map/list, and right report detail.
- Mobile layout stacks map first, selected feedback, report form, filters, then detail.
- The named color tokens from `DESIGN.md` are represented in CSS variables or equivalent design tokens.
- Motion is subtle, purposeful, and disabled or reduced when users prefer reduced motion.

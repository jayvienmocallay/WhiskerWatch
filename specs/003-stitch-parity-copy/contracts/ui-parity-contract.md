# UI Parity Contract

## Scope

This contract defines the app behavior and review expectations required to satisfy strict parity with the Stitch project `WhiskerWatch Rescue Design System`.

## Routes And Surfaces

| Surface | Required Access | Required Reference |
|---------|-----------------|--------------------|
| Workbench | Main app view and direct seeded test URL | Desktop Workbench Dashboard, Mobile Workbench Dashboard |
| Success | Post-submit state and direct fallback URL | Desktop Report Success State, Mobile Report Success State |
| Patrol Logs | Navigation action and direct seeded test URL | Patrol Logs Dashboard |
| DESIGN.md | Not user-facing | Token, component, accessibility, and motif source |

## Required Component Families

Each family must copy Stitch details for default, hover, focus, selected, disabled, empty, loading, success, validation, and error states where applicable.

- App shell and compact WhiskerWatch identity
- Top navigation and active page treatment
- Rescue Note form
- Input labels, helper text, validation, and safety guidance
- Three Cat Signals condition controls
- Watch Stage status filters/chips
- The Territory map frame and marker system
- Visible collar-tag report list
- Cat Case Card report detail
- Snapshot/photo frame
- Help Signal Sent success confirmation
- Patrol metrics and scan-friendly activity rows
- Loading, empty, success, warning, validation, and serious error states

## Token Parity Requirements

- Colors must include all named Stitch colors and supporting surface/outline/primary/secondary/tertiary/error values.
- Typography must use Inter and preserve the Stitch hierarchy for headline, body, and label text.
- Spacing must preserve the three-zone desktop workbench and mobile stack order.
- Standard radii must remain 8px unless Stitch uses a badge/pill.
- Focus must use the Tuna Gold visible outline.
- Cat motifs must be meaningful and never reduce safety or urgency.

## Visual Precision Criteria

The 95% visual parity target is satisfied only when each reviewed screen meets at least 19 of these 20 checks:

- Screen has the same primary regions as the Stitch reference.
- Region order matches the Stitch desktop or mobile reference.
- Logo mark, wordmark, scale, placement, and spacing are consistent across workbench, success, patrol, empty, loading, and error states.
- Header/navigation hierarchy, active state, and windowsill underline match the reference.
- Color tokens match the Stitch palette or are recorded as deviations.
- Typography uses the Stitch font family, weight, line-height, and label hierarchy.
- Desktop workbench preserves the left controls, flexible map center, and right detail intent.
- Mobile workbench preserves map-first stacking and avoids horizontal overflow.
- Standard radius remains 8px unless the reference uses a badge or pill.
- Buttons match reference color, padding, radius, icon placement, focus, selected, and disabled states.
- Cards and panels match reference background, border, padding, density, and section hierarchy.
- Inputs match reference label, helper text, border, padding, focus, and validation treatment.
- Condition controls match Three Cat Signals anatomy, selected state, icon/symbol, and ear-notch treatment.
- Status controls match Watch Stage anatomy, selected/inactive state, icon/symbol, and non-color cue text.
- Map markers match cat-head/cat-signal shape, condition cue, accessible label, and selected collar or whisker ring.
- Report list and patrol rows match density, hierarchy, urgency cue, and selected state.
- Success state matches Help Signal Sent hierarchy, summary content, and recovery actions.
- Loading, empty, warning, success, validation, and serious error states use Stitch state anatomy.
- Long text wraps without overlap in cards, chips, buttons, rows, and map-adjacent surfaces.
- Accessibility checks pass for keyboard focus, names, non-color meaning, and WCAG AA contrast.

## Accessibility Requirements

- Every icon-only or symbol-led control must have an accessible name.
- Condition and status must be understandable without color.
- Focus order must follow visual order for desktop and mobile.
- Text and controls must meet WCAG AA contrast.
- Validation and safety guidance must be programmatically associated with relevant controls.

## Verification Requirements

Automated verification:
- Unit tests for token and vocabulary integrity.
- Integration tests for form, filters, map/list semantics, route state, success, and patrol logs.
- End-to-end tests for report submission, navigation, mobile stack order, accessibility, and 100-report workbench/patrol usage.

Documented visual verification:
- Compare desktop workbench to Stitch.
- Compare mobile workbench to Stitch.
- Compare desktop success to Stitch.
- Compare mobile success to Stitch.
- Compare patrol logs to Stitch.
- Classify hidden/alternate Stitch screens.
- Record the 20-point visual precision score for each visible screen.
- Record whether at least 90% of first-time reviewers can match each implemented app screen to its Stitch reference within 5 seconds, or document the accepted review proxy.
- Record every deviation.

## Deviation Policy

Differences from Stitch are allowed only when needed for safety, accessibility, real data behavior, technical feasibility, or viewport constraints. Each deviation must identify the affected screen, component, reference behavior, implemented behavior, reason, user impact, accepted reviewer, and verification method.

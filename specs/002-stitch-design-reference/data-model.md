# Data Model: Stitch Design Reference Adoption

This feature does not add persistence entities. It introduces design and page-model concepts used to organize implementation and verification.

## Design Reference

Represents the approved Stitch MCP project.

**Fields**

- `projectName`: "WhiskerWatch Rescue Design System"
- `projectId`: `projects/9176750856770961097`
- `sourceScreens`: List of Stitch screen titles and IDs
- `designTokens`: Color, typography, radius, spacing, and focus definitions

**Validation Rules**

- Must include the required screen list from the spec.
- Must map DESIGN.md as a reference artifact, not a user-facing route.

## Product Page

Represents a navigable app surface aligned to one or more Stitch screens.

**Fields**

- `id`: `workbench`, `success`, or `patrol`
- `label`: Visible navigation label
- `purpose`: User-facing page intent
- `stitchScreens`: Stitch screens fulfilled by this page or responsive state
- `primaryAction`: Main user action available on the page

**Relationships**

- A Product Page maps to one or more Screen Mappings.
- A Product Page uses multiple Component Patterns.

**Validation Rules**

- Must preserve report context when moving between workbench, success, and patrol views.
- Must remain usable on desktop and mobile.

## Design Token

Represents a reusable design decision.

**Fields**

- `name`: Token name such as `mossCollar` or `headlineMd`
- `value`: Color, size, spacing, or radius value
- `category`: color, typography, spacing, radius, focus, or surface
- `usage`: Approved use in the app

**Validation Rules**

- Must include all named Stitch palette colors from the spec.
- Must avoid conflicting definitions between TypeScript tokens and CSS custom properties.

## Component Pattern

Represents a reusable UI treatment.

**Fields**

- `name`: Pattern name
- `surface`: Workbench, form, map, filter, detail, success, patrol, or state
- `requiredCues`: Visible label, symbol/icon, color, shape, and accessible text as applicable
- `states`: Default, hover, focus, selected, disabled, loading, empty, success, or error

**Validation Rules**

- Condition and status patterns must include non-color cues.
- Error and safety patterns must use serious language and visual treatment.
- Focus treatment must be visible and consistent.

## Screen Mapping

Represents how a Stitch screen is fulfilled in the app.

**Fields**

- `stitchTitle`: Stitch screen title
- `appSurface`: Product Page or reference artifact
- `viewport`: desktop, mobile, or reference
- `verification`: Automated or documented check that proves coverage

**Validation Rules**

- Every required Stitch screen must have a mapping.
- Responsive variants must not create duplicate workflows.

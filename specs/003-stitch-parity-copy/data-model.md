# Data Model: Stitch Parity Copy

## Stitch Design Reference

Represents the approved Stitch project.

**Fields**
- `projectId`: `projects/9176750856770961097`
- `title`: `WhiskerWatch Rescue Design System`
- `designMd`: token and component guidance from Stitch
- `tokens`: colors, typography, spacing, radius, motifs, iconography
- `screens`: list of visible, hidden, alternate, and design-system instances

**Validation Rules**
- Must be refreshed from Stitch before implementation tasks begin.
- Must preserve the project title and ID in parity documentation.

## Stitch Screen

Represents a screen, responsive variant, hidden alternate, DESIGN.md artifact, or design-system instance.

**Fields**
- `screenId` or `assetId`
- `instanceId`
- `title`
- `deviceType`
- `width`
- `height`
- `visibility`: visible, hidden, design-system, or reference artifact
- `sourceType`: screen, asset, or DESIGN.md
- `appTarget`: route, page state, responsive state, component family, duplicate/reference-only, or deviation

**Relationships**
- Belongs to one Stitch Design Reference.
- Maps to one Parity Target or one Deviation Record.

**Validation Rules**
- Every Stitch screen instance must have a mapping row.
- Hidden alternates may be classified as duplicates only after review.

## Parity Target

Represents the app surface that fulfills one Stitch screen or design detail.

**Fields**
- `targetType`: route, page state, responsive variant, component family, token family, or test fixture
- `targetPath`: app URL, component path, CSS/token path, or test path
- `requiredDetails`: layout, typography, spacing, color, state, component anatomy, copy hierarchy, and accessibility details
- `verification`: automated test, screenshot review, manual checklist, or combination

**Relationships**
- Fulfills one or more Stitch Screens.
- References Design Details and Test Scenarios.

**Validation Rules**
- Must be independently verifiable.
- Must not depend on color alone for report condition or status meaning.

## Design Detail

Represents a copied visual or interaction detail.

**Fields**
- `category`: color, typography, spacing, radius, button, card, input, navigation, marker, chip, state, responsive layout, iconography, copy hierarchy, focus, or accessibility
- `stitchSource`: DESIGN.md, screen title, hidden screen, or screenshot
- `expectedAppBehavior`
- `reviewStatus`: pending, copied, deviated, or blocked

**Validation Rules**
- Token-level details must be centralized in shared UI/CSS token files.
- Component details must be reusable across repeated controls and surfaces.

## Deviation Record

Represents an intentional difference from Stitch.

**Fields**
- `affectedScreen`
- `affectedComponent`
- `referenceBehavior`
- `implementedBehavior`
- `reason`
- `userImpact`
- `acceptedBy`
- `verificationMethod`

**Validation Rules**
- Allowed reasons are safety, accessibility, real data behavior, technical feasibility, or viewport constraint.
- Cosmetic preference is not sufficient for a deviation.

## Test Scenario

Represents a validation path for parity.

**Fields**
- `scenarioName`
- `screenTargets`
- `viewport`
- `fixtures`
- `expectedOutcome`
- `testType`: unit, integration, e2e, accessibility, performance, or visual review

**Validation Rules**
- Must cover desktop workbench, mobile workbench, desktop success, mobile success, patrol logs, hidden/alternate inventory, empty state, loading state, validation error, keyboard focus behavior, and non-color cue behavior.

# Data Model: WhiskerWatch Cat Report Map

## Entity: CatReport

Represents a community-submitted report for a stray or lost cat.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | Yes | Stable generated identifier. |
| `location` | GeoPoint-like object | Yes | Latitude and longitude selected by the reporter. |
| `locationPrecision` | enum | Yes | `exact` or `approximate`; MVP defaults to `approximate` for display. |
| `condition` | Condition | Yes | `healthy`, `injured`, or `needs_food`. |
| `status` | ReportStatus | Yes | New reports start as `reported`. |
| `photo` | ReportPhoto | No | Present only when a valid photo upload succeeds. |
| `notes` | string | No | Non-personal reporter notes after validation/sanitization. |
| `createdAt` | timestamp | Yes | Server-generated creation time. |
| `updatedAt` | timestamp | Yes | Server-generated update time. |
| `source` | SourceContext | Yes | Minimal source metadata for integrity and abuse analysis. |

### Validation Rules

- `location.latitude` MUST be between -90 and 90.
- `location.longitude` MUST be between -180 and 180.
- `condition` MUST be one of `healthy`, `injured`, or `needs_food`.
- `status` MUST be one of the defined ReportStatus values.
- `photo` MUST be omitted or reference a validated uploaded image owned by this report.
- `notes` MUST be optional, length-limited, and must not display unsafe or personal information.
- `notes` MUST be 500 characters or less.
- `notes` MUST reject or hide phone numbers, email addresses, social handles, exact home addresses, and unsafe rescue instructions before display.
- Public display coordinates MUST be derived from the submitted coordinates using a documented approximation rule.
- Exact submitted coordinates MUST NOT be shown in report detail text.
- `createdAt` and `updatedAt` MUST be assigned by the system, not the reporter.

## Entity: Condition

Represents the observed state of a cat.

### Values

| Value | Label | Marker Meaning |
|-------|-------|----------------|
| `healthy` | Healthy | Cat appears stable; monitoring or adoption support may be useful. |
| `injured` | Injured | Cat may need urgent help. |
| `needs_food` | Needs food | Cat appears hungry or underfed. |

## Entity: ReportStatus

Represents the response lifecycle for a report.

### Values

| Value | Label | Meaning |
|-------|-------|---------|
| `reported` | Reported | Newly submitted and not yet actioned. |
| `monitoring` | Monitoring | A volunteer or shelter is watching or investigating. |
| `helped` | Helped | Food, care, rescue, or another response was provided. |
| `resolved` | Resolved | The report no longer needs active response. |
| `closed` | Closed | The report is hidden from active response because it is invalid, duplicate, stale, or unsafe. |

### State Transitions

```text
reported -> monitoring
reported -> helped
reported -> closed
monitoring -> helped
monitoring -> resolved
monitoring -> closed
helped -> resolved
helped -> closed
```

MVP report creation only creates `reported` reports. Later status updates must follow the transition table.

## Entity: ReportPhoto

Represents one optional image associated with a CatReport.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `storagePath` | string | Yes | Storage location scoped to the report. |
| `downloadUrl` | string | Yes | Readable URL or reference used by the UI. |
| `contentType` | string | Yes | Allowed image MIME type. |
| `sizeBytes` | number | Yes | Must be within upload limits. |
| `uploadedAt` | timestamp | Yes | System-generated upload completion time. |

### Validation Rules

- Exactly zero or one photo may be attached to a CatReport.
- Photo content type MUST be `image/jpeg`, `image/png`, or `image/webp`.
- Photo size MUST be 5 MB or less before upload.
- Failed photo upload MUST NOT create a report that claims a photo exists.

## Entity: SourceContext

Minimal source metadata used for integrity checks without exposing personal contact information.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `submissionId` | string | Yes | Client-generated idempotency key for duplicate prevention. |
| `submittedBy` | enum | Yes | MVP value: `visitor`. |
| `userAgentHash` | string | No | Optional abuse-analysis value; not displayed. |

## Entity: MapFilter

Represents user-selected criteria for visible reports.

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `conditions` | Condition[] | No | Empty means all conditions. |
| `statuses` | ReportStatus[] | No | Empty means active statuses. |
| `viewport` | map bounds | No | Optional map area restriction. |

### Derived Defaults

- Default condition filter: all conditions.
- Default status filter: `reported`, `monitoring`, and `helped`.
- Closed reports are hidden by default.

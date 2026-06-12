# Contract: Firestore and Storage

## Firestore Collection: `catReports`

Each document represents one `CatReport`.

### Required Document Shape

```json
{
  "location": {
    "latitude": 14.5995,
    "longitude": 120.9842
  },
  "locationPrecision": "approximate",
  "condition": "injured",
  "status": "reported",
  "photo": {
    "storagePath": "catReports/{reportId}/photo.webp",
    "downloadUrl": "https://example.invalid/photo.webp",
    "contentType": "image/webp",
    "sizeBytes": 245000,
    "uploadedAt": "server_timestamp"
  },
  "notes": "Orange tabby near the market entrance.",
  "createdAt": "server_timestamp",
  "updatedAt": "server_timestamp",
  "source": {
    "submissionId": "client-generated-idempotency-key",
    "submittedBy": "visitor"
  }
}
```

### Create Rules

- Public visitors MAY create a report.
- Create MUST require `location`, `locationPrecision`, `condition`, `status`, `createdAt`, `updatedAt`, and `source.submissionId`.
- `status` MUST equal `reported` on create.
- `condition` MUST be one of `healthy`, `injured`, or `needs_food`.
- Location values MUST be valid latitude/longitude numbers.
- Reporter contact fields MUST NOT be accepted.
- If `photo` is present, it MUST reference the matching report-owned storage path.

### Read Rules

- Public visitors MAY read active reports needed for the public map.
- Reports with status `closed` SHOULD be excluded from default public queries.

### Update Rules

- MVP client report creation does not require public report updates.
- Future status updates MUST restrict transitions according to `data-model.md`.

## Storage Path: `catReports/{reportId}/photo.{ext}`

### Upload Rules

- Public visitors MAY upload one image for a pending report submission.
- Accepted content types: `image/jpeg`, `image/png`, `image/webp`.
- Maximum size: 5 MB.
- Path MUST be scoped to a single report id.

### Read Rules

- Public visitors MAY read images referenced by active public reports.

## Contract Tests

- Creating a valid report succeeds and produces a readable active report.
- Creating a report without location fails.
- Creating a report without condition fails.
- Creating a report with unsupported condition fails.
- Creating a report with contact fields fails.
- Uploading a supported image under 5 MB succeeds.
- Uploading an unsupported or oversized image fails.
- A report cannot claim a photo path outside its own report scope.

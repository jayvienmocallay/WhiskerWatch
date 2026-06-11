import type { Condition, NewReportInput, ReportLocation, ReportStatus } from "./reportTypes";
import { formCopy } from "../../ui/copy";

const conditions: Condition[] = ["healthy", "injured", "needs_food"];
const statuses: ReportStatus[] = ["reported", "monitoring", "helped", "resolved", "closed"];
const supportedPhotoTypes = ["image/jpeg", "image/png", "image/webp"];
const maxPhotoSize = 5 * 1024 * 1024;
const contactPattern = /(\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b)|(\+?\d[\d\s().-]{7,}\d)|(@[\w_]{2,})/;
const unsafePattern = /\b(grab|trap|chase|corner|force|poison|hurt)\b/i;

export function isCondition(value: unknown): value is Condition {
  return typeof value === "string" && conditions.includes(value as Condition);
}

export function isReportStatus(value: unknown): value is ReportStatus {
  return typeof value === "string" && statuses.includes(value as ReportStatus);
}

export function isValidLocation(location?: ReportLocation): location is ReportLocation {
  return (
    typeof location?.latitude === "number" &&
    typeof location?.longitude === "number" &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
}

export function validatePhoto(file?: File): string | undefined {
  if (!file) return undefined;
  if (!supportedPhotoTypes.includes(file.type) || file.size > maxPhotoSize) {
    return formCopy.invalidPhoto;
  }
  return undefined;
}

export function validateNotes(notes = ""): string | undefined {
  const trimmed = notes.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > 500) return "Notes must be 500 characters or less.";
  if (contactPattern.test(trimmed) || unsafePattern.test(trimmed)) return formCopy.unsafeNotes;
  return undefined;
}

export function sanitizeNotes(notes = ""): string | undefined {
  const trimmed = notes.trim().replace(/\s+/g, " ");
  return trimmed ? trimmed : undefined;
}

export function createSubmissionId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `submission-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function validateNewReport(input: NewReportInput) {
  const errors: Record<string, string> = {};
  if (!isValidLocation(input.location)) errors.location = formCopy.missingLocation;
  if (!isCondition(input.condition)) errors.condition = formCopy.missingCondition;
  const photoError = validatePhoto(input.photoFile);
  if (photoError) errors.photo = photoError;
  const notesError = validateNotes(input.notes);
  if (notesError) errors.notes = notesError;
  return { valid: Object.keys(errors).length === 0, errors };
}

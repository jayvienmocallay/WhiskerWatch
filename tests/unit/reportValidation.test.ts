import { describe, expect, it } from "vitest";
import { makePhotoFile } from "../../src/test/fixtures/reports";
import {
  createSubmissionId,
  isCondition,
  isValidLocation,
  sanitizeNotes,
  validateNewReport,
  validateNotes,
  validatePhoto,
} from "../../src/features/reports/reportValidation";

describe("report validation", () => {
  it("requires location and condition", () => {
    const result = validateNewReport({ submissionId: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors.location).toMatch(/location/i);
    expect(result.errors.condition).toMatch(/condition/i);
  });

  it("accepts valid location and condition", () => {
    expect(isValidLocation({ latitude: 14.6, longitude: 120.98 })).toBe(true);
    expect(isCondition("injured")).toBe(true);
  });

  it("rejects invalid photos", () => {
    expect(validatePhoto(makePhotoFile({ type: "text/plain" }))).toMatch(/JPEG/i);
    expect(validatePhoto(makePhotoFile({ size: 6 * 1024 * 1024 }))).toMatch(/5 MB/i);
  });

  it("limits notes and rejects contact or unsafe instructions", () => {
    expect(validateNotes("a".repeat(501))).toMatch(/500/);
    expect(validateNotes("Call me at 555-123-1234")).toMatch(/contact/i);
    expect(validateNotes("Please chase the cat")).toMatch(/contact/i);
  });

  it("sanitizes notes and creates submission ids", () => {
    expect(sanitizeNotes("  orange   cat near store ")).toBe("orange cat near store");
    expect(createSubmissionId()).toBeTruthy();
  });
});

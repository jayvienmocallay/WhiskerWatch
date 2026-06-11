import { beforeEach, describe, expect, it } from "vitest";
import { clearMemoryReports, listActiveReports } from "../../src/firebase/reportsRepository";
import { submitReport } from "../../src/features/reports/reportService";
import { makePhotoFile } from "../../src/test/fixtures/reports";

describe("report creation contract", () => {
  beforeEach(() => clearMemoryReports());

  it("creates a valid readable report", async () => {
    const report = await submitReport({
      location: { latitude: 14.5995, longitude: 120.9842 },
      condition: "injured",
      photoFile: makePhotoFile(),
      notes: "Orange cat near the market entrance.",
      submissionId: "contract-valid",
    });
    expect(report.status).toBe("reported");
    expect(report.photo?.storagePath).toContain(report.source.submissionId);
    await expect(listActiveReports()).resolves.toHaveLength(1);
  });

  it("rejects missing location, missing condition, contact fields, unsafe notes, and invalid photos", async () => {
    await expect(submitReport({ condition: "injured", submissionId: "missing-location" })).rejects.toThrow();
    await expect(
      submitReport({ location: { latitude: 14, longitude: 120 }, submissionId: "missing-condition" }),
    ).rejects.toThrow();
    await expect(
      submitReport({
        location: { latitude: 14, longitude: 120 },
        condition: "healthy",
        notes: "email me at helper@example.com",
        submissionId: "contact",
      }),
    ).rejects.toThrow();
    await expect(
      submitReport({
        location: { latitude: 14, longitude: 120 },
        condition: "healthy",
        photoFile: makePhotoFile({ type: "text/plain" }),
        submissionId: "bad-photo",
      }),
    ).rejects.toThrow(/JPEG|PNG|WebP/);
  });
});

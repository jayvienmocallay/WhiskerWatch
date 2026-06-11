import type { CatReport, NewReportInput } from "./reportTypes";
import { sanitizeNotes, validateNewReport } from "./reportValidation";
import { approximateLocation } from "../../map/locationPrivacy";
import { createReport } from "../../firebase/reportsRepository";
import { uploadReportPhoto } from "../../firebase/storageRepository";

const pendingSubmissions = new Set<string>();

export async function submitReport(input: NewReportInput): Promise<CatReport> {
  if (pendingSubmissions.has(input.submissionId)) throw new Error("This report is already being submitted.");

  const validation = validateNewReport(input);
  if (!validation.valid || !input.location || !input.condition) {
    const firstError = Object.values(validation.errors)[0] ?? "Report is missing required information.";
    throw Object.assign(new Error(firstError), {
      validationErrors: validation.errors,
    });
  }

  pendingSubmissions.add(input.submissionId);
  try {
    const now = new Date().toISOString();
    const tempId = input.submissionId;
    const photo = await uploadReportPhoto(tempId, input.photoFile);
    return await createReport({
      location: approximateLocation(input.location),
      locationPrecision: "approximate",
      condition: input.condition,
      status: "reported",
      photo,
      notes: sanitizeNotes(input.notes),
      createdAt: now,
      updatedAt: now,
      source: {
        submissionId: input.submissionId,
        submittedBy: "visitor",
      },
    });
  } finally {
    pendingSubmissions.delete(input.submissionId);
  }
}

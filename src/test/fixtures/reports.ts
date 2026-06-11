import type { CatReport, Condition, ReportStatus } from "../../features/reports/reportTypes";

const conditions: Condition[] = ["healthy", "injured", "needs_food"];
const statuses: ReportStatus[] = ["reported", "monitoring", "helped"];

export function makeReport(overrides: Partial<CatReport> = {}): CatReport {
  const index = Number(overrides.id?.replace(/\D/g, "") || 1);
  const condition = overrides.condition ?? conditions[index % conditions.length];
  return {
    id: `report-${index}`,
    location: { latitude: 14.5995 + index * 0.001, longitude: 120.9842 + index * 0.001 },
    locationPrecision: "approximate",
    condition,
    status: overrides.status ?? statuses[index % statuses.length],
    notes: `Report ${index} near a public landmark.`,
    createdAt: new Date(Date.UTC(2026, 5, 11, 2, index)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 11, 2, index)).toISOString(),
    source: { submissionId: `submission-${index}`, submittedBy: "visitor" },
    ...overrides,
  };
}

export function makeReports(count: number): CatReport[] {
  return Array.from({ length: count }, (_, index) => makeReport({ id: `report-${index + 1}` }));
}

export function makePhotoFile(options: { type?: string; size?: number } = {}) {
  const size = options.size ?? 1024;
  const blob = new Blob([new Uint8Array(size)], { type: options.type ?? "image/webp" });
  return new File([blob], "cat.webp", { type: options.type ?? "image/webp" });
}

export type Condition = "healthy" | "injured" | "needs_food";

export type ReportStatus = "reported" | "monitoring" | "helped" | "resolved" | "closed";

export interface ReportLocation {
  latitude: number;
  longitude: number;
}

export interface ReportPhoto {
  storagePath: string;
  downloadUrl: string;
  contentType: "image/jpeg" | "image/png" | "image/webp";
  sizeBytes: number;
  uploadedAt: string;
}

export interface SourceContext {
  submissionId: string;
  submittedBy: "visitor";
  userAgentHash?: string;
}

export interface CatReport {
  id: string;
  location: ReportLocation;
  locationPrecision: "exact" | "approximate";
  condition: Condition;
  status: ReportStatus;
  photo?: ReportPhoto;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  source: SourceContext;
}

export interface MapFilter {
  conditions: Condition[];
  statuses: ReportStatus[];
}

export interface NewReportInput {
  location?: ReportLocation;
  condition?: Condition;
  photoFile?: File;
  notes?: string;
  submissionId: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

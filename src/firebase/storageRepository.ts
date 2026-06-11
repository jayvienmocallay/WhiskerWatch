import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { ReportPhoto } from "../features/reports/reportTypes";
import { validatePhoto } from "../features/reports/reportValidation";
import { getStorageClient } from "./client";

export async function uploadReportPhoto(reportId: string, file?: File): Promise<ReportPhoto | undefined> {
  if (!file) return undefined;
  const error = validatePhoto(file);
  if (error) throw new Error(error);

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const storagePath = `catReports/${reportId}/photo.${extension}`;
  const storage = getStorageClient();

  if (!storage) {
    return {
      storagePath,
      downloadUrl: URL.createObjectURL(file),
      contentType: file.type as ReportPhoto["contentType"],
      sizeBytes: file.size,
      uploadedAt: new Date().toISOString(),
    };
  }

  const photoRef = ref(storage, storagePath);
  await uploadBytes(photoRef, file, { contentType: file.type });
  return {
    storagePath,
    downloadUrl: await getDownloadURL(photoRef),
    contentType: file.type as ReportPhoto["contentType"],
    sizeBytes: file.size,
    uploadedAt: new Date().toISOString(),
  };
}

import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import type { CatReport } from "../features/reports/reportTypes";
import { getFirestoreClient } from "./client";

const memoryReports = new Map<string, CatReport>();
const listeners = new Set<(reports: CatReport[]) => void>();

function snapshotMemory() {
  const reports = Array.from(memoryReports.values()).filter((report) => report.status !== "closed");
  listeners.forEach((listener) => listener(reports));
}

export async function createReport(report: Omit<CatReport, "id">): Promise<CatReport> {
  const firestore = getFirestoreClient();
  if (!firestore) {
    const id = `report-${memoryReports.size + 1}`;
    const created = { ...report, id };
    memoryReports.set(id, created);
    snapshotMemory();
    return created;
  }

  const docRef = await addDoc(collection(firestore, "catReports"), {
    ...report,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { ...report, id: docRef.id };
}

export async function listActiveReports(): Promise<CatReport[]> {
  const firestore = getFirestoreClient();
  if (!firestore) return Array.from(memoryReports.values()).filter((report) => report.status !== "closed");

  const activeQuery = query(collection(firestore, "catReports"), orderBy("createdAt", "desc"), limit(100));
  const snapshot = await getDocs(activeQuery);
  return snapshot.docs
    .map((doc) => ({ ...(doc.data() as Omit<CatReport, "id">), id: doc.id }))
    .filter((report) => report.status !== "closed");
}

export function subscribeToActiveReports(listener: (reports: CatReport[]) => void): Unsubscribe {
  const firestore = getFirestoreClient();
  if (!firestore) {
    listeners.add(listener);
    void listActiveReports().then(listener);
    return () => listeners.delete(listener);
  }

  const activeQuery = query(collection(firestore, "catReports"), orderBy("createdAt", "desc"), limit(100));
  return onSnapshot(activeQuery, (snapshot) => {
    listener(
      snapshot.docs
        .map((doc) => ({ ...(doc.data() as Omit<CatReport, "id">), id: doc.id }))
        .filter((report) => report.status !== "closed"),
    );
  });
}

export function seedMemoryReports(reports: CatReport[]) {
  reports.forEach((report) => memoryReports.set(report.id, report));
  snapshotMemory();
}

export function clearMemoryReports() {
  memoryReports.clear();
  snapshotMemory();
}

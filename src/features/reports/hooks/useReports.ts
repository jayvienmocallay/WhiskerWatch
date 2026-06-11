import { useEffect, useState } from "react";
import type { CatReport } from "../reportTypes";
import { subscribeToActiveReports } from "../../../firebase/reportsRepository";

export function useReports() {
  const [reports, setReports] = useState<CatReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToActiveReports((nextReports) => {
      setReports(nextReports);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { reports, loading };
}

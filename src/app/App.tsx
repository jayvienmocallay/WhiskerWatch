import { useEffect, useMemo, useState } from "react";
import { ReportDetail } from "../features/reports/components/ReportDetail";
import { ReportFilters } from "../features/reports/components/ReportFilters";
import { ReportForm } from "../features/reports/components/ReportForm";
import { useReports } from "../features/reports/hooks/useReports";
import type { CatReport, MapFilter, NewReportInput, ReportLocation } from "../features/reports/reportTypes";
import { submitReport } from "../features/reports/reportService";
import { CatMap } from "../map/CatMap";
import { defaultMapFilter, filterReports } from "../map/mapFilters";
import { EmptyState, LoadingState } from "../ui/states";
import { seedReports } from "../test/fixtures/seedReports";
import { CollarTagIcon } from "../ui/icons";

export default function App() {
  const { reports, loading } = useReports();
  const [selectedLocation, setSelectedLocation] = useState<ReportLocation | undefined>();
  const [selectedReportId, setSelectedReportId] = useState<string | undefined>();
  const [filter, setFilter] = useState<MapFilter>(defaultMapFilter);
  const [optimisticReports, setOptimisticReports] = useState<CatReport[]>([]);

  useEffect(() => {
    const seedCount = new URLSearchParams(window.location.search).get("seed");
    if (seedCount) seedReports(Number(seedCount) || 25);
  }, []);

  const allReports = useMemo(() => {
    const byId = new Map<string, CatReport>();
    [...reports, ...optimisticReports].forEach((report) => byId.set(report.id, report));
    return Array.from(byId.values());
  }, [optimisticReports, reports]);
  const visibleReports = useMemo(() => filterReports(allReports, filter), [allReports, filter]);
  const selectedReport = visibleReports.find((report) => report.id === selectedReportId);

  async function handleSubmit(input: NewReportInput) {
    const created = await submitReport(input);
    setOptimisticReports((current) => [created, ...current.filter((item) => item.id !== created.id)]);
    setSelectedReportId(created.id);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow"><CollarTagIcon /> Community cat watch</p>
          <h1>WhiskerWatch</h1>
        </div>
        <p>Report stray or lost cats so nearby helpers can notice urgent cases faster.</p>
      </header>

      <section className="workspace">
        <aside className="sidebar">
          <ReportForm selectedLocation={selectedLocation} onSubmitReport={handleSubmit} />
          <ReportFilters filter={filter} onChange={setFilter} />
        </aside>

        <div className="map-stack">
          {loading ? <LoadingState message="Loading community reports..." /> : null}
          <CatMap
            reports={visibleReports}
            selectedLocation={selectedLocation}
            selectedReportId={selectedReportId}
            onSelectLocation={setSelectedLocation}
            onSelectReport={setSelectedReportId}
          />
          {!loading && visibleReports.length === 0 ? (
            <EmptyState
              message="No reports match this view."
              action={
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setFilter(defaultMapFilter)}
                >
                  Reset filters
                </button>
              }
            />
          ) : null}
        </div>

        <aside className="detail-pane">
          {selectedReport ? (
            <ReportDetail report={selectedReport} />
          ) : (
            <EmptyState message="Select a report marker to inspect details." />
          )}
        </aside>
      </section>
    </main>
  );
}

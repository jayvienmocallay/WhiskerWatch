import { useEffect, useMemo, useState } from "react";
import { PatrolLogs } from "../features/reports/components/PatrolLogs";
import { ReportDetail } from "../features/reports/components/ReportDetail";
import { ReportFilters } from "../features/reports/components/ReportFilters";
import { ReportForm } from "../features/reports/components/ReportForm";
import { ReportSuccess } from "../features/reports/components/ReportSuccess";
import { useReports } from "../features/reports/hooks/useReports";
import type { CatReport, MapFilter, NewReportInput, ReportLocation } from "../features/reports/reportTypes";
import { submitReport } from "../features/reports/reportService";
import { CatMap } from "../map/CatMap";
import { defaultMapFilter, filterReports } from "../map/mapFilters";
import { pageCopy } from "../ui/copy";
import { EmptyState, LoadingState } from "../ui/states";
import { seedReports } from "../test/fixtures/seedReports";
import { appPages, type AppPageId, pageOrder } from "./routes";
import { WhiskerWatchLogo } from "../ui/icons";

export default function App() {
  const { reports, loading } = useReports();
  const [activePage, setActivePage] = useState<AppPageId>(() => {
    const page = new URLSearchParams(window.location.search).get("page");
    return page === "patrol" || page === "success" ? page : "workbench";
  });
  const [selectedLocation, setSelectedLocation] = useState<ReportLocation | undefined>();
  const [selectedReportId, setSelectedReportId] = useState<string | undefined>();
  const [lastSubmittedReportId, setLastSubmittedReportId] = useState<string | undefined>();
  const [filter, setFilter] = useState<MapFilter>(defaultMapFilter);
  const [optimisticReports, setOptimisticReports] = useState<CatReport[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seedCount = params.get("seed");
    if (seedCount) seedReports(Number(seedCount) || 25);
  }, []);

  const allReports = useMemo(() => {
    const byId = new Map<string, CatReport>();
    [...reports, ...optimisticReports].forEach((report) => byId.set(report.id, report));
    return Array.from(byId.values());
  }, [optimisticReports, reports]);

  const visibleReports = useMemo(() => filterReports(allReports, filter), [allReports, filter]);
  const selectedReport = visibleReports.find((report) => report.id === selectedReportId);
  const lastSubmittedReport = allReports.find((report) => report.id === lastSubmittedReportId);

  async function handleSubmit(input: NewReportInput) {
    const created = await submitReport(input);
    setOptimisticReports((current) => [created, ...current.filter((item) => item.id !== created.id)]);
    setSelectedReportId(created.id);
    setLastSubmittedReportId(created.id);
    setActivePage("success");
  }

  function chooseReport(reportId: string) {
    setSelectedReportId(reportId);
    setActivePage(activePage === "success" ? "workbench" : activePage);
  }

  function createAnotherReport() {
    setActivePage("workbench");
    setSelectedLocation(undefined);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">{pageCopy.eyebrow}</p>
          <h1><WhiskerWatchLogo title={pageCopy.logoLabel} /></h1>
        </div>
        <p>{pageCopy.dek}</p>
        <nav className="app-nav" aria-label="Primary">
          {pageOrder.map((pageId) => (
            <button
              key={pageId}
              type="button"
              className={activePage === pageId ? "nav-button selected" : "nav-button secondary"}
              onClick={() => setActivePage(pageId)}
            >
              {appPages[pageId].label}
            </button>
          ))}
        </nav>
      </header>

      {activePage === "success" ? (
        <ReportSuccess
          report={lastSubmittedReport}
          onCreateAnother={createAnotherReport}
          onContinueMonitoring={() => setActivePage("workbench")}
        />
      ) : null}

      {activePage === "patrol" ? (
        <PatrolLogs
          reports={visibleReports}
          selectedReportId={selectedReportId}
          onSelectReport={chooseReport}
        />
      ) : null}

      <section className={activePage === "workbench" ? "workspace" : "workspace workspace-secondary"}>
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
              message={pageCopy.noReports}
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
            <EmptyState message={pageCopy.selectReport} />
          )}
        </aside>
      </section>
    </main>
  );
}

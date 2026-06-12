import type { CatReport } from "../reportTypes";
import { formatApproximateLocation } from "../../../map/locationPrivacy";
import { conditionVocabulary, statusVocabulary } from "../../../ui/statusVocabulary";
import { EmptyState } from "../../../ui/states";
import { WatchEyeIcon, WhiskerWatchLogo } from "../../../ui/icons";

interface PatrolLogsProps {
  reports: CatReport[];
  selectedReportId?: string;
  onSelectReport: (reportId: string) => void;
}

export function PatrolLogs({ reports, selectedReportId, onSelectReport }: PatrolLogsProps) {
  const activeReports = reports.filter((report) => report.status !== "closed");
  const urgentCount = activeReports.filter((report) => report.condition === "injured").length;
  const helpedCount = activeReports.filter((report) => report.status === "helped").length;

  return (
    <section className="patrol-dashboard" aria-labelledby="patrol-heading">
      <header className="patrol-header">
        <div>
          <WhiskerWatchLogo className="surface-logo" />
          <p className="eyebrow"><WatchEyeIcon /> Local dispatch</p>
          <h2 id="patrol-heading">Patrol Logs</h2>
          <p>Real-time neighborhood community activity.</p>
        </div>
        <div className="patrol-stats" aria-label="Patrol summary">
          <span><strong>{activeReports.length}</strong> Reporting now</span>
          <span><strong>{urgentCount}</strong> Injured</span>
          <span><strong>{helpedCount}</strong> Helped</span>
        </div>
      </header>

      {activeReports.length === 0 ? (
        <EmptyState message="No patrol logs match this view." />
      ) : (
        <ul className="patrol-list" aria-label="Patrol report activity">
          {activeReports.map((report) => (
            <li key={report.id}>
              <button
                type="button"
                className={selectedReportId === report.id ? "patrol-row selected" : "patrol-row"}
                onClick={() => onSelectReport(report.id)}
                aria-label={`${conditionVocabulary[report.condition].label} patrol log, ${statusVocabulary[report.status].label}`}
              >
                <span className={`patrol-signal ${report.condition}`} aria-hidden="true">
                  {conditionVocabulary[report.condition].symbol}
                </span>
                <span className="patrol-row-main">
                  <strong>{conditionVocabulary[report.condition].label}</strong>
                  <span>{report.notes || "No notes added."}</span>
                </span>
                <span className="patrol-meta">
                  <span>{statusVocabulary[report.status].label}</span>
                  <span>{formatApproximateLocation(report.location)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

import type { CatReport } from "../reportTypes";
import { formatApproximateLocation } from "../../../map/locationPrivacy";
import { pageCopy } from "../../../ui/copy";
import { conditionVocabulary, statusVocabulary } from "../../../ui/statusVocabulary";
import { CollarTagIcon, HelpedPawIcon, PawDropIcon, WhiskerWatchLogo } from "../../../ui/icons";

interface ReportSuccessProps {
  report?: CatReport;
  onCreateAnother: () => void;
  onContinueMonitoring: () => void;
}

export function ReportSuccess({ report, onCreateAnother, onContinueMonitoring }: ReportSuccessProps) {
  return (
    <section className="success-view" aria-labelledby="success-heading">
      <div className="success-hero">
        <WhiskerWatchLogo className="surface-logo" />
        <p className="eyebrow"><HelpedPawIcon /> Help signal</p>
        <h2 id="success-heading">{pageCopy.successTitle}</h2>
        <p>{report ? pageCopy.successMessage : pageCopy.successFallback}</p>
        <div className="success-actions">
          <button type="button" onClick={onCreateAnother}>
            <PawDropIcon /> {pageCopy.createAnother}
          </button>
          <button type="button" className="secondary" onClick={onContinueMonitoring}>
            <CollarTagIcon /> {pageCopy.continueMonitoring}
          </button>
        </div>
      </div>

      {report ? (
        <article className="success-card" aria-label="Submitted report summary">
          <div className="detail-header">
            <span className={`condition-chip ${report.condition}`}>
              <span aria-hidden="true">{conditionVocabulary[report.condition].symbol}</span>
              {conditionVocabulary[report.condition].label}
            </span>
            <span className="status-chip">
              <span aria-hidden="true">{statusVocabulary[report.status].symbol}</span>
              {statusVocabulary[report.status].label}
            </span>
          </div>
          <dl>
            <div>
              <dt>Approximate location</dt>
              <dd>{formatApproximateLocation(report.location)}</dd>
            </div>
            <div>
              <dt>Safe notes</dt>
              <dd>{report.notes || "No notes added."}</dd>
            </div>
          </dl>
        </article>
      ) : null}
    </section>
  );
}

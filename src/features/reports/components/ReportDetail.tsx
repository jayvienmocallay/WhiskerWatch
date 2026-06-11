import type { CatReport } from "../reportTypes";
import { formatApproximateLocation } from "../../../map/locationPrivacy";
import { conditionVocabulary, statusVocabulary } from "../../../ui/statusVocabulary";
import { CollarTagIcon, WhiskerDivider } from "../../../ui/icons";

export function ReportDetail({ report }: { report: CatReport }) {
  return (
    <article className="report-detail" aria-label="Report detail">
      <h2 className="panel-title"><CollarTagIcon /> Cat case card</h2>
      <div className="detail-header">
        <span className={`condition-chip ${report.condition}`}>
          <span aria-hidden="true">{conditionVocabulary[report.condition].symbol}</span>
          {conditionVocabulary[report.condition].label}
        </span>
        <WhiskerDivider />
        <span className="status-chip"><span aria-hidden="true">{statusVocabulary[report.status].symbol}</span>{statusVocabulary[report.status].label}</span>
      </div>
      {report.photo ? (
        <figure className="snapshot-frame">
          <img src={report.photo.downloadUrl} alt="Reported cat" />
          <figcaption>Reported photo</figcaption>
        </figure>
      ) : null}
      <dl>
        <div>
          <dt><span className="detail-label"><CollarTagIcon /> Approximate location</span></dt>
          <dd>{formatApproximateLocation(report.location)}</dd>
        </div>
        <div>
          <dt><span className="detail-label"><CollarTagIcon /> Submitted</span></dt>
          <dd>{new Date(report.createdAt).toLocaleString()}</dd>
        </div>
        {report.notes ? (
          <div>
            <dt><span className="detail-label"><CollarTagIcon /> Safe notes</span></dt>
            <dd>{report.notes}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

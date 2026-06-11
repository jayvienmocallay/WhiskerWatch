import type { Condition, MapFilter, ReportStatus } from "../reportTypes";
import { toggleValue } from "../../../map/mapFilters";
import { conditionVocabulary, statusVocabulary } from "../../../ui/statusVocabulary";
import { CollarTagIcon, FoodBowlIcon, WatchEyeIcon } from "../../../ui/icons";

interface ReportFiltersProps {
  filter: MapFilter;
  onChange: (filter: MapFilter) => void;
}

const conditions = Object.keys(conditionVocabulary) as Condition[];
const statuses = Object.keys(statusVocabulary).filter((status) => status !== "closed") as ReportStatus[];

export function ReportFilters({ filter, onChange }: ReportFiltersProps) {
  return (
    <section className="filters" aria-label="Report filters">
      <h2 className="panel-title"><WatchEyeIcon /> Scent trails</h2>
      <div>
        <span className="field-label">Condition</span>
        <div className="filter-row">
          {conditions.map((condition) => (
            <label key={condition} className={conditionVocabulary[condition].trailClass}>
              <input
                type="checkbox"
                checked={filter.conditions.includes(condition)}
                onChange={() =>
                  onChange({ ...filter, conditions: toggleValue(filter.conditions, condition) })
                }
              />
              <span className="chip-icon" aria-hidden="true">
                {condition === "needs_food" ? <FoodBowlIcon /> : conditionVocabulary[condition].symbol}
              </span>
              {conditionVocabulary[condition].label}
              <span className="sr-only">{conditionVocabulary[condition].cue}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <span className="field-label">Status</span>
        <div className="filter-row">
          {statuses.map((status) => (
            <label key={status}>
              <input
                type="checkbox"
                checked={filter.statuses.includes(status)}
                onChange={() => onChange({ ...filter, statuses: toggleValue(filter.statuses, status) })}
              />
              <span className="chip-icon" aria-hidden="true">{statusVocabulary[status].symbol}</span>
              {statusVocabulary[status].label}
              <span className="sr-only">{statusVocabulary[status].cue}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="button" className="secondary" onClick={() => onChange({ conditions: [], statuses: ["reported", "monitoring", "helped"] })}>
        <CollarTagIcon /> Reset filters
      </button>
    </section>
  );
}

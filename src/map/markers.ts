import type { CatReport, Condition } from "../features/reports/reportTypes";
import { conditionVocabulary, statusVocabulary } from "../ui/statusVocabulary";

export function markerClass(condition: Condition): string {
  return `marker cat-marker marker-${condition.replace("_", "-")}`;
}

export function markerAccessibleName(report: CatReport): string {
  const condition = conditionVocabulary[report.condition].label;
  const status = statusVocabulary[report.status].label;
  return `${condition} cat report, ${status}`;
}

export function markerSymbol(condition: Condition): string {
  return conditionVocabulary[condition].symbol;
}

export function markerHtml(condition: Condition): string {
  return `<span class="marker-ear" aria-hidden="true"></span><span class="marker-symbol" aria-hidden="true">${markerSymbol(condition)}</span>`;
}

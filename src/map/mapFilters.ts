import type { CatReport, Condition, MapFilter, ReportStatus } from "../features/reports/reportTypes";
import { activeStatuses } from "../ui/statusVocabulary";

export const defaultMapFilter: MapFilter = {
  conditions: [],
  statuses: activeStatuses,
};

export function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function reportMatchesFilter(report: CatReport, filter: MapFilter): boolean {
  const conditionMatch =
    filter.conditions.length === 0 || filter.conditions.includes(report.condition as Condition);
  const statusMatch =
    filter.statuses.length === 0 || filter.statuses.includes(report.status as ReportStatus);
  return conditionMatch && statusMatch;
}

export function filterReports(reports: CatReport[], filter: MapFilter): CatReport[] {
  return reports.filter((report) => report.status !== "closed").filter((report) => reportMatchesFilter(report, filter));
}

import { seedMemoryReports } from "../../firebase/reportsRepository";
import { makeReport, makeReports } from "./reports";

export function seedReports(count = 25) {
  const reports = makeReports(count);
  seedMemoryReports(reports);
  return reports;
}

export function makeWorkbenchReports() {
  return makeReports(25);
}

export function makePatrolLogReports() {
  return [
    makeReport({ id: "report-1", condition: "injured", status: "reported", notes: "Limping near the public library bushes." }),
    makeReport({ id: "report-2", condition: "needs_food", status: "monitoring", notes: "Vocal near the corner store patio." }),
    makeReport({ id: "report-3", condition: "healthy", status: "helped", notes: "Resting near a shaded courtyard." }),
  ];
}

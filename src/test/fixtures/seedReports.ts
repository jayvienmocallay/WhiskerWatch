import { seedMemoryReports } from "../../firebase/reportsRepository";
import { makeReports } from "./reports";

export function seedReports(count = 25) {
  const reports = makeReports(count);
  seedMemoryReports(reports);
  return reports;
}
